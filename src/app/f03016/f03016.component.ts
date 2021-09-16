


import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { F03016Service } from './f03016.service';;
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03016',
  templateUrl: './f03016.component.html',
  styleUrls: ['./f03016.component.css']
})
export class F03016Component implements OnInit {

  selectedValue: string;
  totalCount: any;
  compareTableCode: sysCode[] = [];
  DssJcicSet: number;
  BasicLimit: number;
  IsJcic: string = '';
  TableName: string = '';
  columnName: string = '';
  originalValue: number = 0;
  currentValue: number = 0;
  transEmpNo: string = localStorage.getItem("empNo");;
  transDate: string;
  ChangeSource: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  customerInfoForm: FormGroup = this.fb.group({
    DSS_JCIC_SET: ['', []],
    BASIC_LIMIT: ['', []],
    IS_JCIC: ['', []],

    TABLE_NAME: ['', []],
    COLUMN_NAME: ['', []],
    ORIGINAL_VALUE: ['', []],
    CURRENT_VALUE: ['', []],
    TRANS_DATE: ['', []],
    TRANS_EMP_NO: ['', []],

  });


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<F03016Service>, private f03016Service: F03016Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }
  //取得資料
  getImpertmentParameterInfo() {
    // const formdata: FormData = new FormData();
    const baseUrl = 'f03/f03016';
    this.f03016Service.getImpertmentParameter(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize).subscribe(data => {
      this.DssJcicSet = data.rspBody.ipList[0].dssJcicSet;
      this.BasicLimit = data.rspBody.ipList[0].basicLimit;
      this.IsJcic = data.rspBody.ipList[0].isJcic;
      this.ChangeSource = data.rspBody.tlList

      this.columnName = data.rspBody.tlList[0].columnName;
      this.originalValue = data.rspBody.tlList[0].originalValue;
      this.currentValue = data.rspBody.tlList[0].currentValue;
      this.transEmpNo = data.rspBody.tlList[0].transEmpNo;
      this.transDate = data.rspBody.tlList[0].transDate;

    });
  }
// 儲存資料
  public async save(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['DssJcicSet'] = this.DssJcicSet;
    jsonObject['BasicLimit'] = this.BasicLimit;
    jsonObject['IsJcic'] = this.IsJcic;
    jsonObject['TransEmpNo'] = this.transEmpNo;
    let msgStr: string = "";
    let baseUrl = 'f03/f03016action1';

    msgStr = await this.f03016Service.update(baseUrl, jsonObject);
    if(msgStr=='success'){
      msgStr='儲存成功！'
      this.dialog.open(ConfirmComponent,{
        data:{msgStr:msgStr}
      });
      // this.dialogRef.close({event:'success'});
      this.getImpertmentParameterInfo();
    }
    // const childernDialogRef = this.dialog.open(ConfirmComponent, {
    //   data: { msgStr: msgStr }
    // });
    // if (msgStr === '儲存成功！') { this.dialogRef.close({ event: 'success' }); }

  }

  ngAfterViewInit(): void {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.getImpertmentParameterInfo();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;

    });
  }
}
