import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { F03014Service } from '../f03014.service';
import * as XLSX from 'xlsx';

interface sysCode {
  value: string;
  viewValue: string;
}

//Jay 客戶身份名單註記 新增

@Component({
  selector: 'app-f03014add',
  templateUrl: './f03014add.component.html',
  styleUrls: ['./f03014add.component.css']
})

export class F03014addComponent implements OnInit {
  usingType:sysCode[]=[];
  usingValue:string;//使用中
  currentTimeValue:string;//異動時間
  custNid:string;//身分證字號
  custName:string;//客戶姓名
  content1:string;//簡述一
  content2:string;//簡述二
  remark:string;//備註資訊
  Efficient:string;//生效
  Invalidation:string;//失效
  daytest:string;//三個月後的日期
  jsonObject :any = {};
  Custlist:any=[];
  constructor(private pipe: DatePipe,private f03014Service: F03014Service) { }

  ngOnInit(): void {
    this.usingType.push({value: '1', viewValue: 'Y'});
    this.usingType.push({value: '2', viewValue: 'N'});
    this.currentTimeValue = this.pipe.transform( new Date() , 'yyyy-MM-dd HH:mm:ss' )//抓取現在時間
  }
  InvalidationMax()//抓3個月間隔方法
  {
    var a = new Date(this.Efficient);
    var k = 90*24*60*60*1000;
    var j = a.setDate(a.getDate());
    this.daytest = this.pipe.transform( new Date(j+k) ,'yyyy-MM-dd')//三個月後的失效日期
  }
  seve()
  {
    const url = 'f03/f03014action02';
    this.jsonObject['custNid']=this.custNid;
    this.jsonObject['custName']=this.custName;
    this.jsonObject['content1']=this.content1;
    this.jsonObject['content2']=this.content2;
    this.jsonObject['remark']=this.remark;
    this.jsonObject['effectiveDate']=this.Efficient;
    this.jsonObject['expirationDate']=this.Invalidation;
    this.jsonObject['useFlag']=this.usingValue;
    this.jsonObject['changeDate']=this.currentTimeValue;
    // let formData = new FormData();
    // formData.append('custNid',this.custNid);
    // formData.append('custName',this.custName);
    // formData.append('content1',this.content1);
    // formData.append('content2',this.content2);
    // formData.append('remark',this.remark);
    // formData.append('effectiveDate',this.Efficient);
    // formData.append('expirationDate',this.Invalidation);
    // formData.append('useFlag',this.usingValue);
    // formData.append('changeDate',this.currentTimeValue);
    this.Custlist.push(this.jsonObject)
    this.f03014Service.Add(url,this.Custlist).subscribe(data=>{
      console.log(data)

    })
  }


}
