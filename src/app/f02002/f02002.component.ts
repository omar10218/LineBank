import { Childscn1Component } from './../children/childscn1/childscn1.component';
import { F01002scn1Component } from './../f01002/f01002scn1/f01002scn1.component';
import { F02002Service } from './f02002.service';
import { Component, OnInit } from '@angular/core';
import { OptionsCode } from '../interface/base';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { Data, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { F02002returnComponent } from './f02002return/f02002return.component';

@Component({
  selector: 'app-f02002',
  templateUrl: './f02002.component.html',
  styleUrls: ['./f02002.component.css', '../../assets/css/f02.css']
})
export class F02002Component implements OnInit {

  constructor(
    private f02002Service: F02002Service,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private router: Router,
  ) { }

  applno: string = '';
  nationalId: string = '';
  custId: string = '';
  rescanEmpno: string = '';
  rescanEmpnoCode: OptionsCode[] = [];

  date: [Date, Date];
  dateFormat = 'yyyy/MM/dd';

  rescanData: Data[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 50;
  Pieces = 0;
  ngOnInit(): void {
    const baseUrl = 'f02/f02002';
    this.f02002Service.getRescanEmpno(baseUrl).subscribe(data => {
      if (data.rspBody.length > 0) {
        for (let i = 0; i < data.rspBody.length; i++) {
          if (data.rspBody[i].RESCANEMPNO != null) {
            this.rescanEmpnoCode.push({ value: data.rspBody[i].RESCANEMPNO, viewValue: data.rspBody[i].RESCANEMPNO });
          }
        }
      } else {
        this.rescanEmpnoCode.push({ value: '', viewValue: '無補件人員' });
      }
    });
  }

  getRescanData(pageIndex: number, pageSize: number) {
    const baseUrl = 'f02/f02002action1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['nationalId'] = this.nationalId;
    jsonObject['custId'] = this.custId;
    jsonObject['rescanEmpno'] = this.rescanEmpno;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    if (this.date != null) {
      jsonObject['startDate'] = this.datepipe.transform(new Date(this.date[0]).toString(), 'yyyyMMdd');
      jsonObject['endDate'] = this.datepipe.transform(new Date(this.date[1]).toString(), 'yyyyMMdd');
    } else {
      jsonObject['startDate'] = '';
      jsonObject['endDate'] = '';
    }
    this.f02002Service.f02002(baseUrl, jsonObject).subscribe(data => {
      if (data.rspBody.size == 0) {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: "查無資料" }
        });
      } else {
        this.Pieces = data.rspBody.size;
        this.rescanData = data.rspBody.items;
      }
    });
  }

  search() {
    var startDate, endDate;
    if (this.applno == '' && this.nationalId == '' && this.custId == '' && this.rescanEmpno == '' && this.date == null) {
      this.clear();
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請至少選擇一項" }
      });
    } else {
      if (this.date != null) {
        startDate = new Date(this.date[0]);
        endDate = new Date(this.date[1]);
        if (this.nationalId != '' || this.custId != '') {
          if ((endDate - startDate) / 1000 / 60 / 60 / 24 > 365) {
            this.clear();
            const childernDialogRef = this.dialog.open(ConfirmComponent, {
              data: { msgStr: "查詢區間最多一年內!" }
            });
          } else {
            this.getRescanData(this.pageIndex, this.pageSize);
          }
        } else {
          if ((endDate - startDate) / 1000 / 60 / 60 / 24 > 90) {
            this.clear();
            const childernDialogRef = this.dialog.open(ConfirmComponent, {
              data: { msgStr: "查詢區間最多三個月內!" }
            });
          } else {
            this.getRescanData(this.pageIndex, this.pageSize);
          }
        }
      } else {
        this.getRescanData(this.pageIndex, this.pageSize);
      }
    }
  }

  clear() {
    this.applno = '';
    this.nationalId = '';
    this.custId = '';
    this.rescanEmpno = '';
    this.total = 1;
    this.pageSize = 10;
    this.pageIndex = 1;
    this.rescanData = null;
    this.date = null;
    this.Pieces = 0;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    if (this.applno == '' && this.nationalId == '' && this.custId == '' && this.rescanEmpno == '') {

    } else {
      const { pageSize, pageIndex } = params;
      this.getRescanData(pageIndex, pageSize);
    }
  }

  detail(applno: string, nationalId: string,cuCname:string) {
    let jsonObject1: any = {};
    jsonObject1['applno'] = applno;
    jsonObject1['nationalID'] = nationalId;
    jsonObject1['searchKind'] = '3';//查詢種類1:案件查詢2:客服案件查詢3:補件資訊查詢
    jsonObject1['custCname'] = cuCname;//客戶姓名CU_CNAME
    let apiurl = 'f02/f02001action2';
    this.f02002Service.postJson(apiurl, jsonObject1).subscribe(data => {
      if (data.rspMsg == "success" && data.rspBody == "儲存成功!") {
        const url = 'f02/f02002action2';
        let jsonObject: any = {};
        jsonObject['applno'] = applno;
        this.f02002Service.f02002(url, jsonObject).subscribe(data => {
          console.log(data)
          sessionStorage.setItem('applno', applno);
          sessionStorage.setItem('cuid', nationalId);
          sessionStorage.setItem('search', 'Y');
          if (data.rspBody.length > 0) {
            sessionStorage.setItem('fds', data.rspBody[0].fds != null ? data.rspBody[0].fds : '');
          } else {
            sessionStorage.setItem('fds', '');
          }

          sessionStorage.setItem('queryDate', '');
          sessionStorage.setItem('winClose', 'Y');
          sessionStorage.setItem('page', '02');//02補件資訊查詢
          //開啟徵審主畫面
          const url = window.location.href.split("/#");
          window.open(url[0] + "/#/F01002/F01002SCN1", "", "location=no");
          sessionStorage.setItem('winClose', 'N');
          // const url = this.router.serializeUrl(
          //   this.router.createUrlTree(["./F01002/F01002SCN1"])
          // );
          // window.open(url);
          // this.router.navigate(['./F01002/F01002SCN1']);
          // const childernDialogRef = this.dialog.open(F01002scn1Component, {
          //   minHeight: '30%',
          //   width: '70%',
          //   maxHeight: '65vh'
          // });
        });
      } else {
        this.dialog.open(ConfirmComponent, {
          data: { msgStr: "查詢案件紀錄異常" }
        });
      }
    })


  }

  dateNull() {
    if (this.date.length < 1) {
      this.date = null;
    }
  }

  //補回
  return(APPLNO: Data)
   {
    const dialogRef = this.dialog.open(F02002returnComponent, {
      panelClass: 'mat-dialog-transparent',
      height: '100%',
      width: '100%',
      data: {
        applno: APPLNO,
      }
    })
    dialogRef.afterClosed().subscribe(result => {

      if(result.event == 'success')
      {

        this.search();
      }

    })
  }
  test()
  {
    alert(this.Pieces)
  }
}
