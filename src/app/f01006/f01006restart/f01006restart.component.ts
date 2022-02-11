import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F01006Service } from '../f01006.service';
import { F01006Component } from '../f01006.component';

//20210928 alvin.lee 案件申覆

@Component({
  selector: 'app-f01006restart',
  templateUrl: './f01006restart.component.html',
  styleUrls: ['./f01006restart.component.css', '../../../assets/css/f01.css']
})
export class F01006restartComponent implements OnInit {
  reasonCode: OptionsCode[] = []; //申覆原因下拉
  reason: string;                 //申覆原因
  content: string;                //申覆說明
  empNo: string = localStorage.getItem("empNo");
  interestData = [];
  seq: string;
  period: string;
  periodType: string;
  interestType: string;
  interestCode: string;
  interestBase: string;
  interest: string;
  approveInterest: string;


  constructor(
    public dialog: MatDialog,
    private f01006Service: F01006Service,
    public dialogRef: MatDialogRef<F01006restartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getInterestData();
    // 申覆原因下拉
    let jsonObject: any = {};
    this.f01006Service.getReasonData(jsonObject).subscribe(data => {

      this.reasonCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.items) {
        const codeNo = jsonObj.reasonCode;
        const desc = jsonObj.reasonDesc;
        this.reasonCode.push({ value: codeNo, viewValue: desc })
      }
    });
    this.reason = '';
  }

  public async restart(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['applno'] = this.data.applno;
    jsonObject['reason'] = this.reason;
    jsonObject['content'] = this.content;
    jsonObject['empno'] = this.empNo;
    jsonObject['opid'] = this.data.opid;

    let msgStr: string = "";
    if (this.reason == null || this.reason == '') {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請填入申覆原因' }
      });
    } else if (this.content == null || this.content == '') {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請填入申覆說明' }
      });
    } else {
      msgStr = await this.f01006Service.addRestart(jsonObject);
      if (msgStr == 'success') {
        msgStr = '儲存成功！'
      }
      this.dialog.open(ConfirmComponent, {
        data: { msgStr: msgStr }
      });
      setTimeout(() => {
        this.dialog.closeAll();
        window.location.reload();
      }, 2500);
    }
  }

  getInterestData() {
    let jsonObject: any = {};
    jsonObject['applno'] = this.data.applno;
    this.f01006Service.getInterestData(jsonObject).subscribe(data => {
      console.log(data)
      this.interestData = data.rspBody.items;
      // this.seq = this.interestData[0].SEQ;
      // this.period = this.interestData[0].PERIOD;
      // this.periodType = this.interestData[0].PERIOD_TYPE;
      // this.interestType = this.interestData[0].INTEREST_TYPE;
      // this.interestCode = this.interestData[0].INTEREST_CODE;
      // this.interestBase = this.interestData[0].INTEREST_BASE;
      // this.interest = this.interestData[0].INTEREST;
      // this.approveInterest = this.interestData[0].APPROVE_INTEREST;
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
