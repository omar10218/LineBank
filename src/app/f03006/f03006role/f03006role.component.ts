import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03006Service } from '../f03006.service';
import { F03006confirmComponent } from '../f03006confirm/f03006confirm.component';

interface checkBox {
  value: string;
  completed: boolean;
}

@Component({
  selector: 'app-f03006role',
  templateUrl: './f03006role.component.html',
  styleUrls: ['./f03006role.component.css']
})
export class F03006roleComponent {
  constructor(public dialogRef: MatDialogRef<F03006roleComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f03006Service: F03006Service) { }

  submit() {
  }

  setAll(completed: boolean) {
    for (const obj of this.data.CHECKBOX) {
      obj.completed = completed;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public async confirmAdd(): Promise<void> {
    var valArray: string[] = new Array;
    for (const obj of this.data.CHECKBOX) {
      if (obj.completed) { valArray.push(obj.value); }
    }
    const formData: FormData = new FormData();
    formData.append("empNo", this.data.empNo);
    formData.append("roleNo", valArray.toString());
    let msgStr = '';
    const baseUrl = 'f03/f03006action5';
     this.f03006Service.saveEmployeeRole(baseUrl, formData).subscribe(data => {
      msgStr = (data.rspCode === '0000' && data.rspMsg === '成功') ? '儲存成功！' : '儲存失敗！';
      const childernDialogRef = this.dialog.open(F03006confirmComponent, {
        data: { msgStr: msgStr }
      });
      if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
    });
  }

}
