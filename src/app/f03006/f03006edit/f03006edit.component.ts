import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03006Service } from '../f03006.service';
import { F03006confirmComponent } from '../f03006confirm/f03006confirm.component';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03006edit',
  templateUrl: './f03006edit.component.html',
  styleUrls: ['./f03006edit.component.css']
})
export class F03006editComponent {

  dateType: sysCode[];
  levelStartDateValue: Date;
  levelEndDateValue: Date;

  constructor(public dialogRef: MatDialogRef<F03006editComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f03006Service: F03006Service) { }

  ngOnInit(): void {
    this.dateType = this.data.levelStartDateTypeCode;
    this.changeDATE_TYPE('Start');
    this.changeDATE_TYPE('End');
    this.data.agent_empCode=[];
    const baseUrl = 'f03/f03006action5';
    let targetUrl = `${baseUrl}?empNo=${this.data.EMP_NO}`;
    this.f03006Service.getEmployeeSysTypeCode(targetUrl)
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['EMPNO'];
          const desc = jsonObj['EMPNO'];
          this.data.agent_empCode.push({ value: codeNo, viewValue: desc })
        }
         console.log(data);
      });

  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
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

  public async stopEdit(): Promise<void> {
    console.log(this.data)
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
