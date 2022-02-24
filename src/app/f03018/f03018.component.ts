import { Component, OnInit, ViewChild } from '@angular/core';
import { OptionsCode } from '../interface/base';
import { F03018editComponent } from './f03018edit/f03018edit.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { F03018Service } from './f03018.service'
import { F03015confirmComponent } from './../f03015/f03015confirm/f03015confirm.component';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { F03018addComponent } from './f03018add/f03018add.component';
import { F03018uploadComponent } from './f03018upload/f03018upload.component';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Data } from '@angular/router';

interface sysCode {
 value:string
  viewValue: string
}
//Kim 千大企業名單維護
@Component({
  selector: 'app-f03018',
  templateUrl: './f03018.component.html',
  styleUrls: ['./f03018.component.css', '../../assets/css/f03.css']
})
export class F03018Component implements OnInit {

  constructor(
    private f03018Service: F03018Service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<F03015confirmComponent>,
    private datePipe: DatePipe,
    // this.myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd-HH:mm:SS');
  ) { }

  cuCpNo: string //公司統編
  cuCpName: string //公司名稱
  cuCpSname: string //公司簡稱
  cuCpType1Value: string='' //分類1
  cuCpType2Value: string='' //分類2
  cuCpType3Value: string //分類3
  useFlagValue: string='' //使用中
  empNo: string;  //上傳員編
  myDate: any = new Date();
  cuCpSource: Data[] = []; //千大企業Table

  cuCpType1Code: sysCode[] = [] //分類1
  cuCpType2Code: sysCode[] = [] //分類2
  cuCpType3Code: sysCode[] = [] //分類3
  useFlagCode: sysCode[] = [
    { value: '', viewValue: '請選擇' },
    { value: 'Y', viewValue: '是' },
    { value: 'N', viewValue: '否' },
  ] //使用中

  total = 1;
  pageSize = 50;
  pageIndex = 1;
  firstFlag = 1;

  ngOnInit(): void {
    this.empNo = localStorage.getItem("empNo");
    
    //分類1下拉選單

    this.getTypeselect()

    //分類2下拉選單
  }

  getTypeselect() {
    const url = "f03/f03018";
    let jsonObject: any = {}
    this.cuCpType1Code.push({value:'', viewValue: '請選擇' })
    this.cuCpType2Code.push({ value:'',viewValue: '請選擇' })
    this.f03018Service.getValueTypeselect(url, jsonObject).subscribe(data => {
      // console.log(this.cuCpType1Code)
      // console.log(data)
      // var new1 = data.rspBody.cuCpType1
      // console.log('new1=======================')
      // console.log(new1)
      // var new2 = new1.filter(i=>i!==null)
      // console.log(new2)
      for (const jsonObj of data.rspBody.cuCpType1) {

        if (jsonObj != null) {
          const desc = jsonObj.CU_CP_TYPE1;
          this.cuCpType1Code.push({ value:desc,viewValue: desc })
        }
        //  const desc = jsonObj.CU_CP_TYPE1;
        //       this.cuCpType1Code.push({ viewValue: desc})

      }
      for (const jsonObj of data.rspBody.cuCpType2) {
        if (jsonObj != null) {
          const desc = jsonObj.CU_CP_TYPE2;
          this.cuCpType2Code.push({ value:desc,viewValue: desc })
        }

      }
    });
  }
  //新增
  addNew() {
    const dialogRef = this.dialog.open(F03018addComponent, {
      panelClass: 'mat-dialog-transparent',
      minHeight: '70vh',
      width: '50%',
    })
  }

  //上傳EXCEL
  uploadExcel() {
    const dialogRef = this.dialog.open(F03018uploadComponent, {
      panelClass: 'mat-dialog-transparent',
      width: '50%',
      data: {
        ABNORMAL_NID: '',
        ABNORMAL_NAME: '',
        ON_CHECK: 'Y',
        TRANSFER_EMPNO: '',
      },
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.getElBigCompanyList(this.pageIndex, this.pageSize)
      }
    })
  }

  //取得資料表
  getElBigCompanyList(pageIndex: number, pageSize: number) {
    this.firstFlag = 2;
    if (this.cuCpNo == undefined && this.cuCpName == undefined && this.cuCpSname == undefined && this.cuCpType1Value == undefined && this.cuCpType2Value == undefined && this.useFlagValue == undefined

    ) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請選擇一項查詢項目" }
      });
    }
    else {
      const baseUrl = 'f03/f03018'
      let jsonObject: any = {}
      jsonObject['page'] = pageIndex;
      jsonObject['per_page'] = pageSize;
      jsonObject['cuCpNo'] = this.cuCpNo==''? null:this.cuCpNo ;
      jsonObject['cuCpName'] = this.cuCpName==''? null:this.cuCpName ;
      jsonObject['cuCpSname'] = this.cuCpSname==''? null:this.cuCpSname ;
      jsonObject['cuCpType1'] = this.cuCpType1Value==''? null:this.cuCpType1Value ;
      jsonObject['cuCpType2'] = this.cuCpType2Value ==''? null:this.cuCpType2Value ;
      jsonObject['useFlag'] = this.useFlagValue==''? null:this.useFlagValue ;
      console.log(jsonObject)
      this.f03018Service.getElBigCompanyList(baseUrl, jsonObject).subscribe(data => {
        console.log(data)
        if (data.rspBody.size != 0) {
          this.cuCpSource = data.rspBody.items;
          this.total = data.rspBody.size;
          const confirmDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "查詢成功" }
            });
        }
        else{
          
            const confirmDialogRef = this.dialog.open(ConfirmComponent, {
              data: { msgStr: "查無項目" }
              });
              // this.Clear()
        }
      })
    }
  }

  // 編輯
  edit(isUpdate: boolean, row: any, rowId: string) {
    console.log(rowId)
    const dialogRef = this.dialog.open(F03018editComponent, {
      panelClass: 'mat-dialog-transparent',
      minHeight: '70vh',
      width: '50%',
      
      data: {
        cuCpNo: row.cuCpNo,
        cuCpName: row.cuCpName,
        cuCpSname: row.cuCpSname,
        cuCpType1Value: row.cuCpType1,
        cuCpType2Value: row.cuCpType2,
        cuCpType3Value: row.cuCpType3,
        useFlagValue: row.useFlag,
        content: row.content,
        cuCpType1Code: this.cuCpType1Code,
        cuCpType2Code: this.cuCpType2Code,
        rowID: rowId,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && (result.event == 'success' || result == '1')) {
        this.getElBigCompanyList(this.pageIndex, this.pageSize)
      }
    })
  }
  //清除資料
  Clear() {
    this.cuCpNo = '' //員工編號
    this.cuCpName = undefined //員工姓名
    this.cuCpSname = undefined //員工ID
   
    this.cuCpType1Code.push({value:'', viewValue: '請選擇' })
    this.cuCpType1Code = [] //email
    this.cuCpType1Value=""
    this.cuCpType2Code.push({value:'', viewValue: '請選擇' })
    this.cuCpType2Code = [] //email
    this.cuCpType2Value=""
    this.useFlagCode = [
      { value: '', viewValue: '請選擇' },
      { value: 'Y', viewValue: '是' },
      { value: 'N', viewValue: '否' },
    ]
    this.cuCpSource = undefined
    this.getTypeselect()
  }
  //匯出EXCEL
  exportExcel() {
    if ((this.cuCpNo == null || this.cuCpNo == '') && (this.cuCpName == undefined || this.cuCpName == '')
      && (this.cuCpSname == undefined || this.cuCpSname == '') && (this.cuCpType1Value == undefined || this.cuCpType1Value == '')
      && (this.cuCpType2Value == undefined || this.cuCpType2Value == '') && (this.cuCpType3Value == undefined || this.cuCpType3Value == '')
      && (this.useFlagValue == undefined || this.useFlagValue == '')
    ) {
      const cconfirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請至少選擇一項查詢條件並至少選擇一項查詢條件" }
      });
    } else {
      let jsonObject: any = {};
      let blob: Blob;
      jsonObject['cuCpNo'] = this.cuCpNo
      jsonObject['cuCpName'] = this.cuCpName
      jsonObject['cuCpSname'] = this.cuCpSname
      jsonObject['cuCpType1'] = this.cuCpType1Value
      jsonObject['cuCpType2'] = this.cuCpType2Value
      jsonObject['cuCpType3'] = this.cuCpType3Value
      jsonObject['useFlag'] = this.useFlagValue


      this.f03018Service.downloadExcel('f03/f03018action4', jsonObject).subscribe(data => {
        blob = new Blob([data], { type: 'application/xlsx' });
        let downloadURL = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = "ELBigCompany" + this.myDate + ".xlsx"; //瀏覽器下載時的檔案名稱
        link.click();

      });
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    if (this.firstFlag != 1) {
      const { pageSize, pageIndex } = params;
      this.getElBigCompanyList(pageIndex, this.pageSize);
    }
  }

}
