import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { Childscn8Service } from '../childscn8.service';

//Nick 徵信照會 新增
@Component({
  selector: 'app-childscn8add',
  templateUrl: './childscn8add.component.html',
  styleUrls: ['./childscn8add.component.css']
})
export class Childscn8addComponent implements OnInit {

  CON_TEL_Selected: string;//電話種類
  CON_TARGET_Selected: string;//對象種類
  CON_MEMO_Selected: string;//註記種類

  constructor(public dialogRef: MatDialogRef<Childscn8addComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public childscn8Service: Childscn8Service) { }

  ngOnInit(): void {
  }

  //儲存
  async save() {
    let msgStr: string = "";
    let codeStr: string = "";
    const baseUrl = 'f01/childscn8action1';
    await this.childscn8Service.AddCALLOUT(baseUrl, this.data).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
    });
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '新增成功!' && codeStr === '0000') { this.dialogRef.close({ event: 'success' }); }
  }

  //取消
  onNoClick(): void {
    this.dialogRef.close();
  }
}
