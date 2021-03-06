import { Component, OnInit, ViewChild } from '@angular/core';
import { Childbwscn6Service } from './childbwscn6.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Data, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BaseService } from 'src/app/base.service';
import { environment } from 'src/environments/environment';
import { MenuListService } from 'src/app/menu-list/menu-list.service';

@Component({
  selector: 'app-childbwscn6',
  templateUrl: './childbwscn6.component.html',
  styleUrls: ['./childbwscn6.component.css']
})
export class Childbwscn6Component implements OnInit {

  constructor(
    private router: Router,
    public childbwscn6Service: Childbwscn6Service,
    public dialog: MatDialog,
    private menuListService: MenuListService,
  ) { }
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
  fds: string = "";

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
  }


  //取得表單資料
  initial(pageIndex: number, pageSize: number) {
    const baseUrl = 'f01/childbwscn6'
    let jsonObject: any = {}
    jsonObject['applno'] = this.applno;
    //測試用
    // jsonObject['applno'] = '1111111';
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.childbwscn6Service.selectCustomer(baseUrl, jsonObject).subscribe(data => {
      console.log(data)
      this.total = data.rspBody.size
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

  detail(applno2: string, nationalId: string, custId: string) {
    sessionStorage.setItem('applno', applno2);
    sessionStorage.setItem('nationalId', nationalId);
    sessionStorage.setItem('custId', custId);
    sessionStorage.setItem('search', 'Y');
    sessionStorage.setItem('queryDate', '');
    sessionStorage.setItem('winClose', 'Y');

    sessionStorage.setItem('searchUserId', BaseService.userId);
    sessionStorage.setItem('searchEmpName', BaseService.empName);
    sessionStorage.setItem('searchEmpId', BaseService.empId);

    //開啟徵審主畫面
    let safeUrl = this.childbwscn6Service.getNowUrlPath("/#/F01009/F01009SCN1");
    let url = window.open(safeUrl);
    this.menuListService.setUrl({
      url: url
    });

    sessionStorage.setItem('winClose', 'N');
    sessionStorage.setItem('search', 'N');
    sessionStorage.setItem('applno', this.applno);

    sessionStorage.removeItem('searchUserId');
    sessionStorage.removeItem('searchEmpName');
    sessionStorage.removeItem('searchEmpId');
  }
}
