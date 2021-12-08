import { OptionsCode } from './../interface/base';
import { Component, OnInit } from '@angular/core';
// Jay 複審案件查詢
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f02003',
  templateUrl: './f02003.component.html',
  styleUrls: ['./f02003.component.css', '../../assets/css/f02.css']
})

export class F02003Component implements OnInit {

  constructor() { }


  nationalId: string = '';
  custId: string = '';
  custName: string = '';
  total: number;
  loading = false;
  pageSize: number;
  pageIndex: number;
  firstFlag = 1;
  //test
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
  rescanEmpno: string;
  rescanEmpnoCode: OptionsCode[] = [];

  date: [Date, Date];
  dateFormat = 'yyyy/MM/dd';

  ngOnInit(): void {
  }

  search() {

  }

  clear() {

  }


  changeStatsCode(codeTag: string)
  {

  }
  dateNull(t: [Date, Date], name: string)
  {

  }
  Detail(id: string, nationalId: string)//明細
  {
    sessionStorage.setItem('applno', id);
    sessionStorage.setItem('cuid', nationalId);
    sessionStorage.setItem('search', 'Y');
    sessionStorage.setItem('queryDate', '');
    sessionStorage.setItem('winClose', 'Y');
    sessionStorage.setItem('page', '0');
    sessionStorage.setItem('stepName', '0');
    //開啟徵審主畫面
    const url = window.location.href.split("/#");
    window.open(url[0] + "/#/F01002/F01002SCN1");
  }
}
