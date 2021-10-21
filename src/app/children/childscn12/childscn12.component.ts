import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { MappingCode } from 'src/app/mappingcode.model';
import { Childscn12Service } from './childscn12.service';
import { Childscn12addComponent } from './childscn12add/childscn12add.component';
import { Childscn12deleteComponent } from './childscn12delete/childscn12delete.component';
import { Childscn12editComponent } from './childscn12edit/childscn12edit.component';

@Component({
  selector: 'app-childscn12',
  templateUrl: './childscn12.component.html',
  styleUrls: ['./childscn12.component.css','../../../assets/css/child.css']
})
export class Childscn12Component implements OnInit {

  constructor(
    private childscn12Service: Childscn12Service,
    public dialog: MatDialog
  ) { }

  private applno: string;
  private search: string;

  applIncomeSource: readonly Data[] = [];
  total = 1;
  loading = true;
  pageIndex = 1;
  pageSize = 50;

  incomeTypeOption: MappingCode[];

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
  }

  ngAfterViewInit() {
    this.getInComeList( this.pageIndex, this.pageSize );
  }

  getInComeList( pageIndex: number, pageSize: number ) {
    const baseUrl = 'f01/childscn12';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.childscn12Service.getInComeFunction( baseUrl, jsonObject ).subscribe(data => {
      this.loading = false;
      this.total = data.rspBody.size;
      this.applIncomeSource = data.rspBody.items;
      this.incomeTypeOption = data.rspBody.incomeType;
    });
  }

  getSearch(): string {
    return this.search;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getInComeList( pageIndex, pageSize);
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
      minHeight: '70vh',
      width: '50%',
      panelClass: 'mat-dialog-transparent',
      data: {
        applno: this.applno,
        search: this.search,
        incomeTypeOption: this.incomeTypeOption,
        incomeType: '',
        cuId: '',
        cuCname: '',
        num: '',
        mincomeExp: 'N'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  startEdit( incomeType: string, cuId: string, cuCname: string, num: string, mincomeExp: string) {
    const dialogRef = this.dialog.open(Childscn12editComponent, {
      minHeight: '70vh',
      width: '50%',
      panelClass: 'mat-dialog-transparent',
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

  deleteItem( incomeType: string, cuId: string, cuCname: string, num: string, mincomeExp: string) {
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
    this.changePage();
    this.getInComeList( this.pageIndex, this.pageSize );
  }

  changePage() {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.total = 1;
  }
}
