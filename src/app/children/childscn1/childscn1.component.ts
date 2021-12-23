import { BaseService } from 'src/app/base.service';
import { map } from 'rxjs/operators';
import { OptionsCode } from './../../interface/base';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-childscn1',
  templateUrl: './childscn1.component.html',
  styleUrls: ['./childscn1.component.css', '../../../assets/css/child.css']
})
export class Childscn1Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private childscn1Service: Childscn1Service,
    public dialog: MatDialog,
    private pipe: DatePipe
  ) { }

  mark: string;
  search: string;
  userId: string;

  //申請資訊
  applno: string;                               //案編
  cuCName: string;                              //姓名
  custId: string;                               //客戶ID
  nationalId: string;                           //身分證
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

  //Creditmemo
  creditmemoSource: Data[] = [];
  total = 1;
  pageIndex = 1;
  pageSize = 50;

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


  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.userId = localStorage.getItem("empNo");

    this.setBlank();

    this.childscn1Service.getSysTypeCode('CREDIT_RESULT')//核決結果下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.creditResultCode.push({ value: codeNo, viewValue: desc })
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

      //CreditAuditinfo
      if (data.rspBody.CreditAuditinfoList.length > 0) {
        this.cuCName = data.rspBody.CreditAuditinfoList[0].cuCname;
        this.custId = data.rspBody.CreditAuditinfoList[0].custId;
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
        this.cssDate = this.pipe.transform(new Date(data.rspBody.cssList[0].cssDate), 'yyyy-MM-dd hh:mm:ss');
      }

      //RPM
      if (data.rspBody.rpmList.length > 0) {
        this.isRpm = data.rspBody.rpmList[0].isRpm;
        this.rpmTypeDescribe = data.rspBody.rpmList[0].rpmTypeDescribe;
        this.rpmDate = this.formatDate(data.rspBody.rpmList[0].rpmDate);
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
        this.resultApproveAmt = data.rspBody.resultList[0].approveAmt == null ? '' : this.toCurrency(data.rspBody.resultList[0].approveAmt.toString());
        sessionStorage.setItem('resultApproveAmt', data.rspBody.resultList[0].approveAmt ? data.rspBody.resultList[0].approveAmt : '');
        this.resultLowestPayRate = data.rspBody.resultList[0].lowestPayRate;
        sessionStorage.setItem('resultLowestPayRate', data.rspBody.resultList[0].lowestPayRate ? data.rspBody.resultList[0].lowestPayRate : '');
        this.caPmcus = data.rspBody.resultList[0].caPmcus;
        sessionStorage.setItem('caPmcus', data.rspBody.resultList[0].caPmcus ? data.rspBody.resultList[0].caPmcus : '');
        this.caRisk = data.rspBody.resultList[0].caRisk;
        sessionStorage.setItem('caRisk', data.rspBody.resultList[0].caRisk ? data.rspBody.resultList[0].caRisk : '');
      }

      //creditInterestPeriod
      if (data.rspBody.creditInterestPeriodList.length > 0) {
        this.period = data.rspBody.creditInterestPeriodList[0].period;
        sessionStorage.setItem('period', data.rspBody.creditInterestPeriodList[0].period ? data.rspBody.creditInterestPeriodList[0].period : '');
        this.interestType = data.rspBody.creditInterestPeriodList[0].interestType;
        sessionStorage.setItem('interestType', data.rspBody.creditInterestPeriodList[0].interestType ? data.rspBody.creditInterestPeriodList[0].interestType : '');
        this.interest = data.rspBody.creditInterestPeriodList[0].interest;
        sessionStorage.setItem('interest', data.rspBody.creditInterestPeriodList[0].interest ? data.rspBody.creditInterestPeriodList[0].interest : '');
        this.periodType = '1';
        sessionStorage.setItem('periodType', this.periodType);
        if (this.interestType == '02') {
          this.interestBase = await this.childscn1Service.getInterestBase('f01/childscn1action3', jsonObject);
        }
        //this.interestBase = data.rspBody.creditInterestPeriodList[0].interestBase;
        sessionStorage.setItem('interestBase', data.rspBody.creditInterestPeriodList[0].interestBase ? data.rspBody.creditInterestPeriodList[0].interestBase : '');
        this.interestCode = data.rspBody.creditInterestPeriodList[0].interestCode;
        this.approveInterest = Number(this.interestBase) + Number(this.interest)
        sessionStorage.setItem('approveInterest', this.approveInterest.toString());
      }

    })
    this.getCreditmemo(this.pageIndex, this.pageSize);
    this.getDSS11();
    this.getDSS21();
  }

  map: any;
  distance: any;
  ngAfterViewInit(): void {

    // this.map = L.map('map', { center: [25.0249211, 121.5075035], zoom: 12 });//指定欲繪製地圖在id為map的元素中，中心座標為[25.0249211,121.5075035]，縮放程度為16
    //生成地圖S
    this.map = L.map('map').setView([25.0249211, 121.5075035], 12);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      // attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    //標點
    const marker1 = L
      .marker([25.0249211, 121.5075035], { title: '' })
      .addTo(this.map).openPopup();//開啟彈出視窗

    const marker2 = L.marker([25.07824532440103, 121.57678659801286], { title: '' })
      .addTo(this.map).openPopup();//開啟彈出視窗

    this.map.invalidateSize(true);

    //計算兩點座標距離
    var markerFrom = L.circleMarker([25.0249211, 121.5075035], { color: "#F00", radius: 10 });
    var markerTo = L.circleMarker([25.07824532440103, 121.57678659801286], { color: "#4AFF00", radius: 10 });
    var from = markerFrom.getLatLng();
    var to = markerTo.getLatLng();
    this.distance = (from.distanceTo(to)).toFixed(0) / 1000;

    //取兩點座標中心
    var corner1 = L.latLng(25.0249211, 121.5075035),
      corner2 = L.latLng(25.07824532440103, 121.57678659801286),
      bounds = L.latLngBounds(corner1, corner2);
    this.map.fitBounds(bounds);
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
      this.total = data.rspBody.size;
      this.creditmemoSource = data.rspBody.list;
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
    this.insertHistory(this.mark);
  }

  formatDate(date: string) {
    return date.split("T")[0] + " " + date.split("T")[1].split(".")[0];
  }

  async changeInterest() {
    if (this.interestType == '02') {
      this.interestValue = '1';
      let jsonObject: any = {};
      const baseUrl = 'f01/childscn1action3';
      if ('查無基放利率!' == await this.childscn1Service.getInterestBase(baseUrl, jsonObject)) {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: '查無基放利率!' }
        });
        this.interestType = '';
      } else {
        this.interestBase = await this.childscn1Service.getInterestBase(baseUrl, jsonObject);
      }
      // this.interestBase = 2;
      this.approveInterest = Number(this.interestBase) + Number(this.interest);
    } else {
      this.interestValue = '';
      this.interestBase = 0
      this.approveInterest = Number(this.interestBase) + Number(this.interest);
    }
    sessionStorage.setItem('approveInterest', this.approveInterest.toString());
    sessionStorage.setItem('interestType', this.interestType);
    sessionStorage.setItem('interest', this.interest.toString());
    sessionStorage.setItem('interestBase', this.interestBase.toString());
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

  caluclate() {
    if (isNaN(this.interest)) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '利率請輸入數字!' }
      });
      childernDialogRef.afterClosed().subscribe(result => {
        this.interest = null;
        this.approveInterest = null;
      });
    } else {
      if (this.interestBase == null) {
        this.approveInterest = Number(this.interest);
      } else {
        this.approveInterest = Number(this.interestBase) + Number(this.interest);
      }
      sessionStorage.setItem('approveInterest', this.approveInterest.toString());
      sessionStorage.setItem('interest', this.interest.toString());
      sessionStorage.setItem('interestBase', this.interestBase.toString());
    }
  }

  open() {
    const url = window.location.href.split("/#");
    window.open(url[0] + "/#/MAP");
  }

  change(value: any, valueName: string) {
    sessionStorage.setItem(valueName, value);
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
      if(data.rspBody.DSS1UNDWLIST.length>0){
        this.EL_DSS1_UNDW_LIST1.data=this.EL_DSS1_UNDW_LIST.data.filter(c=>c.UP_REASON_CODE=='1');//1	信用異常資訊
        this.EL_DSS1_UNDW_LIST2.data=this.EL_DSS1_UNDW_LIST.data.filter(c=>c.UP_REASON_CODE=='2');//2	整體往來
        this.EL_DSS1_UNDW_LIST3.data=this.EL_DSS1_UNDW_LIST.data.filter(c=>c.UP_REASON_CODE=='3');//3	信用卡往來
        this.EL_DSS1_UNDW_LIST4.data=this.EL_DSS1_UNDW_LIST.data.filter(c=>c.UP_REASON_CODE=='4');//4	授信往來
        this.EL_DSS1_UNDW_LIST5.data=this.EL_DSS1_UNDW_LIST.data.filter(c=>c.UP_REASON_CODE=='9');//9	其他
      }
    });
  }

  //取決策1Table
  getDSS21() {
    this.applno = sessionStorage.getItem('applno');
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
        this.dss2Form1.patchValue({ STRGY_LIMIT_REVING: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_REVING })//循環信貸額度
        this.dss2Form1.patchValue({ STRGY_LIMIT_INST: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_INST })//分期信貸金額
        this.dss2Form1.patchValue({ STRGY_LIMIT_CASH: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_CASH })//分期信貸-現金額度
        this.dss2Form1.patchValue({ STRGY_LIMIT_MERG: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_MERG })//分期信貸-債整額度
        this.dss2Form1.patchValue({ STRGY_MINPAYRT: data.rspBody.DSS2STRGY[0].STRGY_MINPAYRT })//每月最低還款比例(僅限循環信貸)
        this.dss2Form1.patchValue({ STRGY_DISB_BTCR_YN: data.rspBody.DSS2STRGY[0].STRGY_DISB_BTCR_YN })//結帳日至還款日間客戶可申請動撥Y
        this.dss2Form1.patchValue({ STRGY_RL_DISB_THRHLD: data.rspBody.DSS2STRGY[0].STRGY_RL_DISB_THRHLD })//循環信貸簡易檢核動撥金額門檻
        this.dss2Form1.patchValue({ STRGY_ORIGINFEE: data.rspBody.DSS2STRGY[0].STRGY_ORIGINFEE })//開辦費(首次簽約用)
        this.dss2Form1.patchValue({ STRGY_LOANEXTFEE: data.rspBody.DSS2STRGY[0].STRGY_LOANEXTFEE })//帳戶管理費(續約用)

        //額度限額資訊 3種方案相同
        this.dss2Form1.patchValue({ LIMIT_DBR: data.rspBody.DSS2STRGY[0].LIMIT_DBR })//限額_DBR
        this.dss2Form1.patchValue({ LIMIT_PRDMUE: data.rspBody.DSS2STRGY[0].LIMIT_PRDMUE })//限額_產品MUE
        this.dss2Form1.patchValue({ LIMIT_LAW32: data.rspBody.DSS2STRGY[0].LIMIT_LAW32 })//限額_本行利害關係人(銀行法第32條)
        this.dss2Form1.patchValue({ LIMIT_LAW33_UNS: data.rspBody.DSS2STRGY[0].LIMIT_LAW33_UNS })//限額_同一自然人無擔保授信限額(銀行法第33條)
        this.dss2Form1.patchValue({ LIMIT_PROD_MAX: data.rspBody.DSS2STRGY[0].LIMIT_PROD_MAX })//限額_產品/專案額度上限
        this.dss2Form1.patchValue({ LIMIT_PROD_MIN: data.rspBody.DSS2STRGY[0].LIMIT_PROD_MIN })//限額_產品/專案額度下限
        this.dss2Form1.patchValue({ LIMIT_CUSTAPPLY: data.rspBody.DSS2STRGY[0].LIMIT_CUSTAPPLY })//限額_客戶申請金額
        this.dss2Form1.patchValue({ LIMIT_DTI: data.rspBody.DSS2STRGY[0].LIMIT_DTI })//限額_月付收支比
        this.dss2Form1.patchValue({ LIMIT_NIDMUE: data.rspBody.DSS2STRGY[0].LIMIT_NIDMUE })//限額_歸戶MUE
        this.dss2Form1.patchValue({ LIMIT_MERGEAMT: data.rspBody.DSS2STRGY[0].LIMIT_MERGEAMT })//限額_債整額度
        this.dss2Form1.patchValue({ STRGY_NIDMUEX: data.rspBody.DSS2STRGY[0].STRGY_NIDMUEX })//試算授信策略_歸戶MUE倍數
        this.dss2Form1.patchValue({ STRGY_NIDMUECAP: data.rspBody.DSS2STRGY[0].STRGY_NIDMUECAP })//試算授信策略_歸戶MUECAP
        this.dss2Form1.patchValue({ STRGY_PRDMUEX: data.rspBody.DSS2STRGY[0].STRGY_PRDMUEX })//試算授信策略_產品MUE倍數
        this.dss2Form1.patchValue({ STRGY_PRDMUEXCAP: data.rspBody.DSS2STRGY[0].STRGY_PRDMUEXCAP })//試算授信策略_產品MUECAP
        this.dss2Form1.patchValue({ STRGY_DBRX: data.rspBody.DSS2STRGY[0].STRGY_DBRX })//試算授信策略_DBR限額倍數
        this.dss2Form1.patchValue({ STRGY_DTIX: data.rspBody.DSS2STRGY[0].STRGY_DTIX })//試算授信策略_DTI參數 注意名稱差異

      }
      this.EL_DSS2_UNDW_LIST.data = data.rspBody.DSS2UNDWLIST;//徵審代碼
      if(data.rspBody.DSS2UNDWLIST.length>0){
        this.EL_DSS2_UNDW_LIST1.data=this.EL_DSS2_UNDW_LIST.data.filter(c=>c.UP_REASON_CODE=='1');//1	信用異常資訊
        this.EL_DSS2_UNDW_LIST2.data=this.EL_DSS2_UNDW_LIST.data.filter(c=>c.UP_REASON_CODE=='2');//2	整體往來
        this.EL_DSS2_UNDW_LIST3.data=this.EL_DSS2_UNDW_LIST.data.filter(c=>c.UP_REASON_CODE=='3');//3	信用卡往來
        this.EL_DSS2_UNDW_LIST4.data=this.EL_DSS2_UNDW_LIST.data.filter(c=>c.UP_REASON_CODE=='4');//4	授信往來
        this.EL_DSS2_UNDW_LIST5.data=this.EL_DSS2_UNDW_LIST.data.filter(c=>c.UP_REASON_CODE=='9');//9	其他
      }
      this.EL_DSS2_CFC_LIMIT1.data = data.rspBody.DSS2CFCLIMIT;//試算額度策略
      this.EL_DSS2_STRGY_SRATE1.data = data.rspBody.DSS2STRGYSRATE;//試算利率(多階)
      this.EL_DSS2_STRGY_MERG1.data = data.rspBody.DSS2STRGYMERG;//試算授信策略_債整明細
    });
  }

  setBlank() {
    sessionStorage.setItem("resultApproveAmt" , "");
    sessionStorage.setItem("resultLowestPayRate" , "");
    sessionStorage.setItem("period" , "");
    sessionStorage.setItem("periodType" , "");
    sessionStorage.setItem("interestType" , "");
    sessionStorage.setItem("approveInterest" , "");
    sessionStorage.setItem("interest" , "");
    sessionStorage.setItem("interestBase" , "");
    sessionStorage.setItem("creditResult" , "");
    sessionStorage.setItem("caApplicationAmount" , "");
    sessionStorage.setItem("caPmcus" , "");
    sessionStorage.setItem("caRisk" , "");
    sessionStorage.setItem("mark" , "");
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
}
