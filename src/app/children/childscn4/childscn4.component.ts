import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Childscn4Service } from './childscn4.service';

//Jay 案件歷程
@Component({
  selector: 'app-childscn4',
  templateUrl: './childscn4.component.html',
  styleUrls: ['./childscn4.component.css', '../../../assets/css/child.css']
})
export class Childscn4Component implements OnInit {

  constructor(
    private childscn4Service: Childscn4Service,
    public dialog: MatDialog
  ) { }

  caseStepSource: Data[] = [];
  total = 1;
  loading = true;
  pageSize = 50;
  pageIndex = 1;

  private applno: string;
  newData: any[] = [];

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');

  }

  ngAfterViewInit() {
    this.getCaseStep(this.pageIndex, this.pageSize);
  }

  getCaseStep(pageIndex: number, pageSize: number)//查詢
  {
    const baseUrl = 'f01/childscn4';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.childscn4Service.getCaseStep(baseUrl, jsonObject).subscribe(data => {
      this.loading = false;
      this.total = data.rspBody.length;
      this.caseStepSource = data.rspBody;
      this.newData = this.childscn4Service.getTableDate(this.pageIndex, this.pageSize, this.caseStepSource);
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex } = params;
    this.newData = this.childscn4Service.getTableDate(pageIndex, this.pageSize, this.caseStepSource);
  }

  sortChange(e: string) {
    console.log(e);
    this.caseStepSource = e === 'ascend' ? this.caseStepSource.sort((a,b) => a.startDate.localeCompare(b.startDate))
        : this.caseStepSource.sort((a,b) => b.startDate.localeCompare(a.startDate));
    this.newData = this.childscn4Service.getTableDate(this.pageIndex, this.pageSize, this.caseStepSource);
  }
}
