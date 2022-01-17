import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Childscn28Service } from './childscn28.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';

interface sysCode {
  value: string;
  viewValue: string;
}
//Nick mail
@Component({
  selector: 'app-childscn28',
  templateUrl: './childscn28.component.html',
  styleUrls: ['./childscn28.component.css', '../../../assets/css/f01.css']
})
export class Childscn28Component implements OnInit {

  constructor(
    private childscn28Service: Childscn28Service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<Childscn28Component>,
  ) { }

  private applno: string;     //案編
  email: string;              //EMAIL
  emailCode: sysCode[] = [];  //EMAIL模板下拉
  emailSet: string;           //EMAIL設定值
  emailTitle: string;         //主旨
  content: string;            //E-MAIL內容
  stepName: string;


  emailDataSource = new MatTableDataSource<any>();    //email資訊檔
  email_M_Code = new MatTableDataSource<any>();    //email mappingcode

  ngOnInit(): void {
    //取案編
    this.applno = sessionStorage.getItem('applno');

    this.childscn28Service.getSysTypeCode('EMAIL').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.emailCode.push({ value: codeNo, viewValue: desc })
      }
      this.email_M_Code.data = data.rspBody.mappingList;
    });
    this.getEmailList();
  }

  // 離開該彈窗
  cancel(): void {
    this.dialogRef.close();
  }

  // 選取EMAIL模板後會將內容代入EMAIL內容
  changeSelect(emailSet: string) {
    console.log('emailSet');
    console.log(emailSet);
    console.log('this.email_M_Code.data');
    console.log(this.email_M_Code.data);
    for (const jsonObj of this.email_M_Code.data) {
      this.content = jsonObj.codeNo == emailSet ? jsonObj.codeTag : this.content;
    }
  };

  //取該案件email發送資訊
  getEmailList() {
    const baseUrl = 'f01/childscn28';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    this.childscn28Service.postJson(baseUrl, jsonObject).subscribe(data => {
      this.emailDataSource = data.rspBody.items;
      if(this.email==null||this.email==""){
        this.email = data.rspBody.email;
      }
    });
  };


  addMail() {
    if (this.email == null || this.email == "") {
      this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入EMAIL" }
      });
    } else if (this.emailTitle == null || this.emailTitle == "") {
      this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入主旨" }
      });
    } else if (this.content == null || this.content == "") {
      this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入EMAIL內容" }
      });
    } else if (this.content != null) {
      if (this.content.indexOf('徵信員輸入文字') >= 0) {
        this.dialog.open(ConfirmComponent, {
          data: { msgStr: "不得有徵信員輸入文字" }
        });
      }
      else {
        let msgStr: string = "";
        const baseUrl = 'f01/childscn28action1';
        let jsonObject: any = {};
        jsonObject['applno'] = this.applno;
        jsonObject['email'] = this.email;
        jsonObject['emailTitle'] = this.emailTitle;
        jsonObject['messageContent'] = this.content;
        jsonObject['level'] = this.stepName.substring(10);
        this.childscn28Service.postJson(baseUrl, jsonObject).subscribe(data => {
          msgStr = data.rspMsg == "success" ? "傳送成功!" : "傳送失敗!"
          this.dialog.open(ConfirmComponent, {
            data: { msgStr: msgStr }
          });
          if (data.rspMsg == "success" && data.rspCode === '0000') {
            this.getEmailList();
            this.emailTitle=null;
            this.content=null;
          }
        });
      }
    }
  }
}
