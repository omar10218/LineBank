


import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { F03016Service } from './f03016.service';;
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

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
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  selectedValue: string;
  compareTableCode: sysCode[] = [];
  DssJcicSet: number;
  DssMailDay: number;
  BasicLimit: number;
  CssPassStart: Date;
  CssPassEnd: Date;
  IsJcic: string = '';
  TableName: string = '';
  columnName: string = '';
  originalValue: string;
  currentValue: string;
  transEmpNo: string = localStorage.getItem("empNo");;
  transDate: string;
  ChangeSource: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  currentPage: PageEvent;



  constructor(public dialogRef: MatDialogRef<F03016Service>, private f03016Service: F03016Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private pipe: DatePipe) { }

  ngOnInit(): void {
    this.getImpertmentParameterInfo(this.pageIndex, this.pageSize);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params)
    const { pageSize, pageIndex } = params;
    this.getImpertmentParameterInfo(pageIndex, pageSize);
  }
  //取得資料
  getImpertmentParameterInfo(pageIndex: number, pageSize: number) {
    const baseUrl = 'f03/f03016';
    let jsonObject: any = {};
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.f03016Service.getImpertmentParameter(baseUrl, jsonObject).subscribe(data => {
      console.log(data)
      this.DssJcicSet = data.rspBody.ipList[0].dssJcicSet;
      this.DssMailDay = data.rspBody.ipList[0].dssMailDay;
      this.BasicLimit = data.rspBody.ipList[0].basicLimit;
      this.IsJcic = data.rspBody.ipList[0].isJcic;
      this.CssPassStart = data.rspBody.ipList[0].cssPassStart;
      this.CssPassEnd = data.rspBody.ipList[0].cssPassEnd;
      this.ChangeSource = data.rspBody.tlList;
      this.columnName = data.rspBody.tlList[0].columnName;
      this.originalValue = data.rspBody.tlList[0].originalValue;
      this.currentValue = data.rspBody.tlList[0].currentValue;
      this.transEmpNo = data.rspBody.tlList[0].transEmpNo;
      this.transDate = data.rspBody.tlList[0].transDate;
      this.total = data.rspBody.size;
      // this.clear();
    });
  }

  // 儲存資料
  public async save(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['dssJcicSet'] = this.DssJcicSet;
    jsonObject['dssMailDay'] = this.DssMailDay;
    jsonObject['basicLimit'] = this.BasicLimit;
    console.log(this.CssPassStart);
    console.log(this.CssPassEnd);
    if (this.CssPassStart != null && this.CssPassEnd != null && this.CssPassStart < this.CssPassEnd) {
      jsonObject['cssPassStart'] = this.pipe.transform(new Date(this.CssPassStart), 'yyyy-MM-dd');
      jsonObject['cssPassEnd'] = this.pipe.transform(new Date(this.CssPassEnd), 'yyyy-MM-dd');
    }
    else {
      return alert('請輸入正確時間')
    }
    jsonObject['isJcic'] = this.IsJcic;
    jsonObject['transEmpNo'] = this.transEmpNo;
    let msgStr: string = "";
    let baseUrl = 'f03/f03016action1';

    msgStr = await this.f03016Service.update(baseUrl, jsonObject);
    console.log(baseUrl);
    if (msgStr == 'success') {
      msgStr = '儲存成功！'
      this.dialog.open(ConfirmComponent, {
        data: { msgStr: msgStr }
      });
      this.changePage();
      this.getImpertmentParameterInfo(this.pageIndex, this.pageSize);

    }

  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  changePage() {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.total = 1;
  }
}
