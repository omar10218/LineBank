import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Childscn26Component } from 'src/app/children/childscn26/childscn26.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { history } from './../../interface/base';
import { F01014Scn1Service } from './f01014scn1.service';

@Component({
  selector: 'app-f01014scn1',
  templateUrl: './f01014scn1.component.html',
  styleUrls: ['./f01014scn1.component.css', '../../../assets/css/f01.css']
})
export class F01014scn1Component implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private f01014Scn1Service: F01014Scn1Service,
  ) {
    this.JCICSource$ = this.f01014Scn1Service.HISTORYSource$.subscribe((data) => {
      this.historyData = data;
    });
  }

  private creditLevel: string = 'APPLCreditS1'; //實際為L0 的 S1案件
  private applno: string;
  private search: string;
  private nationalId: string;
  fds: string;
  private winClose: string = '';
  private page: string;//判斷哪一頁進入用

  creditResult: string;
  addSignature: string;//20220118
  level: string;

  changeValue: boolean = true;
  block: boolean = false;

  //歷史資料 20211222
  history: history[] = [];
  JCICSource$: Subscription;
  historyData: any;

  stepName: string;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.nationalId = sessionStorage.getItem('nationalId');
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

  getNationalId(): string {
    return this.nationalId;
  }

  getLevel(): string {
    return this.creditLevel;
  }

  getWinClose(): String {
    return this.winClose;
  }
  //取Page
  getPage() {
    return this.page;
  }
  //判斷是否需要顯示案件完成列
  changeRoute(route: boolean) {
    this.changeValue = route;
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

        this.creditResult = sessionStorage.getItem('creditResult');
        this.addSignature = sessionStorage.getItem('addSignature');

        let jsoncreditResult: any = {};
        jsoncreditResult['creditResult'] = this.creditResult;
        jsoncreditResult['addSignature'] = this.addSignature;

        jsonObject['creditResult'] = jsoncreditResult;

        this.result(baseUrl, jsonObject, result);
      }
    });
  }

  result(baseUrl: string, jsonObject: JSON, result: string) {
    this.setHistory();
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
            transAPname: "總經理完成",
          }
        )
      }
    }
    jsonObject['content'] = content;

    this.f01014Scn1Service.setHistorySource({
      creditResult: this.creditResult,
      addSignature: this.addSignature
    })

    this.block = true;
    this.f01014Scn1Service.send(baseUrl, jsonObject).subscribe(data => {
      let childernDialogRef: any;
      if (data.rspMsg != null && data.rspMsg != '') {
        childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: data.rspMsg }
        });
      }
      if (data.rspMsg.includes('處理案件異常') || baseUrl == 'f01/childscn0action1') { } else {
        setTimeout(() => {
          childernDialogRef.close();
        }, 1000);
        // this.saveMemo();
        this.removeSession();
        setTimeout(() => {
          this.router.navigate(['./F01014']);
        }, 1500);
      }
      this.block = false;
    });
  }

  //設定歷史資料紀錄參數 20211222
  setHistory() {
    this.history.push({ value: this.creditResult, tableName: 'EL_CREDITMAIN', valueInfo: 'CREDIT_RESULT', originalValue: this.historyData.creditResult }); //核決結果
    this.history.push({ value: this.addSignature, tableName: 'EL_CREDITMAIN', valueInfo: 'ADD_SIGNATURE', originalValue: this.historyData.addSignature });//加簽
  }

  removeSession() {
    let count: number = Number(sessionStorage.getItem('count'));
    if (count > 0) {
      for (let index = 1; index <= count; index++) {
        sessionStorage.removeItem("period" + index);
        sessionStorage.removeItem("periodType" + index);
        sessionStorage.removeItem("interestType" + index);
        sessionStorage.removeItem("approveInterest" + index);
        sessionStorage.removeItem("interest" + index);
        sessionStorage.removeItem("interestBase" + index);
        sessionStorage.removeItem("id" + index);
      }
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

}
