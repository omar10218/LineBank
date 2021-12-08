import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';

import { Childscn3Service } from './childscn3.service';

interface checkBox {
  value: string;
  completed: boolean;
}
interface ANNOUNCE_REASON {
  announceReason1: string;
  announceReason2: string;
}


//Jay 偽案通報

@Component({
  selector: 'app-childscn3',
  templateUrl: './childscn3.component.html',
  styleUrls: ['./childscn3.component.css', '../../../assets/css/f03.css']
})
export class Childscn3Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private childsc3Service: Childscn3Service,
    public dialog: MatDialog
  ) { }

  private applno: string;
  private search: string;
  private stepName: string;
  chkArray: checkBox[] = [];
  level1: string[] = [];//裝第一層checkbox
  data: any;//裝一開始的資料表
  l1: ANNOUNCE_REASON[] = [];
  jsonObject: any = {};
  i: string;
  K = 0;
  no: string;//會員帳號
  total = 1;
  loading = false;
  pageSize = 50;
  pageIndex = 1;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.no = localStorage.getItem("empNo");
    this.search = sessionStorage.getItem('search');
    this.getTable()//抓取資料表
  }

  getOptionDesc(option: OptionsCode[], codeVal: string): string //代碼跑名稱
  {
    for (const data of option) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }

  chkArray1(check: boolean, value: string, id: string) //第一層checkbox
  {
    if (check) {
      this.level1.push(id)
    }
    else {
      this.level1.splice(this.level1.indexOf(id), 1)
      for (var fdL1 of this.data) {
        if (fdL1.reasonCode == id) {
          for (var fdL2 of fdL1.child) {
            fdL2.check = false;
          }
        }
      }
    }
  }

  seveFraud()//發送Fraud Team
  {
    this.K = 1;
    let msgStr: string = "";
    const url = 'f01/childscn3action2';
    this.jsonObject['applno'] = this.applno;
    this.jsonObject['announceEmpno'] = this.no;
    this.seve();
    this.childsc3Service.oneseve(url, this.jsonObject).subscribe(data => {
      msgStr = "已儲存,並完成發送";
      if (data.rspCode == '0000') {
        this.getTable()
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: msgStr }
        });
      }
    })
  }

  seve()//儲存
  {

    let msgStr: string = "";
    this.l1 = [];
    for (var i of this.data) {
      if (i.check == true) {
        if (i.child.length < 1)
         {
          this.l1.push({ announceReason1: i.reasonCode, announceReason2: null })
        }
        else
        {
          for (var k of i.child) {
            if (k.check == true) {
              this.l1.push({ announceReason1: i.reasonCode, announceReason2: k.reasonCode })
            }
            else {
              this.l1.push({ announceReason1: i.reasonCode, announceReason2: null })
            }
            // }
          }
        }
        // if(i.child.check ==false)
        // {
        //   this.l1.push({announceReason1: i.reasonCode,announceReason2:null})
        // }
        // else
        // {

      }
    }
    this.jsonObject['applno'] = this.applno;
    this.jsonObject['result'] = this.l1;
    const url = 'f01/childscn3action1';
    this.childsc3Service.oneseve(url, this.jsonObject).subscribe(data => {
      if (this.K == 0) {
        msgStr = "已儲存成功";
        if (data.rspCode == '0000') {
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: msgStr }
          });
        }
      }
    })
  }
  getTable()//抓取資料表
  {
    let jsonOb: any = {};
    const url = 'f01/childscn3';
    jsonOb['applno'] = this.applno;
    // const applno = this.applno;
    this.childsc3Service.oneseve(url, jsonOb).subscribe(data => {
      this.data = data.rspBody.list;
      this.i = data.rspBody.fraudIsLocked;
    })
  }
   //檢查是否是徵信
   getSearch(): string {
    return this.search;
  }

}

