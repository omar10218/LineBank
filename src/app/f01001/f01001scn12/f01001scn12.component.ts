import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { F01001scn12Service } from './f01001scn12.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MappingCode } from 'src/app/mappingcode.model';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01001scn12',
  templateUrl: './f01001scn12.component.html',
  styleUrls: ['./f01001scn12.component.css']
})
export class F01001scn12Component implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private f01001scn12Service: F01001scn12Service) { }
  private applno: string;
  private search: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
    });
    console.log(this.applno);
    const baseUrl = 'f01/f01001scn12';
    this.f01001scn12Service.getInComeFunction(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize, this.applno).subscribe(data => {
      console.log(data);
      this.totalCount = data.rspBody.size;
      this.ruleParamConditionSource.data = data.rspBody.items;
    });
  }

  getApplno(): String {
    return this.applno;
  }

  getSearch(): string {
    return this.search;
  }
  //===========================================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: null
  };
  currentSort: Sort;
  ruleParamConditionSource = new MatTableDataSource<any>();
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
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getInComeList();
    });
  }

  getInComeList(){

  }

 

  
  

 

}
