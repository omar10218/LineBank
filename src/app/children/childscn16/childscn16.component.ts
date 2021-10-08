import { Component, OnInit, ViewChild } from '@angular/core';
import { ChildrenService } from '../children.service';
import { Childscn16Service } from './childscn16.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Childscn1Component } from '../childscn1/childscn1.component'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

//Jay 歷史資料
@Component({
  selector: 'app-childscn16',
  templateUrl: './childscn16.component.html',
  styleUrls: ['./childscn16.component.css']
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
  Inquire(id: string) //查詢
  {
    console.log(id)
    const dialogRef = this.dialog.open(Childscn1Component, {

    });

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
