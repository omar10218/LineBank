import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data } from '@angular/router';
import { ChildrenService } from '../../children.service';
import { Childscn9Service } from '../childscn9.service';

@Component({
  selector: 'app-childscn9page3',
  templateUrl: './childscn9page3.component.html',
  styleUrls: ['./childscn9page3.component.css', '../../../../assets/css/child.css']
})
export class Childscn9page3Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private childscn9Service: Childscn9Service,
  ) { }

  private applno: string;
  private cuid: string;
  currentPage: PageEvent;
  currentSort: Sort;
  INSTALLMENT_ACCSource: Data[] = [];
  REVOLVING_ACCSource: Data[] = [];
  INST_TRANS_DETAILSource: Data[] = [];
  REV_TRANS_DETAILSource: Data[] = [];
  APPR_STATIS_DATASource: Data[] = [];
  OVERDUE_STATIS_DATASource: Data[] = [];
  CON_PROD_STATIS_DATASource: Data[] = [];
  UNCLOSED_STATIS_DATASource: Data[] = [];
  CLOSED_STATIS_DATASource: Data[] = [];
  INSTAL_APPL_INFOSource: Data[] = [];
  total = 1;
  loading = false;
  pageSize = 5;
  pageIndex = 1;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');

    this.currentPage = {
      pageIndex: 0,
      pageSize: 5,
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

  ngAfterViewInit() {
    this.getCoreCusInfo('INSTALLMENT_ACC', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('REVOLVING_ACC', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('INST_TRANS_DETAIL', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('REV_TRANS_DETAIL', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('APPR_STATIS_DATA', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('OVERDUE_STATIS_DATA', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('CON_PROD_STATIS_DATA', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('UNCLOSED_STATIS_DATA', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('CLOSED_STATIS_DATA', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('INSTAL_APPL_INFO', this.pageIndex, this.pageSize);
  }

  getCoreCusInfo(code: string, pageIndex: number, pageSize: number) {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['cuid'] = this.cuid;
    jsonObject['code'] = 'CORE_CUS_INFO';
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;

    this.childscn9Service.getCoreCusInfo(jsonObject).subscribe(data => {
      this.totalCount = data.rspBody.size;
      if (code == 'INSTALLMENT_ACC') { this.INSTALLMENT_ACCSource = data.rspBody.items; }
      if (code == 'REVOLVING_ACC') { this.REVOLVING_ACCSource = data.rspBody.items; }
      if (code == 'INST_TRANS_DETAIL') { this.INST_TRANS_DETAILSource = data.rspBody.items; }
      if (code == 'REV_TRANS_DETAIL') { this.REV_TRANS_DETAILSource = data.rspBody.items; }
      if (code == 'APPR_STATIS_DATA') { this.APPR_STATIS_DATASource = data.rspBody.items; }
      if (code == 'OVERDUE_STATIS_DATA') { this.OVERDUE_STATIS_DATASource = data.rspBody.items; }
      if (code == 'CON_PROD_STATIS_DATA') { this.CON_PROD_STATIS_DATASource = data.rspBody.items; }
      if (code == 'UNCLOSED_STATIS_DATA') { this.UNCLOSED_STATIS_DATASource = data.rspBody.items; }
      if (code == 'CLOSED_STATIS_DATA') { this.CLOSED_STATIS_DATASource = data.rspBody.items; }
      if (code == 'INSTAL_APPL_INFO') { this.INSTAL_APPL_INFOSource = data.rspBody.items; }
    });
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}
