import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { F01001scn12Service } from './f01001scn12.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MappingCode } from 'src/app/mappingcode.model';
import { MatDialog } from '@angular/material/dialog';
import { F01001scn12addComponent } from './f01001scn12add/f01001scn12add.component';
import { F01001scn12editComponent } from './f01001scn12edit/f01001scn12edit.component';
import { F01001scn12deleteComponent } from './f01001scn12delete/f01001scn12delete.component';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01001scn12',
  templateUrl: './f01001scn12.component.html',
  styleUrls: ['./f01001scn12.component.css']
})
export class F01001scn12Component implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private f01001scn12Service: F01001scn12Service, public dialog: MatDialog) { }
  private applno: string;
  private search: string;
  currentPage: PageEvent;
  currentSort: Sort;
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

  getSearch(): string {
    return this.search;
  }
  //===========================================================================
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
    this.f01001scn12Service.getInComeFunction(formdata).subscribe(data => {
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
    const dialogRef = this.dialog.open(F01001scn12addComponent, {
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
    const dialogRef = this.dialog.open(F01001scn12editComponent, {
      data: {
        applno: this.applno,
        search: this.search,
        incomeTypeOption: this.incomeTypeOption,
        incomeType: incomeType,
        cuId: cuId,
        cuCname : cuCname,
        num: num,
        mincomeExp: mincomeExp
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  deleteItem(i: number, incomeType: string, cuId: string, cuCname: string, num: string, mincomeExp: string) {
    const dialogRef = this.dialog.open(F01001scn12deleteComponent, {
      data: {
        applno: this.applno,
        search: this.search,
        incomeTypeOption: this.incomeTypeOption,
        incomeType: incomeType,
        cuId: cuId,
        cuCname : cuCname,
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
