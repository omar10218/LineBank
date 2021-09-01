import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F01004scn8Service } from '../f01004scn8.service';
import { F01004scn8confirmComponent } from '../f01004scn8confirm/f01004scn8confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01004scn8add',
  templateUrl: './f01004scn8add.component.html',
  styleUrls: ['./f01004scn8add.component.css']
})
export class F01004scn8addComponent implements OnInit {

  stopFlagCode: sysCode[] = [{ value: 'Y', viewValue: 'Y' }, { value: 'N', viewValue: 'N' }];
  CON_TEL_Code: sysCode[] = [];
  CON_TEL_Selected: string;
  CON_TARGET_Code: sysCode[] = [];
  CON_TARGET_Selected: string;
  CON_MEMO_Code: sysCode[] = [];
  CON_MEMO_Selected: string;

  constructor(public dialogRef: MatDialogRef<F01004scn8addComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f01004scn8Service: F01004scn8Service) { }

  ngOnInit(): void {
    this.f01004scn8Service.getSysTypeCode('CON_TEL', 'f01/f01004scn8')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_TEL_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    this.f01004scn8Service.getSysTypeCode('CON_TARGET', 'f01/f01004scn8')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_TARGET_Code.push({ value: codeNo, viewValue: desc })
        }
      });
    this.f01004scn8Service.getSysTypeCode('CON_MEMO', 'f01/f01004scn8')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.CON_MEMO_Code.push({ value: codeNo, viewValue: desc })
        }
      });
  }

  submit() {
  }

  async save() {
    let msgStr: string = "";
    let codeStr: string = "";
    const baseUrl = 'f01/f01004scn8action1';
    await this.f01004scn8Service.AddCALLOUT(baseUrl, this.data).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
    });
    const childernDialogRef = this.dialog.open(F01004scn8confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '新增成功!' && codeStr === '0000') { this.dialogRef.close({ event: 'success' }); }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
