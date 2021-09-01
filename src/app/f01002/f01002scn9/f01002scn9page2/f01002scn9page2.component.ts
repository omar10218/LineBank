import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { F01002scn9Service } from '../f01002scn9.service';

@Component({
  selector: 'app-f01002scn9page2',
  templateUrl: './f01002scn9page2.component.html',
  styleUrls: ['./f01002scn9page2.component.css', '../../../../assets/css/f01.css']
})
export class F01002scn9page2Component implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private f01002scn9Service: F01002scn9Service) { }
  private applno: string;
  private cuid: string;
  private search: string;
  currentPage: PageEvent;
  currentSort: Sort;
  DEPOSITSource = new MatTableDataSource<any>();
  DM_DEP_TRANS_DETAILSource = new MatTableDataSource<any>();
  TIME_DEP_TRANS_DETAILSource = new MatTableDataSource<any>();
  DEPOSIT_STATIS_DATASource = new MatTableDataSource<any>();

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
    this.getCoreCusInfo('DEPOSIT', this.DEPOSITSource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('DEPOSIT', this.DEPOSITSource);
    });

    this.getCoreCusInfo('DM_DEP_TRANS_DETAIL', this.DM_DEP_TRANS_DETAILSource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('DM_DEP_TRANS_DETAIL', this.DM_DEP_TRANS_DETAILSource);
    });

    this.getCoreCusInfo('TIME_DEP_TRANS_DETAIL', this.TIME_DEP_TRANS_DETAILSource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('TIME_DEP_TRANS_DETAIL', this.TIME_DEP_TRANS_DETAILSource);
    });

    this.getCoreCusInfo('DEPOSIT_STATIS_DATA', this.DEPOSIT_STATIS_DATASource);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCoreCusInfo('DEPOSIT_STATIS_DATA', this.DEPOSIT_STATIS_DATASource);
    });
  }

  getCoreCusInfo(code: string, source: MatTableDataSource<any>) {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', code);
    formdata.append('page', `${this.currentPage.pageIndex + 1}`);
    formdata.append('per_page', `${this.currentPage.pageSize}`);
    this.f01002scn9Service.getCoreCusInfo(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      source.data = data.rspBody.items;
    });
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}
