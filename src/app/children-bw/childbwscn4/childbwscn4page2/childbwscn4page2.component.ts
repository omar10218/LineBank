import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Childbwscn4Service } from '../childbwscn4.service';

@Component({
  selector: 'app-childbwscn4page2',
  templateUrl: './childbwscn4page2.component.html',
  styleUrls: ['./childbwscn4page2.component.css']
})
export class Childbwscn4page2Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private Childbwscn4Service: Childbwscn4Service,

  ) { }

  private applno: string;
  private cuid: string;
  DEPOSITSource: Data[] = [];
  SAVING_TRANS_DETAILSource: Data[] = [];
  DM_DEP_TRANS_DETAILSource: Data[] = [];
  TIME_DEP_TRANS_DETAILSource: Data[] = [];
  DEPOSIT_STATIS_DATASource: Data[] = [];
  total = 1;
  loading = false;
  pageSize = 5;
  pageIndex = 1;


  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('nationalId');
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;

  ngAfterViewInit() {
    this.getCoreCusInfo('DEPOSIT', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('SAVING_TRANS_DETAIL', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('DM_DEP_TRANS_DETAIL', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('TIME_DEP_TRANS_DETAIL', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('DEPOSIT_STATIS_DATA', this.pageIndex, this.pageSize);
  }
  getCoreCusInfo(code: string, pageIndex: number, pageSize: number) {
    let jsonObject: any = {};
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    jsonObject['applno'] = this.applno;
    jsonObject['cuid'] = this.cuid;
    jsonObject['code'] = code;
    const baseUrl = 'f01/childBwScn4action';
    this.Childbwscn4Service.getDate(baseUrl,jsonObject).subscribe(data => {
    console.log(data)
      this.totalCount = data.rspBody.size;
      if (code == 'DEPOSIT') { this.DEPOSITSource = data.rspBody.items; }
      if (code == 'SAVING_TRANS_DETAIL') { this.SAVING_TRANS_DETAILSource = data.rspBody.items; }
      if (code == 'DM_DEP_TRANS_DETAIL') { this.DM_DEP_TRANS_DETAILSource = data.rspBody.items; }
      if (code == 'TIME_DEP_TRANS_DETAIL') { this.TIME_DEP_TRANS_DETAILSource = data.rspBody.items; }
      if (code == 'DEPOSIT_STATIS_DATA') { this.DEPOSIT_STATIS_DATASource = data.rspBody.items; }
      console.log(this.SAVING_TRANS_DETAILSource)
    });
  }
  toCurrency(amount: string) {
    return amount != null ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : amount;
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}
