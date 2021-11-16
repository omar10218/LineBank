import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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

  finish() {
    const baseUrl = 'f01/childscn0';
    let msg = '';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = this.level;

    this.creditMemo = sessionStorage.getItem('mark');
    this.approveAmt = sessionStorage.getItem('resultApproveAmt');
    this.lowestPayRate = sessionStorage.getItem('resultLowestPayRate');
    this.approveInterest = sessionStorage.getItem('approveInterest');
    this.interest = sessionStorage.getItem('interest');
    this.interestType = sessionStorage.getItem('interestType');

    if (this.approveAmt != '' && this.lowestPayRate != '' && this.approveInterest != '' && this.interest != '' && this.interestType != '') {
      let json: any = {};
      json['creditMemo'] = this.creditMemo;
      json['approveAmt'] = this.approveAmt;
      json['lowestPayRate'] = this.lowestPayRate;
      json['approveInterest'] = this.approveInterest;
      json['interest'] = this.interest;
      json['interestType'] = this.interestType;
      jsonObject['creditResult'] = json;
      this.f01003Scn1Service.send(baseUrl, jsonObject).subscribe(data => {
        console.log(data)
      });

      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '案件完成' }
      });
    } else {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '審核結果未填寫' }
      });
    }
  }
}
