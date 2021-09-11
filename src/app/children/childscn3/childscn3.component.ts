import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Childscn3Service } from './childscn3.service';

interface checkBox {
  value: string;
  completed: boolean;
}

interface sysCode {
  value: string;
  viewValue: string;
}
interface ANNOUNCE_REASON {
  ANNOUNCE_REASON1: string;
  ANNOUNCE_REASON2: string;
}




@Component({
  selector: 'app-childscn3',
  templateUrl: './childscn3.component.html',
  styleUrls: ['./childscn3.component.css']
})
export class Childscn3Component implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private childsc3Service: Childscn3Service) { }
  private applno: string;
  private search: string;
  chkArray: checkBox[] = [];
  level1: string[] = [];//裝第一層checkbox
  level2: string[] = [];//裝第二層checkbox
  data: any;//裝一開始的資料表
  l1 : ANNOUNCE_REASON[]=[];
  jsonObject :any = {};
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];//案件代碼
      this.search = params['search'];
      this.getTable()//抓取資料表
    });
  }
  getOptionDesc(option: sysCode[], codeVal: string): string //代碼跑名稱
   {
    for (const data of option) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }

  chkArray1(check: boolean, value: string, id: string) //第一層checkbox
  {
    if (check) {
      this.level1.push(id)

    }
    else {
      this.level1.splice(this.level1.indexOf(id), 1)
      this.level2 =[]
      for (var fdL1 of this.data) {
        if (fdL1.REASON_CODE == id) {
          for (var fdL2 of fdL1.child) {

            fdL2.check = false;
          }
        }
      }
    }

  }
  chkArray2(check: boolean, value: string)//第二層checkbox
   {
    if (check) {
      this.level2.push(value)
    }
    else {
      this.level2.splice(this.level2.indexOf(value), 1)
    }

  }
  // myGeeks(value:string)
  // {
  //   // var g = document.getElementById("")
  //   alert(value)
  // }
  seve()//儲存
  {
    this.l1 =[];
    for(var i of this.level1)
    {
      for(var k of this.level2)
      {
        this.l1.push({ANNOUNCE_REASON1:i,ANNOUNCE_REASON2:k})
      }

    }
    this.jsonObject['applno'] = this.applno;
    this.jsonObject['result'] = this.l1;
    const url = 'f01/childScn4';
    alert('OK');
    console.log(this.jsonObject);
    this.childsc3Service.oneseve(url,this.jsonObject).subscribe(data=>
      {
        console.log(data);
      })

  }

  getTable() {
    const url = 'f01/childScn3';
    const applno = this.applno;
    this.childsc3Service.test(url, applno).subscribe(data => {
      this.data = data.rspBody;
    })
  }
}

