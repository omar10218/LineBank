import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Childscn1Service } from '../../childscn1/childscn1.service';
import { Childscn6Service } from '../../childscn6/childscn6.service';
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
    private childscn6Service: Childscn6Service,
    private childscn14Service: Childscn14Service,
    private childscn1Service: Childscn1Service,
    ) { }
  // fileToUpload: File | null = null;
  public fileToUpload: any;
  private applno: string;
  private cuid: string;
  private cuNm: string;
  isValidFile: boolean;

  ngOnInit(): void {

    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    // const baseUrl = 'f01/childscn14action1';
    // let jsonObject: any = {};
    // jsonObject['applno'] = this.applno;
    // this.childscn14Service.getImageInfo(baseUrl, jsonObject).subscribe(data => {
    // });
    // this.applno = sessionStorage.getItem('applno');
    // this.search = sessionStorage.getItem('search');
    // this.host = this.getHost();

    const baseUrl = 'f01/childscn6action2';
    let jsonObject: any = {};
    this.childscn6Service.getDate(baseUrl, jsonObject).subscribe(data => {
      this.cuid = data.rspBody[0].empNo;
      this.cuNm = data.rspBody[0].empName;
    });


    this.childscn1Service.getSysTypeCode('DOC_TYPE').subscribe(data => {        //文件類型下拉選單
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.imageTypeCode.push({ value: codeNo, viewValue: desc })
        }
      });

  }
  uploadForm: FormGroup = this.fb.group({
    DOC_ID: [this.data.DOC_ID, []],
    REMARK: [this.data.REMARK, []],
    ERROR_MESSAGE: []
  });

  public async upload(): Promise<void> {
    let docId = this.uploadForm.value.DOC_ID;
    if (docId != "" && docId != null) {
      const formdata = new FormData();

      formdata.append('file', this.fileToUpload, this.fileToUpload.name);
      formdata.append('applno', this.applno);
      formdata.append('cuId', this.cuid);
      formdata.append('cuNm', this.cuNm);
      formdata.append('docId', this.uploadForm.value.DOC_ID);
      formdata.append('remark', this.uploadForm.value.REMARK);
      let baseUrl = 'f01/childscn14action2';
        await this.childscn14Service.childscn14Action(baseUrl, formdata).then((data: any) => {
        if (data.rspMsg != '文件上傳成功') {
        this.uploadForm.patchValue({ ERROR_MESSAGE: data.rspMsg });
        alert('文件上傳失敗，請聯絡系統管理人員: ' + data.rspMsg);
        } else {
          alert(data.rspMsg);
          this.dialogRef.close();
        }
      });

    } else {
      alert("請選擇文件類型");
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //檢查上傳檔案格式
  onChange(evt) {
    const target: DataTransfer = <DataTransfer>(evt.target);

    this.isValidFile = !!target.files[0].name.match(/(.jpg|.png|.tif|.JPG)/);
    if (this.isValidFile) {
      this.fileToUpload = target.files.item(0);
    } else {
      this.uploadForm.patchValue({ ERROR_MESSAGE: "非合法圖檔，請檢查檔案格式重新上傳" });
      alert(this.uploadForm.value.ERROR_MESSAGE);
    }
  }

}
