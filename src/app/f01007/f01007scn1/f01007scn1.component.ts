import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Childscn1Service } from 'src/app/children/childscn1/childscn1.service';
import { Childscn18Component } from 'src/app/children/childscn18/childscn18.component';
import { Childscn19Component } from 'src/app/children/childscn19/childscn19.component';
import { Childscn20Component } from 'src/app/children/childscn20/childscn20.component';
import { Childscn22Component } from 'src/app/children/childscn22/childscn22.component';
import { Childscn24Component } from 'src/app/children/childscn24/childscn24.component';
import { Childscn26Component } from 'src/app/children/childscn26/childscn26.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01007scn1Service } from './f01007scn1.service';
import { history } from './../../interface/base';
interface interestPeriod {
  id?: string,
  period: string,
  periodType: string
  interestType: string
  interestCode?: string
  approveInterest: string
  interest: string
  interestBase: string
}

@Component({
  selector: 'app-f01007scn1',
  templateUrl: './f01007scn1.component.html',
  styleUrls: ['./f01007scn1.component.css', '../../../assets/css/f01.css']
})
export class F01007scn1Component implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private f01007scn1Service: F01007scn1Service,
    private childscn1Service: Childscn1Service,
  ) {
    this.JCICSource$ = this.f01007scn1Service.HISTORYSource$.subscribe((data) => {
      this.historyData = data;
    });
  }

  private applno: string;
  private search: string;
  private cuid: string;
  private routerCase: string;
  fds: string
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

  //歷史資料 20211222
  history: history[] = [];
  JCICSource$: Subscription;
  historyData: any;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.cuid = sessionStorage.getItem('nationalId');
    this.fds = sessionStorage.getItem('fds');
    this.level = sessionStorage.getItem('level');
    this.page = sessionStorage.getItem('page');
    this.winClose = sessionStorage.getItem('winClose');
  }

  reScan() {
    const dialogRef = this.dialog.open(Childscn19Component, {
      panelClass: 'mat-dialog-transparent',
      height: '100%',
      width: '70%',
      data: {
        applno: this.applno,
        cuid: this.cuid
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
      width: '50%',
      data: {
        applno: this.applno,
        level: sessionStorage.getItem('level'),
        stepName: sessionStorage.getItem('stepName'),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.router.navigate(['./F01007']);
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

  // finish() {
  //   const baseUrl = 'f01/childscn0';
  //   let msg = '';
  //   let jsonObject: any = {};
  //   jsonObject['applno'] = this.applno;
  //   jsonObject['level'] = 'L3';
  //   this.creditResult = sessionStorage.getItem('creditResult');
  //   if (this.creditResult == '' || this.creditResult == 'null' || this.creditResult == null){
  //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
  //       data: { msgStr: '請填寫核決結果!' }
  //     });
  //   } else {
  //     let json: any = {};
  //     json['creditResult'] = this.creditResult;
  //     jsonObject['creditResult'] = json;
  //     this.f01002scn1Service.send( baseUrl, jsonObject ).subscribe(data => {
  //       this.router.navigate(['./F01002']);
  //     });
  //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
  //       data: { msgStr: '案件完成' }
  //     });
  //   }
  // }

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
        let jsonObject: any = {};
        jsonObject['applno'] = this.applno;
        jsonObject['level'] = 'L1';

        this.approveAmt = sessionStorage.getItem('resultApproveAmt');
        this.lowestPayRate = sessionStorage.getItem('resultLowestPayRate');

        // this.period = sessionStorage.getItem('period');
        // this.periodType = sessionStorage.getItem('periodType');
        // this.interestType = sessionStorage.getItem('interestType');
        // this.approveInterest = sessionStorage.getItem('approveInterest');
        // this.interest = sessionStorage.getItem('interest');
        // this.interestBase = sessionStorage.getItem('interestBase');
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

        // let jsonCreditInterestPeriod: any = {};
        let creditInterestPeriodArray: interestPeriod[] = [];
        let count: number = Number(sessionStorage.getItem('count'));

        //多階利率存放陣列
        for (let index = 1; index <= Number(count); index++) {
          creditInterestPeriodArray.push(
            {
              id: sessionStorage.getItem('id' + index),
              period: sessionStorage.getItem('period' + index),
              periodType: sessionStorage.getItem('periodType' + index),
              interestType: sessionStorage.getItem('interestType' + index),
              interestCode: '1',
              approveInterest: sessionStorage.getItem('approveInterest' + index),
              interest: sessionStorage.getItem('interest' + index),
              interestBase: sessionStorage.getItem('interestBase' + index)
            }
          )
        }

        // jsonCreditInterestPeriod['creditInterestPeriodArray'] = creditInterestPeriodArray;
        // jsonCreditInterestPeriod['period'] = this.period;
        // jsonCreditInterestPeriod['periodType'] = this.periodType;
        // jsonCreditInterestPeriod['interestType'] = this.interestType;
        // jsonCreditInterestPeriod['interestCode'] = '1';
        // jsonCreditInterestPeriod['approveInterest'] = this.approveInterest; // 核准利率
        // jsonCreditInterestPeriod['interest'] = this.interest; // 固定利率
        // jsonCreditInterestPeriod['interestBase'] = this.interestBase; // 基放利率

        let jsonElApplicationInfo: any = {};
        jsonElApplicationInfo['caApplicationAmount'] = this.caApplicationAmount;

        jsonObject['creditResult'] = jsoncreditResult;
        // jsonObject['elCreditInterestPeriod'] = jsonCreditInterestPeriod;
        jsonObject['creditInterestPeriodArray'] = creditInterestPeriodArray;
        jsonObject['elApplicationInfo'] = jsonElApplicationInfo;
        if (url == 'f01/childscn0action1') {
          this.result(baseUrl, jsonObject, result, count);
        } else {
          if (this.creditResult == '' || this.creditResult == 'null' || this.creditResult == null) {
            const childernDialogRef = this.dialog.open(ConfirmComponent, {
              data: { msgStr: '請填寫核決結果!' }
            });
          } else {
            if (this.creditResult == 'A') {
              if (this.approveAmt == '' || this.approveAmt == null) {
                const childernDialogRef = this.dialog.open(ConfirmComponent, {
                  data: { msgStr: '核准額度未填寫' }
                });
                return;
              } else if (this.lowestPayRate == '' || this.lowestPayRate == null) {
                const childernDialogRef = this.dialog.open(ConfirmComponent, {
                  data: { msgStr: '每月最低還款比率未填寫' }
                });
                return;
              } else if (true) {
                if (count == 0) {
                  const childernDialogRef = this.dialog.open(ConfirmComponent, {
                    data: { msgStr: '多階利率無資料' }
                  });
                  return;
                }
                for (let index = 1; index <= count; index++) {
                  if (creditInterestPeriodArray[index - 1].approveInterest == '' || creditInterestPeriodArray[index - 1].approveInterest == null) {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '序號' + index + ',核准利率未填寫' }
                    });
                    return;
                  } else if (creditInterestPeriodArray[index - 1].interest == '' || creditInterestPeriodArray[index - 1].interest == null) {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '序號' + index + ',利率未填寫' }
                    });
                    return;
                  } else if (creditInterestPeriodArray[index - 1].interestType == '' || creditInterestPeriodArray[index - 1].interestType == null) {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '序號' + index + ',利率型態未填寫' }
                    });
                    return;
                  } else if (creditInterestPeriodArray[index - 1].period == '' || creditInterestPeriodArray[index - 1].period == null) {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '序號' + index + ',期數未填寫' }
                    });
                    return;
                  } else if (creditInterestPeriodArray[index - 1].periodType == '' || creditInterestPeriodArray[index - 1].periodType == null) {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '序號' + index + ',期別未填寫' }
                    });
                    return;
                  }
                }
                this.result(baseUrl, jsonObject, result, count);
              }
              // else if (this.mark == '' || this.mark == null) {
              //   const childernDialogRef = this.dialog.open(ConfirmComponent, {
              //     data: { msgStr: '審核註記未填寫' }
              //   });
              //   return;
              // }
              // else {
              //   this.result(baseUrl, jsonObject, result, count);
              // }
            } else {
              this.result(baseUrl, jsonObject, result, count);
            }
          }
        }
      }
    });
  }

  saveResult(url: string, json: JSON): string {
    return this.f01007scn1Service.saveOrEditMsgJson(url, json);
  }

  result(baseUrl: string, jsonObject: JSON, result: string, count: number) {
    this.block = true;
    this.f01007scn1Service.send(baseUrl, jsonObject).subscribe(async data => {
      //儲存歷史資料
      // if (count > 0) {
        this.setHistory(count);
      // }
      await this.childscn1Service.setHistory(this.history, "授信覆核案件完成", this.applno);
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: data.rspMsg }
      });
      if (data.rspMsg.includes('處理案件異常') || baseUrl == 'f01/childscn0action1') { } else {
        // this.saveMemo();
        this.removeSession(count);
        this.router.navigate(['./F01007']);
      }
      this.block = false;
    });
  }

  removeSession(count: number) {
    for (let index = 1; index <= count; index++) {
      sessionStorage.removeItem("period" + index);
      sessionStorage.removeItem("periodType" + index);
      sessionStorage.removeItem("interestType" + index);
      sessionStorage.removeItem("approveInterest" + index);
      sessionStorage.removeItem("interest" + index);
      sessionStorage.removeItem("interestBase" + index);
      sessionStorage.removeItem("id" + index);
    }
    sessionStorage.removeItem("resultApproveAmt");
    sessionStorage.removeItem("resultLowestPayRate");
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
  setHistory(count: number) {
    if (count > 0) {
      for (let index = 1; index <= count; index++) {
        this.history.push({ value: sessionStorage.getItem('period' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'PERIOD', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].period }); //分段起始期數
        this.history.push({ value: sessionStorage.getItem('periodType' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'PERIOD_TYPE', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].periodType }); //期別
        this.history.push({ value: sessionStorage.getItem('interestType' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST_TYPE', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].interestType }); //利率型態
        this.history.push({ value: sessionStorage.getItem('approveInterest' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'APPROVE_INTEREST', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].approveInterest }); //核准利率
        this.history.push({ value: sessionStorage.getItem('interest' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].interest }); //固定利率
        this.history.push({ value: sessionStorage.getItem('interestBase' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST_BASE', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].interestBase }); //當時的指數,基放,郵儲利率
      }
    }
    this.history.push({ value: this.approveAmt, tableName: 'EL_CREDITMAIN', valueInfo: 'APPROVE_AMT', originalValue: this.historyData.approveAmt }); //核准額度
    this.history.push({ value: this.lowestPayRate, tableName: 'EL_CREDITMAIN', valueInfo: 'LOWEST_PAY_RATE', originalValue: this.historyData.lowestPayRate }); //最低還款比例(循環型)
    this.history.push({ value: this.creditResult, tableName: 'EL_CREDITMAIN', valueInfo: 'CREDIT_RESULT', originalValue: this.historyData.creditResult }); //核決結果
    // this.history.push({value:  this.caApplicationAmount, tableName: 'EL_APPLICATION_INFO', valueInfo: 'CA_APPLICATION_AMOUNT'}); //徵信修改申貸金額
    this.history.push({ value: this.caPmcus, tableName: 'EL_CREDITMAIN', valueInfo: 'CA_PMCUS', originalValue: this.historyData.caPmcus }); //人員記錄-PM策略客群
    this.history.push({ value: this.caRisk, tableName: 'EL_CREDITMAIN', valueInfo: 'CA_RISK', originalValue: this.historyData.caRisk }); //人員記錄-風險等級
    // this.history.push({value:  this.mark, tableName: 'EL_CREDITMEMO', valueInfo: 'CREDITACTION'}); //審核意見

    let newHistory: interestPeriod[] = [];
    for (let index = 1; index <= count; index++) {
      newHistory.push(
        {
          period: sessionStorage.getItem('period' + index),
          periodType: sessionStorage.getItem('periodType' + index),
          interestType: sessionStorage.getItem('interestType' + index),
          approveInterest: sessionStorage.getItem('approveInterest' + index),
          interest: sessionStorage.getItem('interest' + index),
          interestBase: sessionStorage.getItem('interestBase' + index)
        }
      );
    }

    this.f01007scn1Service.setHistorySource({
      creditResult: this.creditResult,
      lowestPayRate: this.lowestPayRate,
      approveAmt: this.approveAmt,
      caApplicationAmount: this.caApplicationAmount,
      caPmcus: this.caPmcus,
      caRisk: this.caRisk,
      CreditInterestPeriodSource: newHistory
    })
  }
}
