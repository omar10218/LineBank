import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { F01004Service } from './f01004.service';

@Component({
  selector: 'app-f01004',
  templateUrl: './f01004.component.html',
  styleUrls: ['./f01004.component.css','../../assets/css/f01.css']
})
export class F01004Component implements OnInit,AfterViewInit {
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  empNo: string = localStorage.getItem("empNo");
  currentSort: Sort;
  swcID: string;
  swcApplno: string;
  note: string;
  cusinfoDataSource = new MatTableDataSource<any>();
  constructor( private router: Router, private f01004Service: F01004Service) {}

  ngOnInit(): void {
    this.swcApplno = '';
    this.swcID = '';
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
  ngAfterViewInit(): void {
    this.getCaseList(this.empNo, this.swcID, this.swcApplno);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCaseList(this.empNo, this.swcID, this.swcApplno);
    });
  }

  changeSort(sortInfo: Sort) {
    // 因為API排序欄位是created，因此在這邊做調整
    if (sortInfo.active === 'created_at') {
      sortInfo.active = 'created';
    }
    this.currentSort = sortInfo;
    // this.getCaseList('001');
  }

  getCaseList(empNo: string, swcID: string, swcApplno: string) {
    this.f01004Service.getCaseList(this.currentPage.pageIndex, this.currentPage.pageSize
      , empNo, swcID, swcApplno).subscribe(data => {
      console.log(data)
      this.totalCount = data.rspBody.size;
      this.cusinfoDataSource.data = data.rspBody.items;
    });
  }

  changeSelect() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getCaseList(this.empNo, this.swcID, this.swcApplno);
  }

  getLockCase(param: String, cuid: String) {
    this.router.navigate(['./F01004SCN1'], { queryParams: { applno: param , search: 'N' , cuid: cuid} });
  }

  saveNote(swcApplno: string, note: string){

  }
}
