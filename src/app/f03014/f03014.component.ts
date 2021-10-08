import { Data } from '@angular/router';

import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { F03014Service } from './f03014.service';
import { F03014addComponent } from './f03014add/f03014add.component'
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { F03014editComponent } from './f03014edit/f03014edit.component'
import { F03014uploadComponent } from './f03014upload/f03014upload.component'
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n';
//Jay 客戶身份名單註記
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03014',
  templateUrl: './f03014.component.html',
  styleUrls: ['./f03014.component.css','../../assets/css/f03.css']
})
export class F03014Component implements OnInit {
  usingType: sysCode[] = [];
  usingValue: string;
  NameValue: string;//客戶名字
  IdentityValue: string;//身分字號
  NarrateValue: string;//簡述
  Efficient: [Date,Date];//生效
  Invalidation: [Date,Date];//失效
  daytest: string;//三個月後的日期
  date: [Date, Date];
  dateFormat = 'yyyy/MM/dd';


  i = 0;
  myDate:any = new Date();
  total = 1;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  ruleParamCondition = new MatTableDataSource<any>();
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  constructor(private pipe: DatePipe,
     private f03014Service: F03014Service,
      public dialog: MatDialog,
      private nzI18nService: NzI18nService,
   ) {   this.nzI18nService.setLocale(zh_TW),
    this.myDate  = this.pipe.transform(new Date(), 'yyyy-MM-dd-HH:mm:SS');
  }
  ngOnInit(): void //最開始處理的地方
  {
    this.usingType.push({ value: '1', viewValue: 'Y' });
    this.usingType.push({ value: '2', viewValue: 'N' });
  }
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
  variable() {
    this.i = 0;
  }
  Inquire()//查詢
  {
    let jsonObject: any = {};
    this.i = 1;
    const url = 'f03/f03014action01';
    jsonObject['custNid'] = this.IdentityValue != null ? this.IdentityValue : '';
    jsonObject['custName'] = this.NameValue != null ? this.NameValue : '';
    jsonObject['content1'] = this.NarrateValue != null ? this.NarrateValue : '';

    if(this.Efficient != null)
    {
      jsonObject['effectiveDate_start'] = this.pipe.transform (new Date(this.Efficient[0]).toString() , 'yyyy-MM-dd');
      jsonObject['effectiveDate_end'] =  this.pipe.transform (new Date(this.Efficient[1]).toString() , 'yyyy-MM-dd');
    }
    else
    {
      jsonObject['effectiveDate_start'] ='';
      jsonObject['effectiveDate_end'] = '';
    }

    if(this.Invalidation != null)
    {
      jsonObject['expirationDate_start'] =this.pipe.transform (new Date(this.Invalidation[0]).toString() , 'yyyy-MM-dd');
      jsonObject['expirationDate_end'] =  this.pipe.transform (new Date(this.Invalidation[1]).toString() , 'yyyy-MM-dd');
    }
    else
    {
      jsonObject['expirationDate_start'] ='';
      jsonObject['expirationDate_end'] = '';
    }

    // jsonObject['expirationDate_start'] = this.Invalidation[0] != null ? this.Invalidation[0] : '';
    // jsonObject['expirationDate_end'] =  this.Invalidation[1] != null ? this.Invalidation[1] : '';

    jsonObject['useFlag'] = this.usingValue != null ? this.usingValue : '';


    this.f03014Service.selectCustomer(url, jsonObject).subscribe(data => {
      console.log(data)

      this.ruleParamCondition.data = data.rspBody;
      console.log(this.ruleParamCondition.data)


    }
    )

  }

  getOptionDesc(option: sysCode[], codeVal: string): string {
    for (const data of option) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
  AddTable()//新增
  {
    const dialogRef = this.dialog.open(F03014addComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  EditTable(i: number, parmArry: string[])//編輯
  {
    console.log(parmArry)
    const dialogRef = this.dialog.open(F03014editComponent, {
      data: {
        rid: parmArry[0],
        CUST_NAME: parmArry[1],
        CUST_NID: parmArry[2],
        CONTENT1: parmArry[3],
        CONTENT2: parmArry[4],
        REMARK: parmArry[5],
        EFFECTIVE_DATE: parmArry[6],
        EXPIRATION_DATE: parmArry[7],
        USE_FLAG: parmArry[8],
        CHANGE_DATE: parmArry[9],
        usingType: this.usingType
      }

    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openup() {
    const dialogRef = this.dialog.open(F03014uploadComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  execlExport()//匯出
  {
    const url = 'f03/f03014action06';
    let jsonObject: any = {};
    let blob:Blob;
    jsonObject['custNid'] = this.IdentityValue;
    jsonObject['custName'] = this.NameValue;
    jsonObject['content1'] = this.NarrateValue;
    jsonObject['effectiveDate'] = this.Efficient;
    jsonObject['expirationDate'] = this.Invalidation;
    jsonObject['useFlag'] = this.usingValue;
    let opton =  { responseType: 'blob' as 'json' };
    this.f03014Service.downloadExcel(url,jsonObject).subscribe(data=>{
      console.log(data)
      blob = new Blob([data], { type: ' application/xlsx' });
      let downloadURL = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = "客戶身分名單註記" +  this.myDate  + ".xlsx"; //瀏覽器下載時的檔案名稱
      link.click();

    })

  }

  Clear()//清空查詢資料
  {
      this.usingValue="";//使用中
      this.NameValue="";//客戶名字
      this.IdentityValue="";//身分字號
      this.NarrateValue="";//簡述
      this.Efficient=null;//生效
      this.Invalidation=null;//失效
      this.ruleParamCondition.data = null;
  }
  disabledDate(time)
  {
    let curDate = (new Date()).getTime();
    let three = 90*24*3600*1000;
    let threeMonths = curDate + three;
    return time.getTime()>threeMonths
  }
  disabledDate1(time)
  {
    let curDate = (new Date()).getTime();
    let three = 90*24*3600*1000;
    let threeMonths = curDate + three;
    return time.getTime()<Date.now()||time.getTime()>threeMonths
  }
}
