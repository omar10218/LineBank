import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Childscn22Component } from 'src/app/children/childscn22/childscn22.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01003Scn1Service } from './f01003scn1.service';

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
    private f01003Scn1Service: F01003Scn1Service
  ) { }

  private creditLevel: string = 'APPLCreditL2';
  private applno: string;
  private search: string;
  private cuid: string;
  fds: string;
  private winClose: string = '';
  level: string;
  creditMemo: string;
  approveAmt: string;
  lowestPayRate: string;
  approveInterest: string;
  interest: string;
  interestType: string;
  creditResult: string;
  period: string;
  periodType: string;
  interestBase: string;
  caApplicationAmount: string;
  caPmcus: string;
  caRisk: string

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.cuid = sessionStorage.getItem('cuid');
    this.fds = sessionStorage.getItem('fds');
    this.level = sessionStorage.getItem('level');
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
      minHeight: '50%',
      width: '30%',
      data: {
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  // finish() {
  //   const baseUrl = 'f01/childscn0';
  //   let msg = '';
  //   let jsonObject: any = {};
  //   jsonObject['applno'] = this.applno;
  //   jsonObject['level'] = 'L2';

  //   this.approveAmt = sessionStorage.getItem('resultApproveAmt');
  //   this.lowestPayRate = sessionStorage.getItem('resultLowestPayRate');

  //   this.period = sessionStorage.getItem('period');
  //   this.periodType = sessionStorage.getItem('periodType');
  //   this.interestType = sessionStorage.getItem('interestType');
  //   this.approveInterest = sessionStorage.getItem('approveInterest');
  //   this.interest = sessionStorage.getItem('interest');
  //   this.interestBase = sessionStorage.getItem('interestBase');
  //   this.creditResult = sessionStorage.getItem('creditResult');
  //   this.caApplicationAmount = sessionStorage.getItem('caApplicationAmount');
  //   this.caPmcus = sessionStorage.getItem('caPmcus');
  //   this.caRisk = sessionStorage.getItem('caRisk');

  //   if (this.approveAmt != '' && this.lowestPayRate != '' && this.approveInterest != '' && this.interest != '' && this.interestType != '') {

  //     let jsoncreditResult: any = {};
  //     jsoncreditResult['approveAmt'] = this.approveAmt;
  //     jsoncreditResult['lowestPayRate'] = this.lowestPayRate;
  //     jsoncreditResult['caApplicationAmount'] = this.caApplicationAmount;

  //     let jsonCreditInterestPeriod: any = {};
  //     jsonCreditInterestPeriod['caPmcus'] = this.caPmcus;
  //     jsonCreditInterestPeriod['caRisk'] = this.caRisk;
  //     jsonCreditInterestPeriod['periodType'] = this.periodType;
  //     jsonCreditInterestPeriod['interestType'] = this.interestType;
  //     jsonCreditInterestPeriod['interestCode'] = '1';
  //     jsonCreditInterestPeriod['approveInterest'] = this.approveInterest; // 核准利率
  //     jsonCreditInterestPeriod['interest'] = this.interest; // 固定利率
  //     jsonCreditInterestPeriod['interestBase'] = this.interest; // 基放利率

  //     if (this.creditResult == '' || this.creditResult == 'null' || this.creditResult == null) {
  //       const childernDialogRef = this.dialog.open(ConfirmComponent, {
  //         data: { msgStr: '請填寫核決結果!' }
  //       });
  //     } else {
  //       jsoncreditResult['creditResult'] = this.creditResult;
  //       jsonObject['creditResult'] = jsoncreditResult;
  //       jsonObject['elCreditInterestPeriod'] = jsonCreditInterestPeriod
  //       this.f01003Scn1Service.send( baseUrl, jsonObject ).subscribe(data => {
  //         this.router.navigate(['./F01003']);
  //       });
  //       const childernDialogRef = this.dialog.open(ConfirmComponent, {
  //         data: { msgStr: '案件完成' }
  //       });
  //     }
  //   } else {
  //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
  //       data: { msgStr: '審核結果未填寫' }
  //     });
  //   }
  // }

  save(url: string, result: string) {
    const baseUrl = url;
    let msg = '';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = 'L2';

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

    let jsoncreditResult: any = {};
    jsoncreditResult['approveAmt'] = this.approveAmt;
    jsoncreditResult['lowestPayRate'] = this.lowestPayRate;
    jsoncreditResult['caPmcus'] = this.caPmcus;
    jsoncreditResult['caRisk'] = this.caRisk;
    jsoncreditResult['creditResult'] = this.creditResult;

    let jsonCreditInterestPeriod: any = {};
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
    if (this.creditResult == '' || this.creditResult == 'null' || this.creditResult == null) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請填寫核決結果!' }
      });
    } else {
      if (this.creditResult == 'A') {
        if (this.approveAmt != '' && this.lowestPayRate != '' && this.approveInterest != '' && this.interest != '' && this.interestType != '' && this.periodType != '' && this.period != '') {
          this.result(baseUrl, jsonObject, result);
        } else {
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: '審核結果未填寫' }
          });
        }
      } else {
        this.result(baseUrl, jsonObject, result);
      }
    }
  }

  result(baseUrl: string, jsonObject: JSON, result: string) {
    this.f01003Scn1Service.send(baseUrl, jsonObject).subscribe(data => {
      this.removeSession();
      this.router.navigate(['./F01003']);
    });
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: result }
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
}
