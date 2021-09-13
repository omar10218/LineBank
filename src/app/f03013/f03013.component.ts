import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { F03013Service } from './f03013.service';
//20210911 alvin.lee

@Component({
  selector: 'app-f03013',
  templateUrl: './f03013.component.html',
  styleUrls: ['./f03013.component.css', '../../assets/css/f03.css']
})

export class F03013Component implements OnInit {
  selectedValue: number;    //欲創建年度行事曆
  yearValue: number;        //查詢年份
  monthValue: number;       //查詢月份
  yearCode = [];            //年份下拉
  monthCode = [];           //月份下拉
  totalCount: any;
  workingDateDataSource = new MatTableDataSource<any>();
  constructor(private f03013Service: F03013Service) { }

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
      alert(this.selectedValue)
      this.f03013Service.createCalendar(this.selectedValue).subscribe(data => {
        if (data.rspMsg == '成功') {
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

    this.f03013Service.queryIsWorkDay(this.yearValue, this.monthValue).subscribe(data => {
      this.totalCount = data.rspBody.length;
      this.workingDateDataSource.data = data.rspBody;
      if (this.totalCount == '0') { alert('請先初始化' + this.yearValue + '年度行事曆') }
    });
  }
  // 取得年份下拉,當前年度前後5年
  getYearRange() {
    const today = new Date();
    let yearRange = 5;
    let startYear = today.getFullYear() - yearRange;//起始年份
    let endYear = today.getFullYear() + yearRange;//結束年份
    for (let i = startYear; i <= endYear; i++) {
      this.yearCode.push(i);
    }
  }

  // 取得月份下拉
  getMonthRange() {
    for (let i = 1; i <= 12; i++) {
      this.monthCode.push(i);
    }
  }

  // 修改工作日
  updateWorkingDate(wDate: string, isWork: string) {
    this.f03013Service.updateWorkingDate(wDate, isWork).subscribe(data => {
      if (data.rspMsg == 'success') {
        this.queryIsWorkDay();//?
      }
    });

  }
}



