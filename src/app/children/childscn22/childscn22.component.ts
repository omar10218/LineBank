import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { Childscn22Service } from './childscn22.service';

@Component({
  selector: 'app-childscn22',
  templateUrl: './childscn22.component.html',
  styleUrls: ['./childscn22.component.css', '../../../assets/css/f01.css']
})
export class Childscn22Component implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Childscn22Component>,
    public dialog: MatDialog,
    private childsnc22Service: Childscn22Service
  ) { }

  applno: string;     // 案件編號
  cuid: string;       // 身分證字號
  stepName: string;   // 目前關卡
  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    this.stepName = sessionStorage.getItem('stepName');
  }

  cancel(): void {
    this.dialogRef.close();
  }

  public async confirm(): Promise<void> {
    let jsonObject: any = {};
    // jsonObject['applno'] = this.applno;
    // jsonObject['swcNationalId'] = this.cuid;
    let msgStr: string = '';
    if (this.stepName == 'APPLCreditL3') {
      msgStr = await this.childsnc22Service.doDss1Search(jsonObject);
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msgStr } });
    } else if (this.stepName == 'APPLCreditL2') {
      msgStr = await this.childsnc22Service.doDss2Search(jsonObject);
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msgStr } });
    } else {
      msgStr = await this.childsnc22Service.doDss4Search(jsonObject);
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msgStr } });
    }

  }
}
