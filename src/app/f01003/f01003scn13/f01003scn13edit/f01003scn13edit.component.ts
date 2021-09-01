import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { F01003scn13Service } from '../f01003scn13.service';
import { F01003scn13confirmComponent } from '../f01003scn13confirm/f01003scn13confirm.component';

@Component({
  selector: 'app-f01003scn13edit',
  templateUrl: './f01003scn13edit.component.html',
  styleUrls: ['./f01003scn13edit.component.css']
})
export class F01003scn13editComponent implements OnInit {

  accept: string = "image/*";
  fileControl: FormControl;
  public files: any;
  maxSize: number = 16;
  imageSrc: string;
  rowId: string;
  msg: string = "";

  constructor(public dialogRef: MatDialogRef<F01003scn13editComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f01003scn13Service: F01003scn13Service, public dialog: MatDialog) {
    this.fileControl = new FormControl(this.files, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ])
  }

  ngOnInit(): void {
    this.rowId = this.data.rowId;
    this.imageSrc = 'data:image/png;base64,' + this.data.base64;
    this.fileControl.valueChanges.subscribe((files: any) => {
      this.files = files;
    });
  }

  changeSelect() {
    this.data.webAddrUrl = this.data.webAddrValue.split('=')[1];
  }

  onAddImage(event: any) {
    if (this.files != null) {
      var mimeType = this.files.type;
      if (mimeType.match(/image\/*/) == null) {
        this.msg = "檔案非圖片類型!";
        this.imageSrc = '';
      } else {
        this.msg = '';
        const reader = new FileReader();
        reader.readAsDataURL(this.files);
        reader.onload = () => { this.imageSrc = reader.result as string; };
      }
    }
  }

  async uploadFile() {
    let msgStr: string = "";
    let codeStr: string = "";
    const formdata = new FormData();
    const baseUrl = 'f01/f01003scn13action2';
    if (this.files != null) {
      var mimeType = this.files.type;
      if (mimeType.match(/image\/*/) == null) {
        this.msg = "檔案非圖片類型!";
        return;

      } else {
        formdata.append('web', this.data.webAddrValue.split('=')[0]);
        formdata.append('webAddr', this.data.webAddrUrl);
        formdata.append('messageContent', this.data.webInfoContent);
        formdata.append('empno', '9901890');
        formdata.append('rowid', this.data.rowId);
        formdata.append('file', this.files);
      }
    } else {
      formdata.append('web', this.data.webAddrValue.split('=')[0]);
      formdata.append('webAddr', this.data.webAddrUrl);
      formdata.append('messageContent', this.data.webInfoContent);
      formdata.append('empno', '9901890');
      formdata.append('rowid', this.rowId);
    }

    await this.f01003scn13Service.f01003scn13Action(baseUrl, formdata).then((data: any) => {
      codeStr = data.rspCode;
      msgStr = data.rspMsg;
    });

    const childernDialogRef = this.dialog.open(F01003scn13confirmComponent, {
      data: { msgStr: msgStr }
    });

    if (msgStr === '修改成功' && codeStr === '0000') { this.dialogRef.close({ event: 'success' }); }
  }
}
