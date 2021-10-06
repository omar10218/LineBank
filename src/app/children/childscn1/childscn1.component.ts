import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-childscn1',
  templateUrl: './childscn1.component.html',
  styleUrls: ['./childscn1.component.css','../../../assets/css/child.css']
})
export class Childscn1Component implements OnInit {

  constructor() { }

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

  ngOnInit(): void {
  }

  save() {

  }
}
