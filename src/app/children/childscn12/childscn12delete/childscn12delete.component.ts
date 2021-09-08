import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Childscn12Service } from '../childscn12.service';
import { Childscn12confirmComponent } from '../childscn12confirm/childscn12confirm.component';
interface ynCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn12delete',
  templateUrl: './childscn12delete.component.html',
  styleUrls: ['./childscn12delete.component.css']
})
export class Childscn12deleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<Childscn12deleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public childscn12Service: Childscn12Service, public dialog: MatDialog) { }
  ynCode: ynCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];

  ngOnInit(): void {
  }

  async deleteAction() {
    const formdata = new FormData();
    formdata.append('applno', this.data.applno);
    formdata.append('incomeType', this.data.incomeType);
    let msgStr: string = "";
    let codeStr: string = "";
    const baseUrl = 'f01/childscn12action2';
    await this.childscn12Service.childscn12Action(baseUrl, formdata).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
    });
    const childernDialogRef = this.dialog.open(Childscn12confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '刪除成功' && codeStr === '0000') { this.dialogRef.close({ event:'success' }); }
  }
}
