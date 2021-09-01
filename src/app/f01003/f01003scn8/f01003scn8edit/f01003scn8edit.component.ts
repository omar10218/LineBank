import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F01003scn8Service } from '../f01003scn8.service';
import { F01003scn8confirmComponent } from '../f01003scn8confirm/f01003scn8confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01003scn8edit',
  templateUrl: './f01003scn8edit.component.html',
  styleUrls: ['./f01003scn8edit.component.css']
})
export class F01003scn8editComponent implements OnInit {

  stopFlagCode: sysCode[] = [{ value: 'Y', viewValue: 'Y' }, { value: 'N', viewValue: 'N' }];
  CON_TEL_Code: sysCode[] = [];
  CON_TEL_Selected: string;
  CON_TARGET_Code: sysCode[] = [];
  CON_TARGET_Selected: string;
  CON_MEMO_Code: sysCode[] = [];
  CON_MEMO_Selected: string;

  constructor(public dialogRef: MatDialogRef<F01003scn8editComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f01003scn8Service: F01003scn8Service) { }

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
    this.f01003scn8Service.getSysTypeCode('CON_TEL', 'f01/f01003scn8')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_TEL_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    this.f01003scn8Service.getSysTypeCode('CON_TARGET', 'f01/f01003scn8')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_TARGET_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    this.f01003scn8Service.getSysTypeCode('CON_MEMO', 'f01/f01003scn8')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_MEMO_Code.push({ value: codeNo, viewValue: desc })
        }
      });
  }

  async save() {
    let msgStr: string = "";
    let codeStr: string = "";
    const baseUrl = 'f01/f01003scn8action2';
    await this.f01003scn8Service.EditCALLOUT(baseUrl, this.data).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;

    });
    const childernDialogRef = this.dialog.open(F01003scn8confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '編輯成功' && codeStr === '0000') { this.dialogRef.close({ event: 'success' }); }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
