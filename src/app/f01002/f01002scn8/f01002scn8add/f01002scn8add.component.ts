import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F01002scn8Service } from '../f01002scn8.service';
import { F01002scn8confirmComponent } from '../f01002scn8confirm/f01002scn8confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01002scn8add',
  templateUrl: './f01002scn8add.component.html',
  styleUrls: ['./f01002scn8add.component.css']
})
export class F01002scn8addComponent implements OnInit {

  CON_TEL_Selected: string;
  CON_TARGET_Selected: string;
  CON_MEMO_Selected: string;

  constructor(public dialogRef: MatDialogRef<F01002scn8addComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f01002scn8Service: F01002scn8Service) { }

  ngOnInit(): void {
  }

  submit() {
  }

  async save() {
    let msgStr: string = "";
    let codeStr: string = "";
    const baseUrl = 'f01/f01002scn8action1';
    await this.f01002scn8Service.AddCALLOUT(baseUrl, this.data).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
    });
    const childernDialogRef = this.dialog.open(F01002scn8confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '新增成功!' && codeStr === '0000') { this.dialogRef.close({ event: 'success' }); }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
