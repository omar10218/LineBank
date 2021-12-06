import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { F01008addComponent } from '../f01008add/f01008add.component'
import { F01008Service } from '../f01008.service';
import { Data } from '@angular/router';
import { Subscription } from 'rxjs';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01008scn2',
  templateUrl: './f01008scn2.component.html',
  styleUrls: ['./f01008scn2.component.css', '../../../assets/css/f01.css']
})
export class F01008scn2Component implements OnInit {

  constructor(
    public dialog: MatDialog,
    private f01008Service: F01008Service)
    {

    }

  applno: string;
  page = 1;
  pei_page = 50;
  dataSource: Data[] = [];
  tYPE: sysCode[] = [];
  cONDITION: sysCode[] = [];
  search: string;

  empNo: string;//員編

  showAdd: boolean = false;
  showEdit: boolean = false;
  ngOnInit(): void {
    // this.applno = sessionStorage.getItem('applno');
    this.applno = "20211125A00002";
    console.log(this.applno)
    this.empNo = localStorage.getItem("empNo");
    this.set();
    this.tYPE.push({value:'1',viewValue:'公司電話'})
    this.tYPE.push({value:'2',viewValue:'手機號碼'})
    this.tYPE.push({value:'3',viewValue:'住家號碼'})
    this.tYPE.push({value:'4',viewValue:'其他'})

    this.cONDITION.push({value:'1',viewValue:'本人接'})
    this.cONDITION.push({value:'2',viewValue:'他人接'})
    this.cONDITION.push({value:'3',viewValue:'無人接'})
    this.cONDITION.push({value:'4',viewValue:'其他(備註)'})

    this.search = sessionStorage.getItem('search');
  }
  add() {
    this.showAdd = !this.showAdd;
    this.f01008Service.setJCICAddSource({
      minHeight: '70vh',
			width: '50%',
      show: this.showAdd,
      applno: this.applno,//案件編號
      // CON_TYPE_Code: this.CON_TYPE_Code,//聯絡方式下拉選單
      CON_TYPE: '',//聯絡方式
      // TEL_CONDITION_Code: this.TEL_CONDITION_Code,//電話狀況下拉選單
      TEL_CONDITION: '',//電話狀況
      // TEL_CHECK_Code: this.TEL_CHECK_Code,//電話種類下拉選單
      TEL_CHECK: '',//電話種類
      // HOURS_Code: this.HOURS_Code,//時下拉選單
      HOURS: '',//時種類
      // MINUTES_Code: this.MINUTES_Code,//分下拉選單
      MINUTES: '',//分種類
      PHONE: '',//手機/市話
      CON_MEMO: '',//備註
      CALLOUT_DATE: '',//設定下次照會時間
      CALLOUT_SETTIME: '',//確認時間
      CALLOUT_EMPNO: this.empNo,//徵信員編

    })
  }
  getSearch() {
    return this.search;
  }
  set() {
    let jsonObject: any = {};
    let url = 'f01/f01008scn2';
    jsonObject['applno'] = this.applno;
    jsonObject['page'] = this.page;
    jsonObject['pei_page'] = this.pei_page;
    this.f01008Service.f01008scn2(jsonObject, url).subscribe(data => {
      console.log(data)
      this.dataSource = data.rspBody.list;

    })
  }
  getOptionDesc(option: sysCode[], codeVal: string): string {
    for (const data of option) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
  deleteItem(id:string)
  {
    console.log(id);
  }
  startEdit()
  {

  }
}
