import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionsCode } from 'src/app/interface/base';
import { ChildrenService } from '../children.service';
import { Childscn3Service } from './childscn3.service';

interface checkBox {
  value: string;
  completed: boolean;
}
interface ANNOUNCE_REASON {
  announceReason1: string;
  announceReason2: string;
}


//Jay 偽案通報

@Component({
  selector: 'app-childscn3',
  templateUrl: './childscn3.component.html',
  styleUrls: ['./childscn3.component.css']
})
export class Childscn3Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private childsc3Service: Childscn3Service,
    public childService: ChildrenService
  ) { }

  private applno: string;
  private search: string;
  chkArray: checkBox[] = [];
  level1: string[] = [];//裝第一層checkbox
  data: any;//裝一開始的資料表
  l1 : ANNOUNCE_REASON[]=[];
  jsonObject :any = {};
  i:string;
  no:string;//會員帳號
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];//案件代碼
      this.search = params['search'];
      this.no =  localStorage.getItem("empNo");
      this.getTable()//一進去畫面就抓取資料表
    });
    const caseParams = this.childService.getData();
    this.applno = caseParams.applno;
    this.search = caseParams.search;
    this.getTable()//抓取資料表

  }
  getOptionDesc(option: OptionsCode[], codeVal: string): string //代碼跑名稱
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
      for (var fdL1 of this.data) {
        if (fdL1.reasonCode == id) {
          for (var fdL2 of fdL1.child)
          {
            fdL2.check = false;
          }
        }
      }
    }

  }

  seveFraud()//發送Fraud Team
  {
    const url = 'f01/childscn3action2';
    this.jsonObject['applno'] = this.applno;
    this.jsonObject['announceEmpno'] = this.no;
    this.childsc3Service.oneseve(url,this.jsonObject).subscribe(data=>
      {

      })
  }
  seve()//儲存
  {
    this.l1 =[];
    for(var i of this.data)
    {
      if(i.check ==true)
      {
        for(var k of i.child)
        {
          if(k.check==true)
          this.l1.push({announceReason1:i.reasonCode,announceReason2:k.reasonCode})
        }
      }
    }
    this.jsonObject['applno'] = this.applno;
    this.jsonObject['result'] = this.l1;
    const url = 'f01/childscn3action1';
    this.childsc3Service.oneseve(url,this.jsonObject).subscribe(data=>
      {

      })

  }

  getTable()//抓取資料表
   {
    const url = 'f01/childscn3';
    const applno = this.applno;
    this.childsc3Service.gettable(url, applno).subscribe(data => {
      this.data = data.rspBody.list;
      this.i = data.rspBody.fraudIsLocked;
    })
  }
}

