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
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
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
  usingValue: string = '';
  NameValue: string = '';//客戶名字
  IdentityValue: string = '';//身分字號
  NarrateValue: string = '';//簡述
  Efficient: [Date,Date] =null;//生效
  Invalidation: [Date,Date] = null;//失效
  // daytest: string;//三個月後的日期
  date: [Date, Date];
  dateFormat = 'yyyy/MM/dd';
  myDate:any = new Date();
  total = 1;
  loading = true;
  pageSize = 50;
  pageIndex = 1;
  ruleParamCondition : Data[] = [];
  i=1;
  condition=1;
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

  search()//查詢
  {

    if(this.Efficient != null)
    {
      var startDate, endDate;
      startDate = new Date(this.Efficient[0]);
      endDate = new Date(this.Efficient[1]);
      if(this.IdentityValue != null && this.IdentityValue !='')
      {
        if((endDate-startDate)/1000/60/60/24>365)
        {
          this.condition =0;
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "生效日查詢區間最多一年內!" }
          });
        }
      }
      else
      {
        if((endDate-startDate)/1000/60/60/24>90){
          this.condition =0;
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "生效日查詢區間最多三個月內!" }
          });
        }
        else
        {
          this.condition =1;
        }
      }

    }



    if(this.Invalidation != null)
    {
      var startDate, endDate;
      startDate = new Date(this.Invalidation[0]);
      endDate = new Date(this.Invalidation[1]);
      if(this.IdentityValue != null && this.IdentityValue !='')
      {
        if((endDate-startDate)/1000/60/60/24>365)
        {
          this.condition =0;
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "失效日查詢區間最多一年內!" }
          });
        }
      }
      else
      {
        if((endDate-startDate)/1000/60/60/24>90)
        {
          this.condition =0;
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "失效日查詢區間最多三個月內!" }
          });
        }
        else
        {
          this.condition =1;
        }
      }


    }



    if(this.condition > 0 )
    {
      if(this.NameValue ==''&& this.IdentityValue ==''&& this.NarrateValue =='' &&
      this.Efficient ==null && this.Invalidation == null && this.usingValue == '')
      {
        this.dialog.open(ConfirmComponent, {
          data: { msgStr: "請至少選擇一項條件" }
        });
      }
      else
      {
        this.changePage()
        this.Inquire(this.pageIndex,this.pageSize)
      }

    }

  }
  Inquire(pageIndex: number, pageSize: number)//查詢分頁
  {
    let jsonObject: any = {};
    const url = 'f03/f03014action01';
    jsonObject['custNid'] = this.IdentityValue != null ? this.IdentityValue : '';
    jsonObject['custName'] = this.NameValue != null ? this.NameValue : '';
    jsonObject['content1'] = this.NarrateValue != null ? this.NarrateValue : '';
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;


    if(this.Efficient != null)
    {
      jsonObject['effectiveDate_start'] = this.pipe.transform (new Date(this.Efficient[0]).toString() , 'yyyy-MM-dd');
      jsonObject['effectiveDate_end'] =  this.pipe.transform (new Date(this.Efficient[1]).toString() , 'yyyy-MM-dd');

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

      this.ruleParamCondition = data.rspBody.item;
      this.total = data.rspBody.size;

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
      if (result != null && (result.event == 'success')) {
        if(this.NameValue ==''&& this.IdentityValue ==''&& this.NarrateValue =='' &&
        this.Efficient ==null && this.Invalidation == null && this.usingValue == '')
        {

        }
        else
        {
          this.search();
        }
         }
    });
  }
  EditTable(i: number, parmArry: string[])//編輯
  {
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
      if (result != null && (result.event == 'success')) { this.search(); }

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
      blob = new Blob([data], { type: ' application/xlsx' });
      let downloadURL = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = "客戶身分名單註記" +  this.myDate  + ".xlsx"; //瀏覽器下載時的檔案名稱
      link.click();

    })

  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    if(this.i!=1)//判斷是不是第一次進入此頁面
    {
      const { pageSize, pageIndex } = params;
      this.Inquire(pageIndex, pageSize);
    }
  }
  changePage()
  {
		this.pageIndex = 1
		this.pageSize = 50
		this.total = 1
	}
  Clear()//清空查詢資料
  {
      this.usingValue="";//使用中
      this.NameValue="";//客戶名字
      this.IdentityValue="";//身分字號
      this.NarrateValue="";//簡述
      this.Efficient=null;//生效
      this.Invalidation=null;//失效
      this.ruleParamCondition = null;
  }
}
