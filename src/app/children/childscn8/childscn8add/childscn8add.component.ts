import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { Childscn8Service } from '../childscn8.service';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { OptionsCode } from 'src/app/interface/base';

//Nick 徵信照會 新增
@Component({
  selector: 'app-childscn8add',
  templateUrl: './childscn8add.component.html',
  styleUrls: ['./childscn8add.component.css', '.../../../assets/css/f03.css']
})
export class Childscn8addComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Childscn8addComponent>,
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

  submit() {
  }

  CON_TYPE_Code: OptionsCode[] = [];//聯絡方式下拉選單
  TEL_CONDITION_Code: OptionsCode[] = [];//電話狀況下拉選單
  TEL_CHECK_Code: OptionsCode[] = [];//電話種類下拉選單
  HOURS_Code: OptionsCode[] = [];//時下拉選單
  MINUTES_Code: OptionsCode[] = [];//分下拉選單

  CALLOUT_DATE: Date; //設定下次照會時間
  CON_TEL_Selected: string;//電話種類
  CON_TARGET_Selected: string;//對象種類
  CON_MEMO_Selected: string;//註記種類
  speakingContent: string;//話述內容
  speakingAbbreviation: string;//話術名稱

  ngOnInit(): void {
    console.log('data.speakingData');
    console.log(this.data.speakingData);

    this.childscn8Service.getSysTypeCode('HOURS')//時下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.HOURS_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    console.log('HOURS');
    console.log(this.HOURS_Code);

    this.childscn8Service.getSysTypeCode('MINUTES')//分下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.MINUTES_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    console.log('MINUTES_Code');
    console.log(this.MINUTES_Code);
    this.childscn8Service.getSysTypeCode('CON_TYPE')//聯絡方式下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.CON_TYPE_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    console.log('CON_TYPE_Code');
    console.log(this.CON_TYPE_Code);
    this.childscn8Service.getSysTypeCode('TEL_CONDITION')//電話狀況下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.TEL_CONDITION_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    console.log('TEL_CONDITION_Code');
    console.log(this.TEL_CONDITION_Code);
    this.childscn8Service.getSysTypeCode('TEL_CHECK')//電話種類下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.TEL_CHECK_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    console.log('TEL_CHECK_Code');
    console.log(this.TEL_CHECK_Code);
  }

  //儲存
  async save() {
    let msgStr: string = "";
    let codeStr: string = "";
    const baseUrl = 'f01/childscn8action1';
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
    jsonObject['empNo'] = this.data.CALLOUT_EMPNO;
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
      if (msgStr === '新增成功!' && codeStr === '0000') { this.dialogRef.close({ event: 'success' }); }
    });
  }

  //取消
  onNoClick(): void {
    this.dialogRef.close();
  }

  //顯示話述內容
  ShowspeakingContenta(name: string, msg: string) {
    this.speakingAbbreviation = name;
    this.speakingContent = msg;
  }
}
