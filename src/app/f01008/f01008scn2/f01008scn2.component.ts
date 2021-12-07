import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { F01008addComponent } from '../f01008add/f01008add.component'
import { F01008Service } from '../f01008.service';
import { Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import{F01008deleteComponent}from'../f01008delete/f01008delete.component'

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
    private f01008Service: F01008Service,
    public datepipe: DatePipe)
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
  //編輯
  startEdit(ID:string,CON_TYPE:string,CON_MEMO:string,PHONE:string,TEL_CONDITION:string,CALLOUT_SETTIME:string,CALLOUT_DATE:string) {
    this.showEdit = !this.showEdit;
    this.f01008Service.setJCICSource({
      minHeight: '70vh',
			width: '50%',
      show: this.showEdit,
      applno: this.applno,//案件編號
      // CON_TYPE_Code: this.CON_TYPE_Code,//聯絡方式下拉選單
      CON_TYPE: CON_TYPE,//聯絡方式
      // TEL_CONDITION_Code: this.TEL_CONDITION_Code,//電話狀況下拉選單
      TEL_CONDITION: TEL_CONDITION,//電話狀況
      // TEL_CHECK_Code: this.TEL_CHECK_Code,//電話種類下拉選單
      // TEL_CHECK: TEL_CHECK,//電話種類
      // HOURS_Code: this.HOURS_Code,//時下拉選單
      HOURS: this.datepipe.transform(CALLOUT_DATE, 'HH'),//時
      // MINUTES_Code: this.MINUTES_Code,//分下拉選單
      MINUTES: this.datepipe.transform(CALLOUT_DATE, 'mm'),//分
      PHONE: PHONE,//手機/市話
      CON_MEMO: CON_MEMO,//備註
      CALLOUT_DATE: CALLOUT_DATE,//設定下次照會時間
      ID: ID,//java用row ID
      CALLOUT_SETTIME: CALLOUT_SETTIME,//確認時間
      CALLOUT_EMPNO: this.empNo,//徵信員編


    });
  }
  getSearch() {
    // return this.search;
    return 'N';
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
  deleteItem(ID:string,CON_TYPE:string,CON_MEMO:string,PHONE:string,TEL_CONDITION:string,CALLOUT_SETTIME:string,CALLOUT_DATE:string)
  {
    const dialogRef = this.dialog.open(F01008deleteComponent, {
      minHeight: '70vh',
      width: '70%',
      data: {
        show: this.showEdit,
        applno: this.applno,//案件編號
        CON_TYPE: CON_TYPE,//聯絡方式
        TEL_CONDITION: TEL_CONDITION,//電話狀況
        HOURS: this.datepipe.transform(CALLOUT_DATE, 'HH'),//時
        MINUTES: this.datepipe.transform(CALLOUT_DATE, 'mm'),//分
        PHONE: PHONE,//手機/市話
        CON_MEMO: CON_MEMO,//備註
        CALLOUT_DATE: CALLOUT_DATE,//設定下次照會時間
        ID: ID,//java用row ID
        CALLOUT_SETTIME: CALLOUT_SETTIME,//確認時間
        CALLOUT_EMPNO: this.empNo,//徵信員編
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && (result.event == 'success' || result == '1')) { this.set(); }
    });
  }
}
