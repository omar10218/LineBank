import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F01001scn13Service } from '../f01001scn13.service';

@Component({
  templateUrl: './f01001scn13edit.component.html',
  styleUrls: ['./f01001scn13edit.component.css']
})
export class F01001scn13editComponent implements OnInit {
  accept: string = "image/*";
  fileControl: FormControl;
  public files: any;
  maxSize: number = 16;
  imageSrc: string;
  rowId: string;
  msg: string = "";
  constructor(public dialogRef: MatDialogRef<F01001scn13editComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f01001scn13Service: F01001scn13Service, public dialog: MatDialog) {
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

  uploadFile() {
    const baseUrl = 'f01/f01001scn13action2';
    if (this.files != null) {
      var mimeType = this.files.type;
      if (mimeType.match(/image\/*/) == null) {
			  this.msg = "檔案非圖片類型!";
      } else {
        const formdata = new FormData();
        formdata.append('web', this.data.webAddrValue.split('=')[0]);
        formdata.append('webAddr', this.data.webAddrUrl);
        formdata.append('messageContent', this.data.webInfoContent);
        formdata.append('empno', '9901890');
        formdata.append('rowid', this.data.rowId);
        formdata.append('file', this.files);
        this.f01001scn13Service.uploadFile(baseUrl, formdata).subscribe(data => {

        });
      }
    } else {
      // 走這邊就是更新內容文字
      this.msg ='編輯有可能只改文字內容沒有更換檔案!';
      const formdata = new FormData();
      formdata.append('web', this.data.webAddrValue.split('=')[0]);
      formdata.append('webAddr', this.data.webAddrUrl);
      formdata.append('messageContent', this.data.webInfoContent);
      formdata.append('empno', '9901890');
      formdata.append('rowid', this.rowId);
      this.f01001scn13Service.uploadFile(baseUrl, formdata).subscribe(data => {

      });
    }
  }

}
