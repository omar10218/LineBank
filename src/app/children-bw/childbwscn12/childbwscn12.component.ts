import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { Childbwscn12Service } from './childbwscn12.service';
@Component({
  selector: 'app-childbwscn12',
  templateUrl: './childbwscn12.component.html',
  styleUrls: ['./childbwscn12.component.css', '../../../assets/css/child.css']
})
//Jay 重查
export class Childbwscn12Component implements OnInit {

  constructor(public dialog: MatDialog,
    public childbwscn12Service: Childbwscn12Service,
    private router: Router,
    public dialogRef: MatDialogRef<Childbwscn12Component>,) {

  }
  empNo: string;
  userId: string;//使用者
  swcCustId:string;
  swcApplno: string;//案件編號
  swcID: string;//客戶編號
  search: any[] = [];
  chk :string[] = [];

  ngOnInit(): void {
    this.swcID = sessionStorage.getItem('swcNationalId');
    this.swcApplno = sessionStorage.getItem('applno');
    this.empNo = localStorage.getItem("empNo");
    this.swcCustId = sessionStorage.getItem('swcCustId');
    console.log(sessionStorage.getItem('swcNationalId'))
  }
  closure() //關閉
  {
    this.dialog.closeAll()
  }
  chkArray(check: boolean, value: string)
  {
    if (check) {
      this.chk.push(value)
    }
    else
    {
      this.chk.splice(this.chk.indexOf(value), 1)
    }
  }
  recheck()
  {
    let Url = 'f01/childBwScn12action'
    let jsonObject: any = {}
    jsonObject['swcNationalId'] = this.swcID;
    jsonObject['applno'] = this.swcApplno;
    jsonObject['search'] = this.chk.toString();
    jsonObject['swcCustId'] = this.swcCustId;
    jsonObject['userId'] = this.empNo;
    this.childbwscn12Service.selectCustomer(Url,jsonObject).subscribe(data=>{
      console.log(data);
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: data.rspMsg }
      });
      this.router.navigate(['./F01009']);
      this.dialogRef.close();
    });
  }

}
