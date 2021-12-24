import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Childscn1Service } from 'src/app/children/childscn1/childscn1.service';
import { Childscn24Component } from 'src/app/children/childscn24/childscn24.component';
import { Childscn26Component } from 'src/app/children/childscn26/childscn26.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01004Scn1Service } from './f01004scn1.service';
import { history } from './../../interface/base';

@Component({
  selector: 'app-f01004scn1',
  templateUrl: './f01004scn1.component.html',
  styleUrls: ['./f01004scn1.component.css', '../../../assets/css/f01.css']
})
export class F01004scn1Component implements OnInit {
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private f01004Scn1Service: F01004Scn1Service,
    private childscn1Service: Childscn1Service,
  ) {
  }


  private creditLevel: string = 'APPLCreditL1';
  private applno: string;
  private search: string;
  private cuid: string;
  fds: string;
  private winClose: string = '';
  private page: string;//判斷哪一頁進入用

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

  stepName: string;
  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.cuid = sessionStorage.getItem('cuid');
    this.fds = sessionStorage.getItem('fds');
    this.level = sessionStorage.getItem('level');
    this.stepName = sessionStorage.getItem('stepName');
    this.page = sessionStorage.getItem('page');
  }

  ngAfterViewInit() {
    let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    element.click();
  }

  getApplno(): String {
    return this.applno;
  }

  getSearch(): string {
    return this.search;
  }

  getCuid(): string {
    return this.cuid;
  }

  getLevel(): string {
    return this.creditLevel;
  }

  getWinClose(): String {
    return this.winClose;
  }

  save(url: string, result: string) {
    const dialogRef = this.dialog.open(Childscn26Component, {
      minHeight: '50%',
      width: '30%',
      data: {
        value: result
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.value == 'confirm') {
        const baseUrl = url;
        let msg = '';
        let jsonObject: any = {};
        jsonObject['applno'] = this.applno;
        jsonObject['level'] = 'L0';

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
        if (url == 'f01/childscn0action1') {
          this.result(baseUrl, jsonObject, result);
        } else {
          if (this.creditResult == '' || this.creditResult == 'null' || this.creditResult == null) {
            const childernDialogRef = this.dialog.open(ConfirmComponent, {
              data: { msgStr: '請填寫核決結果!' }
            });
          } else {
            // if (this.creditResult == 'A') {
            //   if (this.approveAmt == '' || this.approveAmt == null) {
            //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
            //       data: { msgStr: '核准額度未填寫' }
            //     });
            //     return;
            //   } else if (this.lowestPayRate == '' || this.lowestPayRate == null) {
            //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
            //       data: { msgStr: '每月最低還款比率未填寫' }
            //     });
            //     return;
            //   } else if (this.approveInterest == '' || this.approveInterest == null) {
            //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
            //       data: { msgStr: '核准利率未填寫' }
            //     });
            //     return;
            //   } else if (this.interest == '' || this.interest == null) {
            //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
            //       data: { msgStr: '利率未填寫' }
            //     });
            //     return;
            //   } else if (this.interestType == '' || this.interestType == null) {
            //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
            //       data: { msgStr: '利率型態未填寫' }
            //     });
            //     return;
            //   } else if (this.periodType == '' || this.periodType == null) {
            //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
            //       data: { msgStr: '期別未填寫' }
            //     });
            //     return;
            //   } else if (this.mark == '' || this.mark == null) {
            //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
            //       data: { msgStr: '審核註記未填寫' }
            //     });
            //     return;
            //   } else {
            //     this.result(baseUrl, jsonObject, result);
            //   }
            // } else {
            //   this.result(baseUrl, jsonObject, result);
            // }
            this.result(baseUrl, jsonObject, result);
          }
        }
      }
    });
  }

  // 退件
  sendBack() {
    const dialogRef = this.dialog.open(Childscn24Component, {
      panelClass: 'mat-dialog-transparent',
      minHeight: '50%',
      width: '50%',
      data: {
        applno: this.applno,
        level: sessionStorage.getItem('level'),
        stepName: sessionStorage.getItem('stepName'),
      }
    });
  }

  saveResult(url: string, json: JSON): string {
    return this.f01004Scn1Service.saveOrEditMsgJson(url, json);
  }

  result(baseUrl: string, jsonObject: JSON, result: string) {
    this.block = true;
    this.saveMemo();
    this.f01004Scn1Service.send(baseUrl, jsonObject).subscribe(async data => {
      await this.childscn1Service.setHistory(this.history, "主管案件完成", this.applno);
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: data.rspMsg }
      });
      if ( data.rspMsg.includes('處理案件異常') ) { } else {
        //儲存歷史資料
        this.setHistory();
        this.removeSession();
        this.router.navigate(['./F01004']);
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
  }

  //儲存
  public async saveMemo(): Promise<void> {
    this.removeSession();
    let msgStr: string = "";
    const baseUrl = 'f01/childscn1action1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['creditaction'] = this.mark;
    jsonObject['creditlevel'] = sessionStorage.getItem('stepName').split('t')[1];
    msgStr = await this.childscn1Service.saveCreditmemo(baseUrl, jsonObject);
  }

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
    this.history.push({value: this.approveAmt, tableName: 'EL_CREDITMAIN', valueInfo: 'APPROVE_AMT'}); //核准額度
    this.history.push({value: this.lowestPayRate, tableName: 'EL_CREDITMAIN', valueInfo: 'LOWEST_PAY_RATE'}); //最低還款比例(循環型)
    this.history.push({value:  this.period, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'PERIOD'}); //分段起始期數
    this.history.push({value:  this.periodType, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'PERIOD_TYPE'}); //期別
    this.history.push({value:  this.interestType, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST_TYPE'}); //利率型態
    this.history.push({value:  this.approveInterest, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'APPROVE_INTEREST'}); //核准利率
    this.history.push({value:  this.interest, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST'}); //固定利率
    this.history.push({value:  this.interestBase, tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST_BASE'}); //當時的指數,基放,郵儲利率
    this.history.push({value:  this.creditResult, tableName: 'EL_CREDITMAIN', valueInfo: 'CREDIT_RESULT'}); //核決結果
    this.history.push({value:  this.caApplicationAmount, tableName: 'EL_APPLICATION_INFO', valueInfo: 'CA_APPLICATION_AMOUNT'}); //徵信修改申貸金額
    this.history.push({value:  this.caPmcus, tableName: 'EL_CREDITMAIN', valueInfo: 'CA_PMCUS'}); //人員記錄-PM策略客群
    this.history.push({value:  this.caRisk, tableName: 'EL_CREDITMAIN', valueInfo: 'CA_RISK'}); //人員記錄-風險等級
    this.history.push({value:  this.mark, tableName: 'EL_CREDITMEMO', valueInfo: 'CREDITACTION'}); //審核意見
  }
}
