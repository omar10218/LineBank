import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { OptionsCode } from '../interface/base';
import { F03009Service } from './f03009.service';

interface checkBox {
  value: string;
  completed: boolean;
}

@Component({
  selector: 'app-f03009',
  templateUrl: './f03009.component.html',
  styleUrls: ['./f03009.component.css','../../assets/css/f03.css']
})
export class F03009Component implements OnInit {

  isAllCheck: boolean = false;
  tvnoCode: OptionsCode[] = [];
  chkArray: checkBox[] = [];
  selectedValue: string;
  mdnoSource = new MatTableDataSource<any>();

  constructor(public dialog: MatDialog, private f03009Service: F03009Service) { }

  ngOnInit(): void {
    this.f03009Service.getSysTypeCode('TV_NO').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.tvnoCode.push({value: codeNo, viewValue: desc})
      }
    });
  }

  async changeSelect() {
    this.isAllCheck = false;
    this.getTvFunction();
  }

  private async getTvFunction() {
    const baseUrl = 'f03/f03009action1';
    this.f03009Service.getTvFunction(baseUrl, this.selectedValue).subscribe(data => {
      if (this.chkArray.length > 0) {
        let i: number = 0;
        for (const jsonObj of data.rspBody) {
          const chkValue = jsonObj['CODE_NO'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray[i] = {value: chkValue, completed: isChk == 'Y'};
          i++;
        }

      } else {
        for (const jsonObj of data.rspBody) {
          const chkValue = jsonObj['CODE_NO'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray.push({value: chkValue, completed: isChk == 'Y'});
        }
      }
      this.mdnoSource.data = data.rspBody;
    });
  }

  save() {
    var valArray: string[] = new Array;
    for (const obj of this.chkArray) {
      if (obj.completed) { valArray.push(obj.value); }
    }
    const formData: FormData = new FormData();
    formData.append("tvNo", this.selectedValue);
    formData.append("mdNo", valArray.toString());
    const baseUrl = 'f03/f03009action2';
     this.f03009Service.saveTvFunction(baseUrl, formData).subscribe(data => {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: data.rspMsg }
      });
    });
  }

  setAll(completed: boolean) {
    for (const obj of this.chkArray) {
      obj.completed = completed;
    }
  }

}
