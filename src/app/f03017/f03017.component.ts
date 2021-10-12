import { Component,Inject, OnInit, ViewChild } from '@angular/core';
import { F03017Service } from '../f03017/f03017.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F03017editComponent } from './f03017edit/f03017edit.component';
import { F03017uploadComponent } from './f03017upload/f03017upload.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
interface sysCode {
  value: string
  viewValue: string
}

@Component({
  selector: 'app-f03017',
  templateUrl: './f03017.component.html',
  styleUrls: ['./f03017.component.css']
})
export class F03017Component implements OnInit {

  bkColumnCode: sysCode[] = [];;  //建檔項目欄位下拉
  bkColumnValue: string;  //建檔項目欄位
  bkContentValue: string;  //建檔項目欄位值內容下拉
  isHidden: boolean;
  myDate: any = new Date();
  loading = true;
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  constructor(
    private f03017Service: F03017Service,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog, private datePipe: DatePipe,)
    {
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd-HH:mm:SS');
   }

   bkIncomeForm: FormGroup = this.fb.group({
    bkColumn: [this.data.bkColumnValue, [Validators.maxLength(30)]],
    bk_Content: [this.data.bkContentValue, [Validators.maxLength(30)]],
    page: ['', [Validators.maxLength(3)]],
    per_page: ['', [Validators.maxLength(3)]]
  });

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit(): void {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.isHidden = false;
    // 取得下拉選單資料
    this.f03017Service.getSysTypeCode('BLACK_ITEM').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.bkColumnCode.push({ value: codeNo, viewValue: desc })
      }
    });
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  bkIncomeDataSource = new MatTableDataSource<any>();

  ngAfterViewInit() {



    this.currentSort = {
      active: '',
      direction: ''
    };
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
    });

  }
  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
  }

  async getBkIncomeData() {
    if (typeof this.bkColumnValue == 'undefined'){return alert('請選擇建檔項目')}

      let jsonObject: any = {};
      jsonObject['page'] = this.currentPage.pageIndex + 1;
      jsonObject['per_page'] = this.currentPage.pageSize;
      jsonObject['bkColumn'] = this.bkColumnValue;
      jsonObject['bkContent'] = this.bkContentValue;


      await this.f03017Service.getReturn('f03/f03017', jsonObject).subscribe(data => {
        // this.total = data.rspBody.size;
        this.bkIncomeDataSource = data.rspBody.items;
      });
this.loading = false;
  }

  // onQueryParamsChange(params: NzTableQueryParams): void {
  //   const { pageSize, pageIndex } = params;
  //   this.pageSize=pageSize;
  //   this.pageIndex=pageIndex;
  //   this.getBkIncomeData(pageIndex, pageSize);

  // }
  //新增
  insert(isInsert: boolean) {
    const dialogRef = this.dialog.open(F03017editComponent, {
      minHeight: '70vh',
      width: '50%',
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
  update(isUpdate: boolean, data: any) {
    console.log(data)
    const dialogRef = this.dialog.open(F03017editComponent, {
      data: {
        isUpdate: isUpdate,
        isInsert: false,
        reportReason1Value:data.reportReason1,
        reportReason2Value:data.reportReason2,
        reportReason3Value:data.reportReason3,
        USE_FLAG:data.useFlag,
        REPORT_CONTENT: data.reportContent,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }
  //清除資料
  clear() {
    this.bkColumnValue = '';
    this.bkContentValue = '';
    this.bkIncomeDataSource = new MatTableDataSource;

  }

  //上傳EXCEL
  uploadExcel() {
    const dialogRef = this.dialog.open(F03017uploadComponent, {
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

  //從客戶資訊查詢客戶手機
  getBkInfo(bkColumn:string, bkContent:string) {
    let jsonObject:any={}
    jsonObject['page']=this.currentPage.pageIndex+1;
    jsonObject['per_page']=this.currentPage.pageSize;
    jsonObject['bkColumn']=bkColumn;
    jsonObject['bkContent']=bkContent;
    this.f03017Service.getImpertmentParameter(jsonObject).subscribe(data => {

      // this.clear();
    });
  }
}
