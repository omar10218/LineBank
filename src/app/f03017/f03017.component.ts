import { Component,Inject, OnInit, ViewChild } from '@angular/core';
import { F03017Service } from '../f03017/f03017.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F03017editComponent } from './f03017edit/f03017edit.component';
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

  bkColumn: sysCode[] = [];;  //建檔項目欄位下拉
  bkContent: sysCode[] = [];;  //建檔項目欄位值內容下拉
  bkColumnValue: string;  //建檔項目欄位
  bkContentValue: string;  //建檔項目欄位值內容下拉
  isHidden: boolean;
  myDate: any = new Date();

  constructor(private f03017Service: F03017Service,private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog, private datePipe: DatePipe,) {
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
    this.isHidden = false;
    this.f03017Service.getSysTypeCode('BK_COLUMN').subscribe(data => {
      console.log(data)
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['bk_Column'];
        this.bkColumn.push({ value: codeNo, viewValue: desc })
      }
      console.log(this.bkColumn)
    });
    this.f03017Service.getSysTypeCode('BK_CONTENT').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['bk_Content'];
        this.bkContent.push({ value: codeNo, viewValue: desc })
      }
    });

  }
  // ngOnInit(): void {
  //   const baseUrl = 'f03/f03017';
  //   this.f03017Service.getImpertmentParameter(baseUrl, this.currentPage.page, this.currentPage.per_page).subscribe(data => {
  //     console.log(data)

  //     // this.clear();
  //   });

  // }
  //============================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  bkIncomeDataSource = new MatTableDataSource<any>();

  ngAfterViewInit() {
    console.log(this.bkColumn)
    console.log(this.bkContent)
    console.log(this.bkIncomeForm)
    console.log(this.data.bkColumnValue)
    console.log(this.currentPage)
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
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
    if ((this.bkColumnValue == undefined && this.bkContentValue == undefined ) ||
      (this.bkColumnValue == '' && this.bkContentValue == '' )) {
        alert('請選擇一項條件')
      // const cconfirmDialogRef = this.dialog.open(F03015confirmComponent, {
      //   data: { msgStr: "請點選查詢並至少選擇一項查詢條件" }
      // });
    } else {

      let jsonObject: any = {};

      jsonObject['page'] = this.currentPage.pageIndex + 1;
      jsonObject['per_page'] = this.currentPage.pageSize;
      jsonObject['bkColumn'] = this.bkColumnValue;
      jsonObject['bkContent'] = this.bkColumnValue;


      await this.f03017Service.getReturn('f03/f03017', jsonObject).subscribe(data => {
        console.log(data)
        this.totalCount = data.rspBody.size;
        this.bkIncomeDataSource = data.rspBody.items;
        console.log(this.bkIncomeDataSource)
      });
    }
  }
  //新增
  insert(isInsert: boolean) {
    console.log(isInsert)
    const dialogRef = this.dialog.open(F03017editComponent, {
      data: {
        isInsert: isInsert,
        isUpdate: false

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
