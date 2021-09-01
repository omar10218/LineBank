import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { F01002scn4Service } from './f01002scn4.service';

@Component({
  selector: 'app-f01002scn4',
  templateUrl: './f01002scn4.component.html',
  styleUrls: ['./f01002scn4.component.css','../../../assets/css/f01.css']
})
export class F01002scn4Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private f01002scn4Service: F01002scn4Service, public dialog: MatDialog) { }
  private applno: string;
  private search: string;
  currentPage: PageEvent;
  currentSort: Sort;
  caseStepSource = new MatTableDataSource<any>();
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
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

  getApplno(): String {
    return this.applno;
  }

  getSearch() :string {
    return this.search;
  }
  
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;

  ngAfterViewInit() {
    this.getCaseStep();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCaseStep();
    });
  }

  getCaseStep(){
    const formdata: FormData = new FormData();
    formdata.append('page', `${this.currentPage.pageIndex + 1}`);
    formdata.append('per_page', `${this.currentPage.pageSize}`);
    formdata.append('applno', this.applno);
    this.f01002scn4Service.getCaseStep(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.caseStepSource.data = data.rspBody.items;
    });
  }
}
