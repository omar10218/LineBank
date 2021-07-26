import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-f01001scn6page1',
  templateUrl: './f01001scn6page1.component.html',
  styleUrls: ['./f01001scn6page1.component.css','../../../../assets/css/f01.css']
})
export class F01001scn6page1Component implements OnInit, AfterViewInit {

  currentPage: PageEvent;
  
  constructor() { }

  ngOnInit(): void {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.AAS003Source = null;
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  AAS003Source = new MatTableDataSource<any>();

  ngAfterViewInit() {
    this.getAAS003S();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getAAS003S();
    });
  }

  getAAS003S() {
    this.totalCount = 10;
  }
}
