import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { F03013Service } from './f03013.service';
//20210911 alvin.lee
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03013',
  templateUrl: './f03013.component.html',
  styleUrls: ['./f03013.component.css', '../../assets/css/f03.css']
})

export class F03013Component implements OnInit {
  selectedValue: number;    //欲創建年度行事曆
  yearValue: number;        //查詢年份
  monthValue: number;       //查詢月份
  yearCode: sysCode[] = []; //年份下拉
  monthCode: sysCode[] = []; //月份下拉
  jsonObject: any = {};
  workingDateDataSource = new MatTableDataSource<any>();
  constructor(private f03013Service: F03013Service, private pipe: DatePipe) { }

  ngOnInit(): void {
    this.getYearRange();
    this.getMonthRange();
  }

  //創建年度行事曆
  createCalendar() {
    if (typeof this.selectedValue === 'undefined') {
      return alert('請選擇需創建年份')
    }
    var yes = confirm('建立該年度行事曆,會刪除原設定,請確認');
    if (yes) {
      this.jsonObject['year'] = this.selectedValue;
      this.f03013Service.createCalendar(this.jsonObject).subscribe(data => {
        if (data.rspMsg == 'success') {
          alert('新增' + this.selectedValue + '年度行事曆成功!')
        }
      });
    } else {
      return;
    }
  }

  // 查詢選擇之年度與月份
  queryIsWorkDay() {
    if (typeof this.yearValue === 'undefined' && typeof this.monthValue === 'undefined') {
      return alert('請選擇年份與月份')
    }
    if (typeof this.yearValue === 'undefined') {
      return alert('請選擇年份')
    }
    if (typeof this.monthValue === 'undefined') {
      return alert('請選擇月份')
    }

    this.jsonObject['year'] = this.yearValue;
    this.jsonObject['month'] = this.monthValue;
    this.f03013Service.queryIsWorkDay(this.jsonObject).subscribe(data => {
      this.workingDateDataSource = data.rspBody;
      if (data.rspBody.length == '0') { alert('請先初始化' + this.yearValue + '年度行事曆') }
    });
  }
  // 取得年份下拉
  getYearRange() {
    this.f03013Service.getSysTypeCode('YEAR').subscribe(data => {
      console.log(data)
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.yearCode.push({ value: codeNo, viewValue: desc })
      }
    });
  }

  // 取得月份下拉
  getMonthRange() {
    this.f03013Service.getSysTypeCode('MONTH').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.monthCode.push({ value: codeNo, viewValue: desc })
      }
    });
  }
  // 修改工作日
  updateWorkingDate(wDate: string, isWork: string) {
    this.jsonObject['wDate'] = this.pipe.transform(new Date(wDate), 'yyyy-MM-dd');
    this.jsonObject['isWork'] = isWork;
    this.f03013Service.updateWorkingDate(this.jsonObject).subscribe(data => {
      if (data.rspMsg == 'success') {
        this.queryIsWorkDay();
      }
    });
  }

}



