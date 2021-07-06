import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03005Service } from '../f03005.service';
import { F03005confirmComponent } from '../f03005confirm/f03005confirm.component';

interface ynCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03005add',
  templateUrl: './f03005add.component.html',
  styleUrls: ['./f03005add.component.css']
})
export class F03005addComponent{
  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  constructor(public dialogRef: MatDialogRef<F03005addComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f03005Service: F03005Service, public dialog: MatDialog) { }

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
    let baseUrl = 'AdrCodeSet/Add';
    msgStr = await this.f03005Service.addOrEditAdrCodeSet(baseUrl, this.data);
    const childernDialogRef = this.dialog.open(F03005confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
  }

}
