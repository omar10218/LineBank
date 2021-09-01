import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { F01003scn13Service } from '../f01003scn13.service';
import { F01003scn13confirmComponent } from '../f01003scn13confirm/f01003scn13confirm.component';

@Component({
  selector: 'app-f01003scn13delete',
  templateUrl: './f01003scn13delete.component.html',
  styleUrls: ['./f01003scn13delete.component.css']
})
export class F01003scn13deleteComponent implements OnInit {

  imageSrc: string;
  rowId: string;
  msg: string = "";

  constructor(public dialogRef: MatDialogRef<F01003scn13deleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f01003scn13Service: F01003scn13Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.rowId = this.data.rowId;
    this.imageSrc = 'data:image/png;base64,' + this.data.base64;
  }

  async deleteFile() {
    const formdata = new FormData();
    formdata.append('rowid', this.rowId);
    const baseUrl = 'f01/f01003scn13action3';
    let msgStr: string = "";
    let codeStr: string = "";
    await this.f01003scn13Service.f01003scn13Action(baseUrl, formdata).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
    });
    const childernDialogRef = this.dialog.open(F01003scn13confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '刪除成功' && codeStr === '0000') { this.dialogRef.close({ event:'success' }); }
  }
}
