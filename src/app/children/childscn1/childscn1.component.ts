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

@Component({
  selector: 'app-childscn1',
  templateUrl: './childscn1.component.html',
  styleUrls: ['./childscn1.component.css', '../../../assets/css/child.css']
})
export class Childscn1Component implements OnInit {

  constructor(
    private childscn1Service: Childscn1Service,
    public dialog: MatDialog,
    private pipe: DatePipe
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
  caApplicationAmount: number;
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
  resultApproveAmt: number;
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

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
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
        this.periodType = '1';
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
    this.childscn1Service.getImfornation(baseUrl, jsonObject).subscribe(data => {

      //CreditAuditinfo
      if (data.rspBody.CreditAuditinfoList.length > 0) {
        console.log(data.rspBody.CreditAuditinfoList)
        this.cuCName = data.rspBody.CreditAuditinfoList[0].cuCname;
        this.custId = data.rspBody.CreditAuditinfoList[0].custId;
        this.nationalId = data.rspBody.CreditAuditinfoList[0].nationalId;
        this.prodCode = data.rspBody.CreditAuditinfoList[0].prodCode;
        this.applicationAmount = data.rspBody.CreditAuditinfoList[0].applicationAmount;
        this.caApplicationAmount = data.rspBody.CreditAuditinfoList[0].caApplicationAmount;
        if (data.rspBody.CreditAuditinfoList[0].caApplicationAmount == 0 || data.rspBody.CreditAuditinfoList[0].caApplicationAmount == '' || data.rspBody.CreditAuditinfoList[0].caApplicationAmount == null) {
          this.caApplicationAmount = data.rspBody.CreditAuditinfoList[0].applicationAmount;
        }
        sessionStorage.setItem('caApplicationAmount', data.rspBody.CreditAuditinfoList[0].caApplicationAmount );
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
        this.resultApproveAmt = data.rspBody.resultList[0].approveAmt;
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
        this.periodType = data.rspBody.creditInterestPeriodList[0].periodType;
        sessionStorage.setItem('periodType', data.rspBody.creditInterestPeriodList[0].periodType ? data.rspBody.creditInterestPeriodList[0].periodType : '');
        this.interestBase = data.rspBody.creditInterestPeriodList[0].interestBase;
        sessionStorage.setItem('interestBase', data.rspBody.creditInterestPeriodList[0].interestBase ? data.rspBody.creditInterestPeriodList[0].interestBase : '');
        this.interestCode = data.rspBody.creditInterestPeriodList[0].interestCode;
        this.approveInterest = data.rspBody.creditInterestPeriodList[0].approveInterest;
        sessionStorage.setItem('approveInterest', data.rspBody.creditInterestPeriodList[0].approveInterest ? data.rspBody.creditInterestPeriodList[0].approveInterest : '');
      }

    })
    this.getCreditmemo(this.pageIndex, this.pageSize);
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
  }

  formatDate(date: string) {
    return date.split("T")[0] + " " + date.split("T")[1].split(".")[0];
  }

  changeInterest() {
    if (this.interestType == '02') {
      this.interestValue = '1';
      this.interestBase = 2;
      this.approveInterest = Number(this.interestBase) + Number(this.interest);
    } else {
      this.interestValue = '';
      this.interestBase = 0
      console.log("====1====>"+this.interestBase)
      this.approveInterest = Number(this.interestBase) + Number(this.interest);
    }
    sessionStorage.setItem('approveInterest', this.approveInterest.toString());
    sessionStorage.setItem('interestType', this.interestType);
    sessionStorage.setItem('interest', this.interest.toString());
    console.log("====2====>"+this.interestBase)
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
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請輸入數字!' }
      });
      return false;
    }
    return true;
  }

  getStyle(value: any) {
    return {
      'text-align': this.isNumber(value) ? 'right' : 'left'
    }
  }

  isNumber(value: any) { return /^-?[\d.]+(?:e-?\d+)?$/.test(value); }

  //審核註記編輯
  startEdit(creditaction: string, rowId: string) {
    const dialogRef = this.dialog.open(Childscn1editComponent, {
      minHeight: '70vh',
      width: '50%',
      panelClass: 'mat-dialog-transparent',
      data: {
        creditaction: creditaction,
        level: sessionStorage.getItem('stepName').split('t')[1],
        applno: this.applno,
        rowId: rowId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCreditmemo(this.pageIndex, this.pageSize);
    });
  }
}
