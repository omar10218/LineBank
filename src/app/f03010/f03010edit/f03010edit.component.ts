import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03010Service } from '../f03010.service';
import { F03010confirmComponent } from '../f03010confirm/f03010confirm.component';

//下拉選單框架
interface sysCode {
  value: string;
  viewValue: string;
}

//Nick 照會話術編輯
@Component({
  selector: 'app-f03010edit',
  templateUrl: './f03010edit.component.html',
  styleUrls: ['./f03010edit.component.css', '../../../assets/css/f03.css']
})
export class F03010editComponent implements OnInit {

  //暫停使用下拉選單
  stopFlagCode: sysCode[] = [{ value: 'Y', viewValue: 'Y' }, { value: 'N', viewValue: 'N' }];

  constructor(public dialogRef: MatDialogRef<F03010editComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f03010Service: F03010Service) { }

  //欄位驗證
  formControl = new FormControl('', [
    Validators.required
  ]);

  //欄位驗證
  getErrorMessage() {
    return this.formControl.hasError('required') ? '此欄位必填' : '';
  }

  ngOnInit(): void {
  }

  //儲存
  public async save(): Promise<void> {
    let msgStr: string = "";
    let baseUrl = 'f03/f03010action2';
    msgStr = await this.f03010Service.saveSpeaking(baseUrl, this.data);
    const childernDialogRef = this.dialog.open(F03010confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
  }

  //取消
  onNoClick(): void {
    this.dialogRef.close();
  }

}
