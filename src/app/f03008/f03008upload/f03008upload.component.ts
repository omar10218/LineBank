import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03008Service } from '../f03008.service';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-f03008upload',
  templateUrl: './f03008upload.component.html',
  styleUrls: ['./f03008upload.component.css','../../../assets/css/f03.css']
})
export class F03008uploadComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<F03008uploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public f03008Service: F03008Service,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  uploadForm: FormGroup = this.fb.group({
    ERROR_MESSAGE: [this.data.errorMessage]
  });

  isExcelFile: boolean;
  fileToUpload: File | null = null;

  empNo: string = localStorage.getItem("empNo");
  JsonBool = false;
  ExcelSource : any;

  ngOnInit(): void {
  }

  public async confirmAdd(): Promise<void> {
    const formdata: FormData = new FormData();
    formdata.append('file', this.fileToUpload);
    let msgStr: string = "";
    let baseUrl = 'f03/f03008action2';
    this.f03008Service.uploadExcel(baseUrl, this.fileToUpload, this.empNo).subscribe(data => {
      console.log(data)
      let msg="";
      if(data.rspCode!="0000"){
        for (const Information of data.rspBody.ErrorInformation)
        {
          msg+=Information.repeatValue+"\n";
        }
      }
      msg+=data.rspMsg;
      this.uploadForm.patchValue({ ERROR_MESSAGE: msg });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
  }

  //檢查上傳檔案格式
  onChange(evt) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (this.isExcelFile) {
      this.fileToUpload = target.files.item(0);
    } else {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "非excel檔，請檢查檔案格式重新上傳" }
      });
    }
  }
}
