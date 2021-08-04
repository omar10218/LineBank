import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { F01001scn10Service } from './../f01001scn10.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

//日期
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01001scn10page1',
  templateUrl: './f01001scn10page1.component.html',
  styleUrls: ['./f01001scn10page1.component.css','../../../../assets/css/f01.css']
})
export class F01001scn10page1Component implements OnInit, AfterViewInit {

  //日期
  dateCode: dateCode[] = [];
  dateValue: string;

  constructor(private route: ActivatedRoute, private f01001scn10Service: F01001scn10Service) { }
  private applno: string;
  private cuid: string;
  private queryDate: string;
  private search: string;
  currentPage: PageEvent;
  currentSort: Sort;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.cuid = params['cuid'];
      this.search = params['search'];
      this.queryDate = params['queryDate'];
    });

    const url = 'f01/f01001scn10';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'DSS1');
    this.f01001scn10Service.getDate(url, formdata).subscribe(data => {
      for (let i = 0; i < data.rspBody.items.length; i++) {
        this.dateCode.push({value: data.rspBody.items[i].QUERYDATE , viewValue: data.rspBody.items[i].QUERYDATE })
      }
      this.dateValue = data.rspBody.items[0].QUERYDATE
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
  DSS1Source = new MatTableDataSource<any>();

  ngAfterViewInit() {
    this.getDSS1(this.queryDate);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getDSS1(this.queryDate);
    });
  }

  getDSS1(dateValue: string) {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'DSS1');
    formdata.append('queryDate', dateValue);
    formdata.append('page', `${this.currentPage.pageIndex + 1}`);
    formdata.append('per_page', `${this.currentPage.pageSize}`);
    this.f01001scn10Service.getDSSSearch(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.DSS1Source.data = data.rspBody.items;
    });
  }

  //日期
  getSearch() :string {
    return this.search;
  }
  changeDate() {
     this.getDSS1(this.dateValue);
   }
}
