import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Childscn2Service } from '../childscn2.service';


@Component({
  selector: 'app-childscn2page1',
  templateUrl: './childscn2page1.component.html',
  styleUrls: ['./childscn2page1.component.css','../../../../assets/css/f01.css']
})
export class Childscn2page1Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private childscn2Service: Childscn2Service
  ) { }

  private applno: string;
  private cuid: string;
  currentPage: PageEvent;
  currentSort: Sort;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');

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

  getTransLog(){
    const baseUrl = "f01/childscn2";
    this.childscn2Service.getTransLog(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize)
    .subscribe(data => {
      console.log(data.rspBody);
      this.totalCount = data.rspBody.size;
      this.transactionLogSource.data = data.rspBody.items;
    });
  }

  formatDate(date: string) {
    return date.split("T")[0]+" "+date.split("T")[1].split(".")[0];
  }
}
