import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { F01002scn12Service } from '../f01002scn12.service';
import { F01002scn12confirmComponent } from '../f01002scn12confirm/f01002scn12confirm.component';
interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01002scn12edit',
  templateUrl: './f01002scn12edit.component.html',
  styleUrls: ['./f01002scn12edit.component.css']
})
export class F01002scn12editComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01002scn12editComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f01002scn12Service: F01002scn12Service, public dialog: MatDialog) { }
  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];

  ngOnInit(): void {
  }

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
    const baseUrl = 'f01/f01002scn12action1';
    await this.f01002scn12Service.f01002scn12Action(baseUrl, formdata).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
    });
    const childernDialogRef = this.dialog.open(F01002scn12confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功' && codeStr === '0000') { this.dialogRef.close({ event:'success' }); }
  }
}
