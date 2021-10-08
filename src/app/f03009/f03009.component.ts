import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { OptionsCode } from '../interface/base';
import { F03009Service } from './f03009.service';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n';

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

  constructor(
    public dialog: MatDialog,
    private f03009Service: F03009Service,
    private nzI18nService: NzI18nService,
  ) {
    this.nzI18nService.setLocale(zh_TW)
  }

  isAllCheck: boolean = false;
  tvnoCode: OptionsCode[] = [];
  chkArray: checkBox[] = [];
  selectedValue: string;
  mdnoSource = new MatTableDataSource<any>();

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
    let jsonObject: any = {};
    jsonObject['tvNo'] = this.selectedValue;
    console.log(this.selectedValue);
    this.f03009Service.TvFunction(baseUrl, jsonObject).subscribe(data => {
      console.log(data);
      console.log(this.chkArray);
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
    const baseUrl = 'f03/f03009action2';
    let jsonObject: any = {};
    jsonObject['tvNo'] = this.selectedValue;
    jsonObject['mdNo'] = valArray.toString();
    this.f03009Service.TvFunction(baseUrl, jsonObject).subscribe(data => {
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
