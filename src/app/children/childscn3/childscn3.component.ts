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
  styleUrls: ['./childscn3.component.css','../../../assets/css/f03.css']
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
  chkArray: checkBox[] = [];
  level1: string[] = [];//裝第一層checkbox
  data: any;//裝一開始的資料表
  l1: ANNOUNCE_REASON[] = [];
  jsonObject: any = {};
  i: string;
  no: string;//會員帳號
  total = 1;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.no = localStorage.getItem("empNo");
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
    let msgStr: string = "";
    const url = 'f01/childscn3action2';
    this.jsonObject['applno'] = this.applno;
    this.jsonObject['announceEmpno'] = this.no;
    this.childsc3Service.oneseve(url, this.jsonObject).subscribe(data => {
      msgStr = data.rspMsg;
      if(data.rspCode == '0000')
      {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: msgStr }
        });
        alert("已儲存,並完成發送")
      }
      console.log("456")
      console.log(data)
    })
  }

  seve()//儲存
  {
    let msgStr: string = "";
    this.l1 = [];
    for (var i of this.data) {
      if (i.check == true) {
        for (var k of i.child) {
          if (k.check == true)
            this.l1.push({ announceReason1: i.reasonCode, announceReason2: k.reasonCode })
        }
      }
    }
    this.jsonObject['applno'] = this.applno;
    this.jsonObject['result'] = this.l1;
    const url = 'f01/childscn3action1';
    this.childsc3Service.oneseve(url, this.jsonObject).subscribe(data => {
      msgStr = data.rspMsg;
      if(data.rspCode == '0000')
      {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: msgStr }
        });
        alert("已儲存成功")
      }
      console.log("123")
      console.log(data)

    })

  }

  getTable()//抓取資料表
  {
    let jsonOb: any = {};
    const url = 'f01/childscn3';
    jsonOb['applno'] = this.l1;
    // const applno = this.applno;
    this.childsc3Service.oneseve(url, jsonOb).subscribe(data => {

      console.log(data)
      this.data = data.rspBody.list;
      this.i = data.rspBody.fraudIsLocked;
    })
  }
}

