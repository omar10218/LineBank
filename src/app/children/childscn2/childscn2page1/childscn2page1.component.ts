import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Childscn2Service } from '../childscn2.service';


@Component({
  selector: 'app-childscn2page1',
  templateUrl: './childscn2page1.component.html',
  styleUrls: ['./childscn2page1.component.css','../../../../assets/css/child.css']
})
export class Childscn2page1Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private childscn2Service: Childscn2Service
  ) { }

  transactionLogSource: Data[] = [];
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getTransLog( this.pageIndex, this.pageSize );
  }

  getTransLog( pageIndex: number, pageSize: number ){
    const baseUrl = "f01/childscn2";
    let jsonObject: any = {};
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.childscn2Service.getTransLog(baseUrl, jsonObject)
    .subscribe(data => {
      this.loading = false;
      this.total = data.rspBody.size;
      this.transactionLogSource = data.rspBody.items;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getTransLog(pageIndex, pageSize);
  }

  formatDate(date: string) {
    return date.split("T")[0]+" "+date.split("T")[1].split(".")[0];
  }
}
