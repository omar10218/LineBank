import { Component, OnInit, ViewChild } from '@angular/core';
import { ChildrenService } from '../children.service';
import { Childscn16Service } from './childscn16.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

//Jay 歷史資料 Nick

@Component({
  selector: 'app-childscn16',
  templateUrl: './childscn16.component.html',
  styleUrls: ['./childscn16.component.css', '../../../assets/css/f03.css']
})
export class Childscn16Component implements OnInit {

  constructor(
    private childscn16Service: Childscn16Service,
    private pipe: DatePipe,
    public childService: ChildrenService,
    public dialog: MatDialog,) { }
  applno: string;
  jsonObject: any = {};
  data: any;//裝一開始的資料表
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  totalCount: any;
  ruleParamCondition: Data[] = [];
  transactionLogSource: Data[] = [];
  total = 1;
  loading = false;
  pageSize = 50;
  pageIndex = 1;
  cuid: string;
  fds: string = "";

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    console.log(sessionStorage.getItem('cuid'))
    this.initial(this.pageIndex, this.pageSize,);
  }

  Inquire(id: string, nationalId: string) //查詢
  {
    const url = 'f01/f01002fn1';
    let jsonObject: any = {};
    console.log(this.applno)
    jsonObject['swcApplno'] = this.applno;
    this.childscn16Service.selectCustomer(url, jsonObject).subscribe(data => {
      console.log(data);

      if (data.rspMsg == '案件鎖定成功') {
        sessionStorage.setItem('applno', id);
        sessionStorage.setItem('cuid', nationalId);
        sessionStorage.setItem('search', 'Y');
        sessionStorage.setItem('fds', this.fds);
        sessionStorage.setItem('queryDate', '');
        //開啟徵審主畫面
        window.open("http://localhost:4200/#/F01002/F01002SCN1/CHILDSCN1");
      }
    })
  }
  //取得表單資料
  initial(pageIndex: number, pageSize: number) {
    const baseUrl = 'f01/childbwscn6'
    let jsonObject: any = {}
    jsonObject['applno'] = this.applno ;
    //測試用
    // jsonObject['applno'] = '1111111';
    jsonObject['page'] = pageIndex;
    jsonObject['per_page']= pageSize;
    console.log('jsonObject');
    console.log(jsonObject);
    this.childscn16Service.selectCustomer(baseUrl, jsonObject).subscribe(data => {
      console.log('data')
      console.log(data)
      this.total = data.rspBody.size
      console.log(this.total)
      this.ruleParamCondition = data.rspBody.items
    })
    this.loading = false
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params
    this.pageSize = pageSize
    this.pageIndex = pageIndex
    this.initial(pageIndex, pageSize)
  }
}
