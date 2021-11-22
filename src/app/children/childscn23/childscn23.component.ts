import { logging } from 'protractor';
import { Sort } from '@angular/material/sort';
import { Component, NgModule, OnInit } from '@angular/core';
import { Childscn23Service } from './childscn23.service';
import { FormatNumberPipe, ToNumberPipe } from '../../pipe/customFormatterPipe';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
// import {MatTableDataSource} from '@angular/material/table'

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
  jsonObject1:any = {};
  one: any[] = [];//裝一開始的資料表
  AddData: any;
  checkboxAny: any[] = [];//判斷是否回傳
  seveData: any[] = [];
  // Source = new MatTableDataSource<any>() //產品Table
  x: string;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.dropdown();
    this.set();
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
      this.one = data.rspBody.items
      this.suject = data.rspBody.items[0].ACCOUNT_CODE;
      this.limit2();
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

    for (const ii of this.checkboxAny)
    {
      for (const item of this.one)
      {
        this.jsonObject = {};
        if (ii == item.ID)
        {
          if(item.ID == 1)
          {
            this.jsonObject['rowId'] ='';
          }
          else
          {
            this.jsonObject['rowId'] = item.ID;
          }

          if (item.ACCOUNT_CODE == 'CC')
           {
            console.log(item.CAL_YEARS)
            console.log(item.CAL_PERIOD)
            this.jsonObject['applno'] = item.APPLNO;
            this.jsonObject['accountCode'] = item.ACCOUNT_CODE;
            // jsonObject['rowId'] = item.ID;
            this.jsonObject['calRate'] = parseInt(item.CAL_RATE) / 100;
            this.jsonObject['contractAmt421'] = "0";
            this.jsonObject['contractAmt029'] = "0";
            this.jsonObject['contractAmtCc'] = item.CONTRACT_AMT_CC != "" ? this.Cut(item.CONTRACT_AMT_CC) : "0";
            this.seveData.push(this.jsonObject);
          }
          else
          {
            this.jsonObject['applno'] = item.APPLNO;
            this.jsonObject['accountCode'] = item.ACCOUNT_CODE;
            // jsonObject['rowId'] = item.ID;
            this.jsonObject['calRate'] = parseInt(item.CAL_RATE) / 100;
            this.jsonObject['calYears'] = item.CAL_YEARS != undefined? item.CAL_YEARS :"0";
            if(item.CAL_PERIOD != undefined)
            {
              this.jsonObject['calPeriod'] = item.CAL_PERIOD != undefined? item.CAL_PERIOD : "0";
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
    console.log("1111111")
    console.log(this.seveData)
    this.childscn23Service.AddUpDel(url,this.jsonObject1).subscribe(data => {
      console.log(this.seveData)
      console.log(data)
      if (data.rspCode == '0000')
      {
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
    if(s!=null)
    {
      s = s.replace(/,/g, "")
    }

    return s
  }
  del()//刪除
  {
    let jsonObject: any = {};
    jsonObject['result'] = this.checkboxAny;
    let url = 'f01/childscn23action4';
    this.childscn23Service.AddUpDel(url, jsonObject).subscribe(data => {
      console.log(data)
      if (data.rspMsg == '刪除成功') {
        this.set();
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
      this.Monthly421 = this.Monthly421 + parseInt(this.Cut(amt421? amt421:"0"));//BAM421月付金
      this.Monthly029 = this.Monthly029 + parseInt(this.Cut(amt029? amt029:"0"));//BAM029月付金
      this.Monthlycc = this.Monthlycc + parseInt(this.Cut(amtcc? amtcc:"0"));//信用卡付月金

    }
    else {
      this.checkboxAny.splice(this.checkboxAny.indexOf(z), 1)
      this.Monthly421 = this.Monthly421 - parseInt(this.Cut(amt421? amt421:"0"));//BAM421月付金
      this.Monthly029 = this.Monthly029 - parseInt(this.Cut(amt029? amt029:"0"));//BAM029月付金
      this.Monthlycc = this.Monthlycc - parseInt(this.Cut(amtcc? amtcc:"0"));//信用卡付月金
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
    console.log('this.data')
    console.log(this.checkboxAny)
    console.log(this.seveData)
    console.log(this.Monthlycc)
  }
}
