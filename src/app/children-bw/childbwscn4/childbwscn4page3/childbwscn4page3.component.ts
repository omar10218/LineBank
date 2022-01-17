import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Childbwscn4Service } from '../childbwscn4.service';

@Component({
  selector: 'app-childbwscn4page3',
  templateUrl: './childbwscn4page3.component.html',
  styleUrls: ['./childbwscn4page3.component.css']
})
export class Childbwscn4page3Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private Childbwscn4Service: Childbwscn4Service,
  ) { }

  private applno: string;
  private cuid: string;
  currentPage: PageEvent;
  currentSort: Sort;
  PROD_DETAILSource: Data[] = [];
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
  DC_TRANS_DETAILSource: Data[] = [];
  total = 1;
  loading = false;
  pageSize = 5;
  pageIndex = 1;


  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('nationalId');

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
    this.getCoreCusInfo('PROD_DETAIL', this.pageIndex, this.pageSize);
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
    this.getCoreCusInfo('DC_TRANS_DETAIL', this.pageIndex, this.pageSize);
  }

  async getCoreCusInfo(code: string, pageIndex: number, pageSize: number) {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['cuid'] = this.cuid;
    jsonObject['code'] = code;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;

    this.Childbwscn4Service.getCoreCusInfo(jsonObject).subscribe(data => {
      console.log(data)
      this.totalCount = data.rspBody.size;
      if (code == 'PROD_DETAIL') { this.PROD_DETAILSource = data.rspBody.items; }
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
      if (code == 'DC_TRANS_DETAIL') { this.DC_TRANS_DETAILSource = data.rspBody.items; }
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getCoreCusInfo('PROD_DETAIL', this.pageIndex, this.pageSize);
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
    this.getCoreCusInfo('DC_TRANS_DETAIL', this.pageIndex, this.pageSize);
  }

}
