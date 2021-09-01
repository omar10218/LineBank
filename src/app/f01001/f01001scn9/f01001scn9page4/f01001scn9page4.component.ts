import { Component, OnInit, ViewChild } from '@angular/core';
import { F01001scn9Service } from './../f01001scn9.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-f01001scn9page4',
  templateUrl: './f01001scn9page4.component.html',
  styleUrls: ['./f01001scn9page4.component.css', '../../../../assets/css/f01.css']
})
export class F01001scn9page4Component implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private f01001scn9Service: F01001scn9Service) { }
  private applno: string;
  private cuid: string;
  private search: string;
  currentPage: PageEvent;
  currentSort: Sort;
  dcTransDetailSource = new MatTableDataSource<any>();
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.cuid = params['cuid'];
    });

    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
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
      this.getCoreCusInfo('DC_TRANS_DETAIL', this.dcTransDetailSource);
      this.paginator.page.subscribe((page: PageEvent) => {
        this.currentPage = page;
        this.getCoreCusInfo('DC_TRANS_DETAIL', this.dcTransDetailSource);
      });
    }

  getCoreCusInfo(code: string, source: MatTableDataSource<any>) {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', code);
    formdata.append('page', `${this.currentPage.pageIndex + 1}`);
    formdata.append('per_page', `${this.currentPage.pageSize}`);
    this.f01001scn9Service.getCoreCusInfo(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      source.data = data.rspBody.items;
    });
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

