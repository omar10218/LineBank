import { DatePipe } from '@angular/common';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { OptionsCode } from '../interface/base';
import { F01015Service } from './f01015.service';

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
  YNCode: OptionsCode[] = []; //通知客戶
  reasonCode: sysCode[] = []; //執行原因
  reasonDetailCode: sysCode[] = []; //執行細項
  limitCode: sysCode[] = []; //額度號
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
  YNValue: string;//通知客戶值
  executeValue: string;//執行措施策略值
  reasonValue: string;//執行原因值
  reasonDetail: string;//執行細項值
  limitNo: string//額度號值
  contact: string//通知方式值
  contactContent: string//通知內容值
  reserveLimit: number//預佔額度
  creditMemo: string //本次執行說明
  creditTime: any//本次執行時間
  creditEmpno: any//執行員編
  bossCreditValue: string//主管核決值
  bossContent: string//主管覆核值
  bossTime: any//主管覆核時間
  bossEmpno: any//主管覆核員編

  x: string
  constructor(
    private f01015Service: F01015Service,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.page = sessionStorage.getItem("page");
    console.log(this.page)
    this.getYNresult();
    this.getReason();
    this.reasonValue = ''
    this.reasonDetail = ''
    this.YNValue = '';
    this.executeValue = '';
    this.limitNo = '';
    this.bossCreditValue = '';
    this.contact = '';

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
        console.log(data)
        this.limitCode.push({ value: '', viewValue: '請選擇' })
        for (const jsonObj of data.rspBody.limitNoList) {
          const codeNo = jsonObj;
          const desc = jsonObj;
          this.limitCode.push({ value: codeNo, viewValue: desc });
        }

        this.targetCustSource = data.rspBody.items
        this.creditMainSource = data.rspBody.creditMainlist
        console.log(data.rspBody.creditMainlist)
      })
    }
  }

  getYNresult() {
    this.f01015Service.getSysTypeCode('YN').subscribe(data => {
      this.YNCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.YNCode.push({ value: codeNo, viewValue: desc })
      }

    });
  }

  //取本次執行原因下拉
  getReason() {
    let jsonObject: any = {};
    this.f01015Service.getReturn('f01/f01015', jsonObject).subscribe(data => {
      this.reasonCode.push({ value: '', viewValue: '請選擇' })
      console.log(data)
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

    jsonObject['reasonCode'] = this.reasonValue
    this.reasonDetailCode = [];
    this.reasonDetail = "";
    this.f01015Service.getReturn('f01/f01015action2', jsonObject).subscribe(data => {
      this.reasonDetailCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.items) {
        const codeNo = jsonObj.reasonCode;
        const desc = jsonObj.reasonDesc;
        this.reasonDetailCode.push({ value: codeNo, viewValue: desc });
      }

    });
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


  //儲存
  save() {
    let jsonObject: any = {};
    jsonObject['personMainData']=this.targetCustSource
    jsonObject['reasonCode'] = this.reasonValue //本次執行原因
    jsonObject['reasonDetail'] = this.reasonDetail //本次執行原因細項
    jsonObject['custId'] = this.custId 
    jsonObject['executeType'] = this.executeValue //本次執行措施策略
    jsonObject['limitNo'] = this.limitNo //選擇額度號
    jsonObject['reserveLimit'] = this.reserveLimit //預佔額度
    jsonObject['contactYn'] = this.YNValue //通知客戶
    jsonObject['contactType'] = this.contact //通知方式
    jsonObject['contactContent'] = this.contactContent //通知內容
    jsonObject['creditMemo'] = this.creditMemo //本次執行說明
    // jsonObject['bossCredit'] = this.bossCreditValue //主管核決
    // jsonObject['bossContent'] = this.bossContent //主管覆核

    this.f01015Service.update(jsonObject).subscribe(data => {
      console.log(data)
    })
  }

  //清除
  clear() {
    this.targetCustSource = null;
    this.creditMainSource = null;
    this.nationalId = "";
    this.custId = "";
    this.reasonValue="";
    this.reasonDetail="";
    this.executeValue="";
    this.limitNo="";
    this.reserveLimit=null;
    this.YNValue="";
    this.contact="";
    this.contactContent="";
    this.creditTime="";
    this.creditEmpno="";
    this.creditMemo="";
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
}
