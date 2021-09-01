import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { F01004scn13Service } from '../f01004scn13.service';
import { F01004scn13confirmComponent } from '../f01004scn13confirm/f01004scn13confirm.component';

@Component({
  selector: 'app-f01004scn13add',
  templateUrl: './f01004scn13add.component.html',
  styleUrls: ['./f01004scn13add.component.css']
})
export class F01004scn13addComponent implements OnInit {

  accept: string = "image/*";
  fileControl: FormControl;
  public files: any;
  maxSize: number = 16;
  imageSrc: string;
  webAddrValue: string;
  webAddrUrl: string;
  webInfoContent: string;
  msg: string = "";

  constructor(public dialogRef: MatDialogRef<F01004scn13addComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f01004scn13Service: F01004scn13Service, public dialog: MatDialog) {
    this.fileControl = new FormControl(this.files, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ])
  }

  ngOnInit(): void {
    this.fileControl.valueChanges.subscribe((files: any) => {
      this.files = files;
    });
  }

  changeSelect() {
    this.webAddrUrl = this.webAddrValue.split('=')[1];
    window.open(this.webAddrUrl, "_blank");
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
    if (this.files != null) {
      var mimeType = this.files.type;
      if (mimeType.match(/image\/*/) == null) {
			  this.msg = "檔案非圖片類型!";
      } else {
        const formdata = new FormData();
        formdata.append('applno', this.data.applno);
        formdata.append('web', this.webAddrValue.split('=')[0]);
        formdata.append('webAddr', this.webAddrUrl);
        formdata.append('messageContent', this.webInfoContent);
        formdata.append('empno', '9901890');
        formdata.append('file', this.files);
        const baseUrl = 'f01/f01004scn13action1';
        let msgStr: string = "";
        let codeStr: string = "";
        await this.f01004scn13Service.f01004scn13Action(baseUrl, formdata).then((data: any) => {
          codeStr = data.rspCode;
          msgStr = data.rspMsg;
        });
        const childernDialogRef = this.dialog.open(F01004scn13confirmComponent, {
          data: { msgStr: msgStr }
        });
        if (msgStr === '新增成功' && codeStr === '0000') { this.dialogRef.close({ event:'success' }); }
      }
    } else {
      this.msg ='請至少選擇1個圖檔!';
    }
  }
}
