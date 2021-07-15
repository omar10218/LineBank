import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { F01001Service } from './f01001.service';

interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f01001',
  templateUrl: './f01001.component.html',
  styleUrls: ['./f01001.component.css']
})
export class F01001Component implements AfterViewInit  {
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  empValue: string;
  empOption: sysCode[] = [{value: '001', viewValue: '陳小明'}, {value: '002', viewValue: '王小華'}];
  currentSort: Sort;

  cusinfoDataSource = new MatTableDataSource<any>();
  constructor(private httpClient: HttpClient, private router: Router, private f01001Service: F01001Service) {}

  ngAfterViewInit() {

    // this.paginator.lastPage = () => this.yourMethodToTrigger();

    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };
    this.getCaseList('001');
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCaseList('001');
    });
  }

  yourMethodToTrigger() {
    console.log('Triggered!');
    console.log(this.totalCount);
    console.log(this.currentPage.pageIndex);
    console.log(this.currentPage.pageIndex + 1);
    console.log(this.currentPage.pageSize);
  }

  changeSort(sortInfo: Sort) {
    // 因為API排序欄位是created，因此在這邊做調整
    if (sortInfo.active === 'created_at') {
      sortInfo.active = 'created';
    }
    this.currentSort = sortInfo;
    this.getCaseList('001');
  }

  getCaseList(empno: string) {
    this.f01001Service.getCaseList(this.currentPage.pageIndex, this.currentPage.pageSize, empno).subscribe(data => {
      this.totalCount = data.size;
      this.cusinfoDataSource.data = data.items;
    });
  }

  changeSelect() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getCaseList(this.empValue);
  }

  // getIssuees() {
  //   const baseUrl = 'https://api.github.com/search/issues?q=repo:angular/components';
  //   let targetUrl = `${baseUrl}&page=${this.currentPage.pageIndex + 1}&per_page=${this.currentPage.pageSize}`;
  //   if (this.currentSort.direction) {
  //     targetUrl = `${targetUrl}&&sort=${this.currentSort.active}&order=${this.currentSort.direction}`;
  //   }
  //   this.httpClient
  //     .get<any>(targetUrl)
  //     .subscribe(data => {
  //       this.totalCount = 1000;
  //       this.emailsDataSource.data = data.items;
  //       // 從後端進行排序時，不用指定sort
  //       // this.emailsDataSource.sort = this.sortTable;
  //       // 從後端取得資料時，就不用指定data srouce的paginator了
  //       // this.emailsDataSource.paginator = this.paginator;
  //     });
  // }

  getLockCase(param: String) {
    // CALL API 鎖定流程上的案件並取得案件資料
    this.router.navigate(['./F01001SCN1'], { queryParams: { applno: param , search: 'N'} });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.cusinfoDataSource.filter = filterValue;
  }

}
