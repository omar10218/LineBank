
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { F03010Service } from '../f03010.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';

//Nick 照會話術新增
@Component({
  selector: 'app-f03010add',
  templateUrl: './f03010add.component.html',
  styleUrls: ['./f03010add.component.css', '../../../assets/css/f03.css']
})
export class F03010addComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<F03010addComponent>,
    private fb: FormBuilder,
    private f03010Service: F03010Service,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  //暫停使用下拉選單
  stopFlagCode: OptionsCode[] = [{ value: 'Y', viewValue: 'Y' }, { value: 'N', viewValue: 'N' }];

  ngOnInit(): void {
  }
  //欄位驗證
  formControl = new FormControl('', [
    Validators.required
  ]);

  //欄位驗證
  getErrorMessage() {
    return this.formControl.hasError('required') ? '此欄位必填' : '';
  }

  //儲存
  public async add(): Promise<void> {
    let msgStr: string = "";
    let baseUrl = 'f03/f03010action1';
    msgStr = await this.f03010Service.saveSpeaking(baseUrl, this.data);
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
  }

  // //新增
  // add() {
  //   let msg = '';
  //     const baseUrl = 'f03/f03010action1';
  //     let jsonObject: any = {};
  //     jsonObject['speakingAbbreviation'] = this.data.speakingAbbreviation;
  //     jsonObject['stopFlag'] = this.data.stopFlag;
  //     jsonObject['speakingContent'] = this.data.speakingContent;
  //     this.f03010Service.Speaking( baseUrl, jsonObject).subscribe(data => {
  //       setTimeout(() => {
  //         msg = data.rspMsg;
  //         const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
  //       }, 1500);
  //     });

  // }

  //取消
  onNoClick(): void {
    this.dialogRef.close();
  }

}
