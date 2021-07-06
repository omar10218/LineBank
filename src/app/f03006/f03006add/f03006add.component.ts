import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03006Service } from '../f03006.service';
import { F03006confirmComponent } from '../f03006confirm/f03006confirm.component';

interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03006add',
  templateUrl: './f03006add.component.html',
  styleUrls: ['./f03006add.component.css']
})
export class F03006addComponent {

  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  constructor(public dialogRef: MatDialogRef<F03006addComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f03006Service: F03006Service, public dialog: MatDialog) { }

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
    let baseUrl = 'EmployeeSet/Add';
    msgStr = await this.f03006Service.addOrEditSystemCodeSet(baseUrl, this.data);
    const childernDialogRef = this.dialog.open(F03006confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
  }
}
