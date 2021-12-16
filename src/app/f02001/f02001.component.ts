import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Data, Router } from '@angular/router';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { config } from 'process';
import { Alert } from 'selenium-webdriver';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { F02001Service } from './f02001.service';

// Jay 案件查詢
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f02001',
  templateUrl: './f02001.component.html',
  styleUrls: ['./f02001.component.css', '../../assets/css/f03.css']
})
export class F02001Component implements OnInit {
  applno: string = ''; //案件編號
  national_ID: string = ''; //身分證字號
  cust_ID: string = ''; //客戶ID
  cust_CNAME: string = ''; //客戶姓名
  l3EMPNO: string = ''; //徵信員員編姓名
  credit_RESULT: sysCode[] = []; //審核結果陣列
  credit_RESULT_Value: string = '';//審核結果值
  status_DESC: sysCode[] = []; //案件狀態
  status_DESC_Value: string = '';//案件狀態值
  statusDescSecond: sysCode[] = [];//案件狀態第二層
  statusDescSecondValue: string = '';//案件狀態值第二層
  cust_FLAG: sysCode[] = []; //客群標籤
  cust_FLAG_Value: string = '';//客群標籤值
  risk_GRADE: sysCode[] = [];//風險等級分群
  risk_GRADE_Value: string = '';//風險等級分群值
  apply_TIME: [Date, Date];//進件日期
  proof_DOCUMENT_TIME: [Date, Date];//上傳財力日期
  sign_UP_TIME: [Date, Date];//簽約完成日期
  product_NAME: string = '';//產品名稱
  project_NAME: string = '';//專案名稱
  marketing_CODE: string = '';//行銷代碼
  credit_TIME: [Date, Date];//准駁日期時間
  jsonObject: any = {};
  resultData = [];
  total: number;
  quantity:number;
  loading = false;
  pageSize: number;
  pageIndex: number;
  firstFlag = 1;
  sortArry=['ascend', 'descend']
  x: string;

  constructor(private router: Router,
    private f02001Service: F02001Service,
    public pipe: DatePipe,
    public nzI18nService: NzI18nService,
    public dialog: MatDialog,
  ) {
    this.nzI18nService.setLocale(zh_TW)
  }

  ngOnInit(): void {
    this.getStatusDesc();
    this.getCreditResult();
    this.getCustFlag();
    this.getRiskGrade();
    this.credit_RESULT_Value = '';
    this.status_DESC_Value = '';
    this.cust_FLAG_Value = '';
    this.risk_GRADE_Value = '';
    this.apply_TIME = [this.dealwithData14(new Date()), new Date()]
    this.quantity = 0;


  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex } = params;
    // alert('2');
    console.log(params)
    if (this.pageIndex !== pageIndex) {
      if (this.firstFlag != 1) { // 判斷是否為第一次進頁面
        const { pageSize, pageIndex } = params;
        this.selectData(pageIndex, pageSize);
      }
    }
  }
  // test()
  // {
  //   console.log(this.status_DESC_Value)

  // }
  changePage() {
    this.pageIndex = 1;
    this.pageSize = 50;
    this.total = 1;
  }

  getStatusDesc() {
    this.f02001Service.getSysTypeCode('STATUS_CODE').subscribe(data => {

      this.status_DESC.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.status_DESC.push({ value: codeNo, viewValue: desc })
      }
    });
  }

  //狀態第二層
  changeStatsCode(codeTag: string) {
    this.statusDescSecond = [];
    let jsonObject: any = {};
    jsonObject['statusDesc'] = codeTag;
    this.f02001Service.changeStatsCode(jsonObject).subscribe(data => {
      this.statusDescSecond.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody) {
        const value = jsonObj['codeNo'];
        const viewValue = jsonObj['codeNo'] + jsonObj['codeDesc'];
        this.statusDescSecond.push({ value: value, viewValue: viewValue })
      }
    });
  }

  getCreditResult() {
    this.f02001Service.getSysTypeCode('CREDIT_RESULT').subscribe(data => {

      this.credit_RESULT.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.credit_RESULT.push({ value: codeNo, viewValue: desc })
      }
    });
  }

  getCustFlag() {
    this.f02001Service.getSysTypeCode('CUST_FLAG').subscribe(data => {
      this.cust_FLAG.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.cust_FLAG.push({ value: codeNo, viewValue: desc })
      }
    });
  }

  getRiskGrade() {
    this.f02001Service.getSysTypeCode('RISK_GRADE').subscribe(data => {
      this.risk_GRADE.push({ value: '', viewValue: '請選擇' })
      this.risk_GRADE.push({value: 'R1', viewValue: 'R1' })
      this.risk_GRADE.push({value: 'R2', viewValue: 'R2' })
      this.risk_GRADE.push({value: 'R3', viewValue: 'R3' })
      this.risk_GRADE.push({value: 'R4', viewValue: 'R4' })
      this.risk_GRADE.push({value: 'R5', viewValue: 'R5' })
      // for (const jsonObj of data.rspBody.mappingList) {
      //   const codeNo = jsonObj['codeNo'];
      //   const desc = jsonObj['codeDesc'];
      //   this.risk_GRADE.push({ value: codeNo, viewValue: desc })
      // }
    });
  }


  Detail(id: string, nationalId: string)//明細
  {
    sessionStorage.setItem('applno', id);
    sessionStorage.setItem('cuid', nationalId);
    sessionStorage.setItem('search', 'Y');
    sessionStorage.setItem('queryDate', '');
    sessionStorage.setItem('winClose', 'Y');
    sessionStorage.setItem('page', '0');//申請案件查詢
    sessionStorage.setItem('stepName', '0');
    //開啟徵審主畫面
    const url = window.location.href.split("/#");
    window.open( url[0] + "/#/F01002/F01002SCN1", "", "location=no");

    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree(["./F01002/F01002SCN1"])
    // );
    // window.open(url);
  }

  select()//查詢
  {
    this.changePage();
    this.conditionCheck();
  }

  selectData(pageIndex: number, pageSize: number) {

    this.jsonObject['page'] = pageIndex;
    this.jsonObject['per_page'] = pageSize;
    let url = "f02/f02001action1";
    this.jsonObject['applno'] = this.applno;//案件編號
    this.jsonObject['nationalID'] = this.national_ID;//身分證字號
    this.jsonObject['custID'] = this.cust_ID;//客戶ID
    this.jsonObject['custCname'] = this.cust_CNAME;//客戶姓名
    this.jsonObject['l3EmpNo'] = this.l3EMPNO;//徵信員員編姓名
    this.jsonObject['creditResult'] = this.credit_RESULT_Value;//審核結果
    this.jsonObject['statusDesc'] = this.status_DESC_Value;//案件狀態--有修改第一層
    this.jsonObject['opDesc'] = this.statusDescSecondValue;//案件狀態--有修改第二層
    this.jsonObject['custFlag'] = this.cust_FLAG_Value;//客群標籤
    this.jsonObject['riskGrade'] = this.risk_GRADE_Value;//風險等級分群
    this.jsonObject['productName'] = this.product_NAME;//產品名稱
    this.jsonObject['projectName'] = this.project_NAME;//專案名稱
    this.jsonObject['marketingCode'] = this.marketing_CODE;//行銷代碼
    this.jsonObject['approveAmt'] = '';//核准金額/額度
    if (this.national_ID != '' || this.cust_ID != '') {

      if (this.apply_TIME != null)//進件日期
      {

        if (this.dealwithData365(this.apply_TIME)) {
          this.jsonObject['applyTimeStart'] = this.pipe.transform(new Date(this.apply_TIME[0]), 'yyyy-MM-dd');
          this.jsonObject['applyTimeEnd'] = this.pipe.transform(new Date(this.apply_TIME[1]), 'yyyy-MM-dd');
        }
        else {

          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "進件日期查詢區間最多一年內!" }

          });
          return;
        }

      }
      else {

        this.jsonObject['applyTimeStart'] = '';
        this.jsonObject['applyTimeEnd'] = '';
      }

      if (this.proof_DOCUMENT_TIME != null)//上傳財力日期
      {
        if (this.dealwithData365(this.proof_DOCUMENT_TIME)) {
          this.jsonObject['proofDocumentTimeStart'] = this.pipe.transform(new Date(this.proof_DOCUMENT_TIME[0]), 'yyyy-MM-dd');
          this.jsonObject['proofDocumentTimeEnd'] = this.pipe.transform(new Date(this.proof_DOCUMENT_TIME[1]), 'yyyy-MM-dd');

        }
        else {

          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "上傳財力日期查詢區間最多一年內!" }
          });
          return;
        }
      }
      else {
        this.jsonObject['proofDocumentTimeStart'] = '';
        this.jsonObject['proofDocumentTimeEnd'] = '';
      }

      if (this.sign_UP_TIME != null)//簽約完成日期
      {
        if (this.dealwithData365(this.sign_UP_TIME)) {
          this.jsonObject['signUpTimeStart'] = this.pipe.transform(new Date(this.sign_UP_TIME[0]), 'yyyy-MM-dd');
          this.jsonObject['signUpTimeEnd'] = this.pipe.transform(new Date(this.sign_UP_TIME[1]), 'yyyy-MM-dd');
        }
        else {
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "簽約完成日期查詢區間最多一年內!" }
          });
          return;
        }

      }
      else {
        this.jsonObject['signUpTimeStart'] = '';
        this.jsonObject['signUpTimeEnd'] = '';
      }

      if (this.credit_TIME != null)//准駁日期時間
      {
        if (this.dealwithData365(this.credit_TIME)) {
          this.jsonObject['creditTimeStart'] = this.pipe.transform(new Date(this.credit_TIME[0]), 'yyyy-MM-dd');
          this.jsonObject['creditTimeEnd'] = this.pipe.transform(new Date(this.credit_TIME[1]), 'yyyy-MM-dd');
        }
        else {
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "准駁日期時間查詢區間最多一年內!" }
          });
          return;
        }
      }
      else {
        this.jsonObject['creditTimeStart'] = '';
        this.jsonObject['creditTimeEnd'] = '';
      }
    }
    else {
      if (this.apply_TIME != null)//進件日期
      {
        if (this.dealwithData90(this.apply_TIME)) {
          this.jsonObject['applyTimeStart'] = this.pipe.transform(new Date(this.apply_TIME[0]), 'yyyy-MM-dd');
          this.jsonObject['applyTimeEnd'] = this.pipe.transform(new Date(this.apply_TIME[1]), 'yyyy-MM-dd');
        }
        else {
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "進件日期查詢區間最多三個內!" }
          });
          return;
        }

      }
      else {
        this.jsonObject['applyTimeStart'] = '';
        this.jsonObject['applyTimeEnd'] = '';
      }

      if (this.proof_DOCUMENT_TIME != null)//上傳財力日期
      {
        if (this.dealwithData90(this.proof_DOCUMENT_TIME)) {
          this.jsonObject['proofDocumentTimeStart'] = this.pipe.transform(new Date(this.proof_DOCUMENT_TIME[0]), 'yyyy-MM-dd');
          this.jsonObject['proofDocumentTimeEnd'] = this.pipe.transform(new Date(this.proof_DOCUMENT_TIME[1]), 'yyyy-MM-dd');
        }
        else {
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "上傳財力日期查詢區間最多三個內!" }
          });
          return;
        }

      }
      else {
        this.jsonObject['proofDocumentTimeStart'] = '';
        this.jsonObject['proofDocumentTimeEnd'] = '';
      }
      if (this.sign_UP_TIME != null)//簽約完成日期
      {
        if (this.dealwithData90(this.sign_UP_TIME)) {
          this.jsonObject['signUpTimeStart'] = this.pipe.transform(new Date(this.sign_UP_TIME[0]), 'yyyy-MM-dd');
          this.jsonObject['signUpTimeEnd'] = this.pipe.transform(new Date(this.sign_UP_TIME[1]), 'yyyy-MM-dd');
        }
        else {
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "簽約完成日期查詢區間最多三個內!" }
          });
          return;
        }
      }
      else {
        this.jsonObject['signUpTimeStart'] = '';
        this.jsonObject['signUpTimeEnd'] = '';
      }
      if (this.credit_TIME != null)//准駁日期時間
      {
        if (this.dealwithData90(this.credit_TIME)) {
          this.jsonObject['creditTimeStart'] = this.pipe.transform(new Date(this.credit_TIME[0]), 'yyyy-MM-dd');
          this.jsonObject['creditTimeEnd'] = this.pipe.transform(new Date(this.credit_TIME[1]), 'yyyy-MM-dd');
        }
        else {
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "准駁日期時間查詢區間最多三個內!" }
          });
          return;
        }
      }
      else {
        this.jsonObject['creditTimeStart'] = '';
        this.jsonObject['creditTimeEnd'] = '';
      }

    }

    this.f02001Service.inquiry(url, this.jsonObject).subscribe(data => {
      console.log(data)
      if(data.rspBody.size == 0)
      {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: "查無資料" }})
      }
      else
      {
        this.resultData = data.rspBody.item;
        this.total = data.rspBody.size;
        this.quantity = data.rspBody.size;
        this.firstFlag = 2;
        console.log(this.resultData)
      }

    }
    )
  }
  dealwithData14(time: Date) {
    var startDate
    startDate = new Date();
    return new Date(Date.now() - (13 * 24 * 60 * 60 * 1000));

  }
  dealwithData365(stime: any) {
    var startDate, endDate;
    startDate = new Date(stime[0]);
    endDate = new Date(stime[1]);
    if ((endDate - startDate) / 1000 / 60 / 60 / 24 > 365) {
      return false;
    }
    else {
      return true;
    }
  }
  dealwithData90(stime: any) {
    var startDate, endDate;
    startDate = new Date(stime[0]);
    endDate = new Date(stime[1]);
    if ((endDate - startDate) / 1000 / 60 / 60 / 24 > 90) {
      return false;
    }
    else {
      return true;
    }
  }

  Clear()//清除
  {
    this.applno = '';
    this.national_ID = '';
    this.cust_ID = '';
    this.cust_CNAME = '';
    this.l3EMPNO = '';
    this.credit_RESULT_Value = '';
    this.status_DESC_Value = '';
    this.statusDescSecondValue = ''
    this.cust_FLAG_Value = '';
    this.risk_GRADE_Value = '';
    this.apply_TIME = null;
    this.proof_DOCUMENT_TIME = null;
    this.sign_UP_TIME = null;
    this.product_NAME = '';
    this.project_NAME = '';
    this.marketing_CODE = '';
    this.credit_TIME = null;
    this.resultData = [];
    this.jsonObject = {};
    this.quantity = 0;
  }

  // test()//測試
  // {
  // }

  conditionCheck() {
    if (this.applno == '' && this.national_ID == '' && this.cust_ID == '' && this.cust_CNAME == ''
      && this.l3EMPNO == '' && this.credit_RESULT_Value == '' && this.status_DESC_Value == ''
      && this.cust_FLAG_Value == '' && this.risk_GRADE_Value == '' && this.apply_TIME == null
      && this.proof_DOCUMENT_TIME == null && this.sign_UP_TIME == null && this.product_NAME == ''
      && this.project_NAME == '' && this.marketing_CODE == '' && this.credit_TIME == null) {
      this.total = 0;
      this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請至少選擇一項條件" }
      });
    } else {
      this.selectData(this.pageIndex, this.pageSize);
    }
  }
  sortChange(e: string) {
    this.resultData = e === 'ascend' ? this.resultData.sort(
      (a, b) => a.APPLY_TIME.localeCompare(b.APPLY_TIME)) : this.resultData.sort((a, b) => b.APPLY_TIME.localeCompare(a.APPLY_TIME))
    // alert('1');
    // console.log(this.resultData);
    console.log('-----------------');
  }
  Serial(e: string)//序號排序
  {
    this.resultData = e === 'ascend' ? this.resultData.sort(
      (a, b) => a.APPLNO.localeCompare(b.APPLNO)) : this.resultData.sort((a, b) => b.APPLNO.localeCompare(a.APPLNO))
  }
  dateNull(t: [Date, Date], name: string) {

    if (t.length < 1) {
      switch (name) {
        case 'apply_TIME':
          this.apply_TIME = null;
          break;
        case 'proof_DOCUMENT_TIME':
          this.proof_DOCUMENT_TIME = null;
          break;
        case 'sign_UP_TIME':
          this.sign_UP_TIME = null;
          break;
        case 'credit_TIME':
          this.credit_TIME = null;
          break;
      }
    }
  }
  data_number(p: number)//千分號
   {
    this.x = '';
    this.x = (p + "")
    if (this.x != null) {
      this.x = this.x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return this.x
  }
}
