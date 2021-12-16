import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Childscn1Service } from 'src/app/children/childscn1/childscn1.service';
import { Childscn22Component } from 'src/app/children/childscn22/childscn22.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01003Scn1Service } from './f01003scn1.service';
import { Childscn24Component } from 'src/app/children/childscn24/childscn24.component';
import { Childscn26Component } from 'src/app/children/childscn26/childscn26.component';
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
  ) { }

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
  period: string;
  periodType: string;
  interestBase: string;
  caApplicationAmount: string;
  caPmcus: string;
  caRisk: string;
  mark: string;

  changeValue: boolean = true;
  block: boolean = false;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.cuid = sessionStorage.getItem('cuid');
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
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.value == 'confirm') {
        const baseUrl = url;
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
            //   } else if (this.period == '' || this.period == null) {
            //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
            //       data: { msgStr: '期數未填寫' }
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

  result(baseUrl: string, jsonObject: JSON, result: string) {
    this.block = true;
    this.saveMemo();
    this.f01003Scn1Service.send(baseUrl, jsonObject).subscribe(data => {
      this.removeSession();
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: data.rspMsg }
      });
      this.block = false;
      this.router.navigate(['./F01003']);
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
}
