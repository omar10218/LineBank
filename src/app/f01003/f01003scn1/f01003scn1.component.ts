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
    private f01003Scn1Service:F01003Scn1Service
  ) { }

  private creditLevel: string = 'APPLCreditL2';
  private applno: string;
  private search: string;
  private cuid: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = sessionStorage.getItem('applno');
      this.search = sessionStorage.getItem('search');
      this.cuid = sessionStorage.getItem('cuid');
    });
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

  getCuid(): string {
    return this.cuid;
  }

  getLevel(): string {
    return this.creditLevel;
  }

  finish() {
    const baseUrl = 'f01/childscn0';
    let msg = '';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = 'L2';

    let json:any = {};
    json['creditMemo'] = "測試";
    json['approveAmt'] = '2';
    json['lowestPayRate'] = '1';
    json['approveInterest'] = '1';
    json['interest'] = '2';
    json['interestType'] = '03';
    jsonObject['creditResult'] = json;
    this.f01003Scn1Service.send( baseUrl, jsonObject ).subscribe(data => {
      console.log(data)
    });

    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: '案件完成' }
    });
  }
}
