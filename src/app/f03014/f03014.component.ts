
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { F03014Service } from './f03014.service';
import{ F03014addComponent } from './f03014add/f03014add.component'
import { MatDialog } from '@angular/material/dialog';

interface sysCode {
  value: string;
  viewValue: string;
}

//Jay 客戶身份名單註記

@Component({
  selector: 'app-f03014',
  templateUrl: './f03014.component.html',
  styleUrls: ['./f03014.component.css']
})
export class F03014Component implements OnInit {
  usingType:sysCode[]=[];
  usingValue:string;
  NameValue:string;//客戶名字
  IdentityValue:string;//身分字號
  NarrateValue:string;//簡述
  Efficient:string;//生效
  Invalidation:string;//失效
  daytest:string;//三個月後的日期
  constructor(private pipe: DatePipe,private f03014Service: F03014Service,public dialog: MatDialog) { }
  ngOnInit(): void //最開始處理的地方
  {
    this.usingType.push({value: '1', viewValue: 'Y'});
    this.usingType.push({value: '2', viewValue: 'N'});
  }

  Inquire()//查詢
  { console.log(this.IdentityValue)
    console.log(this.Efficient)
    const url = 'f03/f03014action01';
    var formData = new FormData();
    formData.append('custNid',this.IdentityValue);
    formData.append('custName',this.NameValue);
    formData.append('content1',this.NarrateValue);
    formData.append('effectiveDate',this.Efficient);
    formData.append('expirationDate',this.Invalidation);
    formData.append('useFlag',this.usingValue);
    this.f03014Service.selectCustomer(url,formData).subscribe(data=>
      {
        console.log(data);
      })

  }
  InvalidationMax()//抓3個月間隔
  {
    var a = new Date(this.Efficient);
    var k = 90*24*60*60*1000;
    var j = a.setDate(a.getDate());
    this.daytest = this.pipe.transform( new Date(j+k) ,'yyyy-MM-dd')//三個月後的失效日期
  }
  AddTable()//新增
  {
    const dialogRef = this.dialog.open(F03014addComponent, {
      data: {  }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  EditTable()//編輯
  {

  }
}
