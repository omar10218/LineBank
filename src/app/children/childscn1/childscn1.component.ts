import { MappingCode } from './../../mappingcode.model';
import { Component, OnInit } from '@angular/core';
import { OptionsCode } from 'src/app/interface/base';
import { Childscn1Service } from './childscn1.service';

@Component({
  selector: 'app-childscn1',
  templateUrl: './childscn1.component.html',
  styleUrls: ['./childscn1.component.css','../../../assets/css/child.css']
})
export class Childscn1Component implements OnInit {

  constructor(
    private childscn1Service: Childscn1Service,
  ) { }

  mark: string;

  //申請資訊
  applno: string;                               //案編
  cuCName: string;                              //姓名
  custId: string;                               //客戶ID
  nationalId: string;                           //身分證
  //客戶身分名單註記(待確認)
  prodCode: string;                             //申請產品
  applicationAmount: number;                    //申請金額
  purposeCode:string;                           //貸款用途
  //專案名稱(待確認)
  //行銷代碼(待確認)

  //Channel資訊

  //AML/FDS/CSS/RPM
  aml: string;                                  //AML代碼
  amlDesc: string;                              //AML說明 MappingCode => AML_RISK
  amlDate: string;                              //AML查詢日期

  fds: string;                                  //FDS代碼
  fdsDesc: string;                              //FDS說明 MappingCode => FDS_RISK
  fdsDate: string;                              //FDS查詢日期

  cssScore: string;                             //CSS分數
  cssGrade: string;                             //CSS等級
  cssDate: string;                              //CSS查詢日期

  isRpm: string;                                //RPM是否為利關人
  rpmTypeDescribe: string;                      //RPM關係類型描述
  rpmDate: string;                              //RPM查詢日期

  //DSS1st
  sysflowcdOne: string;                         //系統流程
  resltcdOne: string;                           //決策結果
  calvOne: string;                              //案件等級
  ocupatnCustGpAndDescOne: string;              //行職業代碼分群代碼/中文
  ocupatnCustStgp1AndDescOne: string;           //策略客群1代碼/中文
  OCUPATN_CUST_STGP1

  //審核結果
  creditResult: string;
  creditResultCode: OptionsCode[] = [];//核決結果下拉選單
  resultProdCode: string;
  resultPrjCode: string;
  resultApproveLimit: number;
  resultMinPayrate: number;
  resultRealRate: number;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.childscn1Service.getSysTypeCode('CREDIT_RESULT')//時下拉選單
    .subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.creditResultCode.push({ value: codeNo, viewValue: desc })
      }
    });

    const baseUrl = 'f01/childscn1'
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    this.childscn1Service.getImfornation(baseUrl, jsonObject).subscribe(data => {

      //CreditAuditinfo
      if (data.rspBody.CreditAuditinfoList.length > 0 ) {
        this.cuCName = data.rspBody.CreditAuditinfoList[0].CU_CNAME;
        this.custId = data.rspBody.CreditAuditinfoList[0].CUST_ID;
        this.nationalId = data.rspBody.CreditAuditinfoList[0].NATIONAL_ID;
        this.prodCode = data.rspBody.CreditAuditinfoList[0].PROD_CODE;
        this.applicationAmount = data.rspBody.CreditAuditinfoList[0].APPLICATION_AMOUNT;
        this.purposeCode = data.rspBody.CreditAuditinfoList[0].PURPOSE_CODE;
      }

      //AML
      if ( data.rspBody.amlList.length > 0 ) {
        this.aml = data.rspBody.amlList[0].AML;
        this.amlDesc = data.rspBody.amlList[0].CODE_DESC;
        this.amlDate = data.rspBody.amlList[0].AML_DATE;
      }

      //FDS
      if ( data.rspBody.fdsList.length > 0 ) {
        this.fds = data.rspBody.fdsList[0].FDS;
        this.fdsDesc = data.rspBody.fdsList[0].CODE_DESC;
        this.fdsDate = data.rspBody.fdsList[0].FDS_DATE;
      }

      //CSS
      if ( data.rspBody.cssList.length > 0 ) {
        this.cssScore = data.rspBody.cssList[0].cssScore;
        this.cssGrade = data.rspBody.cssList[0].cssGrade;
        this.cssDate = data.rspBody.cssList[0].cssDate;
      }

      //RPM
      if ( data.rspBody.rpmList.length > 0 ) {
        this.isRpm = data.rspBody.rpmList[0].isRpm;
        this.rpmTypeDescribe = data.rspBody.rpmList[0].rpmTypeDescribe;
        this.rpmDate = this.formatDate( data.rspBody.rpmList[0].rpmDate );
      }

      //result
      if ( data.rspBody.resultMap != null ) {
        this.resultProdCode = data.rspBody.resultMap.PROD_CODE;
        this.resultPrjCode = data.rspBody.resultMap.PRJ_CODE;
        if ( data.rspBody.resultMap.CREDIT_RESULT != ' ' ) {
          this.creditResult = data.rspBody.resultMap.CREDIT_RESULT;
        }
        this.resultApproveLimit = data.rspBody.resultMap.APPROVE_LIMIT;
        this.resultMinPayrate = data.rspBody.resultMap.MIN_PAYRATE;
        this.resultRealRate = data.rspBody.resultMap.REAL_RATE;
      }
    })
  }

  save() {

  }

  formatDate(date: string) {
    return date.split("T")[0]+" "+date.split("T")[1].split(".")[0];
  }
}
