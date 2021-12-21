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
  private applno: string;               //案件編號

  constructor(
    private route: ActivatedRoute,
    private childscn2Service: Childscn2Service
  ) { }

  transactionLogSource: Data[] = [];
  total = 1;
  loading = true;
  pageIndex = 1;
  pageSize = 50;
  empName: string;
  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
  }

  ngAfterViewInit() {
    this.getTransLog( this.applno, this.pageIndex, this.pageSize );
  }

  getTransLog(applno:string, pageIndex: number, pageSize: number ){
    const baseUrl = "f01/childscn2";
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.childscn2Service.getTransLog(baseUrl, jsonObject)
    .subscribe(data => {
      console.log(data)
      this.total = data.rspBody.size;
      this.empName = data.rspBody.empName;
      this.transactionLogSource = data.rspBody.items;
    });
    this.loading = false;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getTransLog(this.applno,pageIndex, pageSize);
  }

  formatDate(date: string) {
    // return date.split("T")[0]+" "+date.split("T")[1].split(".")[0];
    // return date.split(".")[0];
  }
}
