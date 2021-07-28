import { F01001scn6Service } from './../f01001scn6.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f01001scn6page28',
  templateUrl: './f01001scn6page28.component.html',
  styleUrls: ['./f01001scn6page28.component.css', '../../../../assets/css/f01.css']
})
export class F01001scn6page28Component implements OnInit, AfterViewInit {

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
  KRM043Source = new MatTableDataSource<any>();

  ngAfterViewInit(): void {
    this.getKRM043();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getKRM043();
    });
  }

  getKRM043() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'KRM043');
    formdata.append('queryDate', '20210109');
    formdata.append('page', `${this.currentPage.pageIndex + 1}`);
    formdata.append('per_page', `${this.currentPage.pageSize}`);
    this.f01001scn6Service.getJCICSearch(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.KRM043Source.data = data.rspBody.items;
    });
  }
}
