import { DatePipe } from '@angular/common';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { OptionsCode } from '../interface/base';
import { F01015Service } from './f01015.service';

interface sysCode {
  viewValue: string;
}
@Component({
  selector: 'app-f01015',
  templateUrl: './f01015.component.html',
  styleUrls: ['./f01015.component.css', '../../assets/css/f01.css']
})
export class F01015Component implements OnInit {
  nationalId: string; //身分證字號
  custId: string; //customer_ID
  targetCustSource = []; //解凍降額Table
  creditMainSource = []; //貸後管理紀錄Table
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  YNCode: OptionsCode[] = [];
  YNValue: string;

  constructor(
    private f01015Service: F01015Service,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.f01015Service.getSysTypeCode('YN').subscribe(data => {
      this.YNCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.YNCode.push({ value: codeNo, viewValue: desc })
      }
    });
  }
  getTargetCustList() {
    if ((this.nationalId == null || this.nationalId == '') && (this.custId == null || this.custId == '')) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入一項查詢項目" }
      });
    } else {
      let jsonObject: any = {};
      jsonObject['nationalId'] = this.nationalId
      jsonObject['custId'] = this.custId
      this.f01015Service.getImpertmentParameter(jsonObject).subscribe(data =>{
        console.log(data)
        this.targetCustSource=data.rspBody.items
        this.creditMainSource=data.rspBody.creditMainlist
        console.log(data.rspBody.creditMainlist)
      }
    

      )
    }
  }

  


}
