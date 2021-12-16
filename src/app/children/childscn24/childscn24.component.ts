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
  stepName: string;

  block: boolean = false;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.level = sessionStorage.getItem('level');
    this.stepName = sessionStorage.getItem('stepName');
  }
  cancel(): void {
    this.dialogRef.close();
  }
  // 授信案件退回徵信
  public async confirm(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = this.stepName.substring(10);
    jsonObject['reject'] = 'L3';
    console.log(this.applno)
    console.log(this.stepName.substring(10))
    let msgStr: string = '';
    if (this.stepName.substring(10) == 'L2') {
      this.block = true;
      msgStr = await this.childsnc24Service.doDssBack(jsonObject);
      this.block = false;
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msgStr } });
    }

  }
  // 主管案件退回徵信
  public async L0sendbackL3(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = this.stepName.substring(10);
    jsonObject['reject'] = 'L3';
    let msgStr: string = '';
    if (this.stepName.substring(10) == 'L0') {
      this.block = true;
      msgStr = await this.childsnc24Service.doDssBack(jsonObject);
      this.block = false;
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msgStr } });
    }
  }
  // 主管案件退回徵信
  public async L0sendbackL2(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = this.stepName.substring(10);
   
    jsonObject['reject'] = 'L2';
    let msgStr: string = '';
    if (this.stepName.substring(10) == 'L0') {
      this.block = true;
      msgStr = await this.childsnc24Service.doDssBack(jsonObject);
      this.block = false;
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msgStr } });
    }
  }
  // 授信覆核退回徵信
  public async L1sendbackL3(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = this.stepName.substring(10);
    jsonObject['reject'] = 'L3';
    let msgStr: string = '';
    if (this.stepName.substring(10) == 'L1') {
      this.block = true;
      msgStr = await this.childsnc24Service.doDssBack(jsonObject);
      this.block = false;
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msgStr } });
    }
  }
  // 授信覆核退回徵信
  public async L1sendbackL2(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['level'] = this.stepName.substring(10);
    jsonObject['reject'] = 'L2';
    let msgStr: string = '';
    if (this.stepName.substring(10) == 'L1') {
      this.block = true;
      msgStr = await this.childsnc24Service.doDssBack(jsonObject);
      this.block = false;
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msgStr } });
    }
  }
}
