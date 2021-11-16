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

  blockList() {
    const dialogRef = this.dialog.open(Childscn20Component, {
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

  finish() {
    const baseUrl = 'f01/childscn0';
    let msg = '';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = this.leave;
    this.creditResult = sessionStorage.getItem('creditResult');
    this.f01002scn1Service.send( baseUrl, jsonObject ).subscribe(data => {
      console.log(data);
    });
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: '案件完成' }
    });
  }

  saveResult(url: string, json: JSON): string {
    return this.f01002scn1Service.saveOrEditMsgJson(url, json);
  }

}
