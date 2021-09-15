import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F03005Service } from '../f03005.service';
interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03005edit',
  templateUrl: './f03005edit.component.html',
  styleUrls: ['./f03005edit.component.css']
})
export class F03005editComponent {
  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  constructor(public dialogRef: MatDialogRef<F03005editComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f03005Service: F03005Service) { }

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
    let baseUrl = 'f03/f03005action3';
    msgStr = await this.f03005Service.addOrEditAdrCodeSet(baseUrl, this.data);
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '更新成功!') { this.dialogRef.close({ event:'success' }); }
  }
}
