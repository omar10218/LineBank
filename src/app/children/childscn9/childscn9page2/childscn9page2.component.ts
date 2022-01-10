import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ChildrenService } from '../../children.service';
import { Childscn9Service } from '../childscn9.service';

@Component({
  selector: 'app-childscn9page2',
  templateUrl: './childscn9page2.component.html',
  styleUrls: ['./childscn9page2.component.css', '../../../../assets/css/child.css']
})
export class Childscn9page2Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private childscn9Service: Childscn9Service,
  ) { }

  private applno: string;
  private cuid: string;
  DEPOSITSource: Data[] = [];
  SAVING_TRANS_DETAILSource: Data[] = [];
  DEPOSIT_STATIS_DATASource: Data[] = [];
  total = 1;
  loading = false;
  pageSize = 5;
  pageIndex = 1;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;

  ngAfterViewInit() {
    this.getCoreCusInfo('DEPOSIT', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('DEPOSIT_STATIS_DATA', this.pageIndex, this.pageSize);
    this.getSavingDetail(this.pageIndex, this.pageSize);
  }

  getCoreCusInfo(code: string, pageIndex: number, pageSize: number) {
    let jsonObject: any = {};
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    jsonObject['applno'] = this.applno;
    jsonObject['cuid'] = this.cuid;
    jsonObject['code'] = code;
    const baseUrl = 'f01/childscn9action';

    this.childscn9Service.getData(baseUrl,jsonObject).subscribe(data => {
      this.totalCount = data.rspBody.size;
      if (code == 'DEPOSIT') { this.DEPOSITSource = data.rspBody.items; }
      if (code == 'DEPOSIT_STATIS_DATA') { this.DEPOSIT_STATIS_DATASource = data.rspBody.items; }
    });
  }

  getSavingDetail(pageIndex: number, pageSize: number) {
    let jsonObject: any = {};
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    jsonObject['applno'] = this.applno;
    const baseUrl = 'f01/childscn9action4';

    this.childscn9Service.getData(baseUrl, jsonObject).subscribe(datas => {
        this.SAVING_TRANS_DETAILSource = datas.rspBody.tableList;
    });
  }

  toCurrency(amount: string) {
    return amount != null ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : amount;
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

