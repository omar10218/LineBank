import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Childscn4Service } from './childscn4.service';


@Component({
  selector: 'app-childscn4',
  templateUrl: './childscn4.component.html',
  styleUrls: ['./childscn4.component.css','../../../assets/css/f01.css']
})
export class Childscn4Component implements OnInit {

  constructor(
    private childscn4Service: Childscn4Service,
    public dialog: MatDialog
  ) { }

  private applno: string;
  private search: string;
  currentPage: PageEvent;
  currentSort: Sort;
  caseStepSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');

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
    this.childscn4Service.getCaseStep(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.caseStepSource.data = data.rspBody.items;
    });
  }
}
