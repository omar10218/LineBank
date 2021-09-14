import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03011Service } from '../f03011.service';
import { F03011confirmComponent } from '../f03011confirm/f03011confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03011edit',
  templateUrl: './f03011edit.component.html',
  styleUrls: ['./f03011edit.component.css']
})
export class F03011editComponent implements OnInit {

  scklvCode: sysCode[] = [];
  calvCode: sysCode[] = [];
  tvNoCode: sysCode[] = [];

  oldscklv: string;
  oldcalv: string;
  oldtvNo: string;

  constructor(public dialogRef: MatDialogRef<F03011editComponent>,private f03011Service: F03011Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  submit() {
  }

  ngOnInit(): void {
    this.f03011Service.getSysTypeCode('SCKLV').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.scklvCode.push({value: codeNo, viewValue: desc})
      }
    });
    this.f03011Service.getSysTypeCode('CALV').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.calvCode.push({value: codeNo, viewValue: desc})
      }
    });
    this.f03011Service.getSysTypeCode('TV_NO').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.tvNoCode.push({value: codeNo, viewValue: desc})
      }
    });
    this.oldtvNo = this.data.tvNo;
    this.oldscklv = this.data.scklv;
    this.oldcalv = this.data.calv;
  }

  public async save(): Promise<void> {
    let msgStr: string = "";
    let baseUrl = 'f03/f03011action2';
    msgStr = await this.f03011Service.update(baseUrl, this.data, this.oldtvNo, this.oldscklv, this.oldcalv);
    const childernDialogRef = this.dialog.open(F03011confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
