import { Component, OnInit, ViewChild } from '@angular/core';
import { ChildrenService } from '../children.service';
import { Childscn16Service } from './childscn16.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Childscn1Component } from '../childscn1/childscn1.component'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

//Jay 歷史資料

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
  }
  ngAfterViewInit() {
    //this.initial( this.pageIndex, this.pageSize );
  }

  // ngAfterViewInit() {
  //   this.currentPage = {
  //     pageIndex: 0,
  //     pageSize: 10,
  //     length: null
  //   };
  //   this.currentSort = {
  //     active: '',
  //     direction: ''
  //   };

  // }
  Inquire(id: string, nationalId: string) //查詢
  {
    const url = 'f01/f01002fn1';
    let jsonObject: any = {};
    jsonObject['swcApplno'] = this.applno;
    this.childscn16Service.selectCustomer(url, jsonObject).subscribe(data => {

      // if ( data.rspBody.length > 0 ) {
      //   this.fds = data.rspBody[0].fds
      // }
      sessionStorage.setItem('applno', id);
      sessionStorage.setItem('cuid', nationalId);
      sessionStorage.setItem('search','Y');
      sessionStorage.setItem('queryDate', '');
      sessionStorage.setItem('winClose', 'Y');
      //開啟徵審主畫面
      const url = window.location.href.split("/#");
      window.open(url[0] + "/#/F01002/F01002SCN1");

    })
  }
  initial(pageIndex: number, pageSize: number)//初始查詢
  {
    let url = 'f01/childscn16';
    this.jsonObject['applno'] = this.applno;
    this.jsonObject['page'] = pageIndex;
    this.jsonObject['per_page'] = pageSize;
    this.childscn16Service.selectCustomer(url, this.jsonObject).subscribe(data => {

      this.total = data.rspBody.size;
      this.ruleParamCondition = data.rspBody.items;
    })
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.initial(pageIndex, pageSize);
  }
  sortChange(e: string) {
    this.ruleParamCondition = e === 'ascend' ? this.ruleParamCondition.sort(
      (a, b) => a.swcApplno.localeCompare(b.swcApplno)) : this.ruleParamCondition.sort((a, b) => b.swcApplno.localeCompare(a.swcApplno))
  }
}
