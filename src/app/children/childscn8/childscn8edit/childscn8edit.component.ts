import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { Childscn8Service } from '../childscn8.service';

//Nick  徵信照會 編輯
@Component({
  selector: 'app-childscn8edit',
  templateUrl: './childscn8edit.component.html',
  styleUrls: ['./childscn8edit.component.css']
})
export class Childscn8editComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Childscn8editComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public childscn8Service: Childscn8Service
  ) { }

  CON_TEL_Code: OptionsCode[] = []; //電話種類下拉選單
  CON_TEL_Selected: string;//電話種類
  CON_TARGET_Code: OptionsCode[] = [];//對象種類下拉選單
  CON_TARGET_Selected: string;//對象種類
  CON_MEMO_Code: OptionsCode[] = [];//註記種類下拉選單
  CON_MEMO_Selected: string;//註記種類

  //欄位驗證
  formControl = new FormControl('', [
    Validators.required
  ]);

  //取得欄位驗證訊息
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }



  ngOnInit(): void {
   }

   //儲存
  async save() {
    let msgStr: string = "";
    let codeStr: string = "";
    const baseUrl = 'f01/childscn8action2';
    await this.childscn8Service.EditCALLOUT(baseUrl, this.data).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;

    });
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '編輯成功' && codeStr === '0000') {this.dialogRef.close({ event: 'success' }); }
  }

  //取消
  onNoClick(): void {
    this.dialogRef.close();
  }
}
