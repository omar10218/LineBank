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

//Jay 歷史資料
@Component({
  selector: 'app-childscn16',
  templateUrl: './childscn16.component.html',
  styleUrls: ['./childscn16.component.css','../../../assets/css/f03.css']
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
  ruleParamCondition = new MatTableDataSource<any>();
  total = 1;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  cuid:string;
  fds: string = "";
  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid= sessionStorage.getItem( 'cuid');
    console.log(sessionStorage.getItem( 'cuid'))
    this.initial();
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
    console.log(this.applno)
    jsonObject['applno'] =this.applno;
    this.childscn16Service.selectCustomer(url,jsonObject).subscribe(data =>
      {
        console.log(data);
        // if ( data.rspBody.length > 0 ) {
        //   this.fds = data.rspBody[0].fds
        // }

        if (data.rspMsg == '案件鎖定成功')
        {
          sessionStorage.setItem( 'applno', id );
          sessionStorage.setItem( 'cuid', nationalId );
          sessionStorage.setItem( 'search', 'Y' );
          sessionStorage.setItem( 'fds', this.fds );
          sessionStorage.setItem( 'queryDate', '' );
          //開啟徵審主畫面
          window.open( environment.allowOrigin + "/#/F01002/F01002SCN1" );
        }
    })
  }
  initial()//初始查詢
  {
    let url = 'f01/childscn16';
    this.jsonObject['applno'] = this.applno;
    this.jsonObject['page'] = this.pageIndex;
    this.jsonObject['per_page'] = this.pageSize;
    this.childscn16Service.selectCustomer(url, this.jsonObject).subscribe(data => {

      this.ruleParamCondition = data.rspBody;
    })
  }
}
