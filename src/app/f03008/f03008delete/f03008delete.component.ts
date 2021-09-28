import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F03008Service } from '../f03008.service';


@Component({
  selector: 'app-f03008delete',
  templateUrl: './f03008delete.component.html',
  styleUrls: ['./f03008delete.component.css']
})
export class F03008deleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<F03008deleteComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public f03008Service: F03008Service
  ) { }

  YNselect: OptionsCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }];
  empNo: string = localStorage.getItem("empNo");

  ngOnInit(): void {
  }

  submit() {
  }

  //取消
  onNoClick() {
    this.dialogRef.close();
  }

  //刪除
  public async deleteAction(abnormalNid: string): Promise<void> {
    let baseUrl = 'f03/f03008action4';
    let jsonObject: any = {};
    let msgStr: string = "";
    jsonObject['abnormalNid'] = abnormalNid;
    this.f03008Service.elAbnormalNid(baseUrl, jsonObject).subscribe(data => {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: data.rspMsg }
      });
      // this.refreshTable();
    });
    console.log("我是msgStr");
    console.log(msgStr);
    if (msgStr === '編輯成功!!') { this.dialogRef.close({ event: 'success' }); }
  }


}
