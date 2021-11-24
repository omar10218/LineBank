import { Subscription } from 'rxjs';
import { Childscn19Component } from './../../children/childscn19/childscn19.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Childscn18Component } from 'src/app/children/childscn18/childscn18.component';
import { Router } from '@angular/router';
import { Childscn20Component } from 'src/app/children/childscn20/childscn20.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01002Scn1Service } from './f01002scn1.service';
import { Childscn22Component } from 'src/app/children/childscn22/childscn22.component';
import { F01001Scn1Service } from 'src/app/f01001/f01001scn1/f01001scn1.service';
import { Childscn1Service } from 'src/app/children/childscn1/childscn1.service';

@Component({
  selector: 'app-f01002scn1',
  templateUrl: './f01002scn1.component.html',
  styleUrls: ['./f01002scn1.component.css', '../../../assets/css/f01.css']
})
export class F01002scn1Component implements OnInit {

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

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.cuid = sessionStorage.getItem('cuid');
    this.fds = sessionStorage.getItem('fds');
    this.level = sessionStorage.getItem('level');
    this.winClose = sessionStorage.getItem('winClose');
  }

  ngAfterViewInit() {
    // let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    // element.click();
  }

  ngOnDestroy() {
    this.JCICSource$.unsubscribe();
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
    const baseUrl = url;
    let msg = '';
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
    if (this.creditResult == '' || this.creditResult == 'null' || this.creditResult == null) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請填寫核決結果!' }
      });
    } else {
      if (this.creditResult == 'A') {
        if (this.approveAmt != '' && this.lowestPayRate != '' && this.approveInterest != '' && this.interest != '' && this.interestType != '' && this.periodType != '' && this.period != '' && this.mark != '' && this.mark != null) {
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

  saveResult(url: string, json: JSON): string {
    return this.f01002scn1Service.saveOrEditMsgJson(url, json);
  }

  result(baseUrl: string, jsonObject: JSON, result: string) {
    this.saveMemo();
    this.f01002scn1Service.send(baseUrl, jsonObject).subscribe(data => {
      this.removeSession();
      this.router.navigate(['./F01002']);
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
    sessionStorage.removeItem("mark");
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
}
