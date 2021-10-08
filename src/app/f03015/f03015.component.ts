import { HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookType } from 'xlsx/types';
import { F03015Service } from '../f03015/f03015.service';
import { F03015confirmComponent } from './f03015confirm/f03015confirm.component';
import { F03015editComponent } from './f03015edit/f03015edit.component';
import { F03015uploadComponent } from './f03015upload/f03015upload.component';
import * as XLSX from 'xlsx';
import { Data } from '@angular/router';
// import { saveAs } from 'file-saver';
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03015',
  templateUrl: './f03015.component.html',
  styleUrls: ['./f03015.component.css', '../../assets/css/f03.css']
})
export class F03015Component implements OnInit {

  inducCode: sysCode[] = [];  //行職業代碼下拉
  inducLevel1: sysCode[] = [];  //行職業level1下拉
  inducLevel2: sysCode[] = [];  //行職業level2下拉
  jobCode: sysCode[] = []; //職業代碼下拉
  inducCodeValue: string;  //行職業代碼選擇
  inducLevel1Value: string;  //行職業level1選擇
  inducLevel2Value: string;  //行職業level2選擇
  jobCodeValue: string; //職業碼選擇
  isHidden: boolean;
  total = 1;
  loading = false;
  pageSize = 10;
  pageIndex = 1;

  myDate: any = new Date();
  constructor(public dialogRef: MatDialogRef<F03015confirmComponent>, private f03015Service: F03015Service, public dialog: MatDialog, private fb: FormBuilder, private datePipe: DatePipe, @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd-HH:mm:SS');

  }
  proxyIncomeForm: FormGroup = this.fb.group({
    INDUC_CODE: [this.data.inducCodeValue, [Validators.maxLength(30)]],
    INDUC_LEVEL1: [this.data.inducLevel1Value, [Validators.maxLength(30)]],
    INDUC_LEVEL2: [this.data.inducLevel2Value, [Validators.maxLength(10), Validators.minLength(10)]],
    JOB_CODE: [this.data.jobCodeValue, [Validators.maxLength(10), Validators.minLength(10)]],
    pageIndex: ['', [Validators.maxLength(3)]],
    pageSize: ['', [Validators.maxLength(3)]]
  });

  formControl = new FormControl('', [
    Validators.required
  ]);
  ngOnInit(): void {
    this.isHidden = false;
    this.f03015Service.getSysTypeCode('INDUC_CODE').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.inducCode.push({ value: codeNo, viewValue: desc })
      }
    });
    this.f03015Service.getSysTypeCode('INDUC_LEVEL1').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.inducLevel1.push({ value: codeNo, viewValue: desc })
      }
    });
    this.f03015Service.getSysTypeCode('INDUC_LEVEL2').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.inducLevel2.push({ value: codeNo, viewValue: desc })
      }
    });
    this.f03015Service.getSysTypeCode('JOB_CODE').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.jobCode.push({ value: codeNo, viewValue: desc })
      }
    });
  }
  //============================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  proxyIncomeDataSource: Data[] = [];
  ngAfterViewInit() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };
  }
  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
  }

  // doSearch() { this.isHidden = false; }

  async getProxyIncomeData() {
    if ((this.inducCodeValue == undefined && this.inducLevel1Value == undefined && this.inducLevel2Value == undefined && this.jobCodeValue == undefined) ||
      (this.inducCodeValue == '' && this.inducLevel1Value == '' && this.inducLevel2Value == '' && this.jobCodeValue == '')) {
      const cconfirmDialogRef = this.dialog.open(F03015confirmComponent, {
        data: { msgStr: "請點選查詢並至少選擇一項查詢條件" }
      });
    } else {

      let jsonObject: any = {};

      jsonObject['page'] = this.currentPage.pageIndex + 1;
      jsonObject['per_page'] = this.currentPage.pageSize;
      jsonObject['inducCode'] = this.inducCodeValue;
      jsonObject['inducLevel1'] = this.inducLevel1Value;
      jsonObject['inducLevel2'] = this.inducLevel2Value;
      jsonObject['jobCode'] = this.jobCodeValue;
      await this.f03015Service.getReturn('f03/f03015', jsonObject).subscribe(data => {
        this.totalCount = data.rspBody.size;
        this.proxyIncomeDataSource = data.rspBody.items;
      });
    }
  }

  //新增
  insert(isInsert: boolean) {
    const dialogRef = this.dialog.open(F03015editComponent, {
      data: {
        isInsert: isInsert,
        isUpdate: false

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  //編輯
  update(isUpdate: boolean, row: any) {
    const dialogRef = this.dialog.open(F03015editComponent, {
      data: {
        isUpdate: isUpdate,
        isInsert: false,
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.getProxyIncomeData(); }
    });
  }

  //清除資料
  clear() {
    this.inducCodeValue = '';
    this.inducLevel1Value = '';
    this.inducLevel2Value = '';
    this.jobCodeValue = '';

    this.proxyIncomeDataSource = null;

  }

  //上傳EXCEL
  uploadExcel() {
    const dialogRef = this.dialog.open(F03015uploadComponent, {
      data: {
        ABNORMAL_NID: '',
        ABNORMAL_NAME: '',
        ON_CHECK: 'Y',
        TRANSFER_EMPNO: '',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  //匯出EXCEL
  exportExcel() {
    if ((this.inducCodeValue == undefined && this.inducLevel1Value == undefined && this.inducLevel2Value == undefined && this.jobCodeValue == undefined) ||
      (this.inducCodeValue == '' && this.inducLevel1Value == '' && this.inducLevel2Value == '' && this.jobCodeValue == '')) {
      const cconfirmDialogRef = this.dialog.open(F03015confirmComponent, {
        data: { msgStr: "請點選查詢並至少選擇一項查詢條件" }
      });
    } else {
      let jsonObject: any = {};
      let formData = new FormData();
      let blob: Blob;
      formData.append('inducCode', this.inducCodeValue != null ? this.inducCodeValue : '');
      jsonObject['page'] = this.currentPage.pageIndex + 1;
      jsonObject['per_page'] = this.currentPage.pageSize;
      jsonObject['inducCode'] = this.inducCodeValue;
      jsonObject['inducLevel1'] = this.inducLevel1Value;
      jsonObject['inducLevel2'] = this.inducLevel2Value;
      jsonObject['jobCode'] = this.jobCodeValue;

      this.f03015Service.downloadExcel('f03/f03015action5', jsonObject).subscribe(data => {
        blob = new Blob([data], { type: 'application/xlsx' });
        let downloadURL = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = "ProxyIncome_" + this.myDate + ".xlsx"; //瀏覽器下載時的檔案名稱
        link.click();

      });
    }
  }

  //刪除
  async delete(rowId: string) {
    let jsonObject: any = {};
    jsonObject['rowID'] = rowId;

    await this.f03015Service.getReturn('f03/f03015action2', jsonObject).subscribe(data => {
      const deleteDialogRef = this.dialog.open(F03015confirmComponent, {
        data: { msgStr: data.rspMsg }
      });
      if (data.rspCode == '0000') {
        deleteDialogRef.afterClosed().subscribe(result => {
          this.getProxyIncomeData();
        });
      }
    });

  }
}
