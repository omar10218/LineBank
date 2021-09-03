import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03006Service } from '../f03006.service';
import { F03006confirmComponent } from '../f03006confirm/f03006confirm.component';

//下拉選單初始設定
interface sysCode {
  value: string;
  viewValue: string;
}

//Nick 組織人員維護 編輯
@Component({
  selector: 'app-f03006edit',
  templateUrl: './f03006edit.component.html',
  styleUrls: ['./f03006edit.component.css']
})
export class F03006editComponent {

  dateType: sysCode[];//日期型態下拉選單
  levelStartDateValue: Date;
  levelEndDateValue: Date;

  constructor(public dialogRef: MatDialogRef<F03006editComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f03006Service: F03006Service) { }

  ngOnInit(): void {
    //取得初始下拉選單
    this.dateType = this.data.levelStartDateTypeCode;
    this.changeDATE_TYPE('Start');//請假起日型態
    this.changeDATE_TYPE('End');//請假迄日型態
    this.data.agent_empCode=[];
    const baseUrl = 'f03/f03006action5';
    let targetUrl = `${baseUrl}?empNo=${this.data.EMP_NO}`;//員工編號
    this.f03006Service.getEmployeeSysTypeCode(targetUrl)
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['EMPNO'];
          const desc = jsonObj['EMPNO'];
          this.data.agent_empCode.push({ value: codeNo, viewValue: desc })//取同等級代理人
        }
         console.log(data);
      });

  }
//欄位檢查
  formControl = new FormControl('', [
    Validators.required,
   Validators.email,
  ]);

  //取得欄位檢查錯誤訊息
  getErrorMessage() {
    return this.formControl.hasError('required') ? '此欄位必填' :
    this.formControl.hasError('email') ? '不是有效的email' :
    '';
  }

  //有日期才可選日期型態
  changeDATE_TYPE(key: string) {
    if (key == 'Start') {
      this.data.levelStartDateTypeCode= this.data.LEAVE_STARTDATE == null ?　[] : this.dateType;
    }
    else {
      this.data.levelEndDateTypeCode= this.data.LEAVE_ENDDATE == null ?　[] : this.dateType;
    }
  }

  //取消
  onNoClick(): void {
    this.dialogRef.close();
  }

  //儲存
  public async stopEdit(): Promise<void> {
    if ( this.data.LEAVE_STARTDATE != null ) {
      if ( this.data.LEAVE_STARTDATE_TYPE == null ) {
        return alert('請填寫請假類型!!');
      }
    }
    if ( this.data.LEAVE_ENDDATE != null ) {
      if ( this.data.LEAVE_ENDDATE_TYPE == null ) {
        return alert('請填寫請假類型!!');
      }
    }
    let msgStr: string = "";
    let baseUrl = 'f03/f03006action3';
    msgStr = await this.f03006Service.addorEditSystemCodeSet(baseUrl, this.data);
    console.log(msgStr);
    const childernDialogRef = this.dialog.open(F03006confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '更新成功!') { this.dialogRef.close({ event:'success' }); }
  }
}
