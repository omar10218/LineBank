import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { ChildrenService } from '../children.service';
import { Childscn5Service } from '../childscn5/childscn5.service';
import { Childscn19Service } from './childscn19.service';
//alvin.lee 20210915 補件/發簡訊

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn19',
  templateUrl: './childscn19.component.html',
  styleUrls: ['./childscn19.component.css', '../../../assets/css/f01.css']
})
export class Childscn19Component implements OnInit {

  constructor(
    private childscn19Service: Childscn19Service,
    private childscn5Service: Childscn5Service,
    public childrenService: ChildrenService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<Childscn19Component>,
    private pipe: DatePipe,
    private nzI18nService: NzI18nService,
  ) {
    this.nzI18nService.setLocale(zh_TW) //元件簡體字轉繁體字
  }

  private applno: string;                           //案編
  private cuid: string;                             //客編
  restartDate: number;                              //待補文件日期
  restartDateValue: Date;                           //待補文件日期類型
  rescanTypeCode: sysCode[] = [];                   //補件原因下拉
  rescanType: string;                               //補件原因
  rescanItemCode: sysCode[] = [];                   //補件項目下拉
  rescanItem: string;                               //補件項目
  rescanContent: string;                            //徵審註記
  mobile: string;                                   //客戶手機
  smsSetCode: sysCode[] = [];                       //sms模板下拉
  smsSet: string;                                   //sms模板
  content: string;                                  //sms內容
  messageContent: string;                           //由sms模板代入sms內容
  realSmsTime: string;                              //預計發送時間(日期)
  realSmsTimeValue: Date;                           //預計發送時間類型
  mytime: Date | null = null;                       //預計發送時間(時分)
  rescanDataSource = new MatTableDataSource<any>(); //補件資訊檔
  smsDataSource = new MatTableDataSource<any>();    //簡訊資訊檔

  block: boolean = false;

  ngOnInit(): void {

    //取案編,客編,客戶手機
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    this.queryCusMobile();

    //取sms樣板下拉
    this.childscn19Service.getSysTypeCode('SMS_SET').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.smsSetCode.push({ value: codeNo, viewValue: desc })
      }
    });

    //取補件項目下拉
    this.childscn19Service.getSysTypeCode('RESCAN_ITEM').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.rescanItemCode.push({ value: codeNo, viewValue: desc, })
      }
    });

    //取補件原因下拉
    this.childscn19Service.getSysTypeCode('RESCAN_TYPE').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.rescanTypeCode.push({ value: codeNo, viewValue: desc })
      }
    });
    this.getRescanList();         //取該案件補件資訊
    this.getSmsList(this.applno); //取該案件簡訊發送資訊
  }

  //新增補件資訊
  public async rescan(): Promise<void> {
    if (this.restartDate == null) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入日期" }
      });
    } else if (this.rescanType == null) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入補件原因" }
      });
    } else if (this.rescanItem == null) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入補件項目" }
      });
    } else {
      let jsonObject: any = {};
      jsonObject['applno'] = this.applno;
      jsonObject['rescanType'] = this.rescanType;
      jsonObject['rescanContent'] = this.rescanContent;
      jsonObject['rescanItem'] = this.rescanItem;
      jsonObject['restartDate'] = this.pipe.transform(this.restartDate, 'yyyy-MM-dd');
      let msgStr: string = "";
      msgStr = await this.childscn19Service.addRescan(jsonObject);
      if (msgStr == 'success') {
        msgStr = '儲存成功！'
      }
      this.dialog.open(ConfirmComponent, {
        data: { msgStr: msgStr }
      });
      this.getRescanList();
    }
    return;
  }

  //發送簡訊檔
  public async addSms(): Promise<void> {
    this.messageContent = this.content;
    if (this.realSmsTime == null) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入日期" }
      });
    } else if (this.realSmsTime != null && this.mytime == null) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入時間" }
      });
    } else if (this.content == null) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入SMS內容" }
      });
    } else if (this.content != null) {
      if (this.content.indexOf('徵審人員修改') >= 0) {
        const confirmDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: "不得有徵審人員修改字樣" }
        });
      }
      else {
        this.block = true;
        let jsonObject: any = {};
        jsonObject['applno'] = this.applno;
        jsonObject['messageContent'] = this.messageContent;
        jsonObject['empno'] = localStorage.getItem("empNo");
        jsonObject['mobile'] = this.mobile;
        jsonObject['realSmstime'] = this.pipe.transform(this.realSmsTime, 'yyyy-MM-dd') + this.pipe.transform(this.mytime, ' HH:mm');
        let msgStr: string = "";
        msgStr = await this.childscn19Service.addSms(jsonObject);
        if (msgStr == 'success') {
          msgStr = '儲存成功！';
          this.block = false;
        }
        this.dialog.open(ConfirmComponent, {
          data: { msgStr: msgStr }
        });
        this.getSmsList(this.applno);
      }
      return;
    }
  }
  //從客戶資訊查詢客戶手機
  queryCusMobile() {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['custId'] = this.cuid;
    this.childscn5Service.getCustomerInfoSearch(jsonObject).subscribe(data => {
      this.mobile = data.rspBody.items[0].cuMTel;
    });
  }

  //取該案件補件資訊
  getRescanList() {
    this.childscn19Service.getRescanSearch().subscribe(data => {
      this.rescanDataSource = data.rspBody.items;
    })
  };

  //取該案件簡訊發送資訊
  getSmsList(applno: string) {
    this.childscn19Service.getSmsSearch(applno).subscribe(data => {
      this.smsDataSource = data.rspBody.items;
    })
  };

  //刪除該案件補件資訊
  delRescan(ID: string) {
    let msg = '';
    this.childscn19Service.deleteRescanByRowid(ID).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == '刪除成功') { this.getRescanList(); }
    }, 1500);
  }

  // 選取sms模板後會將內容代入sms內容
  changeSelect(smsSet: string) {
    this.childscn19Service.getSmsContent(smsSet).subscribe(data => {
      this.content = data.rspBody[0].codeTag;
    })
  };

  // 離開該彈窗
  cancel(): void {
    this.dialogRef.close();
  }
}

