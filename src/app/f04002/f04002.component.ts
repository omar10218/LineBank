import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { OptionsCode } from '../interface/base';
import { F04002Service } from './f04002.service';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

// export const dataList = [
//   {
//     'applno': 'A1234561',
//     'IS_CHK':'N'
//   },
//   {
//     'applno': 'A1234562',
//     'IS_CHK':'N'
//   },
//   {
//     'applno': 'A1234563',
//     'IS_CHK':'N'
//   },
//   {
//     'applno': 'A1234564',
//     'IS_CHK':'N'
//   },
//   {
//     'applno': 'A1234565',
//     'IS_CHK':'N'
//   },
//   {
//     'applno': 'A1234566',
//     'IS_CHK':'N'
//   },
//   {
//     'applno': 'A1234567',
//     'IS_CHK':'N'
//   },
//   {
//     'applno': 'A1234568',
//     'IS_CHK':'N'
//   },
//   {
//     'applno': 'A1234569',
//     'IS_CHK':'N'
//   },
//   {
//     'applno': 'A1234510',
//     'IS_CHK':'N'
//   }
// ]


interface checkBox {
  value: string;
  completed: boolean;
}

//Nick 錯誤件處理 新增
@Component({
  selector: 'app-f04002',
  templateUrl: './f04002.component.html',
  styleUrls: ['./f04002.component.css', '../../assets/css/f04.css']
})
export class F04002Component implements OnInit {

  sysCode: OptionsCode[] = [];
  selectedValue: string;
  isAllCheck: boolean = false;
  roleFunctionSource = new MatTableDataSource<any>();

  chkArray: checkBox[] = [];

  constructor(private f04002Service: F04002Service,
     public dialog: MatDialog,
     private nzI18nService: NzI18nService,
   ) {
     this.nzI18nService.setLocale(zh_TW)
   }


  total = 1;
  // loading = true;
  pageSize = 10;
  pageIndex = 1;

  ngOnInit(): void {
    this.f04002Service.getSysTypeCode('STEP_ERROR').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.sysCode.push({ value: codeNo, viewValue: desc })
      }
    });
  }
  //重查
  newSearch() {
    var valArray: string[] = new Array;
    for (const obj of this.chkArray) {
      if (obj.completed) { valArray.push(obj.value); }
    }
    if (valArray.length < 1) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請選擇案件' }
      });
    }
    else {
      const baseUrl = 'f04/f04002fn2';
      this.f04002Service.newSearch_Decline_STEP_ERRORFunction(baseUrl, this.selectedValue, valArray, 'A').subscribe(data => {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: data.rspMsg }
        });
        if (data.rspCode == '0000') {
          this.getSTEP_ERRORFunction(this.pageIndex,this.pageSize);
        }
      });
    }

  }
  //婉拒
  Decline() {
    var valArray: string[] = new Array;
    for (const obj of this.chkArray) {
      if (obj.completed) { valArray.push(obj.value); }
    }
    if (valArray.length < 1) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請選擇案件' }
      });
    }
    else {
      const baseUrl = 'f04/f04002fn2';
      var result = "D";
      if(this.selectedValue = 'CSS_MANAGE'){ result = "P" ;}

      this.f04002Service.newSearch_Decline_STEP_ERRORFunction(baseUrl, this.selectedValue, valArray, result).subscribe(data => {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: data.rspMsg }
        });
        if (data.rspCode == '0000') {
          this.getSTEP_ERRORFunction(this.pageIndex,this.pageSize);
        }
      });
    }
  }

  //設定checkbox資料
  setAll(completed: boolean) {
    for (const obj of this.chkArray) {
      obj.completed = completed;
    }
  }

  //切換查詢參數
  async changeSelect() {
    this.isAllCheck = false;
    await this.getSTEP_ERRORFunction(this.pageIndex,this.pageSize);
  }

  //切換頁數
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.pageSize=pageSize;
    this.pageIndex=pageIndex;
    this.getSTEP_ERRORFunction(pageIndex, pageSize);
    //console.log(pageSize);console.log(pageIndex);
  }

  //取得表單
  private async getSTEP_ERRORFunction(pageIndex: number, pageSize: number) {

    const baseUrl = 'f04/f04002fn1';
    this.f04002Service.getSTEP_ERRORFunction(baseUrl, this.selectedValue, this.pageIndex , this.pageSize).subscribe(data => {

      // data.rspBody.items=dataList;
      if (this.chkArray.length > 0) {
        let i: number = 0;
        for (const jsonObj of data.rspBody.items) {
          const chkValue = jsonObj['applno'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray[i] = { value: chkValue, completed: isChk == 'N' };
          i++;
        }

      } else {
        for (const jsonObj of data.rspBody.items) {
          const chkValue = jsonObj['applno'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray.push({ value: chkValue, completed: isChk == 'N' });
        }
      }
      this.roleFunctionSource.data = data.rspBody.items;
      this.total = data.rspBody.size;
      this.isAllCheck = false;
      // this.loading = false;
    });
  }

}
