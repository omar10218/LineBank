import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03008Service } from '../f03008.service';
import { F03008confirmComponent } from '../f03008confirm/f03008confirm.component';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03008edit',
  templateUrl: './f03008edit.component.html',
  styleUrls: ['./f03008edit.component.css']
})
export class F03008editComponent   {

  constructor(public dialogRef: MatDialogRef<F03008editComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f03008Service: F03008Service) { }

  YNselect:sysCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }];
  empNo: string = localStorage.getItem("empNo");

  ngOnInit(): void {
  }

  submit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }
  // stopEdit() {
  //   this.dialogRef.close();
  // }

  public async stopEdit(): Promise<void> {
    const formdata: FormData = new FormData();
    formdata.append('onCheck', this.data.onCheck);
    formdata.append('abnormalNid', this.data.abnormalNid);
    console.log(this.empNo)
    console.log(formdata)
    let msgStr: string = "";
    let baseUrl = 'f03/f03008action3';
    msgStr = await this.f03008Service.addOrEditAdrCodeSet(baseUrl, this.empNo, formdata);
    const childernDialogRef = this.dialog.open(F03008confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '編輯成功!!') { this.dialogRef.close({ event: 'success' }); }
  }

}
