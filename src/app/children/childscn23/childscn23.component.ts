import { logging } from 'protractor';
import { Sort } from '@angular/material/sort';
import { Component, NgModule, OnInit } from '@angular/core';
import { Childscn23Service } from './childscn23.service';
import { FormatNumberPipe, ToNumberPipe } from '../../pipe/customFormatterPipe';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'

interface sysCode {
  value: string;
  viewValue: string;
}
//jay 月付金試算

@Component({
  selector: 'app-childscn23',
  templateUrl: './childscn23.component.html',
  styleUrls: ['./childscn23.component.css', '../../../assets/css/child.css'],


})

export class Childscn23Component implements OnInit {
  constructor(private childscn23Service: Childscn23Service,
    public dialog: MatDialog) { }
  applno: string;
  i = true;
  gold421: string;//BAM421預設本金
  gold029: string;//BAM429預設本金
  gold: string//信用卡
  addgold421: string;//BAM421預設本金
  addgold029: string;//BAM429預設本金
  addgold: string//信用卡
  ttt: string;
  suject: string;
  sujecttwo: string;
  sysCode: any[] = [];
  Content: any[] = [];
  InterestRate: string;//利率
  Years: string;//年數
  NumberofPeriods: string;//期數
  InterestRateTwo: string;//利率
  YearsTwo: string;//年數
  NumberofPeriodsTwo: string;//期數
  Monthly421 = 0;//BAM421月付金
  Monthly029 = 0;//BAM029月付金
  Monthlycc = 0;//信用卡付月金
  Monthlytest = 0;//信用卡付月金
  jsonObject3: any = {};
  jsonObject: any = {};
  jsonObject1: any = {};
  one: any[] = [];//裝一開始的資料表
  AddData: any;
  checkboxAny: any[] = [];//判斷是否回傳
  seveData: any[] = [];
  search: string;
  // Source = new MatTableDataSource<any>() //產品Table
  x: string;

  private stepName: string;
  private page: string;
  fmData_B = new MatTableDataSource<any>();//DBR收支表資料 徵信
  fmData_C = new MatTableDataSource<any>();//DBR收支表資料 授信
  fmData_M = new MatTableDataSource<any>();//DBR收支表資料 產生合約前回查

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.stepName = sessionStorage.getItem('stepName');
    this.page = sessionStorage.getItem('page');
    this.dropdown();
    this.set();
    this.getDBR_DTI_B();
    // this.getDBR_DTI_C();
    this.getDBR_DTI_M();
  }
  getOptionDesc(option: sysCode[], codeVal: string): string {
    for (const data of option) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
  add()//新增一筆
  {

    if (this.i == true) {
      this.AddData = { APPLNO: this.applno, ACCOUNT_CODE: '', ID: '1', MONTHLY_PAY_421: '', MONTHLY_PAY_029: '', MONTHLY_PAY_CC: '', CAL_RATE: '', CAL_YEARS: '', CAL_PERIOD: '', CONTRACT_AMT_421: '', CONTRACT_AMT_029: '', CONTRACT_AMT_CC: '' };
      this.one.push(this.AddData)
      this.i = false;

    }
  }
  set() {

    let url = 'f01/childscn23action1'
    this.jsonObject3['applno'] = this.applno;
    this.childscn23Service.AddUpDel(url, this.jsonObject3).subscribe(data => {
      if (data.rspBody.items.length > 0)
      {
        this.one = data.rspBody.items
        this.suject = data.rspBody.items[0].ACCOUNT_CODE;
        this.limit2();
      }
      else
      {
        this.one = data.rspBody.items
      }
    })
  }

  // limit(x: string)
  // {
  //   x=x.replace(/\D/g,'')
  //   if(x.length>0)
  //   {
  //     x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //   }

  // }
  limit(x: string, id: string, name: string) {
    x = x.replace(/\D/g, '')
    if (x.length > 0) {
      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    for (const item of this.one) {
      if (item.ID == id) {
        switch (name) {
          case "gold421":
            item.CONTRACT_AMT_421 = x;
            break;
          case "gold029":
            item.CONTRACT_AMT_029 = x;
            break;
          case "gold":
            item.CONTRACT_AMT_CC = x;
            break;
        }

      }
    }

  }
  limit2() {

    for (const item of this.one) {
      item.MONTHLY_PAY_421 = item.MONTHLY_PAY_421 != undefined ? (item.MONTHLY_PAY_421 + "").replace(/\B(?=(\d{3})+(?!\d))/g, ',') : item.MONTHLY_PAY_421;
      item.MONTHLY_PAY_029 = item.MONTHLY_PAY_029 != undefined ? (item.MONTHLY_PAY_029 + "").replace(/\B(?=(\d{3})+(?!\d))/g, ',') : item.MONTHLY_PAY_029;
      item.MONTHLY_PAY_CC = item.MONTHLY_PAY_CC != undefined ? (item.MONTHLY_PAY_CC + "").replace(/\B(?=(\d{3})+(?!\d))/g, ',') : item.MONTHLY_PAY_CC;
      item.CONTRACT_AMT_421 = item.CONTRACT_AMT_421 != undefined ? (item.CONTRACT_AMT_421 + "").replace(/\B(?=(\d{3})+(?!\d))/g, ',') : item.CONTRACT_AMT_421;
      item.CONTRACT_AMT_029 = item.CONTRACT_AMT_029 != undefined ? (item.CONTRACT_AMT_029 + "").replace(/\B(?=(\d{3})+(?!\d))/g, ',') : item.CONTRACT_AMT_029;
      item.CONTRACT_AMT_CC = item.CONTRACT_AMT_CC != undefined ? (item.CONTRACT_AMT_CC + "").replace(/\B(?=(\d{3})+(?!\d))/g, ',') : item.CONTRACT_AMT_CC;
      item.CAL_RATE = item.CAL_RATE * 100 + "%";
    }

  }
  dropdown() {
    let url = 'f01/childscn23action2';
    this.childscn23Service.getdropdown(url).subscribe(data => {

      for (const jsonObj of data.rspBody.items) {
        const codeNo = jsonObj['ACT_CODE'];
        const code = jsonObj['ACCOUNT_CODE']
        this.sysCode.push({ value: code, viewValue: codeNo })
      }
      this.Content = data.rspBody.items;

    })
  }
  sujectSelect(ID: string) {
    for (const jsonObj of this.Content) {
      for (const item of this.one) {
        if (item.ID == ID) {
          if (item.ACCOUNT_CODE == jsonObj.ACCOUNT_CODE) {
            item.CAL_RATE = jsonObj.DEFAULT_RATE * 100 + "%";
            item.CAL_YEARS = jsonObj.DEFAULT_YEARS;
            item.CAL_PERIOD = jsonObj.DEFAULT_PERIOD;
          }
        }
      }
    }
  }

  sujectSelectTwo()//新增
  {
    for (const jsonObj of this.Content) {
      if (jsonObj['ACT_CODE'] == this.sujecttwo) {
        this.InterestRateTwo = jsonObj['DEFAULT_RATE'];
        this.YearsTwo = jsonObj['EFAULT_YEARS'];
        this.NumberofPeriodsTwo = jsonObj['DEFAULT_PERIOD'];
      }
    }
  }
  seve()//儲存
  {
    let url = 'f01/childscn23action3'

    for (const ii of this.checkboxAny) {
      for (const item of this.one) {
        this.jsonObject = {};
        if (ii == item.ID) {
          if (item.ID == 1) {
            this.jsonObject['rowId'] = '';
          }
          else {
            this.jsonObject['rowId'] = item.ID;
          }

          if (item.ACCOUNT_CODE == 'CC') {
            this.jsonObject['applno'] = item.APPLNO;
            this.jsonObject['accountCode'] = item.ACCOUNT_CODE;
            // jsonObject['rowId'] = item.ID;
            this.jsonObject['calRate'] = parseInt(item.CAL_RATE) / 100;
            this.jsonObject['contractAmt421'] = "0";
            this.jsonObject['contractAmt029'] = "0";
            this.jsonObject['contractAmtCc'] = item.CONTRACT_AMT_CC != "" ? this.Cut(item.CONTRACT_AMT_CC) : "0";
            this.seveData.push(this.jsonObject);
          }
          else {
            this.jsonObject['applno'] = item.APPLNO;
            this.jsonObject['accountCode'] = item.ACCOUNT_CODE;
            // jsonObject['rowId'] = item.ID;
            this.jsonObject['calRate'] = parseInt(item.CAL_RATE) / 100;
            this.jsonObject['calYears'] = item.CAL_YEARS != undefined ? item.CAL_YEARS : "0";
            if (item.CAL_PERIOD != undefined) {
              this.jsonObject['calPeriod'] = item.CAL_PERIOD != undefined ? item.CAL_PERIOD : "0";
            }
            this.jsonObject['contractAmt421'] = item.CONTRACT_AMT_421 != "" ? this.Cut(item.CONTRACT_AMT_421) : "0";
            this.jsonObject['contractAmt029'] = item.CONTRACT_AMT_029 != "" ? this.Cut(item.CONTRACT_AMT_029) : "0";
            this.jsonObject['contractAmtCc'] = "0";
            this.seveData.push(this.jsonObject);
          }
        }
      }
    }
    this.jsonObject1['dataList'] = this.seveData
    this.childscn23Service.AddUpDel(url, this.jsonObject1).subscribe(data => {
      if (data.rspCode == '0000') {
        this.set();
        this.checkboxAny = [];
        this.seveData = [];
        this.Monthly421 = 0;//BAM421月付金
        this.Monthly029 = 0;//BAM029月付金
        this.Monthlycc = 0;//信用卡付月金
      }
    })
    for (const item of this.one) {
      if (item.ID == '1') {
        this.one.pop();
      }
    }
    this.i = true;
  }

  Cut(s: string)//處理千分位
  {
    if (s != null) {
      s = s.replace(/,/g, "")
    }

    return s
  }
  del()//刪除
  {
    let jsonObject: any = {};
    jsonObject['result'] = this.checkboxAny;
    let url = 'f01/childscn23action4';
    console.log(jsonObject)
    console.log(this.checkboxAny)
    this.childscn23Service.AddUpDel(url, jsonObject).subscribe(data => {
      console.log(data)
      if (data.rspMsg == '刪除成功') {
        this.set();
        alert('1')
        this.checkboxAny = []
        this.Monthly421 = 0;//BAM421月付金
        this.Monthly029 = 0;//BAM029月付金
        this.Monthlycc = 0;//信用卡付月金
      }
      else {
        this.dialog.open(ConfirmComponent, {
          data: { msgStr: "刪除失敗" }
        });
      }

    })

  }
  addcheckbox(check: boolean, z: string, amt029: string, amt421: string, amtcc: string) {

    if (check) {
      this.checkboxAny.push(z)
      this.Monthly421 = this.Monthly421 + parseInt(this.Cut(amt421 ? amt421 : "0"));//BAM421月付金
      this.Monthly029 = this.Monthly029 + parseInt(this.Cut(amt029 ? amt029 : "0"));//BAM029月付金
      this.Monthlycc = this.Monthlycc + parseInt(this.Cut(amtcc ? amtcc : "0"));//信用卡付月金

    }
    else {
      this.checkboxAny.splice(this.checkboxAny.indexOf(z), 1)
      this.Monthly421 = this.Monthly421 - parseInt(this.Cut(amt421 ? amt421 : "0"));//BAM421月付金
      this.Monthly029 = this.Monthly029 - parseInt(this.Cut(amt029 ? amt029 : "0"));//BAM029月付金
      this.Monthlycc = this.Monthlycc - parseInt(this.Cut(amtcc ? amtcc : "0"));//信用卡付月金
    }
  }
  data_number(p: number) {
    this.x = '';
    this.x = (p + "")
    if (this.x != null) {
      this.x = this.x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return this.x
  }
  test() {
    // Math.pow()
    console.log(this.checkboxAny)
  }


  //以下DBR用

  getSearch(): string {
    return this.search;
  }

  getstepName(): String {
    // 高階主管作業 APPLCreditL1
    // 授信作業 APPLCreditL2
    // 徵信作業 APPLCreditL3
    // 文審作業 APPLCreditL4
    // 偽冒案件 APPLFraud
    // 0查詢
    return this.stepName;
     //測試用
    //  return 'APPLCreditL2';
  }

  //判斷table是否顯示
  // 1文審 2徵信 3授信 4主管 5Fraud 6 申覆 8徵審後落人 9複審人員 0查詢
  getPage() {
    return this.page
    //測試用
    // return '8';
  }

  //取DBR收支表資料 徵信
  getDBR_DTI_B() {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10action4';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    //測試用
    // jsonObject['applno'] = '20210827E000';
    jsonObject['dssType'] = "Dss1";
    this.childscn23Service.getDate_Json(url, jsonObject).subscribe(data => {
      if (data.rspBody.length > 0) {
        this.fmData_B.data = data.rspBody

        this.fmData_B.data[0].unsdebt_AMT_501EX_B = this.fmData_B.data[0].unsdebt_AMT_501EX_B == null ? this.fmData_B.data[0].unsdebt_AMT_501EX : this.fmData_B.data[0].unsdebt_AMT_501EX_B;
        this.fmData_B.data[0].unsdebt_AMT_504EX_B = this.fmData_B.data[0].unsdebt_AMT_504EX_B == null ? this.fmData_B.data[0].unsdebt_AMT_504EX : this.fmData_B.data[0].unsdebt_AMT_504EX_B;
        this.fmData_B.data[0].unsdebt_AMTNEW_505EX_B = this.fmData_B.data[0].unsdebt_AMTNEW_505EX_B == null ? this.fmData_B.data[0].unsdebt_AMTNEW_505EX : this.fmData_B.data[0].unsdebt_AMTNEW_505EX_B;
        this.fmData_B.data[0].unsdebt_AMTNEW_029EX_B = this.fmData_B.data[0].unsdebt_AMTNEW_029EX_B == null ? this.fmData_B.data[0].unsdebt_AMTNEW_029EX : this.fmData_B.data[0].unsdebt_AMTNEW_029EX_B;
        this.fmData_B.data[0].unsdebt_824_RLLIMIT_B = this.fmData_B.data[0].unsdebt_824_RLLIMIT_B == null ? this.fmData_B.data[0].unsdebt_824_RLLIMIT : this.fmData_B.data[0].unsdebt_824_RLLIMIT_B;
        this.fmData_B.data[0].unsdebt_824_RLBAL_B = this.fmData_B.data[0].unsdebt_824_RLBAL_B == null ? this.fmData_B.data[0].unsdebt_824_RLBAL : this.fmData_B.data[0].unsdebt_824_RLBAL_B;
        this.fmData_B.data[0].unsdebt_824_ILBAL_B = this.fmData_B.data[0].unsdebt_824_ILBAL_B == null ? this.fmData_B.data[0].unsdebt_824_ILBAL : this.fmData_B.data[0].unsdebt_824_ILBAL_B;
        this.fmData_B.data[0].unsdebt_824_CCRBAL_B = this.fmData_B.data[0].unsdebt_824_CCRBAL_B == null ? this.fmData_B.data[0].unsdebt_824_CCRBAL : this.fmData_B.data[0].unsdebt_824_CCRBAL_B;
        this.fmData_B.data[0].unsdebt_NONJCIC_B = this.fmData_B.data[0].unsdebt_NONJCIC_B == null ? this.fmData_B.data[0].unsdebt_NONJCIC : this.fmData_B.data[0].unsdebt_NONJCIC_B;
        this.fmData_B.data[0].unsdebt_PAYAMT_029EX_B = this.fmData_B.data[0].unsdebt_PAYAMT_029EX_B == null ? this.fmData_B.data[0].unsdebt_PAYAMT_029EX : this.fmData_B.data[0].unsdebt_PAYAMT_029EX_B;

        this.fmData_B.data[0].mthpay_BAM421_B = this.fmData_B.data[0].mthpay_BAM421_B == null ? this.fmData_B.data[0].mthpay_BAM421 : this.fmData_B.data[0].mthpay_BAM421_B;
        this.fmData_B.data[0].mthpay_BAM029_B = this.fmData_B.data[0].mthpay_BAM029_B == null ? this.fmData_B.data[0].mthpay_BAM029 : this.fmData_B.data[0].mthpay_BAM029_B;
        this.fmData_B.data[0].mthpay_KRM048_B = this.fmData_B.data[0].mthpay_KRM048_B == null ? this.fmData_B.data[0].mthpay_KRM048 : this.fmData_B.data[0].mthpay_KRM048_B;
        this.fmData_B.data[0].mthpay_NONJCIC_B = this.fmData_B.data[0].mthpay_NONJCIC_B == null ? this.fmData_B.data[0].mthpay_NONJCIC : this.fmData_B.data[0].mthpay_NONJCIC_B;


        this.fmData_B.data[0].unsdebt_AMT_501EX_B = this.data_number2(this.fmData_B.data[0].unsdebt_AMT_501EX_B);
        this.fmData_B.data[0].unsdebt_AMT_504EX_B = this.data_number2(this.fmData_B.data[0].unsdebt_AMT_504EX_B);
        this.fmData_B.data[0].unsdebt_AMTNEW_505EX_B = this.data_number2(this.fmData_B.data[0].unsdebt_AMTNEW_505EX_B);
        this.fmData_B.data[0].unsdebt_AMTNEW_029EX_B = this.data_number2(this.fmData_B.data[0].unsdebt_AMTNEW_029EX_B);
        this.fmData_B.data[0].unsdebt_824_RLLIMIT_B = this.data_number2(this.fmData_B.data[0].unsdebt_824_RLLIMIT_B);
        this.fmData_B.data[0].unsdebt_824_RLBAL_B = this.data_number2(this.fmData_B.data[0].unsdebt_824_RLBAL_B);
        this.fmData_B.data[0].unsdebt_824_ILBAL_B = this.data_number2(this.fmData_B.data[0].unsdebt_824_ILBAL_B);
        this.fmData_B.data[0].unsdebt_824_CCRBAL_B = this.data_number2(this.fmData_B.data[0].unsdebt_824_CCRBAL_B);
        this.fmData_B.data[0].unsdebt_NONJCIC_B = this.data_number2(this.fmData_B.data[0].unsdebt_NONJCIC_B);
        this.fmData_B.data[0].unsdebt_PAYAMT_029EX_B = this.data_number2(this.fmData_B.data[0].unsdebt_PAYAMT_029EX_B);

        this.fmData_B.data[0].mthpay_BAM421_B = this.data_number2(this.fmData_B.data[0].mthpay_BAM421_B);
        this.fmData_B.data[0].mthpay_BAM029_B = this.data_number2(this.fmData_B.data[0].mthpay_BAM029_B);
        this.fmData_B.data[0].mthpay_KRM048_B = this.data_number2(this.fmData_B.data[0].mthpay_KRM048_B);
        this.fmData_B.data[0].mthpay_NONJCIC_B = this.data_number2(this.fmData_B.data[0].mthpay_NONJCIC_B);
        this.getDBR_DTI_C(true);
      }
      else{
        this.getDBR_DTI_C(false);
      }

    });
  }


  //去除符號中文
  data_number1(x: string) {
    if (x != null) {
      x = x.replace(/[^\d]/g, '');
      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return x
  }
  //去除符號中文 可負號
  data_number2(x: string) {
    if (x != null) {
      x = x.replace(/[^\d-]/g, '');
      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return x
  }

  //去除符號/中文 可負號 儲存用
  save_data_number(x: string) {
    if (x != null) {
      x = x.replace(/[^\d]/g, '');
    }
    return x
  }

  //去除符號/中文 可負號 儲存用
  save_data_number2(x: string) {
    if (x != null) {
      x = x.replace(/[^\d-]/g, '');
    }
    return x
  }

  //儲存 DBR收支表資料 徵信
  save_B() {
    if (this.fmData_B.data.length < 1) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '查無資料' }
      });
      return;
    }
    let msg = "";
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10action5';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    //測試用
    // jsonObject['applno'] = '20210827E000';
    // jsonObject['dssType'] = "Dss1";
    jsonObject['unsdebtAmt501Ex'] = this.save_data_number(this.fmData_B.data[0].unsdebt_AMT_501EX_B);
    jsonObject['unsdebtAmt504Ex'] = this.save_data_number(this.fmData_B.data[0].unsdebt_AMT_504EX_B);
    jsonObject['unsdebtAmtnew505Ex'] = this.save_data_number(this.fmData_B.data[0].unsdebt_AMTNEW_505EX_B);
    jsonObject['unsdebtAmtnew029Ex'] = this.save_data_number(this.fmData_B.data[0].unsdebt_AMTNEW_029EX_B);
    jsonObject['unsdebt824Rllimit'] = this.save_data_number(this.fmData_B.data[0].unsdebt_824_RLLIMIT_B);
    jsonObject['unsdebt824Rlbal'] = this.save_data_number(this.fmData_B.data[0].unsdebt_824_RLBAL_B);
    jsonObject['unsdebt824Ilbal'] = this.save_data_number(this.fmData_B.data[0].unsdebt_824_ILBAL_B);
    jsonObject['unsdebt824Ccrbal'] = this.save_data_number(this.fmData_B.data[0].unsdebt_824_CCRBAL_B);
    jsonObject['unsdebtNonjcic'] = this.save_data_number2(this.fmData_B.data[0].unsdebt_NONJCIC_B);
    jsonObject['unsdebtPayamt029Ex'] = this.save_data_number(this.fmData_B.data[0].unsdebt_PAYAMT_029EX_B);
    jsonObject['mthpayBam421'] = this.save_data_number(this.fmData_B.data[0].mthpay_BAM421_B);
    jsonObject['mthpayBam029'] = this.save_data_number(this.fmData_B.data[0].mthpay_BAM029_B);
    jsonObject['mthpayKrm048'] = this.save_data_number(this.fmData_B.data[0].mthpay_KRM048_B);
    jsonObject['mthpayNonjcic'] = this.save_data_number2(this.fmData_B.data[0].mthpay_NONJCIC_B);

    jsonObject['unsdebtAmt501Ex_C'] = this.save_data_number(this.fmData_B.data[0].unsdebt_AMT_501EX_C);
    jsonObject['unsdebtAmt504Ex_C'] = this.save_data_number(this.fmData_B.data[0].unsdebt_AMT_504EX_C);
    jsonObject['unsdebtAmtnew505Ex_C'] = this.save_data_number(this.fmData_B.data[0].unsdebt_AMTNEW_505EX_C);
    jsonObject['unsdebtAmtnew029Ex_C'] = this.save_data_number(this.fmData_B.data[0].unsdebt_AMTNEW_029EX_C);
    jsonObject['unsdebt824Rllimit_C'] = this.save_data_number(this.fmData_B.data[0].unsdebt_824_RLLIMIT_C);
    jsonObject['unsdebt824Rlbal_C'] = this.save_data_number(this.fmData_B.data[0].unsdebt_824_RLBAL_C);
    jsonObject['unsdebt824Ilbal_C'] = this.save_data_number(this.fmData_B.data[0].unsdebt_824_ILBAL_C);
    jsonObject['unsdebt824Ccrbal_C'] = this.save_data_number(this.fmData_B.data[0].unsdebt_824_CCRBAL_C);
    jsonObject['unsdebtNonjcic_C'] = this.save_data_number2(this.fmData_B.data[0].unsdebt_NONJCIC_C);
    jsonObject['unsdebtPayamt029Ex_C'] = this.save_data_number(this.fmData_B.data[0].unsdebt_PAYAMT_029EX_C);
    jsonObject['mthpayBam421_C'] = this.save_data_number(this.fmData_B.data[0].mthpay_BAM421_C);
    jsonObject['mthpayBam029_C'] = this.save_data_number(this.fmData_B.data[0].mthpay_BAM029_C);
    jsonObject['mthpayKrm048_C'] = this.save_data_number(this.fmData_B.data[0].mthpay_KRM048_C);
    jsonObject['mthpayNonjcic_C'] = this.save_data_number2(this.fmData_B.data[0].mthpay_NONJCIC_C);
    this.childscn23Service.getDate_Json(url, jsonObject).subscribe(data => {
      msg = data.rspMsg == "success" ? "儲存成功!" : "儲存失敗";
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msg }
      });
    });
  }


  //取DBR收支表資料 授信
  getDBR_DTI_C(key:boolean) {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10action4';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    //測試用
    // jsonObject['applno'] = '20210827E000';
    jsonObject['dssType'] = "Dss2";
    this.childscn23Service.getDate_Json(url, jsonObject).subscribe(data => {
      if (data.rspBody.length > 0) {
        this.fmData_C.data= key?this.fmData_C.data:data.rspBody; //key 判斷資料結構是否建立
        // this.fmData_C.data = data.rspBody

        // this.fmData_C.data[0].unsdebt_AMT_501EX_C = this.data_number2(this.fmData_C.data[0].unsdebt_AMT_501EX_C);
        // this.fmData_C.data[0].unsdebt_AMT_504EX_C = this.data_number2(this.fmData_C.data[0].unsdebt_AMT_504EX_C);
        // this.fmData_C.data[0].unsdebt_AMTNEW_505EX_C = this.data_number2(this.fmData_C.data[0].unsdebt_AMTNEW_505EX_C);
        // this.fmData_C.data[0].unsdebt_AMTNEW_029EX_C = this.data_number2(this.fmData_C.data[0].unsdebt_AMTNEW_029EX_C);
        // this.fmData_C.data[0].unsdebt_824_RLLIMIT_C = this.data_number2(this.fmData_C.data[0].unsdebt_824_RLLIMIT_C);
        // this.fmData_C.data[0].unsdebt_824_RLBAL_C = this.data_number2(this.fmData_C.data[0].unsdebt_824_RLBAL_C);
        // this.fmData_C.data[0].unsdebt_824_ILBAL_C = this.data_number2(this.fmData_C.data[0].unsdebt_824_ILBAL_C);
        // this.fmData_C.data[0].unsdebt_824_CCRBAL_C = this.data_number2(this.fmData_C.data[0].unsdebt_824_CCRBAL_C);
        // this.fmData_C.data[0].unsdebt_NONJCIC_C = this.data_number2(this.fmData_C.data[0].unsdebt_NONJCIC_C);
        // this.fmData_C.data[0].unsdebt_PAYAMT_029EX_C = this.data_number2(this.fmData_C.data[0].unsdebt_PAYAMT_029EX_C);

        // this.fmData_C.data[0].mthpay_BAM421_C = this.data_number2(this.fmData_C.data[0].mthpay_BAM421_C);
        // this.fmData_C.data[0].mthpay_BAM029_C = this.data_number2(this.fmData_C.data[0].mthpay_BAM029_C);
        // this.fmData_C.data[0].mthpay_KRM048_C = this.data_number2(this.fmData_C.data[0].mthpay_KRM048_C);
        // this.fmData_C.data[0].mthpay_NONJCIC_C = this.data_number2(this.fmData_C.data[0].mthpay_NONJCIC_C);

        //改版 放在一起
        // this.fmData_B.data = data.rspBody
        this.fmData_B.data[0].unsdebt_AMT_501EX_C = this.data_number2(data.rspBody[0].unsdebt_AMT_501EX_C);
        this.fmData_B.data[0].unsdebt_AMT_504EX_C = this.data_number2(data.rspBody[0].unsdebt_AMT_504EX_C);
        this.fmData_B.data[0].unsdebt_AMTNEW_505EX_C = this.data_number2(data.rspBody[0].unsdebt_AMTNEW_505EX_C);
        this.fmData_B.data[0].unsdebt_AMTNEW_029EX_C = this.data_number2(data.rspBody[0].unsdebt_AMTNEW_029EX_C);
        this.fmData_B.data[0].unsdebt_824_RLLIMIT_C = this.data_number2(data.rspBody[0].unsdebt_824_RLLIMIT_C);
        this.fmData_B.data[0].unsdebt_824_RLBAL_C = this.data_number2(data.rspBody[0].unsdebt_824_RLBAL_C);
        this.fmData_B.data[0].unsdebt_824_ILBAL_C = this.data_number2(data.rspBody[0].unsdebt_824_ILBAL_C);
        this.fmData_B.data[0].unsdebt_824_CCRBAL_C = this.data_number2(data.rspBody[0].unsdebt_824_CCRBAL_C);
        this.fmData_B.data[0].unsdebt_NONJCIC_C = this.data_number2(data.rspBody[0].unsdebt_NONJCIC_C);
        this.fmData_B.data[0].unsdebt_PAYAMT_029EX_C = this.data_number2(data.rspBody[0].unsdebt_PAYAMT_029EX_C);

        this.fmData_B.data[0].mthpay_BAM421_C = this.data_number2(data.rspBody[0].mthpay_BAM421_C);
        this.fmData_B.data[0].mthpay_BAM029_C = this.data_number2(data.rspBody[0].mthpay_BAM029_C);
        this.fmData_B.data[0].mthpay_KRM048_C = this.data_number2(data.rspBody[0].mthpay_KRM048_C);
        this.fmData_B.data[0].mthpay_NONJCIC_C = this.data_number2(data.rspBody[0].mthpay_NONJCIC_C);

      }
    });
  }

  // //儲存 DBR收支表資料 授信
  // save_C() {
  //   if(this.fmData_C.data.length<1){
  //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
  //       data: { msgStr: '查無資料' }
  //     });
  //     return;
  //   }
  //   let msg = "";
  //   const url = 'f01/childscn10action5';
  //   let jsonObject: any = {};
  //   jsonObject['applno'] = this.applno;
  //   //測試用
  //   // jsonObject['applno'] = '20210827E000';
  //   jsonObject['dssType'] = "Dss2";
  //   jsonObject['unsdebtAmt501Ex'] = this.save_data_number(this.fmData_C.data[0].unsdebt_AMT_501EX_C);
  //   jsonObject['unsdebtAmt504Ex'] = this.save_data_number(this.fmData_C.data[0].unsdebt_AMT_504EX_C);
  //   jsonObject['unsdebtAmtnew505Ex'] = this.save_data_number(this.fmData_C.data[0].unsdebt_AMTNEW_505EX_C);
  //   jsonObject['unsdebtAmtnew029Ex'] = this.save_data_number(this.fmData_C.data[0].unsdebt_AMTNEW_029EX_C);
  //   jsonObject['unsdebt824Rllimit'] = this.save_data_number(this.fmData_C.data[0].unsdebt_824_RLLIMIT_C);
  //   jsonObject['unsdebt824Rlbal'] = this.save_data_number(this.fmData_C.data[0].unsdebt_824_RLBAL_C);
  //   jsonObject['unsdebt824Ilbal'] = this.save_data_number(this.fmData_C.data[0].unsdebt_824_ILBAL_C);
  //   jsonObject['unsdebt824Ccrbal'] = this.save_data_number(this.fmData_C.data[0].unsdebt_824_CCRBAL_C);
  //   jsonObject['unsdebtNonjcic'] = this.save_data_number2(this.fmData_C.data[0].unsdebt_NONJCIC_C);
  //   jsonObject['unsdebtPayamt029Ex'] = this.save_data_number(this.fmData_C.data[0].unsdebt_PAYAMT_029EX_C);
  //   jsonObject['mthpayBam421'] = this.save_data_number(this.fmData_C.data[0].mthpay_BAM421_C);
  //   jsonObject['mthpayBam029'] = this.save_data_number(this.fmData_C.data[0].mthpay_BAM029_C);
  //   jsonObject['mthpayKrm048'] = this.save_data_number(this.fmData_C.data[0].mthpay_KRM048_C);
  //   jsonObject['mthpayNonjcic'] = this.save_data_number2(this.fmData_C.data[0].mthpay_NONJCIC_C);
  //   this.childscn23Service.getDate_Json(url, jsonObject).subscribe(data => {
  //     msg = data.rspMsg == "success" ? "儲存成功!" : "儲存失敗";
  //     const childernDialogRef = this.dialog.open(ConfirmComponent, {
  //       data: { msgStr: msg }
  //     });
  //   });
  // }

  //取DBR收支表資料 產生合約前回查 _M前端欄位改取_B
  getDBR_DTI_M() {

    const url = 'f01/childscn10action6';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    // 測試用
    // jsonObject['applno'] = '20210827E001';
    this.childscn23Service.getDate_Json(url, jsonObject).subscribe(data => {
      if (data.rspBody.length > 0) {
        this.fmData_M.data = data.rspBody

        this.fmData_M.data[0].unsdebt_AMT_501EX_B = this.fmData_M.data[0].unsdebt_AMT_501EX_B == null ? this.fmData_M.data[0].unsdebt_AMT_501EX : this.fmData_M.data[0].unsdebt_AMT_501EX_B;
        this.fmData_M.data[0].unsdebt_AMT_504EX_B = this.fmData_M.data[0].unsdebt_AMT_504EX_B == null ? this.fmData_M.data[0].unsdebt_AMT_504EX : this.fmData_M.data[0].unsdebt_AMT_504EX_B;
        this.fmData_M.data[0].unsdebt_AMTNEW_505EX_B = this.fmData_M.data[0].unsdebt_AMTNEW_505EX_B == null ? this.fmData_M.data[0].unsdebt_AMTNEW_505EX : this.fmData_M.data[0].unsdebt_AMTNEW_505EX_B;
        this.fmData_M.data[0].unsdebt_AMTNEW_029EX_B = this.fmData_M.data[0].unsdebt_AMTNEW_029EX_B == null ? this.fmData_M.data[0].unsdebt_AMTNEW_029EX : this.fmData_M.data[0].unsdebt_AMTNEW_029EX_B;
        this.fmData_M.data[0].unsdebt_824_RLLIMIT_B = this.fmData_M.data[0].unsdebt_824_RLLIMIT_B == null ? this.fmData_M.data[0].unsdebt_824_RLLIMIT : this.fmData_M.data[0].unsdebt_824_RLLIMIT_B;
        this.fmData_M.data[0].unsdebt_824_RLBAL_B = this.fmData_M.data[0].unsdebt_824_RLBAL_B == null ? this.fmData_M.data[0].unsdebt_824_RLBAL : this.fmData_M.data[0].unsdebt_824_RLBAL_B;
        this.fmData_M.data[0].unsdebt_824_ILBAL_B = this.fmData_M.data[0].unsdebt_824_ILBAL_B == null ? this.fmData_M.data[0].unsdebt_824_ILBAL : this.fmData_M.data[0].unsdebt_824_ILBAL_B;
        this.fmData_M.data[0].unsdebt_824_CCRBAL_B = this.fmData_M.data[0].unsdebt_824_CCRBAL_B == null ? this.fmData_M.data[0].unsdebt_824_CCRBAL : this.fmData_M.data[0].unsdebt_824_CCRBAL_B;
        this.fmData_M.data[0].unsdebt_NONJCIC_B = this.fmData_M.data[0].unsdebt_NONJCIC_B == null ? this.fmData_M.data[0].unsdebt_NONJCIC : this.fmData_M.data[0].unsdebt_NONJCIC_B;
        this.fmData_M.data[0].unsdebt_PAYAMT_029EX_B = this.fmData_M.data[0].unsdebt_PAYAMT_029EX_B == null ? this.fmData_M.data[0].unsdebt_PAYAMT_029EX : this.fmData_M.data[0].unsdebt_PAYAMT_029EX_B;

        this.fmData_M.data[0].unsdebt_AMT_501EX_B = this.data_number2(this.fmData_M.data[0].unsdebt_AMT_501EX_B);
        this.fmData_M.data[0].unsdebt_AMT_504EX_B = this.data_number2(this.fmData_M.data[0].unsdebt_AMT_504EX_B);
        this.fmData_M.data[0].unsdebt_AMTNEW_505EX_B = this.data_number2(this.fmData_M.data[0].unsdebt_AMTNEW_505EX_B);
        this.fmData_M.data[0].unsdebt_AMTNEW_029EX_B = this.data_number2(this.fmData_M.data[0].unsdebt_AMTNEW_029EX_B);
        this.fmData_M.data[0].unsdebt_824_RLLIMIT_B = this.data_number2(this.fmData_M.data[0].unsdebt_824_RLLIMIT_B);
        this.fmData_M.data[0].unsdebt_824_RLBAL_B = this.data_number2(this.fmData_M.data[0].unsdebt_824_RLBAL_B);
        this.fmData_M.data[0].unsdebt_824_ILBAL_B = this.data_number2(this.fmData_M.data[0].unsdebt_824_ILBAL_B);
        this.fmData_M.data[0].unsdebt_824_CCRBAL_B = this.data_number2(this.fmData_M.data[0].unsdebt_824_CCRBAL_B);
        this.fmData_M.data[0].unsdebt_NONJCIC_B = this.data_number2(this.fmData_M.data[0].unsdebt_NONJCIC_B);
        this.fmData_M.data[0].unsdebt_PAYAMT_029EX_B = this.data_number2(this.fmData_M.data[0].unsdebt_PAYAMT_029EX_B);
      }

    });
  }

  //儲存 DBR收支表資料 產生合約前回查
  save_M() {
    if (this.fmData_M.data.length < 1) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '查無資料' }
      });
      return;
    }
    let msg = "";
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10action7';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    //測試用
    // jsonObject['applno'] = '20210827E001';
    jsonObject['unsdebtAmt501Ex'] = this.save_data_number(this.fmData_M.data[0].unsdebt_AMT_501EX_B);
    jsonObject['unsdebtAmt504Ex'] = this.save_data_number(this.fmData_M.data[0].unsdebt_AMT_504EX_B);
    jsonObject['unsdebtAmtnew505Ex'] = this.save_data_number(this.fmData_M.data[0].unsdebt_AMTNEW_505EX_B);
    jsonObject['unsdebtAmtnew029Ex'] = this.save_data_number(this.fmData_M.data[0].unsdebt_AMTNEW_029EX_B);
    jsonObject['unsdebt824Rllimit'] = this.save_data_number(this.fmData_M.data[0].unsdebt_824_RLLIMIT_B);
    jsonObject['unsdebt824Rlbal'] = this.save_data_number(this.fmData_M.data[0].unsdebt_824_RLBAL_B);
    jsonObject['unsdebt824Ilbal'] = this.save_data_number(this.fmData_M.data[0].unsdebt_824_ILBAL_B);
    jsonObject['unsdebt824Ccrbal'] = this.save_data_number(this.fmData_M.data[0].unsdebt_824_CCRBAL_B);
    jsonObject['unsdebtNonjcic'] = this.save_data_number2(this.fmData_M.data[0].unsdebt_NONJCIC_B);
    jsonObject['unsdebtPayamt029Ex'] = this.save_data_number(this.fmData_M.data[0].unsdebt_PAYAMT_029EX_B);

    this.childscn23Service.getDate_Json(url, jsonObject).subscribe(data => {
      msg = data.rspMsg == "success" ? "儲存成功!" : "儲存失敗";
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msg }
      });
    });
  }

}
