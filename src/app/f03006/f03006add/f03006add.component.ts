import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03006Service } from '../f03006.service';
import { F03006confirmComponent } from '../f03006confirm/f03006confirm.component';

interface ynCode {
  value: string;
  viewValue: string;
}
interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03006add',
  templateUrl: './f03006add.component.html',
  styleUrls: ['./f03006add.component.css']
})
export class F03006addComponent implements OnInit {

  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  surrogateCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  unitCode: sysCode[] = [];
  groupCode: sysCode[] = [];
  constructor(public dialogRef: MatDialogRef<F03006addComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f03006Service: F03006Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.f03006Service.getSysTypeCode('GEN_UNIT','f03/f03006').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.unitCode.push({value: codeNo, viewValue: desc})
      }
    });
    const baseUrl = 'f03/f03006action1';
    this.f03006Service.getGroupCode(baseUrl).subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['groupNo'];
        const desc = jsonObj['groupName'];
        this.groupCode.push({value: codeNo, viewValue: desc})
      }
    });
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

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public async confirmAdd(): Promise<void> {
    let msgStr: string = "";
    let baseUrl = 'f03/f03006action4';
    msgStr = await this.f03006Service.addOrEditSystemCodeSet(baseUrl, this.data);
    const childernDialogRef = this.dialog.open(F03006confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
  }
}
