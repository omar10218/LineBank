import { BaseService } from 'src/app/base.service';
import { map } from 'rxjs/operators';
import { OptionsCode } from './../../interface/base';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Childscn1Service } from './childscn1.service';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import * as L from 'leaflet';
import { DatePipe } from '@angular/common';
import { Childscn1editComponent } from './childscn1edit/childscn1edit.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { F01002Scn1Service } from 'src/app/f01002/f01002scn1/f01002scn1.service';
import { Subscription } from 'rxjs';
import { F01003Scn1Service } from 'src/app/f01003/f01003scn1/f01003scn1.service';
import { F01004Scn1Service } from 'src/app/f01004/f01004scn1/f01004scn1.service';
import { F01007scn1Service } from 'src/app/f01007/f01007scn1/f01007scn1.service';
import { F01001Scn1Service } from 'src/app/f01001/f01001scn1/f01001scn1.service';

//原因碼框架
interface CREDIT_View {
  key: string;
  upCreditCode: string//上層原因碼
  upCreditCodeList: OptionsCode[];//上層原因碼下拉選單
  reasonCode: string;//原因碼
  creditCodeList: OptionsCode[];//原因碼下拉選單
  resonContent: string;//徵審註記
}

interface reCREDIT_View {
  reasonCode: string;//原因碼
  resonContent: string;//徵審註記
}

//Nick 	徵審代碼/dss1/dss2
@Component({
  selector: 'app-childscn1',
  templateUrl: './childscn1.component.html',
  styleUrls: ['./childscn1.component.css', '../../../assets/css/child.css']
})
export class Childscn1Component implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private childscn1Service: Childscn1Service,
    public dialog: MatDialog,
    private pipe: DatePipe,
    private f01002scn1Service: F01002Scn1Service,
    private f01003scn1Service: F01003Scn1Service,
    private f01004scn1Service: F01004Scn1Service,
    private f01007scn1Service: F01007scn1Service,
    private f01001Scn1Service: F01001Scn1Service
  ) {//訂閱 案件完成/暫存時 新增資料
    this.CREDITSource$ = this.f01002scn1Service.CREDITSource$.subscribe((data) => {
      if (data.key) {
        this.saveCREDIT_Data();
      }
    });
  }

  CREDITSource$: Subscription;

  mark: string;
  search: string;
  userId: string;
  level: string;

  //申請資訊
  applno: string;                               //案編
  cuCName: string;                              //姓名
  custId: string;                               //客戶ID
  nationalId: string;                           //身分證
  page: string         //頁面
  //客戶身分名單註記(待確認)
  prodCode: string;                             //申請產品
  applicationAmount: string;                    //申請金額
  caApplicationAmount: string;
  purposeCode: string;                           //貸款用途
  caPmcus: string;
  caRisk: string
  //專案名稱(待確認)
  //行銷代碼(待確認)

  //Channel資訊
  cuGps1: string;                               //GPS1
  cuGps2: string;                               //GPS2
  cuIpAddr1: string;                            //ADDR1
  cuIpAddr2: string;                            //ADDR2
  cuDeviceName1: string;                        //申請時手機型號
  cuDeviceName2: string;                        //上傳時手機型號
  cuDeviceId1: string;                          //申請時Device
  cuDeviceId2: string;                          //上傳時Device

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
  rpmId: string;                                //RMP關係人ID

  //DSS1st
  sysflowcdOne: string;                         //系統流程
  resltcdOne: string;                           //決策結果
  calvOne: string;                              //案件等級
  ocupatnCustGpOne: string;                     //行職業代碼分群代碼/中文
  ocupatnCustStgp1One: string;                  //策略客群1代碼/中文
  ocupatnCustStgp2One: string;                  //策略客群2代碼/中文
  goodbehavMortOne: string;                     //往來優質特徵註記(房貸)代碼/中文
  goodbehavCcOne: string;                       //往來優質特徵註記(信用卡)代碼/中文
  riskmdscoreA0: string;                        //風險模型分數
  riskmdgradeA0Adj: string;                     //風險模型等級(策略調整後)

  //DSS2st
  sysflowcdTwo: string;                         //系統流程
  resltcdTwo: string;                           //決策結果
  calvTwo: string;                              //案件等級
  ocupatnCustGpTwo: string;                     //行職業代碼分群代碼/中文
  ocupatnCustStgp1Two: string;                  //策略客群1代碼/中文
  ocupatnCustStgp2Two: string;                  //策略客群2代碼/中文
  goodbehavMortTwo: string;                     //往來優質特徵註記(房貸)代碼/中文
  goodbehavCcTwo: string;                       //往來優質特徵註記(信用卡)代碼/中文
  riskmdscoreA1: string;                        //風險模型分數
  riskmdgradeA1Adj: string;                     //風險模型等級(策略調整後)
  custTag: string;                              //客群標籤/說明

  //DSS2st Strgy
  strgyAprfrj: string;                          //授信策略准駁結果
  strgyLimitReving: string;                     //授信策略循環信貸額度
  strgyMinpayrt: string;                        //授信策略每月最低還款比率

  //審核結果
  creditResult: string;
  creditResultCode: OptionsCode[] = [];//核決結果下拉選單
  resultProdCode: string;
  resultPrjCode: string;
  resultApproveAmt: string;
  resultLowestPayRate: number;

  periodTypeCode: OptionsCode[] = [];//期別下拉選單
  interestTypeCode: OptionsCode[] = [];//利率型態下拉選單
  interestCode: OptionsCode[] = [];//基準利率型態下拉選單
  period: string;
  periodType: string;
  interestType: string;
  interestValue: string;
  interestBase: number = 0;
  interest: number = 0;
  approveInterest: number;

  CreditInterestPeriodSource: Data[] = [];

  //歷史紀錄
  historySource: Data[] = [];

  //Creditmemo
  creditmemoSource: Data[] = [];
  total = 1;
  pageIndex = 1;
  pageSize = 50;

  //徵審代碼Table
  EL_DSS1_UNDW_LIST = new MatTableDataSource<any>();//dss1徵審代碼
  EL_DSS1_UNDW_LIST1 = new MatTableDataSource<any>();//dss1徵審代碼-信用異常資訊
  EL_DSS1_UNDW_LIST2 = new MatTableDataSource<any>();//dss1徵審代碼-整體往來
  EL_DSS1_UNDW_LIST3 = new MatTableDataSource<any>();//dss1徵審代碼-信用卡往來
  EL_DSS1_UNDW_LIST4 = new MatTableDataSource<any>();//dss1徵審代碼-授信往來
  EL_DSS1_UNDW_LIST5 = new MatTableDataSource<any>();//dss1徵審代碼-其他
  EL_DSS2_UNDW_LIST = new MatTableDataSource<any>();//dss2徵審代碼
  EL_DSS2_UNDW_LIST1 = new MatTableDataSource<any>();//dss2徵審代碼-信用異常資訊
  EL_DSS2_UNDW_LIST2 = new MatTableDataSource<any>();//dss2徵審代碼-整體往來
  EL_DSS2_UNDW_LIST3 = new MatTableDataSource<any>();//dss2徵審代碼-信用卡往來
  EL_DSS2_UNDW_LIST4 = new MatTableDataSource<any>();//dss2徵審代碼-授信往來
  EL_DSS2_UNDW_LIST5 = new MatTableDataSource<any>();//dss2徵審代碼-其他
  EL_DSS2_CFC_LIMIT1 = new MatTableDataSource<any>();//試算額度策略
  EL_DSS2_STRGY_SRATE1 = new MatTableDataSource<any>();//試算利率(多階)
  EL_DSS2_STRGY_MERG1 = new MatTableDataSource<any>();//試算授信策略_債整明細

  //徵審代碼
  CREDIT_View_List: CREDIT_View[] = [];
  reCREDIT_View_List: reCREDIT_View[] = [];
  CREDITrowId: string;

  //AML
  //主要收入來源list
  MAIN_INCOME_LIST: OptionsCode[] = [{ value: '1', viewValue: '薪資/執業收入' }, { value: '2', viewValue: '自營業務收入' }, { value: '3', viewValue: '投資及交易所得' }
    , { value: '4', viewValue: '租賃所得' }, { value: '5', viewValue: '贈與/繼承' }, { value: '6', viewValue: '退休金/保險給付' }, { value: '7', viewValue: '獎助學金/比賽或中獎獎金' }
    , { value: '8', viewValue: '親友/家人給與' }];
  //主要收入來源
  MAIN_INCOME: string;

  //本次來往目的list
  PURPOSEOTHER_MESSAGE2_LIST: OptionsCode[] = [{ value: '1', viewValue: '支付教育費用' }, { value: '2', viewValue: '房屋修繕' }, { value: '3', viewValue: '購車' }
    , { value: '4', viewValue: '投資' }, { value: 'Z', viewValue: '其他' }];
  //本次來往目的
  PURPOSEOTHER_MESSAGE2: string;

  //客戶近半年無交易(排除付息交易)list
  NON_TRADEOTHER_MESSAGE3_LIST: OptionsCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }, { value: 'Z', viewValue: '其他' }];
  //客戶近半年無交易(排除付息交易)
  NON_TRADEOTHER_MESSAGE3: string;

  //客戶近年交易金額與身分或行職業顯不相當list
  TRADE_NON_CCOTHER_MESSAGE4_LIST: OptionsCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }, { value: 'Z', viewValue: '其他' }];
  //客戶近年交易金額與身分或行職業顯不相當
  TRADE_NON_CCOTHER_MESSAGE4: string;

  //客戶近半年交易是否與首次(活期)開戶目的不相稱list
  TRADE_NON_PURPOSEOTHER_MESSAGE5_LIST: OptionsCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }, { value: 'Z', viewValue: '其他' }];
  //客戶近半年交易是否與首次(活期)開戶目的不相稱
  TRADE_NON_PURPOSEOTHER_MESSAGE5: string;

  otherMessage2: string = "";
  otherMessage3: string = "";
  otherMessage4: string = "";
  otherMessage5: string = "";

  dss1Form1: FormGroup = this.fb.group({
    //系統決策
    SYSFLOWCD: ['', []],//系統流程
    RESLTCD: ['', []],//決策結果

    //案件資訊
    CALV: ['', []],//案件等級
    GOODBEHAV_MORT: ['', []],//往來優質特徵註記(房貸)
    GOODBEHAV_CC: ['', []],//往來優質特徵註記(信用卡)
    OCUPATN_CUST_STGP1: ['', []],//策略客群1(客戶填寫)
    OCUPATN_CUST_STGP2: ['', []],//策略客群2(客戶填寫)
    OCUPATN_CUST_GP: ['', []],//行職業代碼分群(客戶填寫)
    OCUPATN_CUST_STGP1_PM: ['', []],//策略客群1(客戶填寫) (PM分群)
    OCUPATN_CUST_STGP2_PM: ['', []],//策略客群2(客戶填寫) (PM分群)
    OCUPATN_CUST_GP_PM: ['', []],//行職業代碼分群(客戶填寫) (PM分群)
    CUST_TAG: ['', []],//客群標籤
    CUST_TAG_DESC: ['', []],//客群標籤說明

    //風險
    RISKMDSUB_A0: ['', []],//風險模型子模型代碼
    RISKMDGRADE_A0_ADJ: ['', []],//風險模型等級(策略調整後)
    RISKMDGRADE_A0_GP_ADJ: ['', []],//風險模型等級分群(策略調整後)

  });

  dss2Form1: FormGroup = this.fb.group({
    //系統決策
    SYSFLOWCD: ['', []],//系統流程
    RESLTCD: ['', []],//決策結果

    //案件資訊
    CALV: ['', []],//案件等級
    GOODBEHAV_MORT: ['', []],//往來優質特徵註記(房貸)
    GOODBEHAV_CC: ['', []],//往來優質特徵註記(信用卡)
    OCUPATN_CUST_STGP1: ['', []],//策略客群1(客戶填寫)
    OCUPATN_CUST_STGP2: ['', []],//策略客群2(客戶填寫)
    OCUPATN_CUST_GP: ['', []],//行職業代碼分群(客戶填寫)
    OCUPATN_CUST_STGP1_PM: ['', []],//策略客群1(客戶填寫) (PM分群)
    OCUPATN_CUST_STGP2_PM: ['', []],//策略客群2(客戶填寫) (PM分群)
    OCUPATN_CUST_GP_PM: ['', []],//行職業代碼分群(客戶填寫) (PM分群)
    CUST_TAG: ['', []],//客群標籤
    CUST_TAG_DESC: ['', []],//客群標籤說明

    //策略模板資訊
    STRGY_MDUL: ['', []],//試算授信策略模板分類
    STRGY_MDUL_ATVDT: ['', []],//授信策略模板生效日期時間
    STRGY_RATE_ATVDT: ['', []],//利率模板生效日期時間

    //授信及產品條件
    //1.2.3共用
    STRGY_PRDCD: ['', []],//產品名稱
    STRGY_APRFRJ: ['', []],//試算授信策略_准駁
    STRGY_PERIOD_MIN: ['', []],//期數最小值
    STRGY_PERIOD_MAX: ['', []],//期數最大值
    //期數=STRGY_PERIOD_MIN ~ STRGY_PERIOD_MAX
    STRGY_LIMIT_REVING: ['', []],//循環信貸額度
    STRGY_LIMIT_INST: ['', []],//分期信貸金額
    STRGY_LIMIT_CASH: ['', []],//分期信貸-現金額度
    STRGY_LIMIT_MERG: ['', []],//分期信貸-債整額度
    STRGY_MINPAYRT: ['', []],//每月最低還款比例(僅限循環信貸)
    STRGY_DISB_BTCR_YN: ['', []],//結帳日至還款日間客戶可申請動撥Y
    STRGY_RL_DISB_THRHLD: ['', []],//循環信貸簡易檢核動撥金額門檻
    STRGY_ORIGINFEE: ['', []],//開辦費(首次簽約用)
    STRGY_LOANEXTFEE: ['', []],//帳戶管理費(續約用)

    //額度限額資訊 3種方案相同
    LIMIT_DBR: ['', []],//限額_DBR
    LIMIT_PRDMUE: ['', []],//限額_產品MUE
    LIMIT_LAW32: ['', []],//限額_本行利害關係人(銀行法第32條)
    LIMIT_LAW33_UNS: ['', []],//限額_同一自然人無擔保授信限額(銀行法第33條)
    LIMIT_PROD_MAX: ['', []],//限額_產品/專案額度上限
    LIMIT_PROD_MIN: ['', []],//限額_產品/專案額度下限
    LIMIT_CUSTAPPLY: ['', []],//限額_客戶申請金額
    LIMIT_DTI: ['', []],//限額_月付收支比
    LIMIT_NIDMUE: ['', []],//限額_歸戶MUE
    LIMIT_MERGEAMT: ['', []],//限額_債整額度
    STRGY_NIDMUEX: ['', []],//試算授信策略_歸戶MUE倍數
    STRGY_NIDMUECAP: ['', []],//試算授信策略_歸戶MUECAP
    STRGY_PRDMUEX: ['', []],//試算授信策略_產品MUE倍數
    STRGY_PRDMUEXCAP: ['', []],//試算授信策略_產品MUECAP
    STRGY_DBRX: ['', []],//試算授信策略_DBR限額倍數
    STRGY_DTIX: ['', []],//試算授信策略_DTI參數

    //風險
    RISKMDSUB_A1: ['', []],//風險模型子模型代碼
    RISKMDGRADE_A1_ADJ: ['', []],//風險模型等級(策略調整後)
    RISKMDGRADE_A1_GP_ADJ: ['', []],//風險模型等級分群(策略調整後)

  });

  //地圖參數
  map: any;
  distance: any;

  //頁面離開時觸發
  ngOnDestroy() {
    this.CREDITSource$.unsubscribe();
  }

  ngOnInit(): void {

    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.userId = localStorage.getItem("empNo");
    this.page = sessionStorage.getItem("page");
    console.log(sessionStorage.getItem("page"))
    this.level = sessionStorage.getItem('stepName').split('t')[1];

    //先建立徵審代碼框架
    for (let i = 0; i < 10; i++) {
      var Add_CREDIT_View: CREDIT_View = { key: (i + 1).toString(), upCreditCode: null, reasonCode: null, resonContent: null, upCreditCodeList: [], creditCodeList: [] };
      this.CREDIT_View_List.push(Add_CREDIT_View);
    }

    this.childscn1Service.getSysTypeCode('CREDIT_RESULT')//核決結果下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          if (this.level == 'L4') {
            if (codeNo == 'W') {
              this.creditResultCode.push({ value: codeNo, viewValue: desc });
            }
          } else if (this.level == 'L3') {
            if (codeNo == 'C' || codeNo == 'D') {
              this.creditResultCode.push({ value: codeNo, viewValue: desc });
            }
          } else {
            if (codeNo == 'A' || codeNo == 'D') {
              this.creditResultCode.push({ value: codeNo, viewValue: desc });
            }
          }
        }
      });

    this.childscn1Service.getSysTypeCode('PERIOD_TYPE')//期別下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.periodTypeCode.push({ value: codeNo, viewValue: desc })
        }
        // this.periodType = '1';
      });

    this.childscn1Service.getSysTypeCode('INTEREST_TYPE')//利率型態下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.interestTypeCode.push({ value: codeNo, viewValue: desc })
        }
      });

    this.childscn1Service.getSysTypeCode('INTEREST_CODE')//基準利率型態下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.interestCode.push({ value: codeNo, viewValue: desc })
        }
      });

    const baseUrl = 'f01/childscn1'
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    this.childscn1Service.getImfornation(baseUrl, jsonObject).subscribe(async data => {

      this.setBlank(data.rspBody.creditInterestPeriodList.length);
      sessionStorage.setItem('count', data.rspBody.creditInterestPeriodList.length);

      //CreditAuditinfo
      if (data.rspBody.CreditAuditinfoList.length > 0) {
        this.cuCName = data.rspBody.CreditAuditinfoList[0].cuCname;
        this.custId = data.rspBody.CreditAuditinfoList[0].custId;
        sessionStorage.setItem('custId', this.custId);
        this.nationalId = data.rspBody.CreditAuditinfoList[0].nationalId;
        this.prodCode = data.rspBody.CreditAuditinfoList[0].prodCode;
        this.applicationAmount = data.rspBody.CreditAuditinfoList[0].applicationAmount == null ? '' : this.toCurrency(data.rspBody.CreditAuditinfoList[0].applicationAmount.toString());
        this.caApplicationAmount = data.rspBody.CreditAuditinfoList[0].applicationAmount == null ? '' : this.toCurrency(data.rspBody.CreditAuditinfoList[0].applicationAmount.toString());
        if (data.rspBody.CreditAuditinfoList[0].caApplicationAmount != 0 && data.rspBody.CreditAuditinfoList[0].caApplicationAmount != '' && data.rspBody.CreditAuditinfoList[0].caApplicationAmount != null) {
          this.caApplicationAmount = this.toCurrency(data.rspBody.CreditAuditinfoList[0].caApplicationAmount.toString());
        }
        sessionStorage.setItem('caApplicationAmount', this.toNumber(this.caApplicationAmount));
        this.purposeCode = data.rspBody.CreditAuditinfoList[0].purposeCode;
      }

      //AML
      if (data.rspBody.amlList.length > 0) {
        this.aml = data.rspBody.amlList[0].AML;
        this.amlDesc = data.rspBody.amlList[0].CODE_DESC;
        this.amlDate = data.rspBody.amlList[0].AML_DATE;
      }

      //FDS
      if (data.rspBody.fdsList.length > 0) {
        this.fds = data.rspBody.fdsList[0].FDS;
        this.fdsDesc = data.rspBody.fdsList[0].CODE_DESC;
        this.fdsDate = data.rspBody.fdsList[0].FDS_DATE;
      }

      //CSS
      if (data.rspBody.cssList.length > 0) {
        this.cssScore = data.rspBody.cssList[0].cssScore;
        this.cssGrade = data.rspBody.cssList[0].cssGrade;
        this.cssDate = this.pipe.transform(new Date(data.rspBody.cssList[0].cssDate), 'yyyy-MM-dd HH:mm:ss');
      }

      //RPM
      if (data.rspBody.rpmList.length > 0) {
        this.isRpm = data.rspBody.rpmList[0].isRpm;
        this.rpmTypeDescribe = data.rspBody.rpmList[0].rpmTypeDescribe;
        this.rpmDate = this.pipe.transform(new Date(data.rspBody.rpmList[0].rpmDate), 'yyyy-MM-dd HH:mm:ss');
        this.rpmId = data.rspBody.rpmList[0].rpmId;
      }

      //DSS1
      if (data.rspBody.dss1List.length > 0) {
        this.sysflowcdOne = data.rspBody.dss1List[0].sysflowcd;
        this.resltcdOne = data.rspBody.dss1List[0].resltcd;
        this.calvOne = data.rspBody.dss1List[0].calv;
        this.ocupatnCustGpOne = data.rspBody.dss1List[0].ocupatnCustGp;
        this.ocupatnCustStgp1One = data.rspBody.dss1List[0].ocupatnCustStgp1;
        this.ocupatnCustStgp2One = data.rspBody.dss1List[0].ocupatnCustStgp2;
        this.goodbehavMortOne = data.rspBody.dss1List[0].goodbehavMort;
        this.goodbehavCcOne = data.rspBody.dss1List[0].goodbehavCc;
        this.riskmdscoreA0 = data.rspBody.dss1List[0].riskmdscoreA0;
        this.riskmdgradeA0Adj = data.rspBody.dss1List[0].riskmdgradeA0Adj;
      }

      //DSS2
      if (data.rspBody.dss2List.length > 0) {
        this.sysflowcdTwo = data.rspBody.dss2List[0].sysflowcd;
        this.resltcdTwo = data.rspBody.dss2List[0].resltcd;
        this.calvTwo = data.rspBody.dss2List[0].calv;
        this.ocupatnCustGpTwo = data.rspBody.dss2List[0].ocupatnCustGp + data.rspBody.dss2List[0].ocupatnCustGpDesc;
        this.ocupatnCustStgp1Two = data.rspBody.dss2List[0].ocupatnCustStgp1 + data.rspBody.dss2List[0].ocupatnCustStgp1Desc;
        this.ocupatnCustStgp2Two = data.rspBody.dss2List[0].ocupatnCustStgp2;
        this.goodbehavMortTwo = data.rspBody.dss2List[0].goodbehavMort;
        this.goodbehavCcTwo = data.rspBody.dss2List[0].goodbehavCc;
        this.riskmdscoreA1 = data.rspBody.dss2List[0].riskmdscoreA1;
        this.riskmdgradeA1Adj = data.rspBody.dss2List[0].riskmdgradeA1Adj;
        this.custTag = data.rspBody.dss2List[0].custTag + '/' + data.rspBody.dss2List[0].custTagDesc;
      }

      //DSS2Strgy
      if (data.rspBody.dss2StrgyList.length > 0) {
        this.strgyAprfrj = data.rspBody.dss2StrgyList[0].strgyAprfrj;
        this.strgyLimitReving = data.rspBody.dss2StrgyList[0].strgyLimitReving;
        this.strgyMinpayrt = data.rspBody.dss2StrgyList[0].strgyMinpayrt;
      }

      //result
      if (data.rspBody.resultList.length > 0) {
        this.resultProdCode = data.rspBody.resultList[0].prodCode;
        this.resultPrjCode = data.rspBody.resultList[0].prjCode;
        this.creditResult = data.rspBody.resultList[0].creditResult;
        sessionStorage.setItem('creditResult', data.rspBody.resultList[0].creditResult ? data.rspBody.resultList[0].creditResult : '');
        this.resultApproveAmt = data.rspBody.resultList[0].approveAmt == null ? '0' : this.toCurrency(data.rspBody.resultList[0].approveAmt.toString());
        sessionStorage.setItem('resultApproveAmt',this.toNumber(this.resultApproveAmt));
        this.resultLowestPayRate = data.rspBody.resultList[0].lowestPayRate;
        sessionStorage.setItem('resultLowestPayRate', this.resultLowestPayRate.toString());
        this.caPmcus = data.rspBody.resultList[0].caPmcus;
        sessionStorage.setItem('caPmcus', data.rspBody.resultList[0].caPmcus ? data.rspBody.resultList[0].caPmcus : '');
        this.caRisk = data.rspBody.resultList[0].caRisk;
        sessionStorage.setItem('caRisk', data.rspBody.resultList[0].caRisk ? data.rspBody.resultList[0].caRisk : '');
      }

      let erroeStr: string = '';

      //creditInterestPeriod
      if (data.rspBody.creditInterestPeriodList.length > 0) {
        this.CreditInterestPeriodSource = data.rspBody.creditInterestPeriodList;
        for (let index = 1; index <= this.CreditInterestPeriodSource.length; index++) {
          if (this.CreditInterestPeriodSource[index - 1].interestType == '02') {
            if ( !(await this.childscn1Service.getInterestBase('f01/childscn1action3', jsonObject)).includes('找不到') ) {
              this.CreditInterestPeriodSource[index - 1].interestBase = await this.childscn1Service.getInterestBase('f01/childscn1action3', jsonObject);
              sessionStorage.setItem('interestBase' + index, this.CreditInterestPeriodSource[index - 1].interestBase);
            } else {
              erroeStr = '加減碼查無利率，請通知相關人員!'
              this.CreditInterestPeriodSource[index - 1].interestType = '';
              this.CreditInterestPeriodSource[index - 1].interestBase = 0;
              sessionStorage.setItem('interestBase' + index, '0');
            }
          } else {
            sessionStorage.setItem('interestBase' + index, '0');
          }
          sessionStorage.setItem('id' + index, this.CreditInterestPeriodSource[index - 1].id);
          sessionStorage.setItem('period' + index, this.CreditInterestPeriodSource[index - 1].period ? this.CreditInterestPeriodSource[index - 1].period : '');
          sessionStorage.setItem('interestType' + index, this.CreditInterestPeriodSource[index - 1].interestType ? this.CreditInterestPeriodSource[index - 1].interestType : '');
          sessionStorage.setItem('interest' + index, this.CreditInterestPeriodSource[index - 1].interest != null ? this.CreditInterestPeriodSource[index - 1].interest : 0);
          this.CreditInterestPeriodSource[index - 1].periodType = this.CreditInterestPeriodSource[index - 1].periodType != null && this.CreditInterestPeriodSource[index - 1].periodType != '' ? this.CreditInterestPeriodSource[index - 1].periodType : '1';
          sessionStorage.setItem('periodType' + index, this.CreditInterestPeriodSource[index - 1].periodType);
          this.CreditInterestPeriodSource[index - 1].approveInterest = Number(this.CreditInterestPeriodSource[index - 1].interestBase) + Number(this.CreditInterestPeriodSource[index - 1].interest);
          sessionStorage.setItem('approveInterest' + index, this.CreditInterestPeriodSource[index - 1].approveInterest);
        }

        if ( erroeStr != '') {
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: erroeStr }
          });
        }
        // this.period = data.rspBody.creditInterestPeriodList[0].period;
        // sessionStorage.setItem('period', data.rspBody.creditInterestPeriodList[0].period ? data.rspBody.creditInterestPeriodList[0].period : '');
        // this.interestType = data.rspBody.creditInterestPeriodList[0].interestType;
        // sessionStorage.setItem('interestType', data.rspBody.creditInterestPeriodList[0].interestType ? data.rspBody.creditInterestPeriodList[0].interestType : '');
        // this.interest = data.rspBody.creditInterestPeriodList[0].interest;
        // sessionStorage.setItem('interest', data.rspBody.creditInterestPeriodList[0].interest ? data.rspBody.creditInterestPeriodList[0].interest : '');
        // this.periodType = '1';
        // sessionStorage.setItem('periodType', this.periodType);
        // if (this.interestType == '02') {
        //   this.interestBase = await this.childscn1Service.getInterestBase('f01/childscn1action3', jsonObject);
        // }
        //this.interestBase = data.rspBody.creditInterestPeriodList[0].interestBase;
        // sessionStorage.setItem('interestBase', data.rspBody.creditInterestPeriodList[0].interestBase ? data.rspBody.creditInterestPeriodList[0].interestBase : '');
        // this.interestCode = data.rspBody.creditInterestPeriodList[0].interestCode;
        // this.approveInterest = Number(this.interestBase) + Number(this.interest)
        // sessionStorage.setItem('approveInterest', this.approveInterest.toString());
      }

      //CustomerInfo Channel資訊
      if (data.rspBody.customerInfoList.length > 0) {
        this.cuGps1 = data.rspBody.customerInfoList[0].cuGps1 && data.rspBody.customerInfoList[0].cuGps1.includes(',') ? data.rspBody.customerInfoList[0].cuGps1 : '0,0';
        this.cuGps2 = data.rspBody.customerInfoList[0].cuGps2 && data.rspBody.customerInfoList[0].cuGps2.includes(',') ? data.rspBody.customerInfoList[0].cuGps2 : '0,0';
        this.cuIpAddr1 = data.rspBody.customerInfoList[0].cuIpAddr1 ? data.rspBody.customerInfoList[0].cuIpAddr1 : '';
        this.cuIpAddr2 = data.rspBody.customerInfoList[0].cuIpAddr2 ? data.rspBody.customerInfoList[0].cuIpAddr2 : '';
        this.cuDeviceName1 = data.rspBody.customerInfoList[0].cuDeviceName1 ? data.rspBody.customerInfoList[0].cuDeviceName1 : '';
        this.cuDeviceName2 = data.rspBody.customerInfoList[0].cuDeviceName2 ? data.rspBody.customerInfoList[0].cuDeviceName2 : '';
        this.cuDeviceId1 = data.rspBody.customerInfoList[0].cuDeviceId1 ? data.rspBody.customerInfoList[0].cuDeviceId1 : '';
        this.cuDeviceId2 = data.rspBody.customerInfoList[0].cuDeviceId2 ? data.rspBody.customerInfoList[0].cuDeviceId2 : '';

        //map
        // this.map = L.map('map', { center: [25.0249211, 121.5075035], zoom: 12 });//指定欲繪製地圖在id為map的元素中，中心座標為[25.0249211,121.5075035]，縮放程度為16
        //生成地圖S
        this.map = L.map('map').setView([Number(this.cuGps1.split(',')[0]), Number(this.cuGps1.split(',')[1])], 12);
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          // attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        tiles.addTo(this.map);

        //標點
        const marker1 = L
          .marker([Number(this.cuGps1.split(',')[0]), Number(this.cuGps1.split(',')[1])], { title: '' })
          .addTo(this.map).openPopup();//開啟彈出視窗

        const marker2 = L.marker([Number(this.cuGps2.split(',')[0]), Number(this.cuGps2.split(',')[1])], { title: '' })
          .addTo(this.map).openPopup();//開啟彈出視窗

        this.map.invalidateSize(true);

        //計算兩點座標距離
        var markerFrom = L.circleMarker([Number(this.cuGps1.split(',')[0]), Number(this.cuGps1.split(',')[1])], { color: "#F00", radius: 10 });
        var markerTo = L.circleMarker([Number(this.cuGps2.split(',')[0]), Number(this.cuGps2.split(',')[1])], { color: "#4AFF00", radius: 10 });
        var from = markerFrom.getLatLng();
        var to = markerTo.getLatLng();
        this.distance = (from.distanceTo(to)).toFixed(0) / 1000;

        //取兩點座標中心
        var corner1 = L.latLng(Number(this.cuGps1.split(',')[0]), Number(this.cuGps1.split(',')[1])),
          corner2 = L.latLng(Number(this.cuGps2.split(',')[0]), Number(this.cuGps2.split(',')[1])),
          bounds = L.latLngBounds(corner1, corner2);
        this.map.fitBounds(bounds);
      }

      this.historySource = JSON.parse(JSON.stringify(this.CreditInterestPeriodSource))
      //依照人員層級存資料異動 20211230
      if (this.level == 'L4') {
        this.f01001Scn1Service.setHistorySource({
          creditResult: this.creditResult
        })
      } else if (this.level == 'L3') {
        this.f01002scn1Service.setHistorySource({
          creditResult: this.creditResult,
          lowestPayRate: this.resultLowestPayRate,
          approveAmt: this.resultApproveAmt,
          caApplicationAmount: this.caApplicationAmount,
          caPmcus: this.caPmcus,
          caRisk: this.caRisk,
          CreditInterestPeriodSource: this.historySource
          // period: this.CreditInterestPeriodSource[0].period,
          // periodType: this.CreditInterestPeriodSource[0].periodType,
          // interestType: this.CreditInterestPeriodSource[0].interestType,
          // approveInterest: this.CreditInterestPeriodSource[0].approveInterest,
          // interest: this.CreditInterestPeriodSource[0].interest,
          // interestBase: this.CreditInterestPeriodSource[0].interestBase
        })
      } else if (this.level == 'L2') {
        this.f01003scn1Service.setHistorySource({
          creditResult: this.creditResult,
          lowestPayRate: this.resultLowestPayRate,
          approveAmt: this.resultApproveAmt,
          caPmcus: this.caPmcus,
          caRisk: this.caRisk,
          CreditInterestPeriodSource: this.historySource
          // period: this.CreditInterestPeriodSource[0].period,
          // periodType: this.CreditInterestPeriodSource[0].periodType,
          // interestType: this.CreditInterestPeriodSource[0].interestType,
          // approveInterest: this.CreditInterestPeriodSource[0].approveInterest,
          // interest: this.CreditInterestPeriodSource[0].interest,
          // interestBase: this.CreditInterestPeriodSource[0].interestBase
        })
      } else if (this.level == 'L1') {
        this.f01007scn1Service.setHistorySource({
          creditResult: this.creditResult,
          lowestPayRate: this.resultLowestPayRate,
          approveAmt: this.resultApproveAmt,
          caPmcus: this.caPmcus,
          caRisk: this.caRisk,
          CreditInterestPeriodSource: this.historySource
          // period: this.CreditInterestPeriodSource[0].period,
          // periodType: this.CreditInterestPeriodSource[0].periodType,
          // interestType: this.CreditInterestPeriodSource[0].interestType,
          // approveInterest: this.CreditInterestPeriodSource[0].approveInterest,
          // interest: this.CreditInterestPeriodSource[0].interest,
          // interestBase: this.CreditInterestPeriodSource[0].interestBase
        })
      } else if (this.level == 'L0') {
        this.f01004scn1Service.setHistorySource({
          creditResult: this.creditResult,
          lowestPayRate: this.resultLowestPayRate,
          approveAmt: this.resultApproveAmt,
          caPmcus: this.caPmcus,
          caRisk: this.caRisk,
          CreditInterestPeriodSource: this.historySource,
          // period: this.CreditInterestPeriodSource[0].period,
          // periodType: this.CreditInterestPeriodSource[0].periodType,
          // interestType: this.CreditInterestPeriodSource[0].interestType,
          // approveInterest: this.CreditInterestPeriodSource[0].approveInterest,
          // interest: this.CreditInterestPeriodSource[0].interest,
          // interestBase: this.CreditInterestPeriodSource[0].interestBase
        })
      }
    })

    this.getCreditmemo(this.pageIndex, this.pageSize);
    this.getDSS11();
    this.getDSS21();
    this.getADR_CODE();
    this.getCREDIT_Data();
    this.getSUPPLY_AML();
  }

  ngAfterViewInit(): void {
  }

  getLevel() {
    return this.level;
  }

  getStepName() {
    return sessionStorage.getItem('stepName');
  }

  getSearch() {
    return this.search;
  }

  getCreditmemo(pageIndex: number, pageSize: number) {
    const baseUrl = 'f01/childscn1scn1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.childscn1Service.getImfornation(baseUrl, jsonObject).subscribe(data => {
      console.log(data)
      this.total = data.rspBody.size;
      this.creditmemoSource = data.rspBody.list;
      for (let index = 0; index < this.creditmemoSource.length; index++) {
        if (this.creditmemoSource[index].CREDITLEVEL == sessionStorage.getItem('stepName').split('t')[1] && this.creditmemoSource[index].CREDITUSER.includes(this.userId)) {
          this.mark = this.creditmemoSource[index].CREDITACTION;
        }
      }
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getCreditmemo(pageIndex, pageSize);
  }

  changePage() {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.total = 1;
  }

  //儲存
  public async save(): Promise<void> {
    let msgStr: string = "";
    const baseUrl = 'f01/childscn1action1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['creditaction'] = this.mark;
    jsonObject['creditlevel'] = sessionStorage.getItem('stepName').split('t')[1];
    msgStr = await this.childscn1Service.saveCreditmemo(baseUrl, jsonObject);
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    this.changePage();
    this.getCreditmemo(this.pageIndex, this.pageSize);
    // this.insertHistory(this.mark);
  }

  formatDate(date: string) {
    return date.split("T")[0] + " " + date.split("T")[1].split(".")[0];
  }

  async changeInterest(value: any) {
    if (value.interestType == '02') {
      value.interestValue = '1';
      let jsonObject: any = {};
      jsonObject['applno'] = this.applno;
      const baseUrl = 'f01/childscn1action3';
      if ( (await this.childscn1Service.getInterestBase(baseUrl, jsonObject)).includes('找不到') ) {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: '加減碼查無利率，請通知相關人員!' }
        });
        value.interestType = '';
        value.interestBase = 0;
      } else {
        value.interestBase = await this.childscn1Service.getInterestBase(baseUrl, jsonObject);
      }
      // this.interestBase = 2;
      value.approveInterest = Number(value.interestBase) + Number(value.interest);
    } else {
      value.interestValue = '';
      value.interestBase = 0
      value.approveInterest = Number(value.interestBase) + Number(value.interest);
    }
    sessionStorage.setItem('approveInterest' + value.seq, value.approveInterest.toString());
    sessionStorage.setItem('interestType' + value.seq, value.interestType);
    sessionStorage.setItem('interest' + value.seq, value.interest.toString());
    sessionStorage.setItem('interestBase' + value.seq, value.interestBase.toString());
  }

  changeInterestValue() {
    let msgStr: string = "";
    if (this.interestType != "02") {
      msgStr = '利率型態請選擇加減碼';
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msgStr }
      });
      // childernDialogRef.afterClosed().subscribe(result => {
      //   this.interestValue = '';
      // });
    }
  }

  caluclate(value: any) {
    if (isNaN(value.interest)) {
      const childernDialogRef = value.dialog.open(ConfirmComponent, {
        data: { msgStr: '利率請輸入數字!' }
      });
      childernDialogRef.afterClosed().subscribe(result => {
        value.interest = null;
        value.approveInterest = null;
      });
    } else {
      if (value.interestBase == null) {
        value.approveInterest = Number(value.interest);
      } else {
        value.approveInterest = Number(value.interestBase) + Number(value.interest);
      }
      sessionStorage.setItem('approveInterest' + value.seq, value.approveInterest.toString());
      sessionStorage.setItem('interest' + value.seq, value.interest.toString());
      sessionStorage.setItem('interestBase' + value.seq, value.interestBase != null ? value.interestBase.toString() : '');
    }
  }

  open() {
    const url = window.location.href.split("/#");
    window.open(url[0] + "/#/MAP");
  }

  change(value: any, valueName: string, index: string) {
    if (index != '') {
      sessionStorage.setItem(valueName + index, value);
    } else {
      sessionStorage.setItem(valueName, value);
    }
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode < 110 && charCode > 110) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請輸入數字!' }
      });
      return false;
    }
    return true;
  }

  getStyle(value: string) {
    // value = this.toNumber(value);
    value = value != null ? value.replace(',', '') : value;
    return {
      'text-align': this.isNumber(value) ? 'right' : 'left'
    }
  }

  isNumber(value: any) { return /^-?[\d.]+(?:e-?\d+)?$/.test(value); }

  //審核註記編輯
  startEdit(creditaction: string, rowId: string, creditUser: string) {
    if (creditUser == this.userId) {
      const dialogRef = this.dialog.open(Childscn1editComponent, {
        minHeight: '70vh',
        width: '50%',
        panelClass: 'mat-dialog-transparent',
        data: {
          creditaction: creditaction,
          creditlevel: sessionStorage.getItem('stepName').split('t')[1],
          applno: this.applno,
          rowId: rowId
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getCreditmemo(this.pageIndex, this.pageSize);
        this.insertHistory(result.value);
      });
    } else {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請修改同User註記!' }
      });
      return false;
    }
  }

  //+逗號
  toCurrency(amount: string) {
    return amount != null ? amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : amount;
  }

  //去除符號/中英文
  toNumber(data: string) {
    return data != null ? data.replace(/[^\w\s]|_/g, '') : data;
  }

  //取決策1Table
  getDSS11() {
    const url = 'f01/childscn10action';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['strgy'] = "1";
    //測試用
    // jsonObject['applno'] = '20211129A000005';
    // jsonObject['applno'] = '20211126A000001';
    this.childscn1Service.getDate_Json(url, jsonObject).subscribe(data => {

      if (data.rspBody.DSS1.length > 0) {
        //系統決策
        this.dss1Form1.patchValue({ SYSFLOWCD: data.rspBody.DSS1[0].SYSFLOWCD })//系統流程
        this.dss1Form1.patchValue({ RESLTCD: data.rspBody.DSS1[0].RESLTCD })//決策結果

        //案件資訊
        this.dss1Form1.patchValue({ CALV: data.rspBody.DSS1[0].CALV })//案件等級
        this.dss1Form1.patchValue({ GOODBEHAV_MORT: data.rspBody.DSS1[0].GOODBEHAV_MORT })//往來優質特徵註記(房貸)
        this.dss1Form1.patchValue({ GOODBEHAV_CC: data.rspBody.DSS1[0].GOODBEHAV_CC })//往來優質特徵註記(信用卡)
        this.dss1Form1.patchValue({ OCUPATN_CUST_STGP1: data.rspBody.DSS1[0].OCUPATN_CUST_STGP1 })//策略客群1(客戶填寫)
        this.dss1Form1.patchValue({ OCUPATN_CUST_STGP2: data.rspBody.DSS1[0].OCUPATN_CUST_STGP2 })//策略客群2(客戶填寫)
        this.dss1Form1.patchValue({ OCUPATN_CUST_GP: data.rspBody.DSS1[0].OCUPATN_CUST_GP })//行職業代碼分群(客戶填寫)
        this.dss1Form1.patchValue({ OCUPATN_CUST_STGP1_PM: data.rspBody.DSS1[0].OCUPATN_CUST_STGP1_PM })//策略客群1(客戶填寫) (PM分群)
        this.dss1Form1.patchValue({ OCUPATN_CUST_STGP2_PM: data.rspBody.DSS1[0].OCUPATN_CUST_STGP2_PM })//策略客群2(客戶填寫) (PM分群)
        this.dss1Form1.patchValue({ OCUPATN_CUST_GP_PM: data.rspBody.DSS1[0].OCUPATN_CUST_GP_PM })//行職業代碼分群(客戶填寫) (PM分群)
        this.dss1Form1.patchValue({ CUST_TAG: data.rspBody.DSS1[0].CUST_TAG })//客群標籤
        this.dss1Form1.patchValue({ CUST_TAG_DESC: data.rspBody.DSS1[0].CUST_TAG_DESC })//客群標籤說明

        //風險 後期新增三欄位
        this.dss1Form1.patchValue({ RISKMDSUB_A0: data.rspBody.DSS1[0].RISKMDSUB_A0 })//風險模型子模型代碼
        this.dss1Form1.patchValue({ RISKMDGRADE_A0_ADJ: data.rspBody.DSS1[0].RISKMDGRADE_A0_ADJ })//風險模型等級(策略調整後)
        this.dss1Form1.patchValue({ RISKMDGRADE_A0_GP_ADJ: data.rspBody.DSS1[0].RISKMDGRADE_A0_GP_ADJ })//風險模型等級分群(策略調整後)


      }
      this.EL_DSS1_UNDW_LIST.data = data.rspBody.DSS1UNDWLIST;//徵審代碼
      if (data.rspBody.DSS1UNDWLIST.length > 0) {
        this.EL_DSS1_UNDW_LIST1.data = this.EL_DSS1_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '1');//1	信用異常資訊
        this.EL_DSS1_UNDW_LIST2.data = this.EL_DSS1_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '2');//2	整體往來
        this.EL_DSS1_UNDW_LIST3.data = this.EL_DSS1_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '3');//3	信用卡往來
        this.EL_DSS1_UNDW_LIST4.data = this.EL_DSS1_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '4');//4	授信往來
        this.EL_DSS1_UNDW_LIST5.data = this.EL_DSS1_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '9');//9	其他
      }
    });
  }

  //取決策1Table
  getDSS21() {
    const url = 'f01/childscn10action3';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['strgy'] = "1";
    //測試用
    // jsonObject['applno'] = '20211116A000003';
    // jsonObject['applno'] = '20211126A000001';
    this.childscn1Service.getDate_Json(url, jsonObject).subscribe(data => {
      if (data.rspBody.DSS2.length > 0) {
        //系統決策
        this.dss2Form1.patchValue({ SYSFLOWCD: data.rspBody.DSS2[0].SYSFLOWCD })//系統流程
        this.dss2Form1.patchValue({ RESLTCD: data.rspBody.DSS2[0].RESLTCD })//決策結果

        //案件資訊
        this.dss2Form1.patchValue({ CALV: data.rspBody.DSS2[0].CALV })//案件等級
        this.dss2Form1.patchValue({ GOODBEHAV_MORT: data.rspBody.DSS2[0].GOODBEHAV_MORT })//往來優質特徵註記(房貸)
        this.dss2Form1.patchValue({ GOODBEHAV_CC: data.rspBody.DSS2[0].GOODBEHAV_CC })//往來優質特徵註記(信用卡)
        this.dss2Form1.patchValue({ OCUPATN_CUST_STGP1: data.rspBody.DSS2[0].OCUPATN_CUST_STGP1 })//策略客群1(客戶填寫)
        this.dss2Form1.patchValue({ OCUPATN_CUST_STGP2: data.rspBody.DSS2[0].OCUPATN_CUST_STGP2 })//策略客群2(客戶填寫)
        this.dss2Form1.patchValue({ OCUPATN_CUST_GP: data.rspBody.DSS2[0].OCUPATN_CUST_GP })//行職業代碼分群(客戶填寫)
        this.dss2Form1.patchValue({ OCUPATN_CUST_STGP1_PM: data.rspBody.DSS2[0].OCUPATN_CUST_STGP1_PM })//策略客群1(客戶填寫) (PM分群)
        this.dss2Form1.patchValue({ OCUPATN_CUST_STGP2_PM: data.rspBody.DSS2[0].OCUPATN_CUST_STGP2_PM })//策略客群2(客戶填寫) (PM分群)
        this.dss2Form1.patchValue({ OCUPATN_CUST_GP_PM: data.rspBody.DSS2[0].OCUPATN_CUST_GP_PM })//行職業代碼分群(客戶填寫) (PM分群)
        this.dss2Form1.patchValue({ CUST_TAG: data.rspBody.DSS2[0].CUST_TAG })//客群標籤
        this.dss2Form1.patchValue({ CUST_TAG_DESC: data.rspBody.DSS2[0].CUST_TAG_DESC })//客群標籤說明

        //策略模板資訊
        this.dss2Form1.patchValue({ STRGY_MDUL: data.rspBody.DSS2[0].STRGY_MDUL })//試算授信策略模板分類
        this.dss2Form1.patchValue({ STRGY_MDUL_ATVDT: data.rspBody.DSS2[0].STRGY_MDUL_ATVDT })//授信策略模板生效日期時間
        this.dss2Form1.patchValue({ STRGY_RATE_ATVDT: data.rspBody.DSS2[0].STRGY_RATE_ATVDT })//利率模板生效日期時間

        //風險
        this.dss2Form1.patchValue({ RISKMDSUB_A1: data.rspBody.DSS2[0].RISKMDSUB_A1 })//風險模型子模型代碼
        this.dss2Form1.patchValue({ RISKMDGRADE_A1_ADJ: data.rspBody.DSS2[0].RISKMDGRADE_A1_ADJ })//風險模型等級(策略調整後)
        this.dss2Form1.patchValue({ RISKMDGRADE_A1_GP_ADJ: data.rspBody.DSS2[0].RISKMDGRADE_A1_GP_ADJ })//風險模型等級分群(策略調整後)

      }
      if (data.rspBody.DSS2STRGY.length > 0) {
        //授信及產品條件
        //1.2.3共用
        this.dss2Form1.patchValue({ STRGY_PRDCD: data.rspBody.DSS2STRGY[0].STRGY_PRDCD })//產品名稱
        this.dss2Form1.patchValue({ STRGY_APRFRJ: data.rspBody.DSS2STRGY[0].STRGY_APRFRJ })//試算授信策略_准駁
        this.dss2Form1.patchValue({ STRGY_PERIOD_MIN: data.rspBody.DSS2STRGY[0].STRGY_PERIOD_MIN })//期數最小值
        this.dss2Form1.patchValue({ STRGY_PERIOD_MAX: data.rspBody.DSS2STRGY[0].STRGY_PERIOD_MAX })//期數最大值
        //期數=STRGY_PERIOD_MIN ~ STRGY_PERIOD_MAX
        this.dss2Form1.patchValue({ STRGY_LIMIT_REVING: this.data_number(data.rspBody.DSS2STRGY[0].STRGY_LIMIT_REVING) })//循環信貸額度
        this.dss2Form1.patchValue({ STRGY_LIMIT_INST: this.data_number(data.rspBody.DSS2STRGY[0].STRGY_LIMIT_INST) })//分期信貸金額
        this.dss2Form1.patchValue({ STRGY_LIMIT_CASH: this.data_number(data.rspBody.DSS2STRGY[0].STRGY_LIMIT_CASH) })//分期信貸-現金額度
        this.dss2Form1.patchValue({ STRGY_LIMIT_MERG: this.data_number(data.rspBody.DSS2STRGY[0].STRGY_LIMIT_MERG) })//分期信貸-債整額度
        this.dss2Form1.patchValue({ STRGY_MINPAYRT: data.rspBody.DSS2STRGY[0].STRGY_MINPAYRT })//每月最低還款比例(僅限循環信貸)
        this.dss2Form1.patchValue({ STRGY_DISB_BTCR_YN: data.rspBody.DSS2STRGY[0].STRGY_DISB_BTCR_YN })//結帳日至還款日間客戶可申請動撥Y
        this.dss2Form1.patchValue({ STRGY_RL_DISB_THRHLD: this.data_number(data.rspBody.DSS2STRGY[0].STRGY_RL_DISB_THRHLD) })//循環信貸簡易檢核動撥金額門檻
        this.dss2Form1.patchValue({ STRGY_ORIGINFEE: this.data_number(data.rspBody.DSS2STRGY[0].STRGY_ORIGINFEE) })//開辦費(首次簽約用)
        this.dss2Form1.patchValue({ STRGY_LOANEXTFEE: this.data_number(data.rspBody.DSS2STRGY[0].STRGY_LOANEXTFEE) })//帳戶管理費(續約用)

        //額度限額資訊 3種方案相同
        this.dss2Form1.patchValue({ LIMIT_DBR: this.data_number(data.rspBody.DSS2STRGY[0].LIMIT_DBR) })//限額_DBR
        this.dss2Form1.patchValue({ LIMIT_PRDMUE: this.data_number(data.rspBody.DSS2STRGY[0].LIMIT_PRDMUE) })//限額_產品MUE
        this.dss2Form1.patchValue({ LIMIT_LAW32: this.data_number(data.rspBody.DSS2STRGY[0].LIMIT_LAW32) })//限額_本行利害關係人(銀行法第32條)
        this.dss2Form1.patchValue({ LIMIT_LAW33_UNS: this.data_number(data.rspBody.DSS2STRGY[0].LIMIT_LAW33_UNS) })//限額_同一自然人無擔保授信限額(銀行法第33條)
        this.dss2Form1.patchValue({ LIMIT_PROD_MAX: this.data_number(data.rspBody.DSS2STRGY[0].LIMIT_PROD_MAX) })//限額_產品/專案額度上限
        this.dss2Form1.patchValue({ LIMIT_PROD_MIN: this.data_number(data.rspBody.DSS2STRGY[0].LIMIT_PROD_MIN) })//限額_產品/專案額度下限
        this.dss2Form1.patchValue({ LIMIT_CUSTAPPLY: this.data_number(data.rspBody.DSS2STRGY[0].LIMIT_CUSTAPPLY) })//限額_客戶申請金額
        this.dss2Form1.patchValue({ LIMIT_DTI: this.data_number(data.rspBody.DSS2STRGY[0].LIMIT_DTI) })//限額_月付收支比
        this.dss2Form1.patchValue({ LIMIT_NIDMUE: this.data_number(data.rspBody.DSS2STRGY[0].LIMIT_NIDMUE) })//限額_歸戶MUE
        this.dss2Form1.patchValue({ LIMIT_MERGEAMT: this.data_number(data.rspBody.DSS2STRGY[0].LIMIT_MERGEAMT) })//限額_債整額度
        this.dss2Form1.patchValue({ STRGY_NIDMUEX: data.rspBody.DSS2STRGY[0].STRGY_NIDMUEX })//試算授信策略_歸戶MUE倍數
        this.dss2Form1.patchValue({ STRGY_NIDMUECAP: data.rspBody.DSS2STRGY[0].STRGY_NIDMUECAP })//試算授信策略_歸戶MUECAP
        this.dss2Form1.patchValue({ STRGY_PRDMUEX: data.rspBody.DSS2STRGY[0].STRGY_PRDMUEX })//試算授信策略_產品MUE倍數
        this.dss2Form1.patchValue({ STRGY_PRDMUEXCAP: data.rspBody.DSS2STRGY[0].STRGY_PRDMUEXCAP })//試算授信策略_產品MUECAP
        this.dss2Form1.patchValue({ STRGY_DBRX: data.rspBody.DSS2STRGY[0].STRGY_DBRX })//試算授信策略_DBR限額倍數
        this.dss2Form1.patchValue({ STRGY_DTIX: data.rspBody.DSS2STRGY[0].STRGY_DTIX })//試算授信策略_DTI參數 注意名稱差異

      }
      this.EL_DSS2_UNDW_LIST.data = data.rspBody.DSS2UNDWLIST;//徵審代碼
      if (data.rspBody.DSS2UNDWLIST.length > 0) {
        this.EL_DSS2_UNDW_LIST1.data = this.EL_DSS2_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '1');//1	信用異常資訊
        this.EL_DSS2_UNDW_LIST2.data = this.EL_DSS2_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '2');//2	整體往來
        this.EL_DSS2_UNDW_LIST3.data = this.EL_DSS2_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '3');//3	信用卡往來
        this.EL_DSS2_UNDW_LIST4.data = this.EL_DSS2_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '4');//4	授信往來
        this.EL_DSS2_UNDW_LIST5.data = this.EL_DSS2_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '9');//9	其他
      }
      this.EL_DSS2_CFC_LIMIT1.data = data.rspBody.DSS2CFCLIMIT;//試算額度策略
      for(const data of this.EL_DSS2_CFC_LIMIT1.data){
        if(data.CFC_LIMIT_DT_REF=='1'){data.CFC_LIMIT_DT_REF+=' : 使用【額度起日】及【額度迄日】欄位';}
        if(data.CFC_LIMIT_DT_REF=='2'){data.CFC_LIMIT_DT_REF+=' : 使用【期限月數】';}
      }
      this.EL_DSS2_STRGY_SRATE1.data = data.rspBody.DSS2STRGYSRATE;//試算利率(多階)
      this.EL_DSS2_STRGY_MERG1.data = data.rspBody.DSS2STRGYMERG;//試算授信策略_債整明細
    });
  }

  setBlank(size: number) {
    for (let index = 1; index <= size; index++) {
      sessionStorage.setItem("approveInterest" + index, "");
      sessionStorage.setItem("interestType" + index, "");
      sessionStorage.setItem("interest" + index, "");
      sessionStorage.setItem("interestBase" + index, "");
      sessionStorage.setItem("id" + index, "");
      sessionStorage.setItem("period" + index, "");
      sessionStorage.setItem("periodType" + index, "");
    }
    sessionStorage.setItem("resultApproveAmt", "");
    sessionStorage.setItem("resultLowestPayRate", "");
    sessionStorage.setItem("creditResult", "");
    sessionStorage.setItem("caApplicationAmount", "");
    sessionStorage.setItem("caPmcus", "");
    sessionStorage.setItem("caRisk", "");
    sessionStorage.setItem("mark", "");
  }

  //新增審核註記歷史資料
  insertHistory(value: string): any {
    const baseUrl = 'f01/childscn2action2';
    const content = []
    let msg = '';
    let jsonObject: any = {};
    content.push(
      {
        applno: this.applno,
        tableName: 'EL_CREDITMEMO',
        columnName: '審核意見',
        currentValue: value,
        transAPname: '審核資料',
      }
    )
    jsonObject['content'] = content;
    this.childscn1Service.insertHistory(baseUrl, jsonObject).subscribe(data => {

    });
  }

  //取得徵審代碼  上層原因碼
  getADR_CODE() {
    const url = 'f01/childscn1action4';
    let jsonObject: any = {};
    this.childscn1Service.getDate_Json(url, jsonObject).subscribe(data => {
      if (data.rspCode == "0000") {
        for (const row of this.CREDIT_View_List) {
          for (const jsonObj of data.rspBody) {
            const codeNo = jsonObj.reasonCode;
            const desc = jsonObj.reasonDesc;
            row.upCreditCodeList.push({ value: codeNo, viewValue: desc })
          }
        }
      }
    });
  }

  //取得徵審代碼   UP_CREDIT_CODE=上層原因碼
  getCREDIT(row: CREDIT_View) {
    const url = 'f01/childscn1action4';
    let jsonObject: any = {};
    jsonObject['reasonCode'] = row.upCreditCode;
    this.childscn1Service.getDate_Json(url, jsonObject).subscribe(data => {
      if (data.rspCode == "0000") {
        row.creditCodeList = [];
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj.reasonCode;
          const desc = jsonObj.reasonDesc;
          row.creditCodeList.push({ value: codeNo, viewValue: desc })
        }
      }
    });
  }

  //取已儲存 CREDIT_CODE 資料
  getCREDIT_Data() {
    const url = 'f01/childscn1action6';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    this.childscn1Service.getDate_Json(url, jsonObject).subscribe(data => {
      if (data.rspCode == "0000") {
        for (const row of this.CREDIT_View_List) {
          for (const dataRow of data.rspBody) {
            if (row.key == dataRow.item) {
              row.upCreditCode = dataRow.upReasonCode != null ? dataRow.upReasonCode : row.upCreditCode;
              if (row.upCreditCode != null) { this.getCREDIT(row) };
              row.reasonCode = dataRow.creditCodes != null ? dataRow.creditCodes : row.reasonCode;
              row.resonContent = dataRow.creditMemo != null ? dataRow.creditMemo : row.resonContent;
              this.CREDITrowId = dataRow.rowId != null ? dataRow.rowId : this.CREDITrowId;
            }
          }
        }
      }
    });
  }

  //儲存 CREDIT_CODE 資料  由案件完成及暫存使用
  saveCREDIT_Data() {
    const url = 'f01/childscn1action5';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['rowId'] = this.CREDITrowId;
    jsonObject['creditlevel'] = sessionStorage.getItem('stepName').split('t')[1];
    this.reCREDIT_View_List = [];
    for (const row of this.CREDIT_View_List) {
      this.reCREDIT_View_List.push({ reasonCode: row.reasonCode == "" ? null : row.reasonCode, resonContent: row.resonContent })
    }
    jsonObject['result'] = this.reCREDIT_View_List;
    this.childscn1Service.getDate_Json(url, jsonObject).subscribe(data => {
    });
  }

  //ReasonCode不可重複
  checkReasonCode(dataRow: CREDIT_View) {
    for (const row of this.CREDIT_View_List) {
      if (row.key != dataRow.key && row.reasonCode == dataRow.reasonCode) {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: "徵審代碼不可重複!" }
        });
        dataRow.reasonCode = "";
        return;
      }
    }
  }

  //AML 非選其他時 清空值
  checkRadio() {
    if (this.PURPOSEOTHER_MESSAGE2 != "Z") { this.otherMessage2 = "" };
    if (this.NON_TRADEOTHER_MESSAGE3 != "Z") { this.otherMessage3 = "" };
    if (this.TRADE_NON_CCOTHER_MESSAGE4 != "Z") { this.otherMessage4 = "" };
    if (this.TRADE_NON_PURPOSEOTHER_MESSAGE5 != "Z") { this.otherMessage5 = "" };

    sessionStorage.setItem('MAIN_INCOME', this.MAIN_INCOME);
    sessionStorage.setItem('PURPOSEOTHER_MESSAGE2', this.PURPOSEOTHER_MESSAGE2);
    sessionStorage.setItem('NON_TRADEOTHER_MESSAGE3', this.NON_TRADEOTHER_MESSAGE3);
    sessionStorage.setItem('TRADE_NON_CCOTHER_MESSAGE4', this.TRADE_NON_CCOTHER_MESSAGE4);
    sessionStorage.setItem('TRADE_NON_PURPOSEOTHER_MESSAGE5', this.TRADE_NON_PURPOSEOTHER_MESSAGE5);
    sessionStorage.setItem('otherMessage2', this.otherMessage2);
    sessionStorage.setItem('otherMessage3', this.otherMessage3);
    sessionStorage.setItem('otherMessage4', this.otherMessage4);
    sessionStorage.setItem('otherMessage5', this.otherMessage5);
  }

  // //儲存 SUPPLY_AML
  // saveSUPPLY_AML() {
  //   var save: boolean = true;
  //   if (this.PURPOSEOTHER_MESSAGE2 == "Z" && this.otherMessage2 == "") { save = false };
  //   if (this.NON_TRADEOTHER_MESSAGE3 == "Z" && this.otherMessage3 == "") { save = false };
  //   if (this.TRADE_NON_CCOTHER_MESSAGE4 == "Z" && this.otherMessage4 == "") { save = false };
  //   if (this.TRADE_NON_PURPOSEOTHER_MESSAGE5 == "Z" && this.otherMessage5 == "") { save = false };
  //   if (save) {
  //     const url = 'f01/childscn1action7';
  //     let jsonObject: any = {};
  //     jsonObject['applno'] = this.applno;
  //     jsonObject['mainIncome'] = this.MAIN_INCOME;
  //     jsonObject['purpose'] = this.PURPOSEOTHER_MESSAGE2;
  //     jsonObject['otherMessage2'] = this.otherMessage2;
  //     jsonObject['nonTrade'] = this.NON_TRADEOTHER_MESSAGE3;
  //     jsonObject['otherMessage3'] = this.otherMessage3;
  //     jsonObject['tradeNonCc'] = this.TRADE_NON_CCOTHER_MESSAGE4;
  //     jsonObject['otherMessage4'] = this.otherMessage4;
  //     jsonObject['tradeNonPurpose'] = this.TRADE_NON_PURPOSEOTHER_MESSAGE5;
  //     jsonObject['otherMessage5'] = this.otherMessage5;
  //     console.log('jsonObject')
  //     console.log(jsonObject)
  //     this.childscn1Service.getDate_Json(url, jsonObject).subscribe(data => {
  //       console.log('data');
  //       console.log(data);
  //     });
  //   } else {
  //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
  //       data: { msgStr: "提供AML資訊點選其他時，輸入框為必填!" }
  //     });
  //   }
  // }

  //取已儲存 CREDIT_CODE 資料
  getSUPPLY_AML() {
    const url = 'f01/childscn1action8';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    this.childscn1Service.getDate_Json(url, jsonObject).subscribe(data => {
      if (data.rspCode == "0000") {
        this.MAIN_INCOME = data.rspBody.mainIncome != null ? data.rspBody.mainIncome : this.MAIN_INCOME;
        this.PURPOSEOTHER_MESSAGE2 = data.rspBody.purpose != null ? data.rspBody.purpose : this.PURPOSEOTHER_MESSAGE2;
        this.NON_TRADEOTHER_MESSAGE3 = data.rspBody.nonTrade != null ? data.rspBody.nonTrade : this.NON_TRADEOTHER_MESSAGE3;
        this.TRADE_NON_CCOTHER_MESSAGE4 = data.rspBody.TradeNonCc != null ? data.rspBody.TradeNonCc : this.TRADE_NON_CCOTHER_MESSAGE4;
        this.TRADE_NON_PURPOSEOTHER_MESSAGE5 = data.rspBody.TradeNonPurpose != null ? data.rspBody.TradeNonPurpose : this.TRADE_NON_PURPOSEOTHER_MESSAGE5;

        this.otherMessage2 = data.rspBody.otherMessage2 != null ? data.rspBody.otherMessage2 : this.otherMessage2;
        this.otherMessage3 = data.rspBody.OtherMessage3 != null ? data.rspBody.OtherMessage3 : this.otherMessage3;
        this.otherMessage4 = data.rspBody.OtherMessage4 != null ? data.rspBody.OtherMessage4 : this.otherMessage4;
        this.otherMessage5 = data.rspBody.OtherMessage5 != null ? data.rspBody.OtherMessage5 : this.otherMessage5;

        sessionStorage.setItem('MAIN_INCOME', data.rspBody.mainIncome != null ? data.rspBody.mainIncome : '');
        sessionStorage.setItem('PURPOSEOTHER_MESSAGE2', data.rspBody.purpose != null ? data.rspBody.purpose : '');
        sessionStorage.setItem('NON_TRADEOTHER_MESSAGE3', data.rspBody.nonTrade != null ? data.rspBody.nonTrade : '');
        sessionStorage.setItem('TRADE_NON_CCOTHER_MESSAGE4', data.rspBody.TradeNonCc != null ? data.rspBody.TradeNonCc : '');
        sessionStorage.setItem('TRADE_NON_PURPOSEOTHER_MESSAGE5', data.rspBody.TradeNonPurpose != null ? data.rspBody.TradeNonPurpose : '');
        sessionStorage.setItem('otherMessage2', data.rspBody.otherMessage2 != null ? data.rspBody.otherMessage2 : '');
        sessionStorage.setItem('otherMessage3', data.rspBody.OtherMessage3 != null ? data.rspBody.OtherMessage3 : '');
        sessionStorage.setItem('otherMessage4', data.rspBody.OtherMessage4 != null ? data.rspBody.OtherMessage4 : '');
        sessionStorage.setItem('otherMessage5', data.rspBody.OtherMessage5 != null ? data.rspBody.OtherMessage5 : '');
      }
    });
  }

  //判斷頁面是否顯示
  // 1文審 2徵信 3授信 4主管 5Fraud 6 申覆 8徵審後落人 9複審人員
  getPage() {
    return this.page
  }

  //去除符號中文+千分位
  data_number(x: string) {
    if (x != null) {
      x = x.toString();
      x = x.replace(/[^\d]/g, '');
      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return x
  }

  //取基放利率
  async getBase(value: string): Promise<void> {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    if (this.interestType == '02') {
      value = await this.childscn1Service.getInterestBase('f01/childscn1action3', jsonObject);
    }
  }
  //Level轉換中文
  changeLevel(level:string){
    if ( level == 'L4' ) {
      return "文審"
    } else if ( level == 'L2' ) {
      return "授信"
    } else if ( level == 'L3' ) {
      return "徵信"
    } else if ( level == 'L1' ) {
      return "授信覆核"
    } else if ( level == 'L0' ) {
      return "主管"
    } else if ( level == 'D2' ) {
      return "產生合約前回查"
    } else if ( level == 'D1' ) {
      return "產生合約前覆核"
    }
  }
}
