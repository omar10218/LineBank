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
// import { saveAs } from 'file-saver';
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03015',
  templateUrl: './f03015.component.html',
  styleUrls: ['./f03015.component.css']
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

  myDate:any = new Date();
  constructor(public dialogRef: MatDialogRef<F03015confirmComponent>, private f03015Service: F03015Service, public dialog: MatDialog, private fb: FormBuilder, private datePipe: DatePipe, @Inject(MAT_DIALOG_DATA) public data: any,) {
     this.myDate  = this.datePipe.transform(new Date(), 'yyyy-MM-dd-HH:mm:SS');

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
    this.isHidden = true;
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
  proxyIncomeDataSource = new MatTableDataSource<any>();
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
    // this.paginator.page.subscribe((page: PageEvent) => {
    //   this.currentPage = page;
    //   this.getAdrCode(null, null);
    // });
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
  }

  // inducCodeSelect() {
  //   this.inducCode = [];
  //   // this.inducCode = [];
  //   this.inducCodeValue = "";
  //   // this.inducCodedValue = "";

  //   this.currentPage = {
  //     pageIndex: 0,
  //     pageSize: 10,
  //     length: null
  //   };
  //   this.paginator.firstPage();
  //   // this.getAdrCode("Z01", "1");
  // }

  // inducLevel1Select() {
  //   this.inducLevel1 = [];
  //   this.inducLevel1Value = "";
  //   this.currentPage = {
  //     pageIndex: 0,
  //     pageSize: 10,
  //     length: null
  //   };
  //   this.paginator.firstPage();
  //   // this.getAdrCode(this.selectedSecondValue, "2");
  // }

  // inducLevel2Select() {
  //   this.currentPage = {
  //     pageIndex: 0,
  //     pageSize: 10,
  //     length: null
  //   };
  //   this.paginator.firstPage();
  // }

  // jobCodeSelect() {
  //   this.currentPage = {
  //     pageIndex: 0,
  //     pageSize: 10,
  //     length: null
  //   };
  //   this.paginator.firstPage();
  // }

  doSearch() { this.isHidden = false; }

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
        console.log(data)
        this.proxyIncomeDataSource = data.rspBody.items;
      });
    }
  }

  insert(isInsert: boolean) {
    console.log(isInsert)
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

  update(isUpdate: boolean, row: any) {
    const dialogRef = this.dialog.open(F03015editComponent, {
      data: {
        isUpdate: isUpdate,
        isInsert: false,
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  clear() {
    this.inducCodeValue = '';
    this.inducLevel1Value = '';
    this.inducLevel2Value = '';
    this.jobCodeValue = '';

    this.paginator._changePageSize(this.paginator.pageSize);
    this.paginator.firstPage();
  }

  uploadExcel() {

  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  // downloadFile(filename: string): void {
  //   this.f03015Service
  //     .download('f03/f03015action5',filename)
  //     .subscribe(blob => saveAs(blob, filename));
  // }

  exportExcel() {
    if ((this.inducCodeValue == undefined && this.inducLevel1Value == undefined && this.inducLevel2Value == undefined && this.jobCodeValue == undefined) ||
      (this.inducCodeValue == '' && this.inducLevel1Value == '' && this.inducLevel2Value == '' && this.jobCodeValue == '')) {
      const cconfirmDialogRef = this.dialog.open(F03015confirmComponent, {
        data: { msgStr: "請點選查詢並至少選擇一項查詢條件" }
      });
    } else {
      let jsonObject: any = {};
      let formData = new FormData();
      let blob:Blob;
      formData.append('inducCode', this.inducCodeValue != null ? this.inducCodeValue : '');
      jsonObject['page'] = this.currentPage.pageIndex + 1;
      jsonObject['per_page'] = this.currentPage.pageSize;
      jsonObject['inducCode'] = this.inducCodeValue;
      jsonObject['inducLevel1'] = this.inducLevel1Value;
      jsonObject['inducLevel2'] = this.inducLevel2Value;
      jsonObject['jobCode'] = this.jobCodeValue;


      let opton =  { responseType: 'blob' as 'json' };
      this.f03015Service.downloadExcel('f03/f03015action5', jsonObject).subscribe(data => {
        blob = new Blob([data], { type: 'application/xlsx' });
        let downloadURL = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = "ProxyIncome_" +  this.myDate  + ".xlsx"; //瀏覽器下載時的檔案名稱
        link.click();
        // const blob = new Blob([data], { type: 'application/octet-stream' });
        // const url= window.URL.createObjectURL(blob);
        // window.open(url);


      //   const deleteDialogRef = this.dialog.open(F03015confirmComponent, {
      //     data: { msgStr: data.rspMsg }
      //   });
      //   if (data.rspCode == '0000') {
      //     deleteDialogRef.afterClosed().subscribe(result => {
      //       this.getProxyIncomeData();
      //     });
      //   }
      });
    }
  }

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
