import { F01001scn6Service } from './../f01001scn6.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f01001scn6page23',
  templateUrl: './f01001scn6page23.component.html',
  styleUrls: ['./f01001scn6page23.component.css','../../../../assets/css/f01.css']
})
export class F01001scn6page23Component implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private f01001scn6Service: F01001scn6Service) { }
  private applno: string;
  private cuid: string;
  private queryDate: string;
  currentPage: PageEvent;
  currentSort: Sort;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.cuid = params['cuid'];
      this.queryDate = params['queryDate'];
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
  KRM048Source = new MatTableDataSource<any>();

  ngAfterViewInit(): void {
    this.getKRM048();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getKRM048();
    });
  }
  getKRM048() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'KRM048');
    formdata.append('queryDate', this.queryDate);
    formdata.append('page', `${this.currentPage.pageIndex + 1}`);
    formdata.append('per_page', `${this.currentPage.pageSize}`);
    this.f01001scn6Service.getJCICSearch(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.KRM048Source.data = data.rspBody.items;
    });
  }
}
