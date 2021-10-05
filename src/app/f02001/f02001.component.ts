import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '@angular/router';

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
  apply_TIME: string;//進件日期
  proof_DOCUMENT_TIME: string;//上傳財力日期
  sign_UP_TIME: string;//簽約完成日期
  product_NAME: string;//產品名稱
  project_NAME: string;//專案名稱
  marketing_CODE: string;//行銷代碼
  credit_TIME: string;//准駁日期時間

  listOfData: readonly Data[] = [];
  total = 1;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  search() {
    this.router.navigate(['./F01001SCN1'], { queryParams: { applno: "201803127003", search: 'Y' } });
  }
  test()
  {
    console.log(this.apply_TIME)
  }

}
