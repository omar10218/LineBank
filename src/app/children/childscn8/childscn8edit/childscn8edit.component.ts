import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { Childscn8Service } from '../childscn8.service';
import { DatePipe } from '@angular/common'

//Nick  徵信照會 編輯
@Component({
  selector: 'app-childscn8edit',
  templateUrl: './childscn8edit.component.html',
  styleUrls: ['./childscn8edit.component.css', '../../../../assets/css/f03.css']
})
export class Childscn8editComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Childscn8editComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public childscn8Service: Childscn8Service,
    public datepipe: DatePipe
  ) { }



  //欄位驗證
  formControl = new FormControl('', [
    Validators.required
  ]);

  //取得欄位驗證訊息
  getErrorMessage() {
    return this.formControl.hasError('required') ? '此欄位必填!' : '';
  }

  CALLOUT_SETTIME:Date;//確認時間
  CALLOUT_DATE: Date; //設定下次照會時間
  CON_TEL_Selected: string;//電話種類
  CON_TARGET_Selected: string;//對象種類
  CON_MEMO_Selected: string;//註記種類
  speakingContent:string;//話述內容
  speakingAbbreviation:string;//話術名稱

  submit() {
  }

  ngOnInit(): void {
   }

   //儲存
   async save() {
    let msgStr: string = "";
    let codeStr: string = "";
    const baseUrl = 'f01/childscn8action2';
    let jsonObject: any = {};
    jsonObject['applno'] = this.data.applno;
    jsonObject['conType'] = this.data.CON_TYPE;
    jsonObject['phone'] = this.data.PHONE;
    jsonObject['telCondition'] = this.data.TEL_CONDITION;
    jsonObject['telCheck'] = this.data.TEL_CHECK;
    jsonObject['conMemo'] = this.data.CON_MEMO;
    jsonObject['date'] = this.datepipe.transform(this.data.CALLOUT_DATE, 'yyyyMMdd');
    jsonObject['hour'] = this.data.HOURS;
    jsonObject['min'] = this.data.MINUTES;
    jsonObject['rowID'] = this.data.ID;
    jsonObject['empNo'] = this.data.CALLOUT_EMPNO;
    jsonObject['calloutYn'] = this.data.CALLOUT_YN;
    console.log('console.log(jsonObject);');
    console.log(jsonObject);
    await this.childscn8Service.postJsonObject_CALLOUT(baseUrl, jsonObject).subscribe(data => {
      console.log('data');
      console.log(data);
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msgStr }
      });
      if (msgStr === '編輯成功' && codeStr === '0000') { this.dialogRef.close({ event: 'success' }); }
    });
  }

  //取消
  onNoClick(): void {
    this.dialogRef.close();
  }

  //顯示話述內容
  ShowspeakingContenta(name:string,msg:string){
    this.speakingAbbreviation=name;
    this.speakingContent=msg;
  }
}
