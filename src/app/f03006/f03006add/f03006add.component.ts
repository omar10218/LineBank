import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F03006Service } from '../f03006.service';

@Component({
  selector: 'app-f03006add',
  templateUrl: './f03006add.component.html',
  styleUrls: ['./f03006add.component.css']
})
export class F03006addComponent implements OnInit {

  dateType: OptionsCode[];
  // ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  // surrogateCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  // unitCode: sysCode[] = [];
  // groupCode: sysCode[] = [];
  levelStartDateValue: Date;
  levelEndDateValue: Date;
  constructor(public dialogRef: MatDialogRef<F03006addComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f03006Service: F03006Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dateType = this.data.levelStartDateTypeCode;
    this.data.levelStartDateTypeCode = [];
    this.data.levelEndDateTypeCode = [];
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? '此欄位必填!' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  changeDATE_TYPE(key: string) {
    if (key == 'Start') {
      this.data.levelStartDateTypeCode= this.data.LEAVE_STARTDATE == null ?　[] : this.dateType;
    }
    else {
      this.data.levelEndDateTypeCode= this.data.LEAVE_ENDDATE == null ?　[] : this.dateType;
    }
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public async confirmAdd(): Promise<void> {
    let msgStr: string = "";
    let baseUrl = 'f03/f03006action2';
    msgStr = await this.f03006Service.addorEditSystemCodeSet(baseUrl, this.data);
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '新增成功!') { this.dialogRef.close({ event: 'success' }); }
  }
}
