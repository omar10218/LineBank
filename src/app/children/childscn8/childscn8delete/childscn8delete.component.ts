import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { Childscn8Service } from '../childscn8.service';

//Nick  徵信照會 刪除
@Component({
  selector: 'app-childscn8delete',
  templateUrl: './childscn8delete.component.html',
  styleUrls: ['./childscn8delete.component.css']
})
export class Childscn8deleteComponent implements OnInit {

  CON_TEL_Code: OptionsCode[] = []; //電話種類下拉選單
  CON_TEL_Selected: string;//電話種類
  CON_TARGET_Code: OptionsCode[] = [];//對象種類下拉選單
  CON_TARGET_Selected: string;//對象種類
  CON_MEMO_Code: OptionsCode[] = [];//註記種類下拉選單
  CON_MEMO_Selected: string;//註記種類

  constructor(public dialogRef: MatDialogRef<Childscn8deleteComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public childscn8Service: Childscn8Service) { }

//欄位驗證
formControl = new FormControl('', [
  Validators.required
]);

//取得欄位驗證訊息
getErrorMessage() {
  return this.formControl.hasError('required') ? 'Required field' : '';
}

  ngOnInit(): void {
  }


 //刪除
 deleteAction(ID: string) {
  let msg = '';
  let codeStr: string = "";
  const url = 'f01/childscn8action3';
  this.childscn8Service.DeleteCALLOUT(url, ID).subscribe(data => {
    msg = data.rspMsg;
  });
  setTimeout(() => {
    const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
    if (msg === '刪除成功' && codeStr === '0000') {this.dialogRef.close({ event: 'success' }); }
  }, 1500);
}

//取消
onNoClick(): void {
  this.dialogRef.close();
}

}
