
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { F03010Service } from '../f03010.service';
import { F03010confirmComponent } from '../f03010confirm/f03010confirm.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

//下拉選單框架
interface sysCode {
  value: string;
  viewValue: string;
}

//Nick 照會話術新增
@Component({
  selector: 'app-f03010add',
  templateUrl: './f03010add.component.html',
  styleUrls: ['./f03010add.component.css', '../../../assets/css/f03.css']
})
export class F03010addComponent implements OnInit {

  //暫停使用下拉選單
  stopFlagCode: sysCode[] = [{ value: 'Y', viewValue: 'Y' }, { value: 'N', viewValue: 'N' }];

  constructor(public dialogRef: MatDialogRef<F03010addComponent>,private fb: FormBuilder, private f03010Service: F03010Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
//欄位驗證
  formControl = new FormControl('', [
    Validators.required
  ]);

  //欄位驗證
  getErrorMessage() {
    return this.formControl.hasError('required') ? '此欄位必填' : '';
  }

  //新增
  add() {
    let msg = '';
      const url = 'f03/f03010action1';
      const formdata: FormData = new FormData();
      formdata.append('speakingAbbreviation', this.data.speakingAbbreviation);
      formdata.append('stopFlag',this.data.stopFlag);
      formdata.append('speakingContent', this.data.speakingContent);
      this.f03010Service.saveDssCallout( url, formdata).subscribe(data => {
        msg = data.rspMsg;
      });
    // }
    setTimeout(() => {
      const DialogRef = this.dialog.open(F03010confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  //取消
  onNoClick(): void {
    this.dialogRef.close();
  }

}
