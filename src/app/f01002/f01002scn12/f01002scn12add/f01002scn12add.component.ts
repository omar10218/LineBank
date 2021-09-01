import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { F01002scn12Service } from '../f01002scn12.service';
import { F01002scn12confirmComponent } from '../f01002scn12confirm/f01002scn12confirm.component';
interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01002scn12add',
  templateUrl: './f01002scn12add.component.html',
  styleUrls: ['./f01002scn12add.component.css']
})
export class F01002scn12addComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01002scn12addComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f01002scn12Service: F01002scn12Service, public dialog: MatDialog) { }
  ynCode: ynCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }];
  incomeType: string;
  cuId: string;
  cuCname: string;
  num: string;
  mincomeExp: string;

  ngOnInit(): void {
  }

  async save() {
    const formdata = new FormData();
    formdata.append('applno', this.data.applno);
    formdata.append('incomeType', this.incomeType);
    formdata.append('cuId', this.cuId);
    formdata.append('cuCname', this.cuCname);
    formdata.append('num', this.num);
    formdata.append('mincomeExp', this.mincomeExp);
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
    if (msgStr === '儲存成功' && codeStr === '0000') { this.dialogRef.close({ event: 'success' }); }
  }
}
