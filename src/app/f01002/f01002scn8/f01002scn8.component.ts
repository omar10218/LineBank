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
interface sysCode {
  value: string;
  viewValue: string;
}

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

@Component({
  selector: 'app-f01002scn8',
  templateUrl: './f01002scn8.component.html',
  styleUrls: ['./f01002scn8.component.css', '../../../assets/css/f01.css']
})
export class F01002scn8Component implements OnInit {

  CON_TEL_Code: sysCode[] = [];
  CON_TEL_Selected: string;
  CON_TEL_Value: string;
  CON_TARGET_Code: sysCode[] = [];
  CON_TARGET_Selected: string;
  CON_TARGET_Value: string;
  CON_MEMO_Code: sysCode[] = [];
  CON_MEMO_Selected: string;
  CON_MEMO_Value: string;

  CALLOUTSource = new MatTableDataSource<any>();
  rspBodyList: CALLOUTCode[] = [];
  speakingData: any;
  rspBodyData: any;
  AddData: any;
  EditData: any;

  submitted = false;
  currentPage: PageEvent;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private f01002scn8Service: F01002scn8Service) { }
  private applno: string;
  private search: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
    });

    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };

    //this.CALLOUTSource.data=this.dataList;
    this.f01002scn8Service.getSysTypeCode('CON_TEL', 'f01/f01002scn8')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_TEL_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    this.f01002scn8Service.getSysTypeCode('CON_TARGET', 'f01/f01002scn8')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_TARGET_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    this.f01002scn8Service.getSysTypeCode('CON_MEMO', 'f01/f01002scn8')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_MEMO_Code.push({ value: codeNo, viewValue: desc })
        }
      });
  }

  ngAfterViewInit() {
    this.getCALLOUTFunction();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCALLOUTFunction();
    });
  }

  getApplno(): String {
    return this.applno;
  }

  getSearch(): string {
    return this.search;
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;

  Add() {
    const dialogRef = this.dialog.open(F01002scn8addComponent, {
      minHeight: '100vh',
      width: '50%',
      data: {
        applno: this.applno,
        con_TEL: '',
        phone: '',
        con_TARGET: '',
        cust_TYPE: '',
        con_MEMO: '',
        note: '',
        ID: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  startEdit(CON_TEL: string, PHONE: string, CON_TARGET: string, CUST_TYPE: string, CON_MEMO: string, NOTE: string, ID: string) {
    const dialogRef = this.dialog.open(F01002scn8editComponent, {
      minHeight: '100vh',
      width: '50%',
      data: {
        con_TEL: CON_TEL,
        phone: PHONE,
        con_TARGET: CON_TARGET,
        cust_TYPE: CUST_TYPE,
        con_MEMO: CON_MEMO,
        note: NOTE,
        ID: ID
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

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

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  test(): void {

  }

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

  getSelectView(key: string, value: string): string {
    var result = "";
    switch (key) {
      case "CON_TEL": {
        for (const data of this.rspBodyData.conTel) {
          if (data.codeNo == value) {
            result = data.codeDesc;
          }
        }
        break;
      }
      case "CON_TARGET": {
        for (const data of this.rspBodyData.conTarget) {
          if (data.codeNo == value) {
            result = data.codeDesc;
          }
        }
        break;
      }
      default: {
        for (const data of this.rspBodyData.conMemo) {
          if (data.codeNo == value) {
            result = data.codeDesc;
          }
        }
        break;
      }
    }
    //console.log(this.result);
    return result;
  }

  ShowspeakingContenta(speakingContent: string): void {
    const DialogRef = this.dialog.open(F01002scn8confirmComponent, { data: { msgStr: speakingContent } });
    // alert(speakingContent);
  }
}
