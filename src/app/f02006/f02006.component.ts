import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import {F02006Service} from '../f02006/f02006.service'

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f02006',
  templateUrl: './f02006.component.html',
  styleUrls: ['./f02006.component.css','../../assets/css/f02.css']
})
//客戶LOG資料查詢 jay
export class F02006Component implements OnInit {

  constructor(
    private f02006Service: F02006Service,
    public pipe: DatePipe,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.f02006Service.getSysTypeCode('IS_RPM').subscribe(data=>{
      this.isRpmCode.push({value:'',viewValue:'請選擇'})
      for(const jsonObj of data.rspBody.mappingList)
      {
        const id = jsonObj['codeNo'];
          const name = jsonObj['codeDesc'];
        this.isRpmCode.push({value:id,viewValue:name})
      }

    })
  }
  applno:string='';// 案件編號
  nationalID:string='';// 身分證字號
  custCname:string = '';// 客戶姓名
  isRpm:string='';//RPM代碼
  searchEmpno:string='';//查詢員編
  searchTimeStart:string = '';//查詢日期起始
  searchTimeEnd:string='';//查詢日期結束
  Querydate:[Date, Date];
  resultData = [];
  total = 0;
  pageIndex = 1;
  pageSize = 50;
  Pieces=0;//件數
  isRpmCode: sysCode[] = [];
  set()
  {
    let url = 'f02/f02006action1';
    let jsonObject: any = {};
    jsonObject['page']=this.pageIndex;
    jsonObject['per_page'] = this.pageSize;
    jsonObject['applno'] = this.applno;//案件編號
    jsonObject['nationalID'] = this.nationalID;//身分證字號
    jsonObject['custCname'] = this.custCname;//客戶姓名
    jsonObject['isRpm'] = this.isRpm;//RPM
    if(this.nationalID !='')
    {
      if(this.Querydate != null)
      {
        if(this.dealwithData365(this.Querydate))
        {
          jsonObject['searchTimeStart'] = this.pipe.transform(new Date(this.Querydate[0]), 'yyyy-MM-dd');;
          jsonObject['searchTimeEnd'] = this.pipe.transform(new Date(this.Querydate[1]), 'yyyy-MM-dd');;

        }
        else
        {
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "日期查詢區間最多一年內!" }

          });
          return;
        }
      }
      else
      {
        jsonObject['searchTimeStart'] = '';
        jsonObject['searchTimeEnd'] = '';
      }
    }
    else
    {
      if(this.Querydate != null)
      {
        if(this.dealwithData90(this.Querydate))
        {
          jsonObject['searchTimeStart'] = this.pipe.transform(new Date(this.Querydate[0]), 'yyyy-MM-dd');;
          jsonObject['searchTimeEnd'] = this.pipe.transform(new Date(this.Querydate[1]), 'yyyy-MM-dd');;

        }
        else
        {
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "日期查詢區間最三個月內!" }

          });
          return;
        }
      }
      else
      {
        jsonObject['searchTimeStart'] = '';
        jsonObject['searchTimeEnd'] = '';
      }
    }
    console.log(jsonObject)
    this.f02006Service.f02006set(url,jsonObject).subscribe(data=>{
      // if(data.rspBody.size == 0)
      // {
      //   const childernDialogRef = this.dialog.open(ConfirmComponent, {
      //     data: { msgStr: "查無資料" }})
      // }
      // else
      // {
      //   this.resultData = data.rspBody.item;
      //   this.Pieces = data.rspBody.size;
      // }
      this.resultData = data.rspBody.item;
      this.Pieces = data.rspBody.size;
      console.log(data);
    })
  }
  dealwithData365(stime: any) {
    var startDate, endDate;
    startDate = new Date(stime[0]);
    endDate = new Date(stime[1]);
    if ((endDate - startDate) / 1000 / 60 / 60 / 24 > 365) {
      return false;
    }
    else {
      return true;
    }
  }
  dealwithData90(stime: any) {
    var startDate, endDate;
    startDate = new Date(stime[0]);
    endDate = new Date(stime[1]);
    if ((endDate - startDate) / 1000 / 60 / 60 / 24 > 90) {
      return false;
    }
    else {
      return true;
    }
  }
  Clear()//清除
  {
    this.resultData = [];
    this.Pieces = 0 ;
    this.applno ='';
    this.nationalID='';// 身分證字號
    this.custCname = '';// 客戶姓名
    this.isRpm='';//RPM代碼
    this.Querydate = null;

  }
  dateNull(t: [Date, Date]) {

    if (t.length < 1)
    {
     this.Querydate = null;
    }
  }


}
