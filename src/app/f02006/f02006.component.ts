import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-f02006',
  templateUrl: './f02006.component.html',
  styleUrls: ['./f02006.component.css','../../assets/css/f02.css']
})
//客戶LOG資料查詢 jay
export class F02006Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  applno:string='';// 案件編號
  nationalID:string='';// 身分證字號
  custCname:string = '';// 客戶姓名
  isRpm:string='';//RPM代碼
  searchEmpno:string='';//查詢員編
  searchTimeStart:string = '';//查詢日期起始
  searchTimeEnd:string='';//查詢日期結束
  total = 0;
  pageIndex = 1;
  pageSize = 50;
  Pieces=0;//件數

}
