import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { Childscn12Service } from '../childscn12.service';
interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn12add',
  templateUrl: './childscn12add.component.html',
  styleUrls: ['./childscn12add.component.css']
})
export class Childscn12addComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<Childscn12addComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public childscn12Service: Childscn12Service, public dialog: MatDialog) { }
  ynCode: ynCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }];
  incomeType: string;
  cuId: string;
  cuCname: string;
  num: string;
  mincomeExp: string;

  ngOnInit(): void {
  }

  async save() {
    const formdata = new FormData();
    formdata.append('applno', this.data.applno);
    formdata.append('incomeType', this.incomeType);
    formdata.append('cuId', this.cuId);
    formdata.append('cuCname', this.cuCname);
    formdata.append('num', this.num);
    formdata.append('mincomeExp', this.mincomeExp);
    let msgStr: string = "";
    let codeStr: string = "";
    const baseUrl = 'f01/childscn12action1';

    await this.childscn12Service.childscn12Action(baseUrl, formdata).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
    });

    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功' && codeStr === '0000') { this.dialogRef.close({ event: 'success' }); }
  }
}
