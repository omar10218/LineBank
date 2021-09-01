import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { F01003scn2Service } from '../f01003scn2.service';

@Component({
  selector: 'app-f01003scn2page1',
  templateUrl: './f01003scn2page1.component.html',
  styleUrls: ['./f01003scn2page1.component.css', '../../../../assets/css/f01.css']
})
export class F01003scn2page1Component implements OnInit {

  constructor(private route: ActivatedRoute, private f01003scn2Service: F01003scn2Service) { }
  private applno: string;
  private cuid: string;
  currentPage: PageEvent;
  currentSort: Sort;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.cuid = params['cuid'];
    });

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

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  transactionLogSource = new MatTableDataSource<any>();

  ngAfterViewInit() {
    this.getTransLog();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getTransLog();
    });
  }

  getTransLog() {
    const baseUrl = "f01/f01003scn2";
    this.f01003scn2Service.getTransLog(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize)
      .subscribe(data => {
        console.log(data.rspBody);
        this.totalCount = data.rspBody.size;
        this.transactionLogSource.data = data.rspBody.items;
      });
  }

  formatDate(date: string) {
    return date.split("T")[0] + " " + date.split("T")[1].split(".")[0];
  }
}
