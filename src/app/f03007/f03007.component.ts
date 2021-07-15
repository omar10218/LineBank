import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { F03007Service } from './f03007.service';
import { F03007confirmComponent } from './f03007confirm/f03007confirm.component';

interface sysCode {
  value: string;
  viewValue: string;
}

interface checkBox {
  value: string;
  completed: boolean;
}

@Component({
  selector: 'app-f03007',
  templateUrl: './f03007.component.html',
  styleUrls: ['./f03007.component.css','../../assets/css/f03.css']
})
export class F03007Component implements OnInit, AfterViewInit {

  isAllCheck: boolean = false;
  sysCode: sysCode[] = [];
  chkArray: checkBox[] = [];
  selectedValue: string;
  roleFunctionSource = new MatTableDataSource<any>();
  constructor(private f03007Service: F03007Service, public dialog: MatDialog,) { }
  ngAfterViewInit() {}
  ngOnInit(): void {
    const baseUrl = 'f03/f03007';
    this.f03007Service.getRoleOption(baseUrl).subscribe(data => {
      console.log(data);
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['roleNo'];
        const desc = jsonObj['roleName'];
        this.sysCode.push({value: codeNo, viewValue: desc})
      }
    });
  }

  save() {
    var valArray: string[] = new Array;
    for (const obj of this.chkArray) {
      if (obj.completed) { valArray.push(obj.value); }
    }
    const formData: FormData = new FormData();
    formData.append("roleNo", this.selectedValue);
    formData.append("fnNo", valArray.toString());
    const baseUrl = 'f03/f03007action2';
     this.f03007Service.saveRoleFunction(baseUrl, formData).subscribe(data => {
      const childernDialogRef = this.dialog.open(F03007confirmComponent, {
        data: { msgStr: (data.rspCode === '0000' && data.rspMsg === '成功') ? '儲存成功！' : '儲存失敗！' }
      });
    });

  }

  setAll(completed: boolean) {
    for (const obj of this.chkArray) {
      obj.completed = completed;
    }
  }

  async changeSelect() {
    this.isAllCheck = false;
    await this.getRoleFunction();
  }

  private async getRoleFunction() {
    const baseUrl = 'f03/f03007action1';
    this.f03007Service.getRoleFunction(baseUrl, this.selectedValue).subscribe(data => {
      console.log(data);
      if (this.chkArray.length > 0) {
        let i: number = 0;
        for (const jsonObj of data.rspBody) {
          const chkValue = jsonObj['FN_NO'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray[i] = {value: chkValue, completed: isChk == 'Y'};
          i++;
        }

      } else {
        for (const jsonObj of data.rspBody) {
          const chkValue = jsonObj['FN_NO'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray.push({value: chkValue, completed: isChk == 'Y'});
        }
      }
      this.roleFunctionSource.data = data.rspBody;
    });
  }
}
