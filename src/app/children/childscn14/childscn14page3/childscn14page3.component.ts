import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-childscn14page3',
  templateUrl: './childscn14page3.component.html',
  styleUrls: ['./childscn14page3.component.css','../../../../assets/css/child.css']
})
export class Childscn14page3Component implements OnInit {
  imageTypeCode: sysCode[] = []; //文件類別下拉
  imageTypeValue: string;  //文件類別選擇

  constructor(public dialogRef: MatDialogRef<Childscn14page3Component>, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) { }
  fileToUpload: File | null = null;
  ngOnInit(): void {
  }
  uploadForm: FormGroup = this.fb.group({
    // ERROR_MESSAGE: [this.data.errorMessage]
  });

  public async upload(): Promise<void> {
    const formdata: FormData = new FormData();
    formdata.append('file', this.fileToUpload);
    let msgStr: string = "";
    let baseUrl = 'f03/f03015action4';
    // this.f03015Service.uploadExcel(baseUrl, this.fileToUpload).subscribe(data => {
    //   this.uploadForm.patchValue({ ERROR_MESSAGE: data.rspMsg });
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //檢查上傳檔案格式
  onChange(evt) {
    // const target: DataTransfer = <DataTransfer>(evt.target);
    // this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    // if (this.isExcelFile) {
    //   this.fileToUpload = target.files.item(0);
    // } else {
    //   this.uploadForm.patchValue({ ERROR_MESSAGE: "非excel檔，請檢查檔案格式重新上傳" });
    // }
  }

}
