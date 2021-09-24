
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


interface sysCode {
  value: string;
  viewValue: string;
}

//Jay 客戶身份名單註記

@Component({
  selector: 'app-f03014',
  templateUrl: './f03014.component.html',
  styleUrls: ['./f03014.component.css']
})
export class F03014Component implements OnInit {
  usingType: sysCode[] = [];
  usingValue: string;
  NameValue: string;//客戶名字
  IdentityValue: string;//身分字號
  NarrateValue: string;//簡述
  Efficient: string;//生效
  Invalidation: string;//失效
  daytest: string;//三個月後的日期
  i = 0;
  myDate:any = new Date();
  ruleParamCondition = new MatTableDataSource<any>();
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  constructor(private pipe: DatePipe, private f03014Service: F03014Service, public dialog: MatDialog,
   ) {   this.myDate  = this.pipe.transform(new Date(), 'yyyy-MM-dd-HH:mm:SS');
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
    this.i = 1;
    const url = 'f03/f03014action01';
    var formData = new FormData();
    formData.append('custNid', this.IdentityValue != null ? this.IdentityValue : '');
    formData.append('custName', this.NameValue != null ? this.NameValue : '');
    formData.append('content1', this.NarrateValue != null ? this.NarrateValue : '');
    formData.append('effectiveDate', this.Efficient != null ? this.Efficient : '');
    formData.append('expirationDate', this.Invalidation != null ? this.Invalidation : '');
    formData.append('useFlag', this.usingValue != null ? this.usingValue : '');
    this.f03014Service.selectCustomer(url, formData).subscribe(data => {
      this.ruleParamCondition.data = data.rspBody;
      console.log(data.rspBody)


    }
    )

  }
  InvalidationMax()//抓3個月間隔
  {
    var a = new Date(this.Efficient);
    var k = 90 * 24 * 60 * 60 * 1000;
    var j = a.setDate(a.getDate());
    this.daytest = this.pipe.transform(new Date(j + k), 'yyyy-MM-dd')//三個月後的失效日期
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

    // var formData = new FormData();
    // formData.append('custNid', this.IdentityValue != null ? this.IdentityValue : '');
    // formData.append('custName', this.NameValue != null ? this.NameValue : '');
    // formData.append('content1', this.NarrateValue != null ? this.NarrateValue : '');
    // formData.append('effectiveDate', this.Efficient != null ? this.Efficient : '');
    // formData.append('expirationDate', this.Invalidation != null ? this.Invalidation : '');
    // formData.append('useFlag', this.usingValue != null ? this.usingValue : '');
    // this.f03014Service.selectCustomer(url, formData,).subscribe(data => {
    // //   this.downloadFile(data.rspBody)
    //   console.log(data)
    //   //設定欄位寬度
    //   const options = {'!cols':[
    //     {wpx:100},
    //     {wpx:100},
    //     {wpx:100},
    //     {wpx:100},
    //     {wpx:100},
    //     {wpx:250},
    //     {wpx:250},
    //     {wpx:100},
    //     {wpx:250},
    //   ]};
    //   //資料塞入順序
    //   const header = ["客戶身分證字號","客戶姓名","簡述1","簡述2","備註資訊","生效日","失效日","使用中","更新日期"]

    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data.rspBody,{header:header});//創建Excel 塞入資料和順序型態
    //   ws['!cols'] = options['!cols'];//定義欄位寬度

    //   const wb: XLSX.WorkBook = XLSX.utils.book_new();

    //   XLSX.utils.book_append_sheet(wb, ws, '客戶');

    //   XLSX.writeFile(wb, '客戶身分名單註記.xlsx');//檔案名稱
    // }
    // )

  }

  Clear()//清空查詢資料
  {
      this.usingValue="";//使用中
      this.NameValue="";//客戶名字
      this.IdentityValue="";//身分字號
      this.NarrateValue="";//簡述
      this.Efficient="";//生效
      this.Invalidation="";//失效
  }

}
