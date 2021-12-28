import { Subscription } from 'rxjs';
import { Childscn19Component } from './../../children/childscn19/childscn19.component';
import { Childscn27Component } from './../../children/childscn27/childscn27.component';
import { Childscn28Component } from './../../children/childscn28/childscn28.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Childscn18Component } from 'src/app/children/childscn18/childscn18.component';
import { Router } from '@angular/router';
import { Childscn20Component } from 'src/app/children/childscn20/childscn20.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01002Scn1Service } from './f01002scn1.service';
import { Childscn22Component } from 'src/app/children/childscn22/childscn22.component';
import { Childscn24Component } from 'src/app/children/childscn24/childscn24.component';
import { F01001Scn1Service } from 'src/app/f01001/f01001scn1/f01001scn1.service';
import { Childscn1Service } from 'src/app/children/childscn1/childscn1.service';
import { Childscn26Component } from 'src/app/children/childscn26/childscn26.component';
import { history } from './../../interface/base';

@Component({
  selector: 'app-f01002scn1',
  templateUrl: './f01002scn1.component.html',
  styleUrls: ['./f01002scn1.component.css', '../../../assets/css/f01.css']
})
export class F01002scn1Component implements OnInit, OnDestroy {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private f01002scn1Service: F01002Scn1Service,
    private childscn1Service: Childscn1Service,
  ) {
    this.JCICAddSource$ = this.f01002scn1Service.JCICAddSource$.subscribe((data) => {
      this.addData = data;
      this.isShowAdd = data.show;
    });
    this.JCICSource$ = this.f01002scn1Service.JCICSource$.subscribe((data) => {
      this.editData = data;
      this.isShowEdit = data.show;
    });
    this.JCICSource$ = this.f01002scn1Service.JCICItemsSource$.subscribe((data) => {
      this.isShowItems = data.show;
    });
  }

  private creditLevel: string = 'APPLCreditL3';
  private applno: string;
  private search: string;
  private cuid: string;
  private routerCase: string;
  fds: string
  private winClose: string = '';
  private page: string;//判斷哪一頁進入用

  addData: any;
  editData: any;
  isShowAdd: boolean;
  isShowEdit: boolean;
  isShowItems: boolean;
  JCICSource$: Subscription;
  JCICAddSource$: Subscription;

  creditResult: string;
  level: string;
  creditMemo: string;
  approveAmt: string;
  lowestPayRate: string;
  approveInterest: string;
  interest: string;
  interestType: string;
  period: string;
  periodType: string;
  interestBase: string;
  caApplicationAmount: string;
  caPmcus: string;
  caRisk: string;
  mark: string;

  changeValue: boolean = true;
  block: boolean = false;

  //歷史資料陣列 20211222
  history: history[] = [];

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.cuid = sessionStorage.getItem('cuid');
    this.fds = sessionStorage.getItem('fds');
    this.level = sessionStorage.getItem('level');
    this.page = sessionStorage.getItem('page');
    this.winClose = sessionStorage.getItem('winClose');
  }

  ngAfterViewInit() {
    let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    element.click();
  }

  test() {
    this.block = true;
  }

  ngOnDestroy() {
    this.JCICSource$.unsubscribe();
    this.JCICAddSource$.unsubscribe();
  }

  reScan() {
    const dialogRef = this.dialog.open(Childscn19Component, {
      panelClass: 'mat-dialog-transparent',
      height: '100%',
      width: '70%',
      data: {
        applno: this.applno,
        cuid: this.cuid,
        checkpoint: "L3"
      }
    });
  }

  reSMS() {
    const dialogRef = this.dialog.open(Childscn27Component, {
      panelClass: 'mat-dialog-transparent',
      height: '100%',
      width: '70%',
      data: {
        applno: this.applno,
        cuid: this.cuid,
        checkpoint: "L3"
      }
    });
  }

  reMail() {
    const dialogRef = this.dialog.open(Childscn28Component, {
      panelClass: 'mat-dialog-transparent',
      height: '100%',
      width: '70%',
      data: {
        applno: this.applno,
        cuid: this.cuid,
        checkpoint: "L3"
      }
    });
  }

  reSearch() {
    const dialogRef = this.dialog.open(Childscn18Component, {
      panelClass: 'mat-dialog-transparent',
      data: {
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  recalculate() {
    const dialogRef = this.dialog.open(Childscn22Component, {
      panelClass: 'mat-dialog-transparent',
      minHeight: '50%',
      width: '30%',
      data: {
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }
  // 退件
  sendBack() {
    const dialogRef = this.dialog.open(Childscn24Component, {
      panelClass: 'mat-dialog-transparent',
      minHeight: '50%',
      width: '30%',
      data: {
        applno: this.applno,
        level: sessionStorage.getItem('level'),
      }
    });
  }

  blockList() {
    const dialogRef = this.dialog.open(Childscn20Component, {
      panelClass: 'mat-dialog-transparent',
      data: {
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  getSearch(): String {
    return this.search;
  }

  getWinClose(): String {
    return this.winClose;
  }

  leave() {
    // this.router.navigate(['./F02002']);
    window.close();
  }

  //Nick 徵審代碼/AML邏輯
  save(url: string, result: string) {

    //AML檢核
    var msgSave: boolean = true;
    if (sessionStorage.getItem('PURPOSEOTHER_MESSAGE2') == "Z" && sessionStorage.getItem('otherMessage2') == "") { msgSave = false };
    if (sessionStorage.getItem('NON_TRADEOTHER_MESSAGE3') == "Z" && sessionStorage.getItem('otherMessage3') == "") { msgSave = false };
    if (sessionStorage.getItem('TRADE_NON_CCOTHER_MESSAGE4') == "Z" && sessionStorage.getItem('otherMessage4') == "") { msgSave = false };
    if (sessionStorage.getItem('TRADE_NON_PURPOSEOTHER_MESSAGE5') == "Z" && sessionStorage.getItem('otherMessage5') == "") { msgSave = false };
    if (!msgSave) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "提供AML資訊點選其他時，輸入框為必填!" }
      });
      return;
    }
    //AML檢核
    var save: boolean = true;
    if (sessionStorage.getItem('MAIN_INCOME') == "" && sessionStorage.getItem('creditResult') == "C" && url == "f01/childscn0") { save = false };
    if (sessionStorage.getItem('PURPOSEOTHER_MESSAGE2') == "" && sessionStorage.getItem('creditResult') == "C" && url == "f01/childscn0") { save = false };
    if (sessionStorage.getItem('NON_TRADEOTHER_MESSAGE3') == "" && sessionStorage.getItem('creditResult') == "C" && url == "f01/childscn0") { save = false };
    if (sessionStorage.getItem('TRADE_NON_CCOTHER_MESSAGE4') == "" && sessionStorage.getItem('creditResult') == "C" && url == "f01/childscn0") { save = false };
    if (sessionStorage.getItem('TRADE_NON_PURPOSEOTHER_MESSAGE5') == "" && sessionStorage.getItem('creditResult') == "C" && url == "f01/childscn0") { save = false };
    if (!save) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "徵信完成時AML資訊為必填!" }
      });
      return;
    }

    const dialogRef = this.dialog.open(Childscn26Component, {
      minHeight: '50%',
      width: '30%',
      data: {
        value: result
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.value == 'confirm') {
        this.saveSUPPLY_AML();
        this.f01002scn1Service.setCREDITSource({ key: true });
        const baseUrl = url;
        let jsonObject: any = {};
        jsonObject['applno'] = this.applno;
        jsonObject['level'] = 'L3';

        this.approveAmt = sessionStorage.getItem('resultApproveAmt');
        this.lowestPayRate = sessionStorage.getItem('resultLowestPayRate');

        this.period = sessionStorage.getItem('period');
        this.periodType = sessionStorage.getItem('periodType');
        this.interestType = sessionStorage.getItem('interestType');
        this.approveInterest = sessionStorage.getItem('approveInterest');
        this.interest = sessionStorage.getItem('interest');
        this.interestBase = sessionStorage.getItem('interestBase');
        this.creditResult = sessionStorage.getItem('creditResult');
        this.caApplicationAmount = sessionStorage.getItem('caApplicationAmount');
        this.caPmcus = sessionStorage.getItem('caPmcus');
        this.caRisk = sessionStorage.getItem('caRisk');
        this.mark = sessionStorage.getItem('mark');

        let jsoncreditResult: any = {};
        jsoncreditResult['approveAmt'] = this.approveAmt;
        jsoncreditResult['lowestPayRate'] = this.lowestPayRate;
        jsoncreditResult['caPmcus'] = this.caPmcus;
        jsoncreditResult['caRisk'] = this.caRisk;
        jsoncreditResult['creditResult'] = this.creditResult;

        let jsonCreditInterestPeriod: any = {};
        jsonCreditInterestPeriod['period'] = this.period;
        jsonCreditInterestPeriod['periodType'] = this.periodType;
        jsonCreditInterestPeriod['interestType'] = this.interestType;
        jsonCreditInterestPeriod['interestCode'] = '1';
        jsonCreditInterestPeriod['approveInterest'] = this.approveInterest; // 核准利率
        jsonCreditInterestPeriod['interest'] = this.interest; // 固定利率
        jsonCreditInterestPeriod['interestBase'] = this.interestBase; // 基放利率

        let jsonElApplicationInfo: any = {};
        jsonElApplicationInfo['caApplicationAmount'] = this.caApplicationAmount;

        jsonObject['creditResult'] = jsoncreditResult;
        jsonObject['elCreditInterestPeriod'] = jsonCreditInterestPeriod;
        jsonObject['elApplicationInfo'] = jsonElApplicationInfo;
        // if (this.creditResult == '' || this.creditResult == 'null' || this.creditResult == null) {
        //   const childernDialogRef = this.dialog.open(ConfirmComponent, {
        //     data: { msgStr: '請填寫核決結果!' }
        //   });
        // } else {
        //   if (this.creditResult == 'A') {
        //     if (this.approveAmt != '' && this.lowestPayRate != '' && this.approveInterest != '' && this.interest != '' && this.interestType != '' && this.periodType != '' && this.period != '' && this.mark != '' && this.mark != null) {
        this.result(baseUrl, jsonObject, result);
        // } else {
        // const childernDialogRef = this.dialog.open(ConfirmComponent, {
        //   data: { msgStr: '審核結果未填寫' }
        // });
        // }
        // } else {
        // this.result(baseUrl, jsonObject, result);
        // }
        // }

        // setTimeout(() => {
        // this.block = false;
        // }, 2000);
      }
    });
  }

  saveResult(url: string, json: JSON): string {
    return this.f01002scn1Service.saveOrEditMsgJson(url, json);
  }

  result(baseUrl: string, jsonObject: JSON, result: string) {
    this.block = true;
    this.f01002scn1Service.send(baseUrl, jsonObject).subscribe(async data => {
      await this.childscn1Service.setHistory(this.history, "徵信案件完成", this.applno);
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: data.rspMsg }
      });
      if ( data.rspMsg.includes('處理案件異常') ) { } else {
        //儲存歷史資料
        this.setHistory();
        // this.saveMemo();
        this.removeSession();
        this.router.navigate(['./F01002']);
      }
      this.block = false;
    });
  }

  removeSession() {
    sessionStorage.removeItem("resultApproveAmt");
    sessionStorage.removeItem("resultLowestPayRate");
    sessionStorage.removeItem("period");
    sessionStorage.removeItem("periodType");
    sessionStorage.removeItem("interestType");
    sessionStorage.removeItem("approveInterest");
    sessionStorage.removeItem("interest");
    sessionStorage.removeItem("interestBase");
    sessionStorage.removeItem("creditResult");
    sessionStorage.removeItem("caApplicationAmount");
    sessionStorage.removeItem("caPmcus");
    sessionStorage.removeItem("caRisk");
    sessionStorage.removeItem("mark");
  }

  //儲存
  // public async saveMemo(): Promise<void> {
  //   // this.removeSession();
  //   let msgStr: string = "";
  //   const baseUrl = 'f01/childscn1action1';
  //   let jsonObject: any = {};
  //   jsonObject['applno'] = this.applno;
  //   jsonObject['creditaction'] = this.mark;
  //   jsonObject['creditlevel'] = sessionStorage.getItem('stepName').split('t')[1];
  //   msgStr = await this.childscn1Service.saveCreditmemo(baseUrl, jsonObject);
  // }

  //判斷是否需要顯示案件完成列
  changeRoute(route: boolean) {
    this.changeValue = route;
  }

  //取Page
  getPage() {
    return this.page;
  }

  //設定歷史資料紀錄參數 20211222
  setHistory() {
    this.history.push({ value: this.approveAmt, tableName: 'EL_CREDITMAIN', valueInfo: 'APPROVE_AMT' }); //核准額度
    this.history.push({ value: this.lowestPayRate, tableName: 'EL_CREDITMAIN', valueInfo: 'LOWEST_PAY_RATE' }); //最低還款比例(循環型)
    this.history.push({ value: this.period, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'PERIOD' }); //分段起始期數
    this.history.push({ value: this.periodType, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'PERIOD_TYPE' }); //期別
    this.history.push({ value: this.interestType, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST_TYPE' }); //利率型態
    this.history.push({ value: this.approveInterest, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'APPROVE_INTEREST' }); //核准利率
    this.history.push({ value: this.interest, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST' }); //固定利率
    this.history.push({ value: this.interestBase, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST_BASE' }); //當時的指數,基放,郵儲利率
    this.history.push({ value: this.creditResult, tableName: 'EL_CREDITMAIN', valueInfo: 'CREDIT_RESULT' }); //核決結果
    this.history.push({ value: this.caApplicationAmount, tableName: 'EL_APPLICATION_INFO', valueInfo: 'CA_APPLICATION_AMOUNT' }); //徵信修改申貸金額
    this.history.push({ value: this.caPmcus, tableName: 'EL_CREDITMAIN', valueInfo: 'CA_PMCUS' }); //人員記錄-PM策略客群
    this.history.push({ value: this.caRisk, tableName: 'EL_CREDITMAIN', valueInfo: 'CA_RISK' }); //人員記錄-風險等級
    this.history.push({ value: this.mark, tableName: 'EL_CREDITMEMO', valueInfo: 'CREDITACTION' }); //審核意見
  }

  //儲存 SUPPLY_AML
  saveSUPPLY_AML() {
    var save: boolean = true;
    if (sessionStorage.getItem('PURPOSEOTHER_MESSAGE2') == "Z" && sessionStorage.getItem('otherMessage2') == "") { save = false };
    if (sessionStorage.getItem('NON_TRADEOTHER_MESSAGE3') == "Z" && sessionStorage.getItem('otherMessage3') == "") { save = false };
    if (sessionStorage.getItem('TRADE_NON_CCOTHER_MESSAGE4') == "Z" && sessionStorage.getItem('otherMessage4') == "") { save = false };
    if (sessionStorage.getItem('TRADE_NON_PURPOSEOTHER_MESSAGE5') == "Z" && sessionStorage.getItem('otherMessage5') == "") { save = false };
    if (save) {
      const url = 'f01/childscn1action7';
      let jsonObject: any = {};
      jsonObject['applno'] = this.applno;
      jsonObject['mainIncome'] = sessionStorage.getItem('MAIN_INCOME');
      jsonObject['purpose'] = sessionStorage.getItem('PURPOSEOTHER_MESSAGE2');
      jsonObject['otherMessage2'] = sessionStorage.getItem('otherMessage2');
      jsonObject['nonTrade'] = sessionStorage.getItem('NON_TRADEOTHER_MESSAGE3');
      jsonObject['otherMessage3'] = sessionStorage.getItem('otherMessage3');
      jsonObject['tradeNonCc'] = sessionStorage.getItem('TRADE_NON_CCOTHER_MESSAGE4');
      jsonObject['otherMessage4'] = sessionStorage.getItem('otherMessage4');
      jsonObject['tradeNonPurpose'] = sessionStorage.getItem('TRADE_NON_PURPOSEOTHER_MESSAGE5');
      jsonObject['otherMessage5'] = sessionStorage.getItem('otherMessage5');
      console.log('jsonObject')
      console.log(jsonObject)
      this.childscn1Service.getDate_Json(url, jsonObject).subscribe(data => {
        console.log('data');
        console.log(data);
      });
    } else {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "提供AML資訊點選其他時，輸入框為必填!" }
      });
    }
  }

}
