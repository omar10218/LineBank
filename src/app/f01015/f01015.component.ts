import { DatePipe } from '@angular/common';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { OptionsCode } from '../interface/base';
import { F01015Service } from './f01015.service';
import { FormControl, Validators } from '@angular/forms';

interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f01015',
  templateUrl: './f01015.component.html',
  styleUrls: ['./f01015.component.css', '../../assets/css/f01.css']
})
export class F01015Component implements OnInit {
  nationalId: string; //身分證字號
  custId: string; //customer_ID
  targetCustSource = []; //解凍降額Table
  creditMainSource = []; //貸後管理紀錄Table
  page: string         //頁面

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  levelNo: any; //層級
  YNCode: OptionsCode[] = []; //通知客戶
  reasonCode: sysCode[] = []; //執行原因
  reasonDetailCode: sysCode[] = []; //執行細項
  limitCode: sysCode[] = []; //額度號
  limit: sysCode[] = [] //
  frozenList = [] //
  contactCode: sysCode[] = [
    { value: '', viewValue: '請選擇' },
    { value: '1', viewValue: '電話' },
    { value: '2', viewValue: '山竹簡訊' },
    { value: '3', viewValue: '其他' },
  ];//通知方式
  bossCreditCode: sysCode[] = [
    { value: '', viewValue: '請選擇' },
    { value: 'Y', viewValue: '同意' },
    { value: 'N', viewValue: '不同意' },
  ];//主管核決
  executeCode: sysCode[] = [
    { value: '', viewValue: '請選擇' },
    { value: 'FRZ', viewValue: 'FRZ' },
    { value: 'DWN', viewValue: 'DWN' },
    { value: 'HLD', viewValue: 'HLD' }
  ];//執行策略
  YNValue: string = '';//通知客戶值
  mobile: string//行動電話
  executeValue: string = '';//執行措施策略值
  reasonValue: string = ''//執行原因值
  reasonDetail: string = ''//執行細項值
  limitNo: string = ''//額度號值
  contact: string = ''//通知方式值
  contactContent: string//通知內容值
  reserveLimit: string //預佔額度
  creditMemo: string //本次執行說明
  creditTime: any//本次執行時間
  creditEmpno: any//執行員編
  bossCreditValue: string//主管核決值
  bossContent: string//主管覆核值
  bossTime: any//主管覆核時間
  bossEmpno: any//主管覆核員編
  useId: string //員編
  x: string
  applno: string //案編
  msg: string//訊息
  sort: string;

  constructor(
    private f01015Service: F01015Service,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.sort = 'ascend';
    this.applno = sessionStorage.applno; //案編
    // if (this.applno != null) {
    //   this.getTargetCustList();
    // }
    this.custId = sessionStorage.customerId; //主管帶customer_ID
    this.reasonValue = sessionStorage.reasonCode; //主管帶執行原因
    this.executeValue = sessionStorage.executeType; //主管帶執行策略
    this.creditEmpno = sessionStorage.creditEmpno; //主管帶本次執行員編
    this.reasonDetail = sessionStorage.reasonDetail; //主管帶執行細項
    this.limitNo = sessionStorage.limitNo; //主管帶額度號
    this.YNValue = sessionStorage.contactYn; //主管帶通知客戶
    this.contact = sessionStorage.contactType; //主管帶通知方式
    this.contactContent = sessionStorage.contactContent; //主管帶通知內容
    this.creditMemo = sessionStorage.creditMemo; //主管帶creditMemo
    this.mobile = sessionStorage.mobile; //mobile
    if (this.executeValue == 'HLD') {
      this.reserveLimit = sessionStorage.reserveLimit; //主管帶預佔額度
    }


    this.page = sessionStorage.getItem("page");
    if (this.page == '16') {
      this.creditTime = this.datePipe.transform(new Date(sessionStorage.creditTime), 'yyyy-MM-dd HH:mm');    //主管帶本次執行時間
      this.changereasonDetail()
      this.getTargetCustList();
      // this.getlimitCode(this.executeValue)

    } else {

    }
    this.useId = localStorage.getItem("empNo") //進入員編
    this.getYNresult();
    this.getReason();
    this.reasonValue = '';
    this.reasonDetail = '';
    this.executeValue = '';
    this.YNValue = '';
    this.limitNo = '';
    this.contact = '';
  }

  formControl = new FormControl('', [
    Validators.required
  ]);
  //欄位驗證
  getErrorMessage() {
    return this.formControl.hasError('required') ? '此欄位必填!' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  getTargetCustList() {
    if ((this.nationalId == null || this.nationalId == '') && (this.custId == null || this.custId == '')) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入一項查詢項目" }
      });
    } else {

      let jsonObject: any = {};
      jsonObject['nationalId'] = this.nationalId
      jsonObject['custId'] = this.custId

      this.f01015Service.getImpertmentParameter(jsonObject).subscribe(data => {


        if (data.rspBody == null) {
          let msg = "";
          msg = data.rspMsg
          const confirmDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: data.rspMsg }
          });
        }
        else {
          console.log(data)
          this.targetCustSource = data.rspBody.items
          this.creditMainSource = data.rspBody.creditMainlist
        }

      })
    }
  }

  getYNresult() {
    this.YNCode.push({ value: '', viewValue: '請選擇' })
    this.f01015Service.getSysTypeCode('YN').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.YNCode.push({ value: codeNo, viewValue: desc })
      }

    });
  }
  //取額度號下拉
  getlimitCode(value: string) {
    let jsonObject: any = {};
    // this.limitNo = '';
    this.limitCode = [];
    jsonObject['nationalId'] = this.nationalId
    jsonObject['custId'] = this.custId
    if (value == 'FRZ' || value == 'DWN') {
      this.f01015Service.getImpertmentParameter(jsonObject).subscribe(data => {
        console.log(data)
        this.limitCode.push({ value: '', viewValue: '請選擇' })
        for (const jsonObj of data.rspBody.limitNoList) {
          const codeNo = jsonObj;
          const desc = jsonObj;
          this.limitCode.push({ value: codeNo, viewValue: desc });
        }
        console.log(this.limitCode)
      })

    }
    else {

      this.f01015Service.getImpertmentParameter2(jsonObject).subscribe(data => {
        console.log(data)
        for (const row of data.rspBody.items) {
          const codeNo = row.limitNo;
          const desc = row.limitNo;
          this.limit.push({ value: codeNo, viewValue: desc })
        }
        for (const row of this.targetCustSource) {
          console.log(row.limitNo)
          for (const data of this.limit) {
            console.log(this.limit)
            if (row.limitNo == data.value) {

              this.limitCode.push({ value: data.value, viewValue: data.value });
            }
            console.log(this.limitCode)
          }
        }
      })
      this.limitCode = []

    }
  }
  //輸入加千分位
  data_number(p: string) {
    console.log(p);
    p = p.replace(/,/g, "")
    if (p != null) {
      p = p.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    this.reserveLimit = p;

  }
  //儲存前處理千分位
  Cut(s: string) {
    if (s != null) {
      s = s.replace(/,/g, "")
    }

    return s
  }

  //本次原因執行取得中文
  test(key: string) {
    for (const row of this.reasonCode) {
      if (key == row.value) {
        return row.viewValue
      }
    }
  }

  //取本次執行原因下拉
  getReason() {
    let jsonObject: any = {};
    this.reasonCode.push({ value: '', viewValue: '請選擇' })
    this.f01015Service.getReturn('f01/f01015', jsonObject).subscribe(data => {

      for (const jsonObj of data.rspBody.adrCodelist) {
        const codeNo = jsonObj.reasonCode;
        const desc = jsonObj.reasonDesc;
        this.reasonCode.push({ value: codeNo, viewValue: desc });
      }
    });
  }

  //取本次執行原因細項下拉
  changereasonDetail() {
    let jsonObject: any = {};
    this.reasonDetail = '';
    jsonObject['reasonCode'] = this.reasonValue
    this.reasonDetailCode = [];
    this.executeCode = [];
    // this.reasonDetail = "";
    this.reasonDetailCode.push({ value: '', viewValue: '請選擇' })
    this.f01015Service.getReturn('f01/f01015action2', jsonObject).subscribe(data => {

      for (const jsonObj of data.rspBody.items) {
        const codeNo = jsonObj.reasonCode;
        const desc = jsonObj.reasonDesc;
        this.reasonDetailCode.push({ value: codeNo, viewValue: desc });

      }
    });
    if (this.reasonValue == 'A' || this.reasonValue == 'C') {
      return this.executeCode = [
        { value: '', viewValue: '請選擇' },
        { value: 'FRZ', viewValue: 'FRZ' },

      ];

    }
    else if (this.reasonValue == 'B' || this.reasonValue == 'D') {
      return this.executeCode = [
        { value: '', viewValue: '請選擇' },
        { value: 'HLD', viewValue: 'HLD' },

      ];
    } else {
      return this.executeCode = [
        { value: '', viewValue: '請選擇' },
        { value: 'DWN', viewValue: 'DWN' },

      ];
    }
  }

  //取額度號下拉
  getlimitNo() {
    // let jsonObject: any = {};
    // this.reasonDetailCode = [];
    // this.reasonDetail = "";
  }

  //+逗號
  toCurrency(amount: number) {
    this.x = '';
    this.x = (amount + "")
    if (this.x != null) {
      this.x = this.x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return this.x
    // return amount != null ? amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : amount;
  }


  //主管送出
  save() {
    let jsonObject: any = {};
    jsonObject['creditEmpno'] = this.useId
    jsonObject['personMainData'] = this.targetCustSource
    jsonObject['reasonCode'] = this.reasonValue //本次執行原因
    jsonObject['reasonDetail'] = this.reasonDetail //本次執行原因細項
    jsonObject['custId'] = this.custId
    jsonObject['excuteType'] = this.executeValue //本次執行措施策略
    jsonObject['limitNo'] = this.limitNo //選擇額度號
    jsonObject['reserveLimit'] = this.reserveLimit != "" ? this.Cut(this.reserveLimit) : "0"; //預佔額度
    jsonObject['contactYn'] = this.YNValue //通知客戶
    jsonObject['contactType'] = this.contact //通知方式
    jsonObject['contactContent'] = this.contactContent //通知內容
    jsonObject['creditMemo'] = this.creditMemo //本次執行說明
    jsonObject['mobile'] = this.mobile //本次執行說明

    let msg: string = "";
    this.f01015Service.update(jsonObject).subscribe(data => {
      console.log(data)
      msg = data.rspMsg

      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msg }
      });

    })
    setTimeout(() => {
      this.clear()
    }, 3000);
  }

  //主管覆核
  managerSave() {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno
    jsonObject['custId'] = this.custId
    jsonObject['reasonDesc'] = this.test(this.reasonValue) //本次執行原因中文
    jsonObject['bossContent'] = this.bossContent //主管覆核
    jsonObject['bossCredit'] = this.bossCreditValue //主管核決
    jsonObject['bossEmpno'] = this.useId //主管員編
    jsonObject['reserveLimit'] = this.reserveLimit //預佔額度
    let msg = "";
    this.f01015Service.update2(jsonObject).subscribe(data => {
      console.log(data)
      msg = data.rspMsg
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msg }
      });
      this.router.navigate(['./F01016']);
    })

  }

  //清除
  clear() {
    this.targetCustSource = null;
    this.creditMainSource = null;
    this.nationalId = "";
    this.custId = "";
    this.reasonValue = "";
    this.reasonDetail = "";
    this.executeValue = "";
    this.limitNo = "";
    this.reserveLimit = null;
    this.YNValue = "";
    this.contact = "";
    this.contactContent = "";
    this.creditTime = "";
    this.creditEmpno = "";
    this.creditMemo = "";
  }

  //透過案編跳轉至複審
  toCalloutPage(applno: string) {
    sessionStorage.setItem('applno', applno);
    sessionStorage.setItem('search', 'Y');
    sessionStorage.setItem('winClose', 'N');
    sessionStorage.setItem('level', '3');
    // 1文審 2徵信 3授信 4主管 5Fraud 7授信複合 8徵審後落人 9複審人員 10複審主管 0申請查詢 02補件資訊查詢 03複審案件查詢 05歷史案件查詢 07客戶案件查詢
    sessionStorage.setItem('page', '2');
    this.router.navigate(['./F01009/F01009SCN1/CHILDBWSCN1']);
  }

  //排序
  sortChange(e: string, param: string) {
    this.sort = '';
    console.log(param)
    console.log(e)
    switch (param) {
      case " levelNo":
        this.targetCustSource = e === 'ascend' ? this.targetCustSource.sort(
          (a, b) => a.levelNo.localeCompare(b.levelNo)) : this.targetCustSource.sort((a, b) => b.levelNo.localeCompare(a.levelNo))
        break
    }

  }
}
