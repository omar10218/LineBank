import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { F01001scn6Service } from '../f01001scn6.service';

@Component({
  selector: 'app-f01001scn6page7',
  templateUrl: './f01001scn6page7.component.html',
  styleUrls: ['./f01001scn6page7.component.css','../../../../assets/css/f01.css']
})
export class F01001scn6page7Component implements OnInit, AfterViewInit {

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
  BAS006Source = new MatTableDataSource<any>();

  ngAfterViewInit() {
    this.getBAS006();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getBAS006();
    });
  }

  getBAS006(){
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'BAS006');
    //queryDate之後從父模組來，目前先寫死(父模組日期取抓資料庫匯入下拉選單)
    formdata.append('queryDate', this.queryDate);
    formdata.append('page', `${this.currentPage.pageIndex + 1}`);
    formdata.append('per_page', `${this.currentPage.pageSize}`);
    this.f01001scn6Service.getJCICSearch(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.BAS006Source.data = data.rspBody.items;
    });
  }
}
