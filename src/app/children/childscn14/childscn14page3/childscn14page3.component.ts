import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Childscn14Service } from '../childscn14.service';

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

  constructor(
    public dialogRef: MatDialogRef<Childscn14page3Component>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private childscn14Service: Childscn14Service,
    ) { }
  fileToUpload: File | null = null;
  private applno: string;
  isValidFile: boolean;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');

    const baseUrl = 'f01/childscn14action2';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    this.childscn14Service.getImageInfo(baseUrl, jsonObject).subscribe(data => {

    });

  }
  uploadForm: FormGroup = this.fb.group({
    DOC_ID: [this.data.DOC_ID, []],
    REMARK: [this.data.REMARK, []],
    ERROR_MESSAGE: []
  });

  public async upload(): Promise<void> {
    const formdata: FormData = new FormData();
    formdata.append('file', this.fileToUpload);
    let msgStr: string = "";
    let baseUrl = 'f01/childscn14action2';
    this.childscn14Service.uploadFile(baseUrl, this.fileToUpload).subscribe(data => {
      this.uploadForm.patchValue({ ERROR_MESSAGE: data.rspMsg });
      alert(this.uploadForm.value.ERROR_MESSAGE);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //檢查上傳檔案格式
  onChange(evt) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isValidFile = !!target.files[0].name.match(/(.jpg|.png|.tif)/);
    if (this.isValidFile) {
      this.fileToUpload = target.files.item(0);
    } else {
      this.uploadForm.patchValue({ ERROR_MESSAGE: "非合法圖檔，請檢查檔案格式重新上傳" });
      alert(this.uploadForm.value.ERROR_MESSAGE);
    }
  }

}
