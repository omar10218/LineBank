import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F03006Service } from '../f03006.service';
import { DatePipe } from '@angular/common'

//Nick 組織人員維護 編輯
@Component({
  selector: 'app-f03006edit',
  templateUrl: './f03006edit.component.html',
  styleUrls: ['./f03006edit.component.css', '.../../../assets/css/f03.css']
})
export class F03006editComponent {

  dateType: OptionsCode[];//日期型態下拉選單
  levelStartDateValue: Date;
  levelEndDateValue: Date;

  constructor(public dialogRef: MatDialogRef<F03006editComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public f03006Service: F03006Service,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    //取得初始下拉選單
    this.dateType = this.data.levelStartDateTypeCode;
    this.changeDATE_TYPE('Start');//請假起日型態
    this.changeDATE_TYPE('End');//請假迄日型態
    this.data.agent_empCode = [];
    const baseUrl = 'f03/f03006action5';
    let jsonObject: any = {};
    jsonObject['empNo'] = this.data.EMP_NO
    this.f03006Service.getEmployeeSysTypeCode(baseUrl, jsonObject)
      .subscribe(data => {
        this.data.agent_empCode.push({ value: '', viewValue: '請選擇' })
        for (const jsonObj of data.rspBody.empList) {
          const codeNo = jsonObj.empNo;
          const desc = jsonObj.empNo;
          this.data.agent_empCode.push({ value: codeNo, viewValue: desc })//取同等級代理人
        }
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
      this.data.levelStartDateTypeCode = this.data.LEAVE_STARTDATE == null ? [] : this.dateType;
    }
    else {
      this.data.levelEndDateTypeCode = this.data.LEAVE_ENDDATE == null ? [] : this.dateType;
    }
  }

  //取消
  onNoClick(): void {
    this.dialogRef.close();
  }

  //檢查身分證
  checkIDCard(ID :string) {
    var value = ID.trim().toUpperCase();
    var a = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z', 'I', 'O');
    var b = new Array(1, 9, 8, 7, 6, 5, 4, 3, 2, 1);
    var c = new Array(2);
    var d;
    var e;
    var f;
    var g = 0;
    var h = /^[a-z](1|2)\d{8}$/i;
    if (value.search(h) == -1) {
      return false;
    }
    else {
      d = value.charAt(0).toUpperCase();
      f = value.charAt(9);
    }

    for (var i = 0; i < 26; i++) {
      if (d == a[i])//a==a
      {
        e = i + 10; //10
        c[0] = Math.floor(e / 10); //1
        c[1] = e - (c[0] * 10); //10-(1*10)
        break;
      }
    }
    for (var i = 0; i < b.length; i++) {
      if (i < 2) {
        g += c[i] * b[i];
      }
      else {
        g += parseInt(value.charAt(i - 1)) * b[i];
      }
    }
    if ((g % 10) == f) {
      return true;
    }
    if ((10 - (g % 10)) != f) {
      return false;
    }
    return true;
  }


  //儲存
  public async stopEdit(): Promise<void> {
    //資料驗證
    //避免儲存undefined
    this.data.AGENT_EMP= this.data.AGENT_EMP==undefined?"":this.data.AGENT_EMP
    this.data.ASSIGN_PROJECTNO= this.data.ASSIGN_PROJECTNO==undefined?"":this.data.ASSIGN_PROJECTNO

    if (!this.checkIDCard(this.data.EMP_ID)) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '員工ID格式不正確' }
      });
      return;
    }
    let start = this.datepipe.transform(this.data.LEAVE_STARTDATE, 'yyyyMMdd')
    let end = this.datepipe.transform(this.data.LEAVE_ENDDATE, 'yyyyMMdd')
    if (start > end) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請假起日不可大於請假迄日!!' }
      });
      return;
    }
    if (this.data.LEAVE_STARTDATE != null) {
      if (this.data.LEAVE_STARTDATE_TYPE == null) {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: '請填寫請假類型!!' }
        });
        return;
      }
    }
    if (this.data.LEAVE_ENDDATE != null) {
      if (this.data.LEAVE_ENDDATE_TYPE == null) {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: '請填寫請假類型!!' }
        });
        return;
      }
    }
    let msgStr: string = "";
    let baseUrl = 'f03/f03006action3';
    msgStr = await this.f03006Service.addorEditSystemCodeSet(baseUrl, this.data);
    console.log(this.data);
    console.log(msgStr)
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '更新成功!') { this.dialogRef.close({ event: 'success' }); }
  }


}
