import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F01008Service } from '../f01008.service';

@Component({
  selector: 'app-f01008add',
  templateUrl: './f01008add.component.html',
  styleUrls: ['./f01008add.component.css', '../../../assets/css/f01.css']
})
//Jay 審核資料新增
export class F01008addComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01008addComponent>,
    private f01008Service: F01008Service,
    public datepipe: DatePipe,
    public dialog: MatDialog,) { }

  @Input() data: any;
  //欄位驗證
  formControl = new FormControl('', [
    Validators.required
  ]);
  CON_TYPE_Code: OptionsCode[] = null;//聯絡方式下拉選單
  TEL_CONDITION_Code: OptionsCode[] = null;//電話狀況下拉選單
  HOURS_Code: OptionsCode[] = null;//時下拉選單
  MINUTES_Code: OptionsCode[] = null //分下拉選單
  CALLOUT_DATE: Date; //設定下次照會時間
  applno: string;
  empNo: string;

  block: boolean = false;

  ngOnInit(): void {
    this.HOURS_Code = this.f01008Service.getHOURS();//時下拉選單
    this.MINUTES_Code = this.f01008Service.getMINUTES();//分下拉選單
    this.CON_TYPE_Code = this.f01008Service.getCON_TYPE();//聯絡方式下拉選單
    this.TEL_CONDITION_Code = this.f01008Service.getTEL_CONDITION();//電話狀況下拉選單
    this.applno = sessionStorage.getItem('applno');
    // this.applno = "20211125A00002";
    this.empNo = localStorage.getItem("empNo");
  }
  save()//新增
  {
    let msgStr: string = "";
    let codeStr: string = "";
    let jsonObject: any = {};
    let url = 'f01/f01008scn2action1';
    jsonObject['userId'] = this.empNo;
    jsonObject['applno'] = '20211125A00002';
    jsonObject['conType'] = this.data.CON_TYPE;
    jsonObject['phone'] = this.data.PHONE;
    jsonObject['telCondition'] = this.data.TEL_CONDITION;
    jsonObject['conMemo'] = this.data.CON_MEMO;
    jsonObject['date'] = this.datepipe.transform(this.data.CALLOUT_DATE, 'yyyyMMdd');
    jsonObject['hour'] = this.data.HOURS;
    jsonObject['min'] = this.data.MINUTES;
    this.block = true;
    this.f01008Service.f01008scn2(jsonObject, url).subscribe(data => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
      this.block = false;
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msgStr }
      });
      if (msgStr === '新增成功!' && codeStr === '0000') {
        // this.dialogRef.close({ event: 'success' });
        this.f01008Service.setJCICAddSource({ show: false });
        // window.location.reload();
      }
    });
  }

  //取得欄位驗證訊息
  getErrorMessage() {
    return this.formControl.hasError('required') ? '此欄位必填!' : '';
  }
  onNoClick() {
    this.f01008Service.setJCICAddSource({ show: false });
  }
}
