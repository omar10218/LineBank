import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Data } from '@angular/router';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n';
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
  applno: string; //案件編號
  national_ID: string; //身分證字號
  cust_ID: string; //客戶ID
  cust_CNAME: string; //客戶姓名
  l3EMPNO: string //徵信員員編姓名
  credit_RESULT: sysCode[] = []; //審核結果陣列
  credit_RESULT_Value: string;//審核結果值
  status_DESC: sysCode[] = []; //案件狀態
  status_DESC_Value: string;//案件狀態值
  cust_FLAG: sysCode[] = []; //客群標籤
  cust_FLAG_Value: string;//客群標籤值
  risk_GRADE: sysCode[] = [];//風險等級分群
  risk_GRADE_Value: string;//風險等級分群值
  apply_TIME: [Date,Date];//進件日期
  proof_DOCUMENT_TIME: string;//上傳財力日期
  sign_UP_TIME: string;//簽約完成日期
  product_NAME: string;//產品名稱
  project_NAME: string;//專案名稱
  marketing_CODE: string;//行銷代碼
  credit_TIME: [Date,Date];//准駁日期時間
  jsonObject: any = {};
  ruleParamCondition = new MatTableDataSource<any>();
  listOfData: readonly Data[] = [];
  total = 1;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  constructor(private router: Router,
    private f02001Service: F02001Service,
    private pipe: DatePipe,
    private nzI18nService: NzI18nService
    )
    {
      this.nzI18nService.setLocale(zh_TW)
    }

  ngOnInit(): void {

  }

  // search() {
  //   this.router.navigate(['./F01001SCN1'], { queryParams: { applno: "201803127003", search: 'Y' } });
  // }
  Detail()//明細
  {

  }
  Select()//查詢
  {
    let url = "f02/f02001action1";
    this.jsonObject['applno'] = this.applno;//案件編號
    this.jsonObject['national_ID'] = this.national_ID;//身分證字號
    this.jsonObject['cust_ID'] = this.cust_ID;//客戶ID
    this.jsonObject['cust_CNAME'] = this.cust_CNAME;//客戶姓名
    this.jsonObject['l3EMPNO'] = this.l3EMPNO;//徵信員員編姓名
    // this.jsonObject['credit_RESULT'] = this.credit_RESULT_Value;審核結果
    // this.jsonObject['status_DESC'] = this.status_DESC_Value;案件狀態
    // this.jsonObject['CUST_FLAG'] = this.cust_FLAG_Value;客群標籤
    // this.jsonObject['RISK_GRADE'] = this.risk_GRADE_Value;風險等級分群

    // this.jsonObject['apply_TIME'] = this.apply_TIME;//進件日期
    if(this.apply_TIME !=null)//進件日期
    {
      this.jsonObject['apply_TIME_start'] = this.pipe.transform (new Date(this.apply_TIME[0]).toString() , 'yyyy-MM-dd');
      this.jsonObject['apply_TIME_end'] = this.pipe.transform (new Date(this.apply_TIME[1]).toString() , 'yyyy-MM-dd');

    }
    else
    {
      this.jsonObject['apply_TIME_start'] = '';
      this.jsonObject['apply_TIME__end'] = '';
    }
    this.jsonObject['proof_DOCUMENT_TIME'] = this.proof_DOCUMENT_TIME;//上傳財力日期
    this.jsonObject['sign_UP_TIME'] = this.sign_UP_TIME;//簽約完成日期
    this.jsonObject['product_NAME'] = this.product_NAME;//產品名稱
    this.jsonObject['project_NAME'] = this.project_NAME;//專案名稱
    this.jsonObject['marketing_CODE'] = this.marketing_CODE;//行銷代碼
    if(this.credit_TIME !=null)//准駁日期時間
    {
      this.jsonObject['credit_TIME'] = this.pipe.transform (new Date(this.credit_TIME[0]).toString() , 'yyyy-MM-dd');
    }
    else
    {
      this.jsonObject['credit_TIME'] = '';
    }


    this.f02001Service.inquiry(url,this.jsonObject).subscribe(data=>{
      this.ruleParamCondition.data = data.rspBody;
    })
  }
  Clear()//清除
  {
    this.applno='';
    this.national_ID='';
    this.cust_ID='';
    this.cust_CNAME='';
    this.l3EMPNO='';
    this.credit_RESULT_Value='';
    this.status_DESC_Value='';
    this.cust_FLAG_Value='';
    this.risk_GRADE_Value='';
    this.apply_TIME=null;
    this.proof_DOCUMENT_TIME='';
    this.sign_UP_TIME='';
    this.product_NAME='';
    this.project_NAME='';
    this.marketing_CODE='';
    this.credit_TIME=null;
    this.ruleParamCondition.data = null;
  }
  leave()//離開
  {

  }
}
