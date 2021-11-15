import { BaseService } from 'src/app/base.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Childscn18Component } from 'src/app/children/childscn18/childscn18.component';
import { Childscn19Component } from 'src/app/children/childscn19/childscn19.component';
import { Childscn20Component } from 'src/app/children/childscn20/childscn20.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01001Scn1Service } from './f01001scn1.service';

@Component({
  selector: 'app-f01001scn1',
  templateUrl: './f01001scn1.component.html',
  styleUrls: ['./f01001scn1.component.css', '../../../assets/css/f01.css']
})
export class F01001scn1Component implements OnInit {
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private f01001Scn1Service: F01001Scn1Service
  ) { }
  private creditLevel: string = 'APPLCreditL4';
  private applno: string;
  private search: string;
  private cuid: string;
  private routerCase: string;
  fds: string
  private winClose: string = '';

  creditResult: string;
  level: string;
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

  reScan() {
    const dialogRef = this.dialog.open(Childscn19Component, {
      minHeight: '50%',
      width: '70%',
      data: {
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  reSearch() {
    const dialogRef = this.dialog.open(Childscn18Component, {
      data: {
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  blockList() {
    const dialogRef = this.dialog.open(Childscn20Component, {
      data: {
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  leave() {
    // this.router.navigate(['./F02002']);
    window.close();
  }

  finish() {
    const baseUrl = 'f01/childscn0';
    let msg = '';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = 'L4';
    this.creditResult = sessionStorage.getItem('creditResult');
    this.f01001Scn1Service.send( baseUrl, jsonObject ).subscribe(data => {
      console.log(data)
    });

    //徵信人員
    if (this.level == 'L4') {

    }
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: '案件完成' }
    });
  }

  getWinClose(): String {
    return this.winClose;
  }

}
