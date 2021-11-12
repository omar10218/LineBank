import { logging } from 'protractor';
import { Sort } from '@angular/material/sort';
import { Component, NgModule, OnInit } from '@angular/core';
import { Childscn23Service } from './childscn23.service';
import{FormatNumberPipe,ToNumberPipe} from '../../pipe/customFormatterPipe';
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
  constructor( private childscn23Service: Childscn23Service) { }
  applno: string;
  i = true;
  gold421:string;//BAM421預設本金
  gold029:string;//BAM429預設本金
  gold:string//信用卡
  addgold421:string;//BAM421預設本金
  addgold029:string;//BAM429預設本金
  addgold:string//信用卡
  ttt:string;
  suject:string;
  sujecttwo:string;
  sysCode: any[] = [];
  Content:any[]=[];
  InterestRate:string;//利率
  Years:string;//年數
  NumberofPeriods:string;//期數
  InterestRateTwo:string;//利率
  YearsTwo:string;//年數
  NumberofPeriodsTwo:string;//期數
  Monthly421=0;//BAM421月付金
  Monthly029=0;//BAM029月付金
  Monthlycc=0;//信用卡付月金
  Monthlytest=0;//信用卡付月金
  jsonObject: any = {};
  data: any[]=[];//裝一開始的資料表
  AddData: any;
  checkboxAny:any[]=[];//判斷是否回傳
  seveData:any[]=[];
  // Source = new MatTableDataSource<any>() //產品Table
  x:string;

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

    if(this.i==true)
    {
      this.AddData = {APPLNO:'20210827E001',ACCOUNT_CODE: '', ID:'1', MONTHLY_PAY_421:'', MONTHLY_PAY_029: '',MONTHLY_PAY_CC:'',CAL_RATE:'',CAL_YEARS:'',CAL_PERIOD:'',CONTRACT_AMT_421:'',CONTRACT_AMT_029:'',CONTRACT_AMT_CC:''};
      this.data.push(this.AddData)
      this.i=false;

    }
  }
  set()
  {
    let url ='f01/childscn23action1'
    this.jsonObject['applno']=this.applno;
    this.childscn23Service.AddUpDel(url,this.jsonObject).subscribe(data=>{
      this.data = data.rspBody.items
      this.suject=data.rspBody.items[0].ACCOUNT_CODE;
      this.limit2();
    })
  }

  limit(x: string)
  {
    x=x.replace(/\D/g,'')
    if(x.length>0)
    {
      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

  }
  limit2()
  {

    for(const item of this.data)
    {
        item.MONTHLY_PAY_421 = item.MONTHLY_PAY_421!=undefined ?  (item.MONTHLY_PAY_421+"").replace(/\B(?=(\d{3})+(?!\d))/g, ','):item.MONTHLY_PAY_421;
        item.MONTHLY_PAY_029 = item.MONTHLY_PAY_029!=undefined ?  (item.MONTHLY_PAY_029+"").replace(/\B(?=(\d{3})+(?!\d))/g, ','):item.MONTHLY_PAY_029;
        item.MONTHLY_PAY_CC = item.MONTHLY_PAY_CC!=undefined ?  (item.MONTHLY_PAY_CC+"").replace(/\B(?=(\d{3})+(?!\d))/g, ','):item.MONTHLY_PAY_CC;
        item.CONTRACT_AMT_421 = item.CONTRACT_AMT_421!=undefined ?  (item.CONTRACT_AMT_421+"").replace(/\B(?=(\d{3})+(?!\d))/g, ','):item.CONTRACT_AMT_421;
        item.CONTRACT_AMT_029 = item.CONTRACT_AMT_029!=undefined ?  (item.CONTRACT_AMT_029+"").replace(/\B(?=(\d{3})+(?!\d))/g, ','):item.CONTRACT_AMT_029;
        item.CONTRACT_AMT_CC = item.CONTRACT_AMT_CC!=undefined ?  (item.CONTRACT_AMT_CC+"").replace(/\B(?=(\d{3})+(?!\d))/g, ','):item.CONTRACT_AMT_CC;
        item.CAL_RATE = item.CAL_RATE * 100 + "%";
    }

  }
  dropdown()
  {
    let url ='f01/childscn23action2';
    this.childscn23Service.getdropdown(url).subscribe(data=>{

      for(const jsonObj of data.rspBody.items)
      {
        const codeNo = jsonObj['ACT_CODE'];
        const code = jsonObj['ACCOUNT_CODE']
        this.sysCode.push({value:code,viewValue:codeNo})
      }
      this.Content = data.rspBody.items;

    })
  }
  sujectSelect(ID:string)
  {
    for(const jsonObj of this.Content)
    {
      for(const item of this.data){
        if(item.ID==ID  )
        {
          if(item.ACCOUNT_CODE==jsonObj.ACCOUNT_CODE){
            item.CAL_RATE=jsonObj.DEFAULT_RATE* 100 + "%";
            item.CAL_YEARS=jsonObj.DEFAULT_YEARS;
            item.CAL_PERIOD=jsonObj.DEFAULT_PERIOD;
          }
        }
      }
    }
  }

  sujectSelectTwo()//新增
  {
    for(const jsonObj of this.Content)
    {
      if(jsonObj['ACT_CODE']==this.sujecttwo)
      {
        this.InterestRateTwo = jsonObj['DEFAULT_RATE'];
        this.YearsTwo = jsonObj['EFAULT_YEARS'];
        this.NumberofPeriodsTwo = jsonObj['DEFAULT_PERIOD'];

      }
    }
  }
  seve()//儲存
  {
    let url ='f01/childscn23action3'
    let jsonObject1: any = {};
    for(const jsonObj of this.checkboxAny)
    {
      for(const item of this.data)
      {
        let jsonObject: any = {};
        if(jsonObj==item.ID)
        {
          jsonObject['applno']=item.APPLNO;
          jsonObject['accountCode']=item.ACCOUNT_CODE;
          jsonObject['id']=item.ID;
          jsonObject['calRate']=parseInt(item.CAL_RATE)/100;
          jsonObject['calYears']=item.CAL_YEARS;
          jsonObject['calPeriod']=item.CAL_PERIOD;
          jsonObject['monthlyPay421']=item.MONTHLY_PAY_421 != null? this.Cut(item.MONTHLY_PAY_421):'';
          jsonObject['monthlyPay029']=item.MONTHLY_PAY_029 != null? this.Cut(item.MONTHLY_PAY_029):'';
          jsonObject['monthlyPayCc']=item.MONTHLY_PAY_CC != null? this.Cut(item.MONTHLY_PAY_CC):'';
          this.seveData.push(jsonObject);
        }
      }
    }
    jsonObject1['dataList']=this.seveData
    console.log( this.seveData)

    this.childscn23Service.AddUpDel(url,jsonObject1).subscribe(data=>{
      console.log(data)
      if(data.rspCode !='0000')
      {
        this.set();
      }
      this.seveData=[];

    })
    for(const item of this.data)
    {
      if(item.ID=='1')
      {
        this.data.pop();
      }
    }
    this.i=true;
    this.checkboxAny=[];
  }

  Cut(s:string)//處理千分位
  {
    s=s.replace(",","")
    return s
  }
  del()//刪除
  {
    let jsonObject: any = {};
    jsonObject['result'] =this.checkboxAny;
    let url = 'f01/childscn23action4';
    this.childscn23Service.AddUpDel(url,jsonObject).subscribe(data=>{
      if(data.rspMsg=='刪除成功')
      {
        this.set();
      }
      else
      {
        console.log(data.rspMsg)
      }
      console.log(data)
    })

  }
  addcheckbox(check:boolean,z:string,amt029:string,amt421:string,amtcc:string)
  {
    if(check)
    {
      this.checkboxAny.push(z)
      this.Monthly421=this.Monthly421 + parseInt(this.Cut(amt421));//BAM421月付金
      this.Monthly029=this.Monthly029+ parseInt(this.Cut(amt029));//BAM029月付金
      this.Monthlycc=this.Monthlycc+ parseInt(this.Cut(amtcc));//信用卡付月金

    }
    else
    {
      this.checkboxAny.splice(this.checkboxAny.indexOf(z), 1)
      this.Monthly421=this.Monthly421 - parseInt(this.Cut(amt421));//BAM421月付金
      this.Monthly029=this.Monthly029 - parseInt(this.Cut(amt029));//BAM029月付金
      this.Monthlycc=this.Monthlycc - parseInt(this.Cut(amtcc));//信用卡付月金
    }
  }
  data_number(p: number)
  {
    this.x ='';
    this.x = (p+"")
    if(this.x!=null)
    {

      this.x = this.x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return this.x
  }
  test()
  {
    console.log('this.data')
    console.log(this.Monthly421)
    console.log(this.Monthly029)
    console.log(this.Monthlycc)
  }
}
