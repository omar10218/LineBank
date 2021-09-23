import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F03015Service } from '../f03015.service';

@Component({
  selector: 'app-f03015upload',
  templateUrl: './f03015upload.component.html',
  styleUrls: ['./f03015upload.component.css']
})
export class F03015uploadComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F03015uploadComponent>,private f03015Service: F03015Service,public dialog: MatDialog,) { }
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  spinnerEnabled = false;
  fileToUpload: File | null = null;
  ngOnInit(): void {
  }

  public async confirmAdd(): Promise<void> {
    const formdata: FormData = new FormData();
    formdata.append('myFile', this.fileToUpload);
    console.log(formdata)
    let msgStr: string = "";
    let baseUrl = 'f03/f03015action4';
    await this.f03015Service.uploadExcel(baseUrl, formdata);
    const childernDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: "傳送" }
    });
    if (msgStr === '上傳成功!!') { this.dialogRef.close({ event: 'success' }); }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  uploadFileToActivity() {
    // this.f03015service.postFile(this.fileToUpload).subscribe(data => {
    //   // do something, if upload success
    //   }, error => {
    //     console.log(error);
    //   });
  }
  submit() {
  }
  onChange(evt) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.fileToUpload = target.files.item(0);
      console.log("我是EXCEL")
      console.log(this.fileToUpload.size)
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
      };

      reader.readAsBinaryString(target.files[0]);
    }
  }
}
