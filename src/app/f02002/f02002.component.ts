import { F02002Service } from './f02002.service';
import { Component, OnInit } from '@angular/core';
import { OptionsCode } from '../interface/base';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-f02002',
  templateUrl: './f02002.component.html',
  styleUrls: ['./f02002.component.css', '../../assets/css/f02.css']
})
export class F02002Component implements OnInit {

  constructor(
    private f02002Service: F02002Service,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) { }

  applno: string = '';
  nationalId: string = '';
  custId: string = '';
  rescanEmpno: string = '';
  rescanEmpnoCode: OptionsCode[] = [];

  date: [Date, Date];
  dateFormat = 'yyyy/MM/dd';

  rescanData: Data[] = [];
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  ngOnInit(): void {
    const baseUrl = 'f02/f02002';
    this.f02002Service.getRescanEmpno( baseUrl ).subscribe(data => {
      for (let i = 0; i < data.rspBody.length; i++) {
        this.rescanEmpnoCode.push( { value: data.rspBody[i].RESCANEMPNO, viewValue: data.rspBody[i].RESCANEMPNO } );
      }
    });
  }

  getRescanData( pageIndex: number, pageSize: number ) {
    const baseUrl = 'f02/f02002action1';
    let jsonObject : any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['nationalId'] = this.nationalId;
    jsonObject['custId'] = this.custId;
    jsonObject['rescanEmpno'] = this.rescanEmpno;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.f02002Service.getData( baseUrl, jsonObject ).subscribe(data => {
      this.loading = false;
      this.total = data.rspBody.size;
      this.rescanData = data.rspBody.items;
    });
  }

  search() {
    if ( this.applno == '' && this.nationalId == '' && this.custId == '' && this.rescanEmpno == '' ) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請至少選擇一項" }
      });
    } else {
      this.getRescanData( this.pageIndex, this.pageSize );
    }
  }

  clear() {
    this.applno = '';
    this.nationalId = '';
    this.custId = '';
    this.rescanEmpno = '';
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getRescanData(pageIndex, pageSize);
  }

  detail( applno: string, nationalId: string, custId: string) {

  }

  onChange(): void {
    console.log( this.date[1] );
  }
}
