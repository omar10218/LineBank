import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Childbwscn12Component } from 'src/app/children-bw/childbwscn12/childbwscn12.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01009Service } from '../f01009.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-f01009scn1',
  templateUrl: './f01009scn1.component.html',
  styleUrls: ['./f01009scn1.component.css', '../../../assets/css/f01.css']
})
export class F01009scn1Component implements OnInit {

  constructor(
    public dialog: MatDialog,
    public f01009Service: F01009Service,
    private router: Router,
  ) { }

  private applno: string;
  private search: string;
  private cuid: string;
  private fds: string
  private page: string
  creditlevel = "";
  creditaction:string;

  changeValue: boolean = true;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.cuid = sessionStorage.getItem('cuid');
    this.fds = sessionStorage.getItem('fds');
    this.page = sessionStorage.getItem('page');
    this.creditlevel = this.page == "9" ? "L4" : this.creditlevel;
    this.creditlevel = this.page == "10" ? "L3" : this.creditlevel;
  }

  ngAfterViewInit() {
    let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    element.click();
  }

  getSearch(): String {
    return this.search;
  }

  reSearch() {
    const dialogRef = this.dialog.open(Childbwscn12Component, {
      width: "60vw",
      data: {
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  // finish() {
  //   if (sessionStorage.getItem('BW_creditResult') == null) {
  //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
  //       data: { msgStr: '請選取審核結果' }
  //     });
  //   }
  //   // else {
  //   //   alert(this.BW_creditResult);
  //   // }
  //   // alert(sessionStorage.getItem('BW_creditResult'));

  // }

  //儲存
  save() {
    if(this.creditaction==""||this.creditaction==null){
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請輸入審核意見' }
      });
      return;
    }
    // let msg = "";
    const url = 'f01/childbwscn1action1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['creditaction'] = this.creditaction;
    jsonObject['creditlevel'] = this.creditlevel;
    console.log('jsonObject')
    console.log(jsonObject)
    this.f01009Service.postJson(url, jsonObject).subscribe(data => {
      // if(data.rspMsg=="儲存成功!"){this.getCreditmemo(this.pageIndex, this.pageSize);}
      // msg = data.rspMsg ;
      // const childernDialogRef = this.dialog.open(ConfirmComponent, {
      //   data: { msgStr: msg }
      // });
      // console.log('savedata')
      // console.log(data)
    });
  }

  finish() {
    if (sessionStorage.getItem('BW_creditResult') == "") {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請選取審核結果' }
      });
      return;
    }
    if (sessionStorage.getItem('creditaction') == "" && sessionStorage.getItem('size') == "0") {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請填寫審核註記' }
      });
      return;
    }
    const url = 'f01/childbwscn0';
    let msg = '';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = this.creditlevel;
    jsonObject['creditResult'] = sessionStorage.getItem('BW_creditResult');
    this.f01009Service.postJson(url, jsonObject).subscribe(data => {
      // if(data.rspMsg=="儲存成功!"){this.getCreditmemo(this.pageIndex, this.pageSize);}
      msg = data.rspMsg ;
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msg }
      });
      // console.log('savedata')
      // console.log(data)
      this.router.navigate(['./F01009']);
    });
  }

  //判斷是否需要顯示案件完成列
  changeRoute(route: boolean) {
    this.changeValue = route;
  }
}
