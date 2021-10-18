import { element } from 'protractor';
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
  styleUrls: ['./f03017.component.css', '../../assets/css/f03.css']
})
export class F03017Component implements OnInit {
Id:number[]=[];
  bkColumnCode: sysCode[] = [];;  //建檔項目欄位下拉
  bkColumnValue: string;  //建檔項目欄位
  bkContentValue: string;  //建檔項目欄位值內容下拉
  chkArray: string[] = [];//勾選欄
  contentArray: string[] = [];//勾選欄內容
  isHidden: boolean;
  myDate: any = new Date();
  loading = true;
  total = 1;
  pageSize = 10;
  pageIndex = 1;

  constructor(
    private f03017Service: F03017Service,
    private fb: FormBuilder,
     @Inject(MAT_DIALOG_DATA)
     public data: any,
     public dialog: MatDialog,
      private datePipe: DatePipe,)
    {
    this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd-HH:mm:SS');
   }

   bkIncomeForm: FormGroup = this.fb.group({
     Id:[this.data.Id, [Validators.maxLength(30)]],
    bkColumn: [this.data.bkColumnValue, [Validators.maxLength(30)]],
    bk_Content: [this.data.bkContentValue, [Validators.maxLength(30)]],
    CU_CNAME: [this.data.CU_CNAME, []],
    NATIONAL_ID: [this.data.NATIONAL_ID, []],
    CU_H_TEL: [this.data.CU_H_TEL, []],
    CU_CP_TEL: [this.data.CU_CP_TEL, []],
    CU_M_TEL: [this.data.CU_M_TEL, []],
    page: ['', [Validators.maxLength(3)]],
    per_page: ['', [Validators.maxLength(3)]]
  });

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit(): void {
console.log(this.bkIncomeForm)
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.isHidden = false;

    // 取得下拉選單資料
    this.f03017Service.getSysTypeCode('BLACK_ITEM').subscribe(data => {
      console.log(data)
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
console.log(this.bkColumnCode)


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

  // 欄位標題文字轉換
  chageColumntext(codeVal: string): string {
    for (const data of this.bkColumnCode) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }

  // 取得資料
  async getBkIncomeData() {
    if (typeof this.bkColumnValue == 'undefined'){return alert('請選擇建檔項目')}
    else if(typeof this.bkContentValue == 'undefined'){return alert('請選擇建檔內容')}
      let jsonObject: any = {};
      jsonObject['page'] = this.currentPage.pageIndex + 1;
      jsonObject['per_page'] = this.currentPage.pageSize;
      jsonObject['bkColumn'] = this.bkColumnValue;
      jsonObject['bkContent'] = this.bkContentValue;
      await this.f03017Service.getReturn('f03/f03017', jsonObject).subscribe(data => {
        this.total = data.rspBody.size;
        console.log(data)
        this.bkIncomeDataSource = data.rspBody.items;
        console.log(this.bkIncomeDataSource)
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
    console.log(isInsert)
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  //編輯
  update(isUpdate: boolean, data: any,row:any ) {
    console.log(data)
    this.chkArray.forEach((element)=>{
      if(element==="CU_CNAME"){this.contentArray.push(this.bkIncomeForm.value.CU_CNAME);}
      if(element==="NATIONAL_ID"){this.contentArray.push(this.bkIncomeForm.value.NATIONAL_ID);}
      if(element==="CU_H_TEL"){this.contentArray.push(this.bkIncomeForm.value.CU_H_TEL);}
      if(element==="CU_CP_TEL"){this.contentArray.push(this.bkIncomeForm.value.CU_CP_TEL);}
      if(element==="CU_M_TEL"){this.contentArray.push(this.bkIncomeForm.value.CU_M_TEL);}
    });

    const dialogRef = this.dialog.open(F03017editComponent, {
      data: {
        // BK_COLUMN:chkArray,
        // BK_CONTENT :contentArray,
        isUpdate: isUpdate,
        isInsert: false,
        row:row,
        reportReason1Value:data.reportReason1,
        reportReason2Value:data.reportReason2,
        reportReason3Value:data.reportReason3,
        USE_FLAG:data.useFlag,
        REPORT_CONTENT: data.reportContent,
        BK_CONTENT:data.bkContent,
        BK_COLUMN:data.bkColumn,

      // CU_CNAME:data.bkContent,
      //   NATIONAL_ID:data.bkContent,
      //   CU_H_TEL:data.bkContent,
      //   CU_CP_TEL:data.bkContent,
      //   CU_M_TEL:data.bkContent,
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
