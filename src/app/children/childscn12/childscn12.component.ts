import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MappingCode } from 'src/app/mappingcode.model';
import { Childscn12Service } from './childscn12.service';
import { Childscn12addComponent } from './childscn12add/childscn12add.component';
import { Childscn12deleteComponent } from './childscn12delete/childscn12delete.component';
import { Childscn12editComponent } from './childscn12edit/childscn12edit.component';
interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn12',
  templateUrl: './childscn12.component.html',
  styleUrls: ['./childscn12.component.css']
})
export class Childscn12Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private childscn12Service: Childscn12Service, public dialog: MatDialog) { }
  private applno: string;
  private search: string;
  private cuid: string;
  currentPage: PageEvent;
  currentSort: Sort;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
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

  getApplno(): String {
    return this.applno;
  }

  getSearch(): string {
    return this.search;
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  applIncomeSource = new MatTableDataSource<any>();
  incomeTypeOption: MappingCode[];

  ngAfterViewInit() {
    this.getInComeList();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getInComeList();
    });
  }

  getInComeList() {
    const formdata: FormData = new FormData();
    formdata.append('page', `${this.currentPage.pageIndex + 1}`);
    formdata.append('per_page', `${this.currentPage.pageSize}`);
    formdata.append('applno', this.applno);
    this.childscn12Service.getInComeFunction(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.applIncomeSource.data = data.rspBody.items;
      this.incomeTypeOption = data.rspBody.incomeType;
    });
  }

  getOptionDesc(codeVal: string): string {
    for (const data of this.incomeTypeOption) {
      if (data.codeNo == codeVal) {
        return data.codeDesc;
        break;
      }
    }
    return codeVal;
  }

  addNew() {
    const dialogRef = this.dialog.open(Childscn12addComponent, {
      data: {
        applno: this.applno,
        search: this.search,
        incomeTypeOption: this.incomeTypeOption
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  startEdit(i: number, incomeType: string, cuId: string, cuCname: string, num: string, mincomeExp: string) {
    const dialogRef = this.dialog.open(Childscn12editComponent, {
      data: {
        applno: this.applno,
        search: this.search,
        incomeTypeOption: this.incomeTypeOption,
        incomeType: incomeType,
        cuId: cuId,
        cuCname: cuCname,
        num: num,
        mincomeExp: mincomeExp
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  deleteItem(i: number, incomeType: string, cuId: string, cuCname: string, num: string, mincomeExp: string) {
    const dialogRef = this.dialog.open(Childscn12deleteComponent, {
      data: {
        applno: this.applno,
        search: this.search,
        incomeTypeOption: this.incomeTypeOption,
        incomeType: incomeType,
        cuId: cuId,
        cuCname: cuCname,
        num: num,
        mincomeExp: mincomeExp
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
    this.paginator.firstPage();
  }
}
