import { Childscn1Component } from './../children/childscn1/childscn1.component';
import { F01002scn1Component } from './../f01002/f01002scn1/f01002scn1.component';
import { F02004Service } from './f02004.service';
import { Component, OnInit } from '@angular/core';
import { OptionsCode } from '../interface/base';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { Data, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f02004',
  templateUrl: './f02004.component.html',
  styleUrls: ['./f02004.component.css', '../../assets/css/f02.css']
})
export class F02004Component implements OnInit {

  constructor(
    private f02004Service: F02004Service,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private router: Router,
  ) { }

  account: string = ''//循環帳戶
  date: [Date, Date];//時間
  dateFormat = 'yyyy/MM/dd';
  drFlag:  string = '';//動撥狀態
  drFlagCode: OptionsCode[] = [];
  rescanData: Data[] = [];
  total = 1;
  loading = true;
  pageIndex = 1;
  pageSize = 50;
  ngOnInit(): void {
    const baseUrl = 'f02/f02002';
    this.f02004Service.getRescanEmpno( baseUrl ).subscribe(data => {
      for (let i = 0; i < data.rspBody.length; i++) {
        if (data.rspBody[i].RESCANEMPNO != null) {
          this.drFlagCode.push( { value: data.rspBody[i].RESCANEMPNO, viewValue: data.rspBody[i].RESCANEMPNO } );
        }
      }
      this.loading = false;
    });
  }


  getRescanData( pageIndex: number, pageSize: number ) {
    const baseUrl = 'f02/f02002action1';
    let jsonObject : any = {};
    jsonObject['account'] = this.account;
    jsonObject['drFlag'] = this.drFlag;
    if ( this.date != null ) {
      jsonObject['startDate'] = this.datepipe.transform( new Date(this.date[0]).toString() , 'yyyyMMdd' );
      jsonObject['endDate'] = this.datepipe.transform( new Date(this.date[1]).toString() , 'yyyyMMdd' );
    } else {
      jsonObject['startDate'] = '';
      jsonObject['endDate'] = '';
    }
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.f02004Service.f02002( baseUrl, jsonObject ).subscribe(data => {
      console.log(data)
      this.loading = false;
      if ( data.rspBody.size == 0 ) {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: "查無資料" }
        });
      } else {
        this.total = data.rspBody.size;
        this.rescanData = data.rspBody.items;
      }
    });
  }

  search() {
    var startDate, endDate;
    if ( this.account == '' && this.drFlag == ''  && this.date == null ) {
      this.clear();
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請至少選擇一項" }
      });
    } else {
      if ( this.date != null ) {
        startDate = new Date( this.date[0] );
        endDate =  new Date( this.date[1] );
        if ( ( endDate - startDate ) / 1000 / 60 / 60 / 24 > 90 ) {
          this.clear();
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "查詢區間最多三個月內!" }
          });
        } else {
          this.getRescanData( this.pageIndex, this.pageSize );
        }
      } else {
        this.getRescanData( this.pageIndex, this.pageSize );
      }
    }
  }

  clear() {
    this.account = '';
    this.drFlag = '';
    this.total = 1;
    this.loading = false;
    this.pageSize = 10;
    this.pageIndex = 1;
    this.rescanData = null;
    this.date = null;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    if ( this.account == '' && this.drFlag == ''  ) {

    } else {
      const { pageSize, pageIndex } = params;
      this.getRescanData(pageIndex, pageSize);
    }
  }

  detail( applno: string, nationalId: string, custId: string) {
    const url = 'f02/f02002action2';
    let jsonObject: any = {};
    jsonObject['applno'] = applno;
    this.f02004Service.f02002( url, jsonObject).subscribe(data => {
      sessionStorage.setItem( 'applno', applno );
      sessionStorage.setItem( 'cuid', nationalId );
      sessionStorage.setItem( 'search', 'Y' );
      if(data.rspBody.length > 0 )
      {
        sessionStorage.setItem( 'fds', data.rspBody[0].fds != null?  data.rspBody[0].fds:'' );
      }else
      {
        sessionStorage.setItem( 'fds', '' );
      }
      sessionStorage.setItem( 'queryDate', '' );
      sessionStorage.setItem( 'winClose', 'Y' );
      sessionStorage.setItem('page', '04');//04動撥紀錄查詢
      //開啟徵審主畫面
      const url = window.location.href.split("/#");
      window.open( url[0] + "/#/F01002/F01002SCN1" );
      // this.router.navigate(['./F01002/F01002SCN1']);
      // const childernDialogRef = this.dialog.open(F01002scn1Component, {
      //   minHeight: '30%',
      //   width: '70%',
      //   maxHeight: '65vh'
      // });
    });
  }

  dateNull() {
    if ( this.date.length < 1 ) {
      this.date = null;
    }
  }
}
