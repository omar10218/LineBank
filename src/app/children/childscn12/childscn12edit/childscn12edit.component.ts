import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Childscn12Service } from '../childscn12.service';
import { Childscn12confirmComponent } from '../childscn12confirm/childscn12confirm.component';
interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn12edit',
  templateUrl: './childscn12edit.component.html',
  styleUrls: ['./childscn12edit.component.css']
})
export class Childscn12editComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<Childscn12editComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public childscn12Service: Childscn12Service, public dialog: MatDialog) { }
  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];

  ngOnInit(): void {
  }

  async save() {
    const formdata = new FormData();
    formdata.append('applno', this.data.applno);
    formdata.append('incomeType', this.data.incomeType);
    formdata.append('cuId', this.data.cuId);
    formdata.append('cuCname', this.data.cuCname);
    formdata.append('num', this.data.num);
    formdata.append('mincomeExp', this.data.mincomeExp);
    let msgStr: string = "";
    let codeStr: string = "";
    const baseUrl = 'f01/childscn12action1';
    await this.childscn12Service.childscn12Action(baseUrl, formdata).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
    });
    const childernDialogRef = this.dialog.open(Childscn12confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功' && codeStr === '0000') { this.dialogRef.close({ event:'success' }); }
  }
}
