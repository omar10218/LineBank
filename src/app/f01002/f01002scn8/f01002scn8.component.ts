import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { F01002scn8Service } from './f01002scn8.service';
import { F01002scn8addComponent } from './f01002scn8add/f01002scn8add.component';
import { F01002scn8confirmComponent } from './f01002scn8confirm/f01002scn8confirm.component';
import { F01002scn8editComponent } from './f01002scn8edit/f01002scn8edit.component';
//下拉選單框架
interface sysCode {
  value: string;
  viewValue: string;
}

//徵信照會table框架
interface CALLOUTCode {
  APPLNO: string;
  CALLOUT_DATE: string;
  CON_MEMO: string;
  CON_TARGET: string;
  CON_TEL: string;
  CUST_TYPE: string;
  ID: string;
  NOTE: string;
  PHONE: string;
  ROWNUM_: string;
  CON_MEMO_View: string;
  CON_TARGET_View: string;
  CON_TEL_View: string;
}
//Nick 徵信照會
@Component({
  selector: 'app-f01002scn8',
  templateUrl: './f01002scn8.component.html',
  styleUrls: ['./f01002scn8.component.css', '../../../assets/css/f01.css']
})
export class F01002scn8Component implements OnInit {

  CON_TEL_Code: sysCode[] = [];//電話種類下拉選單
  CON_TEL_Selected: string;//電話種類
  CON_TEL_Value: string;//電話種類
  CON_TARGET_Code: sysCode[] = [];//對象種類下拉選單
  CON_TARGET_Selected: string;//對象種類
  CON_TARGET_Value: string;//對象種類
  CON_MEMO_Code: sysCode[] = [];//註記種類下拉選單
  CON_MEMO_Selected: string;//註記種
  CON_MEMO_Value: string;//註記種

  CALLOUTSource = new MatTableDataSource<any>();//table資料
  rspBodyList: CALLOUTCode[] = [];//table資料
  speakingData: any;//table資料
  rspBodyData: any;//table資料
  currentPage: PageEvent; //表單資料筆數設定

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private f01002scn8Service: F01002scn8Service) { }
  private applno: string;
  private search: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
    });

    //表單資料筆數設定
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };

    //取下拉選單資料
    this.f01002scn8Service.getSysTypeCode('CON_TEL', 'f01/f01002scn8')//電話種類下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_TEL_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    this.f01002scn8Service.getSysTypeCode('CON_TARGET', 'f01/f01002scn8')//對象種類下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_TARGET_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    this.f01002scn8Service.getSysTypeCode('CON_MEMO', 'f01/f01002scn8')//註記種類下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_MEMO_Code.push({ value: codeNo, viewValue: desc })
        }
      });
  }
  //表單資料筆數設定
  ngAfterViewInit() {
    this.getCALLOUTFunction();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCALLOUTFunction();
    });
  }

  //取收件編號
  getApplno(): String {
    return this.applno;
  }

  //確認徵審或查詢
  getSearch(): string {
    return this.search;
  }

  totalCount: any;//表單資料筆數設定
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;//表單資料筆數設定
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;//表單資料筆數設定

  //新增
  Add() {
    const dialogRef = this.dialog.open(F01002scn8addComponent, {
      minHeight: '100vh',
      width: '50%',
      data: {
        applno: this.applno,//收件編號
        con_TEL: '',//電話種類
        phone: '',//電話
        con_TARGET: '',//對象種類
        cust_TYPE: '',//對象註記
        con_MEMO: '',//註記種類
        note: '',//註記
        ID: '',//java用row ID
        CON_TEL_Code: this.CON_TEL_Code,//電話種類下拉選單
        CON_TARGET_Code: this.CON_TARGET_Code,//對象種類下拉選單
        CON_MEMO_Code: this.CON_MEMO_Code//註記種類下拉選單
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != null && result == '1') { this.refreshTable(); }
    });
  }

  //編輯
  startEdit(CON_TEL: string, PHONE: string, CON_TARGET: string, CUST_TYPE: string, CON_MEMO: string, NOTE: string, ID: string) {
    const dialogRef = this.dialog.open(F01002scn8editComponent, {
      minHeight: '100vh',
      width: '50%',
      data: {
        con_TEL: CON_TEL,//電話種類
        phone: PHONE,//電話
        con_TARGET: CON_TARGET,//對象種類
        cust_TYPE: CUST_TYPE,//對象註記
        con_MEMO: CON_MEMO,//註記種類
        note: NOTE,//註記
        ID: ID,//java用row ID
        CON_TEL_Code: this.CON_TEL_Code,//電話種類下拉選單
        CON_TARGET_Code: this.CON_TARGET_Code,//對象種類下拉選單
        CON_MEMO_Code: this.CON_MEMO_Code//註記種類下拉選單
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != null && result == '1') { this.refreshTable(); }
    });
  }

  //刪除
  delete(ID: string) {
    let msg = '';
    const url = 'f01/f01002scn8action3';
    this.f01002scn8Service.DeleteCALLOUT(url, ID).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(F01002scn8confirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == '刪除成功') { this.refreshTable(); }
    }, 1500);
  }

  //刷新Table
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  //取Table
  private async getCALLOUTFunction() {
    const baseUrl = 'f01/f01002scn8scn1';
    this.f01002scn8Service.getCALLOUT(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize, this.applno).subscribe(data => {
      this.rspBodyData = data.rspBody;
      this.rspBodyList = data.rspBody.list;
      this.speakingData = data.rspBody.speaking;
      if (this.rspBodyList.length > 0) {
        for (let i = 0; i < this.rspBodyList.length; i++) {
          this.rspBodyList[i].CON_TEL_View = this.getSelectView('CON_TEL', this.rspBodyList[i].CON_TEL);
          this.rspBodyList[i].CON_TARGET_View = this.getSelectView('CON_TARGET', this.rspBodyList[i].CON_TARGET);
          this.rspBodyList[i].CON_MEMO_View = this.getSelectView('CON_MEMO', this.rspBodyList[i].CON_MEMO);
        }
      }
      this.CALLOUTSource.data = this.rspBodyList;
      this.totalCount = data.rspBody.size;
    });
  }

  //下拉選單資料轉換
  getSelectView(key: string, value: string): string {
    var result = "";
    switch (key) {
      case "CON_TEL": {//電話種類下拉選單
        for (const data of this.rspBodyData.conTel) {
          if (data.codeNo == value) {
            result = data.codeDesc;
          }
        }
        break;
      }
      case "CON_TARGET": {//對象種類下拉選單
        for (const data of this.rspBodyData.conTarget) {
          if (data.codeNo == value) {
            result = data.codeDesc;
          }
        }
        break;
      }
      default: {//註記種類下拉選單
        for (const data of this.rspBodyData.conMemo) {
          if (data.codeNo == value) {
            result = data.codeDesc;
          }
        }
        break;
      }
    }
    return result;
  }

  ShowspeakingContenta(speakingContent: string): void {
    const DialogRef = this.dialog.open(F01002scn8confirmComponent, { data: { msgStr: speakingContent } });
    // alert(speakingContent);
  }

}
