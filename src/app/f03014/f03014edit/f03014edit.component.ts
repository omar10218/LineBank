import { Component, OnInit,Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03014Service } from '../f03014.service';

@Component({
  selector: 'app-f03014edit',
  templateUrl: './f03014edit.component.html',
  styleUrls: ['./f03014edit.component.css']
})
export class F03014editComponent implements OnInit {
  rid :string =this.data.rid;
  NameValue: string =this.data.CUST_NAME;//客戶名字
  IdentityValue: string =this.data.CUST_NID;//身分字號
  NarrateValue1: string =this.data.CONTENT1;//簡述1
  NarrateValue2: string =this.data.CONTENT2;//簡述2
  remakrValue:string = this.data.REMARK;//備註
  Efficient: string =this.pipe.transform( new Date(this.data.EFFECTIVE_DATE) , 'yyyy-MM-dd' );//生效
  Invalidation: string = this.pipe.transform( new Date(this.data.EXPIRATION_DATE) , 'yyyy-MM-dd' );//失效
  usingValue: string= this.data.USE_FLAG;//使用中
  ChangeDateValue:string = this.data.CHANGE_DATE;//變動日期
  usingType:string[]=this.data.usingType;
  daytest:string;//三個月後的日期
  constructor(public dialogRef: MatDialogRef<F03014editComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,private pipe: DatePipe,private f03014Service: F03014Service )
   {

   }

  ngOnInit(): void {
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
    const url = 'f03/f03014action03';
    let formData = new FormData();
    formData.append('rowId',this.rid);
    formData.append('custNid',this.IdentityValue);
    formData.append('custName',this.NameValue);
    formData.append('content1',this.NarrateValue1);
    formData.append('content2',this.NarrateValue2);
    formData.append('remark',this.remakrValue);
    formData.append('effectiveDate',this.Efficient);
    formData.append('expirationDate',this.Invalidation);
    formData.append('useFlag',this.usingValue);
    this.f03014Service.update(url,formData).subscribe(data=>{
      console.log(data)

    })
  }


}
