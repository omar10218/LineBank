import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { Childscn8Service } from './childscn8.service';
import { Childscn8addComponent } from './childscn8add/childscn8add.component';
import { Childscn8editComponent } from './childscn8edit/childscn8edit.component';
import { Childscn8deleteComponent } from './childscn8delete/childscn8delete.component';
import { DatePipe } from '@angular/common'
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';


//徵信照會table框架
interface CALLOUTCode {
  APPLNO: string;
  CON_TYPE: string;
  PHONE: string;
  TEL_CONDITION: string;
  TEL_CHECK: string;
  CON_MEMO: string;
  CALLOUT_DATE: string;
  CON_TYPE_View: string;
  TEL_CONDITION_View: string;
  TEL_CHECK_View: string;
  CALLOUT_SETTIME: string;
  CALLOUT_YN: string;
  CALLOUT_YN_View: string;
  CALLOUT_EMPNO: string;
}

//照會項目table框架
interface MDtable {
  MD_NO?: OptionsCode;
  CHECK_DATA?: string;
  REPLY_CONDITION?: string;
  CHECK_NOTE?: string;
  CHECK_DATE?: string;
  CHECK_EMPNO?: string;
  txt?: string;//提問
}

//徵信照會checkbox框架
interface checkboxCode {
  value: string;
  viewValue: string;
  checked: boolean;
}
//Nick 徵信照會
@Component({
  selector: 'app-childscn8',
  templateUrl: './childscn8.component.html',
  styleUrls: ['./childscn8.component.css', '../../../assets/css/f03.css']
})
export class Childscn8Component implements OnInit {

  constructor(
    public dialog: MatDialog,
    private childscn8Service: Childscn8Service,
    public datepipe: DatePipe
  ) { }

  private applno: string;
  private search: string;
  private empNo: string;

  listOfData: readonly Data[] = [];//表單資料筆數設定
  total = 1;
  loading = true;
  pageIndex = 1;
  pageSize = 50;


  CON_TYPE_Code: OptionsCode[] = [];//聯絡方式下拉選單
  CON_TYPE: string;//聯絡方式
  TEL_CONDITION_Code: OptionsCode[] = [];//電話狀況下拉選單
  TEL_CONDITION: string;//電話狀況
  TEL_CHECK_Code: OptionsCode[] = [];//電話種類下拉選單
  TEL_CHECK: string;//電話種類
  HOURS_Code: OptionsCode[] = [];//時下拉選單
  HOURS: string;//時種類
  MINUTES_Code: OptionsCode[] = [];//分下拉選單
  MINUTES: string;//分種類
  CALLOUT_SETTIME: string;//確認時間
  CALLOUT_YN: string;//照會完成
  CALLOUT_YN_Code: OptionsCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' },];//照會完成下拉選單

  CALLOUTSource = new MatTableDataSource<any>();//table資料
  rspBodyList: CALLOUTCode[] = [];//table資料
  speakingData: any;//table資料
  rspBodyData: any;//table資料



  //照會項目 複選額外處理
  MDtable: MDtable[] = [];
  REPLY_CONDITION14code: checkboxCode[]
    = [{ value: 'A', viewValue: '生活費用', checked: false },
    { value: 'B', viewValue: '修繕房屋、汽車', checked: false },
    { value: 'C', viewValue: '購置汽車', checked: false },
    { value: 'D', viewValue: '教育、旅遊費用', checked: false },
    { value: 'E', viewValue: '結婚基金', checked: false },
    { value: 'F', viewValue: '代償他行', checked: false },
    { value: 'G', viewValue: '醫療費用', checked: false },
    { value: 'H', viewValue: '投資理財', checked: false },
    { value: 'I', viewValue: '非本人使用', checked: false },
    { value: 'J', viewValue: '週轉金', checked: false },
    { value: 'Z', viewValue: '其他:', checked: false },];
  REPLY_CONDITION17code: checkboxCode[]
    = [{ value: 'K', viewValue: '網路得知', checked: false },
    { value: 'L', viewValue: 'LINE Corp. 推播', checked: false },
    { value: 'M', viewValue: '電視報章雜誌廣告', checked: false },
    { value: 'N', viewValue: '他人介紹', checked: false },
    { value: 'O', viewValue: 'LINE BANK 開戶', checked: false },
    { value: 'Z', viewValue: '其他:', checked: false },];




  ngOnInit(): void {
    this.getCALLOUTFunction(this.pageIndex, this.pageSize);//載入頁面
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.empNo = localStorage.getItem("empNo");


    this.childscn8Service.getSysTypeCode('HOURS')//時下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.HOURS_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    this.childscn8Service.getSysTypeCode('MINUTES')//分下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.MINUTES_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    this.childscn8Service.getSysTypeCode('MD_NO')//項目
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          let mdno: OptionsCode = { value: codeNo, viewValue: desc }
          this.MDtable.push({ MD_NO: mdno, CHECK_DATA: '', REPLY_CONDITION: '', CHECK_NOTE: '', CHECK_DATE: '', CHECK_EMPNO: '', txt: '' })
        }
      });
    console.log(this.MDtable);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.pageSize=pageSize;
    this.pageIndex=pageIndex;
    this.getCALLOUTFunction(this.pageIndex, this.pageSize);
  }

  getSearch() {
    return this.search;
  }

  //totalCount: any;//表單資料筆數設定
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;//表單資料筆數設定
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;//表單資料筆數設定

  //新增
  Add() {
    const dialogRef = this.dialog.open(Childscn8addComponent, {
      minHeight: '70vh',
      width: '70%',
      data: {
        applno: this.applno,//收件編號
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
        //CALLOUT_YN:''//照會完成
        speakingData:this.speakingData//照會話術
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != null && (result.event == 'success' || result == '1')) { this.refreshTable(); }
    });
  }

  //編輯
  startEdit(CON_TYPE: string, PHONE: string, TEL_CONDITION: string, TEL_CHECK: string, CON_MEMO: string, CALLOUT_DATE: string, ID: string, CALLOUT_SETTIME: string, CALLOUT_YN: string) {
    // console.log(this.datepipe.transform(CALLOUT_DATE, 'HH'));
    // console.log(this.datepipe.transform(CALLOUT_DATE, 'mm'));

    const dialogRef = this.dialog.open(Childscn8editComponent, {
      minHeight: '70vh',
      width: '70%',
      data: {
        applno: this.applno,//收件編號
        // CON_TYPE_Code: this.CON_TYPE_Code,//聯絡方式下拉選單
        CON_TYPE: CON_TYPE,//聯絡方式
        // TEL_CONDITION_Code: this.TEL_CONDITION_Code,//電話狀況下拉選單
        TEL_CONDITION: TEL_CONDITION,//電話狀況
        // TEL_CHECK_Code: this.TEL_CHECK_Code,//電話種類下拉選單
        TEL_CHECK: TEL_CHECK,//電話種類
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
        CALLOUT_YN: CALLOUT_YN,//照會完成
        // CALLOUT_YN_Code: this.CALLOUT_YN_Code,//照會完成下拉選單
        speakingData:this.speakingData//照會話術
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != null && (result.event == 'success' || result == '1')) { this.refreshTable(); }
    });
  }

  //刪除
  deleteItem(CON_TYPE: string, PHONE: string, TEL_CONDITION: string, TEL_CHECK: string, CON_MEMO: string, CALLOUT_DATE: string, ID: string, CALLOUT_SETTIME: string, CALLOUT_YN: string) {
    const dialogRef = this.dialog.open(Childscn8deleteComponent, {
      minHeight: '70vh',
      width: '70%',
      data: {
        applno: this.applno,//收件編號
        CON_TYPE_Code: this.CON_TYPE_Code,//聯絡方式下拉選單
        CON_TYPE: CON_TYPE,//聯絡方式
        TEL_CONDITION_Code: this.TEL_CONDITION_Code,//電話狀況下拉選單
        TEL_CONDITION: TEL_CONDITION,//電話狀況
        TEL_CHECK_Code: this.TEL_CHECK_Code,//電話種類下拉選單
        TEL_CHECK: TEL_CHECK,//電話種類
        HOURS_Code: this.HOURS_Code,//時下拉選單
        HOURS: this.datepipe.transform(CALLOUT_DATE, 'HH'),//時
        MINUTES_Code: this.MINUTES_Code,//分下拉選單
        MINUTES: this.datepipe.transform(CALLOUT_DATE, 'mm'),//分
        PHONE: PHONE,//手機/市話
        CON_MEMO: CON_MEMO,//備註
        CALLOUT_DATE: CALLOUT_DATE,//設定下次照會時間
        ID: ID,//java用row ID
        CALLOUT_SETTIME: CALLOUT_SETTIME,//確認時間
        CALLOUT_EMPNO: this.empNo,//徵信員編
        CALLOUT_YN: CALLOUT_YN,//照會完成
        CALLOUT_YN_Code: this.CALLOUT_YN_Code//照會完成下拉選單

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && (result.event == 'success' || result == '1')) { this.refreshTable(); }
    });
  }


  //刷新Table
  private refreshTable() {
    this.getCALLOUTFunction(this.pageIndex, this.pageSize);
  }

  //取Table
  private async getCALLOUTFunction(pageIndex: number, pageSize: number) {
    const baseUrl = 'f01/childscn8scn1';
    let jsonObject: any = {};
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize
    jsonObject['applno'] = this.applno
    console.log('jsonObject');
    console.log(jsonObject);
    this.childscn8Service.postJsonObject_CALLOUT(baseUrl, jsonObject).subscribe(data => {
      console.log('data');
      console.log(data);
      this.rspBodyData = data.rspBody;
      this.rspBodyList = data.rspBody.list;
      this.speakingData = data.rspBody.speaking;
      //下拉選單取畫面顯示文字
      if (this.rspBodyList.length > 0) {
        for (let i = 0; i < this.rspBodyList.length; i++) {
          this.rspBodyList[i].CON_TYPE_View = this.getSelectView('CON_TYPE', this.rspBodyList[i].CON_TYPE);
          this.rspBodyList[i].TEL_CONDITION_View = this.getSelectView('TEL_CONDITION', this.rspBodyList[i].TEL_CONDITION);
          this.rspBodyList[i].TEL_CHECK_View = this.getSelectView('TEL_CHECK', this.rspBodyList[i].TEL_CHECK);
          this.rspBodyList[i].CALLOUT_YN_View = this.rspBodyList[i].CALLOUT_YN == "Y" ? "是" : this.rspBodyList[i].CALLOUT_YN == "N" ? "否" : ""

        }
      }
      //取下拉選單資料
      if (this.CON_TYPE_Code.length < 1) {
        for (const jsonObj of data.rspBody.conType) {//聯絡方式下拉選單
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.CON_TYPE_Code.push({ value: codeNo, viewValue: desc })
        }
      }
      if (this.TEL_CONDITION_Code.length < 1) {
        for (const jsonObj of data.rspBody.telCondition) {//電話狀況下拉選單
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.TEL_CONDITION_Code.push({ value: codeNo, viewValue: desc })
        }
      }
      if (this.TEL_CHECK_Code.length < 1) {
        for (const jsonObj of data.rspBody.telCheck) {//電話種類下拉選單
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.TEL_CHECK_Code.push({ value: codeNo, viewValue: desc })
        }
      }

      //照會項目
      for (const calloutData of this.MDtable) {
        for (const mdNo of data.rspBody.mdNoList) {
          calloutData.txt = calloutData.MD_NO.value == mdNo ? "*" : calloutData.txt
        }
        for (const calloutItemsData of data.rspBody.calloutItemsList) {
          if (calloutItemsData.checkItem == calloutData.MD_NO.value) {//比對項目代碼
            calloutData.CHECK_DATA = calloutItemsData.checkData;//核對資瞭
            calloutData.CHECK_DATE = calloutItemsData.checkDate//日期轉換
            calloutData.CHECK_EMPNO = calloutItemsData.checkEmpno;//確認人員
            calloutData.CHECK_NOTE = calloutItemsData.checkNote;//其他備註
            calloutData.REPLY_CONDITION = calloutItemsData.replyCondition;//回答狀況
            //回答狀況 載入時 多選另外處理
            if (calloutItemsData.checkItem == "14" && calloutItemsData.replyCondition != null) {
              let REPLY_CONDITION14 = calloutItemsData.replyCondition.split(",");
              for (const data of REPLY_CONDITION14) {
                for (const datacode of this.REPLY_CONDITION14code) {
                  datacode.checked = data == datacode.value ? true : datacode.checked;
                }
              }
            } else if (calloutItemsData.checkItem == "17" && calloutItemsData.replyCondition != null) {
              let REPLY_CONDITION17 = calloutItemsData.replyCondition.split(",");
              for (const data of REPLY_CONDITION17) {
                for (const datacode of this.REPLY_CONDITION17code) {
                  datacode.checked = data == datacode.value ? true : datacode.checked;
                }
              }
            }
          }
        }
      }
      this.CALLOUTSource.data = this.rspBodyList;
      this.total = data.rspBody.size;
      console.log(this.CALLOUTSource.data);
    });
    this.loading = false;
  }

  //下拉選單資料轉換
  getSelectView(key: string, value: string): string {
    var result = "";
    switch (key) {
      case "CON_TYPE": {//聯絡方式下拉選單
        for (const data of this.rspBodyData.conType) {
          if (data.codeNo == value) {
            result = data.codeDesc;
          }
        }
        break;
      }
      case "TEL_CONDITION": {//電話狀況下拉選單
        for (const data of this.rspBodyData.telCondition) {
          if (data.codeNo == value) {
            result = data.codeDesc;
          }
        }
        break;
      }
      default: {//電話驗證下拉選單
        for (const data of this.rspBodyData.telCheck) {
          if (data.codeNo == value) {
            result = data.codeDesc;
          }
        }
        break;
      }
    }
    return result;
  }

  // ShowspeakingContenta(speakingContent: string): void {
  //   const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: speakingContent } });
  //   // alert(speakingContent);
  // }

  //照會項目儲存
  async save() {

    let msgStr: string = "";
    let codeStr: string = "";
    let checkItem = "";
    let checkData = "";
    let replyCondition = "";
    let checkNote = "";

    // 多選先做另外處理
    this.MDtable[13].REPLY_CONDITION = "";//共20筆0開始
    for (var data of this.REPLY_CONDITION14code) {//共20筆1開始
      if (data.checked) { this.MDtable[13].REPLY_CONDITION += data.value + ","; }
    }
    this.MDtable[16].REPLY_CONDITION = "";//共20筆0開始
    for (var data of this.REPLY_CONDITION17code) {//共20筆1開始
      if (data.checked) { this.MDtable[16].REPLY_CONDITION += data.value + ","; }
    }
    //有資料則消除最後一筆分隔記號
    this.MDtable[13].REPLY_CONDITION = this.MDtable[13].REPLY_CONDITION.length > 0 ?
      this.MDtable[13].REPLY_CONDITION.slice(0, this.MDtable[13].REPLY_CONDITION.length - 1) :
      this.MDtable[13].REPLY_CONDITION;

    this.MDtable[16].REPLY_CONDITION = this.MDtable[16].REPLY_CONDITION.length > 0 ?
      this.MDtable[16].REPLY_CONDITION.slice(0, this.MDtable[16].REPLY_CONDITION.length - 1) :
      this.MDtable[16].REPLY_CONDITION;

    console.log('this.MDtable[13].REPLY_CONDITION');
    console.log(this.MDtable[13].REPLY_CONDITION);
    console.log('this.MDtable[16].REPLY_CONDITION');
    console.log(this.MDtable[16].REPLY_CONDITION);

    for (const calloutData of this.MDtable) {
      checkItem += calloutData.MD_NO.value + ",";
      checkData += (calloutData.CHECK_DATA != "" && calloutData.CHECK_DATA != null) ? calloutData.CHECK_DATA + "," : "*,";
      replyCondition += (calloutData.REPLY_CONDITION != "" && calloutData.REPLY_CONDITION != null) ? calloutData.REPLY_CONDITION + "-" : "*-";
      checkNote += (calloutData.CHECK_NOTE != "" && calloutData.CHECK_NOTE != null) ? calloutData.CHECK_NOTE + "," : "*,";
    }
    //有資料則消除最後一筆分隔記號
    checkItem = checkItem.length > 0 ? checkItem.slice(0, checkItem.length - 1) : checkItem;
    checkData = checkData.length > 0 ? checkData.slice(0, checkData.length - 1) : checkData;
    replyCondition = replyCondition.length > 0 ? replyCondition.slice(0, replyCondition.length - 1) : replyCondition;
    checkNote = checkNote.length > 0 ? checkNote.slice(0, checkNote.length - 1) : checkNote;

    const baseUrl = 'f01/childscn8action5';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['empNo'] = this.empNo;
    jsonObject['checkItem'] = checkItem;
    jsonObject['checkData'] = checkData;
    jsonObject['replyCondition'] = replyCondition;
    jsonObject['checkNote'] = checkNote;
    console.log('console.log(jsonObject);');
    console.log(jsonObject);
    await this.childscn8Service.postJsonObject_CALLOUT(baseUrl, jsonObject).subscribe(data => {
      console.log('data');
      console.log(data);
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msgStr }
      });
      if (msgStr != null && (msgStr == '儲存成功!' || msgStr == '1')) { this.refreshTable(); }
    });
  }

}

//字串轉整數  字串  進位單位
function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) { return 0; }
  return parsed ;
}
