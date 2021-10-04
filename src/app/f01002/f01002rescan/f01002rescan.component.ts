import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n';
import { ChildrenService } from 'src/app/children/children.service';
import { Childscn5Service } from 'src/app/children/childscn5/childscn5.service';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01002rescanService } from './f01002rescan.service';
//alvin.lee 20210915 補件/發簡訊



interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01002rescan',
  templateUrl: './f01002rescan.component.html',
  styleUrls: ['./f01002rescan.component.css', '../../../assets/css/f03.css']
})
export class F01002rescanComponent implements OnInit {

  constructor(
    private f01002rescanService: F01002rescanService,
    private childscn5Service: Childscn5Service,
    public childrenService: ChildrenService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<F01002rescanComponent>,
    private pipe: DatePipe,
    private nzI18nService: NzI18nService,
  ) {
    this.nzI18nService.setLocale(zh_TW)
  }

  private applno: string; //案編
  private cuid: string;   //客編
  restartDate: number;    //待補文件日期
  restartDateValue: Date; //待補文件日期類型
  rescanTypeCode = [];    //補件原因下拉
  rescanType: string;     //補件原因
  rescanItemCode = [];    //補件項目下拉
  rescanItem: string;     //補件項目
  rescanContent: string;  //徵審註記
  mobile: string;         //客戶手機
  smsSetCode: sysCode[];  //sms模板下拉
  smsSet: string;         //sms模板
  messageContent: string; //sms內容
  realSmsTime: string;    //預計發送時間
  realSmsTimeValue: Date; //預計發送時間類型
  rescanDataSource = new MatTableDataSource<any>(); //補件資訊檔
  mytime: Date | null = null;

  ngOnInit(): void {

    //取案編,客編
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    this.queryCusMobile();

    //取sms樣板
    this.f01002rescanService.getSysTypeCode('SMS_SET').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.smsSetCode.push({ value: codeNo, viewValue: desc })
      }
    });
    this.getRescanList();

    //取補件項目
    this.f01002rescanService.getSysTypeCode('').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.smsSetCode.push({ value: codeNo, viewValue: desc })
      }
    });
    //取補件原因
    this.f01002rescanService.getSysTypeCode('').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.smsSetCode.push({ value: codeNo, viewValue: desc })
      }
    });
  }

  //新增補件資訊
  public async rescan(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['rescanType'] = 'Y';//假資料
    jsonObject['rescanContent'] = this.rescanContent;
    jsonObject['rescanItem'] = 'P';//假資料
    jsonObject['restartDate'] = this.pipe.transform(this.restartDate, 'yyyy-MM-dd');
    let msgStr: string = "";
    msgStr = await this.f01002rescanService.addRescan(jsonObject);
    if (msgStr == 'success') {
      msgStr = '儲存成功！'
    }
    this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    this.getRescanList();
  }

  //發送簡訊檔
  public async addSms(): Promise<void> {
    //做textarea檢核
    if (this.messageContent != null) {
      if (this.messageContent.indexOf('徵審人員修改') >= 0) {
        return alert('不得有徵審人員修改字樣');
      }
    }
    if (this.realSmsTime == null) {return alert('請輸入日期');}
    if (this.realSmsTime != null && this.mytime == null) {return alert('請輸入時間');}
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['messageContent'] = this.messageContent;
    jsonObject['empno'] = localStorage.getItem("empNo");
    jsonObject['mobile'] = this.mobile;
    jsonObject['realSmstime'] = this.pipe.transform(this.realSmsTime, 'yyyy-MM-dd') + this.pipe.transform(this.mytime, ' HH:mm');
    let msgStr: string = "";
    msgStr = await this.f01002rescanService.addSms(jsonObject);
    if (msgStr == 'success') {
      msgStr = '儲存成功！'
    }
    this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
  }

  //從客戶資訊查詢客戶手機
  queryCusMobile() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    this.childscn5Service.getCustomerInfoSearch(formdata).subscribe(data => {
      this.mobile = data.rspBody.items[0].cuMTel;
    });
  }

  //取該案件補件資訊
  getRescanList() {
    this.f01002rescanService.getRescanSearch().subscribe(data => {
      console.log(data)
      this.rescanDataSource = data.rspBody.items;
    })
  };

  //刪除該案件補件資訊
  delRescan(ID: string) {
    let msg = '';
    this.f01002rescanService.deleteRescanByRowid(ID).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == '刪除成功') { this.getRescanList(); }
    }, 1500);
  }
  cancel(): void {
    this.dialogRef.close();
  }
}

