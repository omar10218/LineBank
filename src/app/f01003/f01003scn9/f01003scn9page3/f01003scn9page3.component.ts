import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { F01003scn9Service } from '../f01003scn9.service';

@Component({
  selector: 'app-f01003scn9page3',
  templateUrl: './f01003scn9page3.component.html',
  styleUrls: ['./f01003scn9page3.component.css', '../../../../assets/css/f01.css']
})
export class F01003scn9page3Component implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private f01003scn9Service: F01003scn9Service) { }
  private applno: string;
  private cuid: string;
  private search: string;
  currentPage: PageEvent;
  currentSort: Sort;
  INSTALLMENT_ACCSource = new MatTableDataSource<any>();
  REVOLVING_ACCSource = new MatTableDataSource<any>();
  INST_TRANS_DETAILSource = new MatTableDataSource<any>();
  REV_TRANS_DETAILSource = new MatTableDataSource<any>();
  APPR_STATIS_DATASource = new MatTableDataSource<any>();
  OVERDUE_STATIS_DATASource = new MatTableDataSource<any>();
  CON_PROD_STATIS_DATASource = new MatTableDataSource<any>();
  UNCLOSED_STATIS_DATASource = new MatTableDataSource<any>();
  CLOSED_STATIS_DATASource = new MatTableDataSource<any>();
  INSTAL_APPL_INFOSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.cuid = params['cuid'];
    });

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
    this.getCoreCusInfo('INSTALLMENT_ACC', this.INSTALLMENT_ACCSource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('INSTALLMENT_ACC', this.INSTALLMENT_ACCSource);
    });

    this.getCoreCusInfo('REVOLVING_ACC', this.REVOLVING_ACCSource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('REVOLVING_ACC', this.REVOLVING_ACCSource);
    });

    this.getCoreCusInfo('INST_TRANS_DETAIL', this.INST_TRANS_DETAILSource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('INST_TRANS_DETAIL', this.INST_TRANS_DETAILSource);
    });

    this.getCoreCusInfo('REV_TRANS_DETAIL', this.REV_TRANS_DETAILSource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('REV_TRANS_DETAIL', this.REV_TRANS_DETAILSource);
    });

    this.getCoreCusInfo('APPR_STATIS_DATA', this.APPR_STATIS_DATASource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('APPR_STATIS_DATA', this.APPR_STATIS_DATASource);
    });

    this.getCoreCusInfo('OVERDUE_STATIS_DATA', this.OVERDUE_STATIS_DATASource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('OVERDUE_STATIS_DATA', this.OVERDUE_STATIS_DATASource);
    });

    this.getCoreCusInfo('CON_PROD_STATIS_DATA', this.CON_PROD_STATIS_DATASource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('CON_PROD_STATIS_DATA', this.CON_PROD_STATIS_DATASource);
    });

    this.getCoreCusInfo('UNCLOSED_STATIS_DATA', this.UNCLOSED_STATIS_DATASource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('UNCLOSED_STATIS_DATA', this.UNCLOSED_STATIS_DATASource);
    });

    this.getCoreCusInfo('CLOSED_STATIS_DATA', this.CLOSED_STATIS_DATASource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('CLOSED_STATIS_DATA', this.CLOSED_STATIS_DATASource);
    });

    this.getCoreCusInfo('INSTAL_APPL_INFO', this.INSTAL_APPL_INFOSource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('INSTAL_APPL_INFO', this.INSTAL_APPL_INFOSource);
    });
  }

  getCoreCusInfo(code: string, source: MatTableDataSource<any>) {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', code);
    formdata.append('page', `${this.currentPage.pageIndex + 1}`);
    formdata.append('per_page', `${this.currentPage.pageSize}`);
    this.f01003scn9Service.getCoreCusInfo(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      source.data = data.rspBody.items;
    });
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}
