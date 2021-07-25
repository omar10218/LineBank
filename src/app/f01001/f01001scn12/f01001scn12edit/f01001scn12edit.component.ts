import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F01001scn12Service } from '../f01001scn12.service';
import { F01001scn12confirmComponent } from '../f01001scn12confirm/f01001scn12confirm.component';

interface ynCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f01001scn12edit',
  templateUrl: './f01001scn12edit.component.html',
  styleUrls: ['./f01001scn12edit.component.css']
})
export class F01001scn12editComponent {
  constructor(public dialogRef: MatDialogRef<F01001scn12editComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f01001scn12Service: F01001scn12Service, public dialog: MatDialog) { }
  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];

  async save() {
    const formdata = new FormData();
    formdata.append('applno', this.data.applno);
    formdata.append('incomeType', this.data.incomeType);
    formdata.append('cuId', this.data.cuId);
    formdata.append('cuCname', this.data.cuCname);
    formdata.append('num', this.data.num);
    formdata.append('mincomeExp', this.data.mincomeExp);
    let msgStr: string = "";
    let codeStr: string = "";
    const baseUrl = 'f01/f01001scn12action1';

    await this.f01001scn12Service.f01001scn12Action(baseUrl, formdata).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
    });

    const childernDialogRef = this.dialog.open(F01001scn12confirmComponent, {
      data: { msgStr: msgStr }
    });

    if (msgStr === '儲存成功' && codeStr === '0000') { this.dialogRef.close({ event:'success' }); }
  }

}
