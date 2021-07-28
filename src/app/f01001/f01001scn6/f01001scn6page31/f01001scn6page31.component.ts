
import { F01001scn6Service } from './../f01001scn6.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f01001scn6page31',
  templateUrl: './f01001scn6page31.component.html',
  styleUrls: ['./f01001scn6page31.component.css','../../../../assets/css/f01.css']
})
export class F01001scn6page31Component implements OnInit {

  constructor(private route: ActivatedRoute, private f01001scn6Service: F01001scn6Service) { }
  private applno: string;
  private cuid: string;
  currentPage: PageEvent;
  currentSort: Sort;

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
  KCM012Source = new MatTableDataSource<any>();

  ngAfterViewInit() {
    this.getKCM012();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getKCM012();
    });
  }

  getKCM012() {
    console.log("案件編號="+this.applno);
    console.log("代碼=KCM012");
    console.log("ID="+this.cuid);
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'KCM012');
    //queryDate之後從父模組來，目前先寫死(父模組日期取抓資料庫匯入下拉選單)
    formdata.append('queryDate', '20210109');
    formdata.append('page', `${this.currentPage.pageIndex + 1}`);
    formdata.append('per_page', `${this.currentPage.pageSize}`);
    this.f01001scn6Service.getJCICSearch(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.KCM012Source.data = data.rspBody.items;
    });
  }

}
