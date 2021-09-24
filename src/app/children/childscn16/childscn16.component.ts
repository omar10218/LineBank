import { Component, OnInit, ViewChild } from '@angular/core';
import { ChildrenService } from '../children.service';
import { Childscn16Service } from './childscn16.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Childscn2Component } from '../childscn2/childscn2.component'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

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
  ngOnInit(): void {
    const caseParams = this.childService.getData();
    this.applno = caseParams.applno;
    this.initial();
  }
  ngAfterViewInit() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };

  }
  Inquire(id: string) {
    const dialogRef = this.dialog.open(Childscn2Component, {

    });

  }
  initial() {
    let url = 'f01/childscn16';
    this.jsonObject['applno'] = this.applno;
    this.childscn16Service.selectCustomer(url, this.jsonObject).subscribe(data => {
      this.ruleParamCondition = data.rspBody;
      console.log(this.data);
    })
  }
}
