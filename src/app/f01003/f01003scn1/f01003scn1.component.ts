import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Childscn1Service } from 'src/app/children/childscn1/childscn1.service';
import { Childscn22Component } from 'src/app/children/childscn22/childscn22.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01003Scn1Service } from './f01003scn1.service';
import { Childscn24Component } from 'src/app/children/childscn24/childscn24.component';
import { Childscn26Component } from 'src/app/children/childscn26/childscn26.component';
import { history } from './../../interface/base';
import { F01002Scn1Service } from 'src/app/f01002/f01002scn1/f01002scn1.service';
import { Subscription } from 'rxjs';
import { Childscn19Component } from 'src/app/children/childscn19/childscn19.component';
import { Childscn27Component } from 'src/app/children/childscn27/childscn27.component';
import { Childscn28Component } from 'src/app/children/childscn28/childscn28.component';
import { Childscn20Component } from 'src/app/children/childscn20/childscn20.component';
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
  selector: 'app-f01003scn1',
  templateUrl: './f01003scn1.component.html',
  styleUrls: ['./f01003scn1.component.css', '../../../assets/css/f01.css']
})
export class F01003scn1Component implements OnInit {
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private f01003Scn1Service: F01003Scn1Service,
    private childscn1Service: Childscn1Service,
    private f01002Scn1Service: F01002Scn1Service
  ) {
    this.JCICSource$ = this.f01003Scn1Service.HISTORYSource$.subscribe((data) => {
      this.historyData = data;
    });
  }

  private creditLevel: string = 'APPLCreditL2';
  private applno: string;
  private search: string;
  private cuid: string;
  fds: string;
  private winClose: string = '';
  private page: string;

  level: string;
  creditMemo: string;
  approveAmt: string;
  lowestPayRate: string;
  approveInterest: string;
  interest: string;
  interestType: string;
  creditResult: string;
  addSignature: string;//20220118
  period: string;
  periodType: string;
  interestBase: string;
  caApplicationAmount: string;
  caPmcus: string;
  caRisk: string;
  mark: string;

  changeValue: boolean = true;
  block: boolean = false;

  //???????????? 20211222
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
  }

  ngAfterViewInit() {
    let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    element.click();
  }

  getSearch(): string {
    return this.search;
  }

  getWinClose(): String {
    return this.winClose;
  }

  getLevel(): string {
    return this.creditLevel;
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
        //????????????????????????100000
        var amount = sessionStorage.getItem('resultApproveAmt')
        if (amount != null && amount != "") {
          var INT_amount: any;
          INT_amount = parseInt(amount.toString());
          if ((!isNaN(INT_amount)) && INT_amount < 100000 && sessionStorage.getItem('creditResult') == "C" && url == "f01/childscn0") {
            const childernDialogRef = this.dialog.open(ConfirmComponent, {
              data: { msgStr: "????????????????????????100000" }
            });
            return;
          }
        }


        this.f01002Scn1Service.setCREDITSource({ key: true });
        const baseUrl = url;
        let jsonObject: any = {};
        jsonObject['applno'] = this.applno;
        jsonObject['level'] = 'L2';

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
        this.addSignature = sessionStorage.getItem('addSignature');

        let jsoncreditResult: any = {};
        jsoncreditResult['approveAmt'] = this.approveAmt;
        jsoncreditResult['lowestPayRate'] = this.lowestPayRate;
        jsoncreditResult['caPmcus'] = this.caPmcus;
        jsoncreditResult['caRisk'] = this.caRisk;
        jsoncreditResult['creditResult'] = this.creditResult;
        jsoncreditResult['addSignature'] = this.addSignature;

        // let jsonCreditInterestPeriod: any = {};
        //20211229????????????????????????
        let creditInterestPeriodArray: interestPeriod[] = [];
        let count: number = Number(sessionStorage.getItem('count'));

        //????????????????????????
        for (let index = 1; index <= count; index++) {
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
        // jsonCreditInterestPeriod['approveInterest'] = this.approveInterest; // ????????????
        // jsonCreditInterestPeriod['interest'] = this.interest; // ????????????
        // jsonCreditInterestPeriod['interestBase'] = this.interestBase; // ????????????

        let jsonElApplicationInfo: any = {};
        jsonElApplicationInfo['caApplicationAmount'] = this.caApplicationAmount;

        jsonObject['creditResult'] = jsoncreditResult;
        // jsonObject['elCreditInterestPeriod'] = jsonCreditInterestPeriod;
        jsonObject['creditInterestPeriodArray'] = creditInterestPeriodArray;
        jsonObject['elApplicationInfo'] = jsonElApplicationInfo;

        if (url == 'f01/childscn0action1') {
          this.result(baseUrl, jsonObject, result, count);
        } else {
          if (!(this.creditResult == 'A' || this.creditResult == 'D')) {
            const childernDialogRef = this.dialog.open(ConfirmComponent, {
              data: { msgStr: '?????????????????????!' }
            });
          } else {
            if (this.creditResult == 'A') {
              if (this.approveAmt == '' || this.approveAmt == null) {
                const childernDialogRef = this.dialog.open(ConfirmComponent, {
                  data: { msgStr: '?????????????????????' }
                });
                return;
              } else if (this.lowestPayRate == '' || this.lowestPayRate == null) {
                const childernDialogRef = this.dialog.open(ConfirmComponent, {
                  data: { msgStr: '?????????????????????????????????' }
                });
                return;
              } else if (true) {
                if (count == 0) {
                  const childernDialogRef = this.dialog.open(ConfirmComponent, {
                    data: { msgStr: '?????????????????????' }
                  });
                  return;
                }
                if (creditInterestPeriodArray[0].period != '1') {
                  const childernDialogRef = this.dialog.open(ConfirmComponent, {
                    data: { msgStr: '???????????????????????????"1"' }
                  });
                  return;
                }
                if (count == 1) {
                  if (creditInterestPeriodArray[0].interestType != '02') {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '????????????????????????????????????????????????!' }
                    });
                    return;
                  }
                }
                if (count > 1) {
                  if (!(creditInterestPeriodArray[0].interestType == '01' && creditInterestPeriodArray[1].interestType == '02')) {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '?????????????????????????????????????????????+?????????!' }
                    });
                    return;
                  }
                }
                for (let index = 1; index <= count; index++) {
                  if (creditInterestPeriodArray[index - 1].approveInterest == '' || creditInterestPeriodArray[index - 1].approveInterest == null) {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '??????' + index + ',?????????????????????' }
                    });
                    return;
                  } else if (creditInterestPeriodArray[index - 1].interest == '' || creditInterestPeriodArray[index - 1].interest == null) {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '??????' + index + ',???????????????' }
                    });
                    return;
                  } else if (creditInterestPeriodArray[index - 1].interestType == '' || creditInterestPeriodArray[index - 1].interestType == null) {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '??????' + index + ',?????????????????????' }
                    });
                    return;
                  } else if (creditInterestPeriodArray[index - 1].period == '' || creditInterestPeriodArray[index - 1].period == null) {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '??????' + index + ',???????????????' }
                    });
                    return;
                  } else if (creditInterestPeriodArray[index - 1].periodType == '' || creditInterestPeriodArray[index - 1].periodType == null) {
                    const childernDialogRef = this.dialog.open(ConfirmComponent, {
                      data: { msgStr: '??????' + index + ',???????????????' }
                    });
                    return;
                  } else if (creditInterestPeriodArray[index - 2]) {
                    if (Number(creditInterestPeriodArray[index - 1].period) <= Number(creditInterestPeriodArray[index - 2].period)) {
                      const childernDialogRef = this.dialog.open(ConfirmComponent, {
                        data: { msgStr: '??????' + index + ',????????????????????????' }
                      });
                      return;
                    }
                  }
                }
                this.result(baseUrl, jsonObject, result, count);
              }
              // else if (this.mark == '' || this.mark == null) {
              //   const childernDialogRef = this.dialog.open(ConfirmComponent, {
              //     data: { msgStr: '?????????????????????' }
              //   });
              //   return;
              // }
              // else {
              //   this.result(baseUrl, jsonObject, result, count);
              // }
            } else {
              if (this.addSignature == 'S1' || this.addSignature == 'S2') {
                const childernDialogRef = this.dialog.open(ConfirmComponent, {
                  data: { msgStr: '??????????????????????????????!' }
                });
                return;
              }
              this.result(baseUrl, jsonObject, result, count);
            }
            // this.result(baseUrl, jsonObject, result, count);
          }
        }
      }
    });
  }

  result(baseUrl: string, jsonObject: JSON, result: string, count: number) {
    this.setHistory(count);
    const content = [];
    for (let index = 0; index < this.history.length; index++) {
      if (!(this.history[index].value == null || this.history[index].value == '' || this.history[index].value == 'null')) {
        content.push(
          {
            applno: this.applno,
            tableName: this.history[index].tableName,
            columnName: this.history[index].valueInfo,
            originalValue: this.history[index].originalValue,
            currentValue: this.history[index].value,
            transAPname: "??????????????????",
          }
        )
      }
    }
    jsonObject['content'] = content;

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

    this.f01003Scn1Service.setHistorySource({
      creditResult: this.creditResult,
      lowestPayRate: this.lowestPayRate,
      approveAmt: this.approveAmt,
      caApplicationAmount: this.caApplicationAmount,
      caPmcus: this.caPmcus,
      caRisk: this.caRisk,
      CreditInterestPeriodSource: newHistory,
      addSignature: this.addSignature
    })

    this.block = true;
    this.f01003Scn1Service.send(baseUrl, jsonObject).subscribe(data => {
      //??????????????????
      // if (count > 0) {
      // await this.setHistory(count);
      // }
      let childernDialogRef: any;
      if (data.rspMsg != null && data.rspMsg != '') {
        childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: data.rspMsg }
        });
      }
      if (data.rspMsg.includes('??????????????????') || baseUrl == 'f01/childscn0action1') { }
      else if (data.rspMsg.includes('?????????????????????')) {
        setTimeout(() => {
          childernDialogRef.close();
        }, 1000);
        setTimeout(() => {
          this.router.navigate(['./F01003']);
        }, 1500);
      }
      else {
        setTimeout(() => {
          childernDialogRef.close();
        }, 1000);
        // this.saveMemo();
        this.removeSession(count);
        setTimeout(() => {
          this.router.navigate(['./F01003']);
        }, 1500);
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
    sessionStorage.removeItem("addSignature");
  }
  // ??????
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
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        this.router.navigate(['./F01003']);
      }
    });
  }
  // //??????
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

  //???????????????????????????????????????
  changeRoute(route: boolean) {
    this.changeValue = route;
  }

  //???Page
  getPage() {
    return this.page;
  }

  //?????????????????????????????? 20211222
  setHistory(count: number) {
    if (count > 0) {
      for (let index = 1; index <= count; index++) {
        this.history.push({ value: sessionStorage.getItem('period' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'PERIOD', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].period }); //??????????????????
        this.history.push({ value: sessionStorage.getItem('periodType' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'PERIOD_TYPE', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].periodType }); //??????
        this.history.push({ value: sessionStorage.getItem('interestType' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST_TYPE', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].interestType }); //????????????
        this.history.push({ value: sessionStorage.getItem('approveInterest' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'APPROVE_INTEREST', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].approveInterest }); //????????????
        this.history.push({ value: sessionStorage.getItem('interest' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].interest }); //????????????
        this.history.push({ value: sessionStorage.getItem('interestBase' + index), tableName: 'EL_CREDIT_INTEREST_PERIOD', valueInfo: 'INTEREST_BASE', originalValue: this.historyData.CreditInterestPeriodSource[index - 1].interestBase }); //???????????????,??????,????????????
      }
    }
    this.history.push({ value: this.approveAmt, tableName: 'EL_CREDITMAIN', valueInfo: 'APPROVE_AMT', originalValue: this.historyData.approveAmt }); //????????????
    this.history.push({ value: this.lowestPayRate, tableName: 'EL_CREDITMAIN', valueInfo: 'LOWEST_PAY_RATE', originalValue: this.historyData.lowestPayRate }); //??????????????????(?????????)
    this.history.push({ value: this.creditResult, tableName: 'EL_CREDITMAIN', valueInfo: 'CREDIT_RESULT', originalValue: this.historyData.creditResult }); //????????????
    // this.history.push({value:  this.caApplicationAmount, tableName: 'EL_APPLICATION_INFO', valueInfo: 'CA_APPLICATION_AMOUNT'}); //????????????????????????
    this.history.push({ value: this.caPmcus, tableName: 'EL_CREDITMAIN', valueInfo: 'CA_PMCUS', originalValue: this.historyData.caPmcus }); //????????????-PM????????????
    this.history.push({ value: this.caRisk, tableName: 'EL_CREDITMAIN', valueInfo: 'CA_RISK', originalValue: this.historyData.caRisk }); //????????????-????????????
    this.history.push({ value: this.addSignature, tableName: 'EL_CREDITMAIN', valueInfo: 'ADD_SIGNATURE', originalValue: this.historyData.addSignature });//??????
  }

  scrollToTop(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  //??????
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

  //??????
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

  //Mail
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
  blockList() {
    const dialogRef = this.dialog.open(Childscn20Component, {
      panelClass: 'mat-dialog-transparent',
      data: {
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

}
