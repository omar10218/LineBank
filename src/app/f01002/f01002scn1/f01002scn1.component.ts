import { Childscn19Component } from './../../children/childscn19/childscn19.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Childscn18Component } from 'src/app/children/childscn18/childscn18.component';
import { Router } from '@angular/router';
import { Childscn20Component } from 'src/app/children/childscn20/childscn20.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01002Scn1Service } from './f01002scn1.service';
import { Childscn22Component } from 'src/app/children/childscn22/childscn22.component';

@Component({
  selector: 'app-f01002scn1',
  templateUrl: './f01002scn1.component.html',
  styleUrls: ['./f01002scn1.component.css', '../../../assets/css/f01.css']
})
export class F01002scn1Component implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private f01002scn1Service: F01002Scn1Service
  ) { }

  private creditLevel: string = 'APPLCreditL3';
  private applno: string;
  private search: string;
  private cuid: string;
  private routerCase: string;
  fds: string
  private winClose: string ='';

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

  reScan() {
    const dialogRef = this.dialog.open(Childscn19Component,{
      minHeight: '50%',
      width: '70%',
      data:{
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  reSearch() {
    const dialogRef = this.dialog.open(Childscn18Component,{
      data:{
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  recalculate(){
    const dialogRef = this.dialog.open(Childscn22Component,{
      data:{
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  blockList() {
    const dialogRef = this.dialog.open(Childscn20Component,{
      data:{
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  getSearch(): String {
    return this.search;
  }

  getWinClose(): String{
    return this.winClose;
  }

  leave () {
    // this.router.navigate(['./F02002']);
    window.close();
  }

  finish() {
    const baseUrl = '';
    let msg = '';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = this.level;
    this.creditResult = sessionStorage.getItem('creditResult');
    //徵信人員
    if (this.level == 'L3') {

    }

    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: msg }
    });
  }

  saveResult( url: string, json: JSON ): string {
    return this.f01002scn1Service.saveOrEditMsgJson( url, json );
  }
}
