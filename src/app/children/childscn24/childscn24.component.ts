import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { Childscn24Service } from './childscn24.service';

@Component({
  selector: 'app-childscn24',
  templateUrl: './childscn24.component.html',
  styleUrls: ['./childscn24.component.css']
})
export class Childscn24Component implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Childscn24Component>,
    public dialog: MatDialog,
    private childsnc24Service: Childscn24Service
  ) { }
  applno: string;     // 案件編號
  level: string;   // 目前關卡

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.level = sessionStorage.getItem('level');
    console.log(this.level)
    console.log(this.applno)
  }
  cancel(): void {
    this.dialogRef.close();
  }
  public async confirm(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = 'L'+this.level;
    let msgStr: string = '';
    if (this.level == '2') {
      msgStr = await this.childsnc24Service.doDssBack(jsonObject);
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msgStr } });
    }

  }
}
