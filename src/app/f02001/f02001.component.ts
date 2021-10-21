import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Data, Router } from '@angular/router';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
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
  total : number;
  loading = false;
  pageSize : number;
  pageIndex : number;
  firstFlag = 1;
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
    this.credit_RESULT_Value = '';
    this.status_DESC_Value = '';
    this.cust_FLAG_Value = '';
    this.risk_GRADE_Value = '';
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params)
    if (this.firstFlag !=1 ) { // 判斷是否為第一次進頁面
      const { pageSize, pageIndex } = params;
      this.selectData(pageIndex, pageSize);

    }
  }

  changePage() {
    this.pageIndex = 1;
    this.pageSize = 50;
    this.total = 1;
  }

  getStatusDesc() {
    this.getCreditResult();
    this.getCustFlag();
    this.getRiskGrade();
    this.f02001Service.getStatusDesc().subscribe(data => {
      console.log(data)
      this.status_DESC.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody) {
        const statusId = jsonObj['statusId'];
        const statusDesc = jsonObj['statusDesc'];
        this.status_DESC.push({ value: statusId, viewValue: statusDesc })
      }
    });
  }

  getCreditResult() {
    this.f02001Service.getSysTypeCode('CREDIT_RESULT').subscribe(data => {
      console.log(data)
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
      console.log(data)
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
      console.log(data)
      this.risk_GRADE.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.risk_GRADE.push({ value: codeNo, viewValue: desc })
      }
    });
  }


  Detail()//明細
  {

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
    this.jsonObject['statusDesc'] = this.status_DESC_Value;//案件狀態
    this.jsonObject['custFlag'] = this.cust_FLAG_Value;//客群標籤
    this.jsonObject['riskGrade'] = this.risk_GRADE_Value;//風險等級分群
    this.jsonObject['productName'] = this.product_NAME;//產品名稱
    this.jsonObject['projectName'] = this.project_NAME;//專案名稱
    this.jsonObject['marketingCode'] = this.marketing_CODE;//行銷代碼
    this.jsonObject['approveAmt'] = '';//核准金額/額度

    if (this.apply_TIME != null)//進件日期
    {
      this.jsonObject['applyTimeStart'] = this.pipe.transform(new Date(this.apply_TIME[0]), 'yyyy-MM-dd');
      this.jsonObject['applyTimeEnd'] = this.pipe.transform(new Date(this.apply_TIME[1]), 'yyyy-MM-dd');

    }
    else {
      this.jsonObject['applyTimeStart'] = '';
      this.jsonObject['applyTimeEnd'] = '';
    }

    if (this.proof_DOCUMENT_TIME != null)//上傳財力日期
    {
      this.jsonObject['proofDocumentTimeStart'] = this.pipe.transform(new Date(this.proof_DOCUMENT_TIME[0]), 'yyyy-MM-dd');
      this.jsonObject['proofDocumentTimeEnd'] = this.pipe.transform(new Date(this.proof_DOCUMENT_TIME[1]), 'yyyy-MM-dd');

    }
    else {
      this.jsonObject['proofDocumentTimeStart'] = '';
      this.jsonObject['proofDocumentTimeEnd'] = '';
    }

    if (this.sign_UP_TIME != null)//簽約完成日期
    {
      this.jsonObject['signUpTimeStart'] = this.pipe.transform(new Date(this.sign_UP_TIME[0]), 'yyyy-MM-dd');
      this.jsonObject['signUpTimeEnd'] = this.pipe.transform(new Date(this.sign_UP_TIME[1]), 'yyyy-MM-dd');

    }
    else {
      this.jsonObject['signUpTimeStart'] = '';
      this.jsonObject['signUpTimeEnd'] = '';
    }

    if (this.credit_TIME != null)//准駁日期時間
    {
      this.jsonObject['creditTimeStart'] = this.pipe.transform(new Date(this.credit_TIME[0]), 'yyyy-MM-dd');
      this.jsonObject['creditTimeEnd'] = this.pipe.transform(new Date(this.credit_TIME[1]), 'yyyy-MM-dd');
    }
    else {
      this.jsonObject['creditTimeStart'] = '';
      this.jsonObject['creditTimeEnd'] = '';
    }

    this.f02001Service.inquiry(url, this.jsonObject).subscribe(data => {
      console.log(data)
      this.resultData = data.rspBody.item;
      this.total = data.rspBody.size;
      this.firstFlag = 2;
    })
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
    this.cust_FLAG_Value = '';
    this.risk_GRADE_Value = '';
    this.apply_TIME = null;
    this.proof_DOCUMENT_TIME = null;
    this.sign_UP_TIME = null;
    this.product_NAME = '';
    this.project_NAME = '';
    this.marketing_CODE = '';
    this.credit_TIME = null;
    this.resultData = null;
  }
  leave()//離開
  {

  }

  conditionCheck() {
    if (this.applno == '' && this.national_ID == '' && this.cust_ID == '' && this.cust_CNAME == ''
      && this.l3EMPNO == '' && this.credit_RESULT_Value == '' && this.status_DESC_Value == ''
      && this.cust_FLAG_Value == '' && this.risk_GRADE_Value == '' && this.apply_TIME == null
      && this.proof_DOCUMENT_TIME == null && this.sign_UP_TIME == null && this.product_NAME == ''
      && this.project_NAME == '' && this.marketing_CODE == '' && this.credit_TIME == null) {
      this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請至少選擇一項條件" }
      });
    } else {
      this.selectData(this.pageIndex, this.pageSize);
    }
  }
}
