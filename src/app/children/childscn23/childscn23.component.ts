import { logging } from 'protractor';
import { Sort } from '@angular/material/sort';
import { Component, OnInit } from '@angular/core';
import { Childscn23Service } from './childscn23.service';
// import {MatTableDataSource} from '@angular/material/table'

interface sysCode {
  value: string;
  viewValue: string;
}
//jay 月付金試算

@Component({
  selector: 'app-childscn23',
  templateUrl: './childscn23.component.html',
  styleUrls: ['./childscn23.component.css', '../../../assets/css/child.css']
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
  Monthly421:string;//BAM421月付金
  Monthly429:string;//BAM429月付金
  Monthly:string;//信用卡付月金
  jsonObject: any = {};
  data: any[]=[];//裝一開始的資料表
  AddData: any;
  checkboxAny:any[]=[];//判斷是否回傳

  // Source = new MatTableDataSource<any>() //產品Table


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
      this.AddData = {ACCOUNT_CODE: '',APPLNO:'20210827E001', ID:'1', MONTHLY_PAY_421:'', MONTHLY_PAY_029: '',MONTHLY_PAY_CC:'',CAL_RATE:'',CAL_YEARS:'',CAL_PERIOD:'',CONTRACT_AMT_421:'',CONTRACT_AMT_029:'',CONTRACT_AMT_CC:''};
      this.data.push(this.AddData)
      this.i=false;
      console.log(this.data)
    }
  }
  set()
  {
    let url ='f01/childscn23action1'
    this.jsonObject['applno']=this.applno;
    this.childscn23Service.AddUpDel(url,this.jsonObject).subscribe(data=>{
      this.data = data.rspBody.items
      this.suject=data.rspBody.items[0].ACCOUNT_CODE;
    })
  }

  limit(x: string,name:string)
  {
    x=x.replace(/\D/g,'')
    var s="this."+name;
    if(x.length>0)
    {
      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    switch(name)
    {
      case "gold421":
        this.gold421 =x;
       break;
      case "gold429":
        this.gold029 = x;
        break;
      case "gold":
        this.gold = x;
        break;
        case "addgold421":
          this.addgold421 =x;
         break;
        case "addgold429":
          this.addgold029 = x;
          break;
        case "addgold":
          this.addgold = x;
          break;
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
        if(item.ID==ID  ){
          if(item.ACCOUNT_CODE==jsonObj.ACCOUNT_CODE){
            item.CAL_RATE=jsonObj.DEFAULT_RATE;
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

    for(const item of this.data){
      if(item.ID=='1')
      {
        this.data.pop();
      }
    }
    this.i=true;
    this.checkboxAny=[];
  }
  del()//刪除
  {
    let jsonObject: any = {};
    this.jsonObject['result'] =this.checkboxAny;
    let url = 'f01/childscn23action4';
    this.childscn23Service.AddUpDel(url,jsonObject).subscribe(data=>{
      console.log(data)
    })

  }
  addcheckbox(check:boolean,z:string)
  {
    if(check)
    {
      this.checkboxAny.push(z)
    }
    else
    {
      this.checkboxAny.splice(this.checkboxAny.indexOf(z), 1)
    }
  }
  test()
  {

    console.log('this.data')
    console.log(this.data)
  }
}
