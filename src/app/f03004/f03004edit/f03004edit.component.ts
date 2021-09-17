import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F03004Service } from '../f03004.service';

interface ynCode {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-f03004edit',
  templateUrl: './f03004edit.component.html',
  styleUrls: ['./f03004edit.component.css']
})
export class F03004editComponent {

  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  constructor(public dialogRef: MatDialogRef<F03004editComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f03004Service: F03004Service) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
    this.formControl.hasError('email') ? 'Not a valid email' :
    '';
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public async stopEdit(): Promise<void> {
    let msgStr: string = "";
    let baseUrl = 'f03/f03004action3';
    msgStr = await this.f03004Service.addOrEditSystemCodeSet(baseUrl, this.data);
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
  }
}
