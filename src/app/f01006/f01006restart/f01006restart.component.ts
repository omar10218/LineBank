import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F01006Service } from '../f01006.service';

//20210928 alvin.lee 案件申覆

@Component({
  selector: 'app-f01006restart',
  templateUrl: './f01006restart.component.html',
  styleUrls: ['./f01006restart.component.css']
})
export class F01006restartComponent implements OnInit {
  reasonCode: OptionsCode[] = []; //申覆原因下拉
  reason: string;                 //申覆原因
  content: string;                //申覆說明
  empNo: string = localStorage.getItem("empNo");
  constructor(
    public dialog: MatDialog,
    private f01006Service: F01006Service,
    public dialogRef: MatDialogRef<F01006restartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // 申覆原因下拉
    this.f01006Service.getSysTypeCode('').subscribe(data => {
      this.reasonCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.reasonCode.push({ value: codeNo, viewValue: desc })
      }
    });
  }

  public async restart(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['applno'] = this.data.applno;
    jsonObject['reason'] = this.reason;
    jsonObject['content'] = this.content;
    jsonObject['empno'] = this.empNo;
    let msgStr: string = "";
    msgStr = await this.f01006Service.addRestart(jsonObject);
    if (msgStr == 'success') {
      msgStr = '儲存成功！'
    }
    this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    setTimeout(() => {
      this.dialog.closeAll();
    },1500);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
