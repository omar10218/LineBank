import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03008Service } from '../f03008.service';
import * as XLSX from 'xlsx';
import { F03008confirmComponent } from '../f03008confirm/f03008confirm.component';

@Component({
  selector: 'app-f03008upload',
  templateUrl: './f03008upload.component.html',
  styleUrls: ['./f03008upload.component.css']
})
export class F03008uploadComponent implements OnInit {

  JSONObject = {
    object: {},
    string: ''
  };
  empNo: string = localStorage.getItem("empNo");
  JsonBool = false;
  ExcelSource : any;
  //excelList: string[]=new Array;
  abnormalNid: string[]=new Array;
  abnormalName: string[]=new Array;
  onCheck: string[]=new Array;

  constructor(public dialogRef: MatDialogRef<F03008uploadComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f03008Service: F03008Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public async confirmAdd(): Promise<void> {
    const formdata: FormData = new FormData();
    formdata.append('abnormalNid', this.ListToString(this.abnormalNid));
    formdata.append('abnormalName', this.ListToString(this.abnormalName));
    formdata.append('onCheck', this.ListToString(this.onCheck));
    console.log(this.empNo)
    console.log(formdata)
    let msgStr: string = "";
    let baseUrl = 'f03/f03008action2';
    msgStr = await this.f03008Service.addOrEditAdrCodeSet(baseUrl, this.empNo, formdata);
    const childernDialogRef = this.dialog.open(F03008confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '上傳成功!!') { this.dialogRef.close({ event: 'success' }); }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
  }

  //取Excel
  onFileChange(ev: any) {
    this.ExcelSource=null;
    this.JsonBool = false;
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      this.ExcelSource=this.first(jsonData);//只取第一個分頁資料
      console.log(this.ExcelSource);
      let i = 0;

      for (var key in this.ExcelSource[0]) {
        this.JsonBool = (i == 0) ? (key == "ABNORMAL_NID") ? true : false : this.JsonBool
        this.JsonBool = (i == 1) ? (key == "ABNORMAL_NAME") ? this.JsonBool : false : this.JsonBool
        i += 1;
      }
      if (!this.JsonBool) {
        const childernDialogRef = this.dialog.open(F03008confirmComponent, {
          data: { msgStr: "EXCEL檔案格式不正確!"}
        });
      }else
      {
        for (const jsonObj of this.ExcelSource) {
          const ABNORMAL_NID = jsonObj['ABNORMAL_NID'];
          const ABNORMAL_NAME = jsonObj['ABNORMAL_NAME'];
          this.abnormalNid.push(ABNORMAL_NID)
          this.abnormalName.push(ABNORMAL_NAME)
          this.onCheck.push('Y')
        }
        // this.ListToString(this.abnormalNid);
        //console.log(this.excelList);
      }
    }
    reader.readAsBinaryString(file);
  }

  //只取第一筆
  first(obj:object):any{
    for(var key in obj)
    {
      return obj[key];
    }
  }

    ListToString(x:string[]):string{
      return x.toString();
    }


}
