import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { MappingCode } from '../mappingcode.model';
import { F03011Service } from './f03011.service';
import { F03011addComponent } from './f03011add/f03011add.component';
import { F03011deleteComponent } from './f03011delete/f03011delete.component';
import { F03011editComponent } from './f03011edit/f03011edit.component';

@Component({
  selector: 'app-f03011',
  templateUrl: './f03011.component.html',
  styleUrls: ['./f03011.component.css','../../assets/css/f03.css']
})
export class F03011Component implements OnInit, AfterViewInit {

  constructor(
    private fb: FormBuilder,
    private f03011Service: F03011Service,
    public dialog: MatDialog
  ) { }

  currentPage: PageEvent;
  currentSort: Sort;
  submitted = false;
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  dssCalloutSource = new MatTableDataSource<any>();
  tvnoOption: MappingCode[];
  calvOption: MappingCode[];
  scklvOption: MappingCode[];

  ngOnInit(): void {
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

  ngAfterViewInit(): void {
    this.getDssCallout();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getDssCallout();
    });
  }

  getDssCallout() {
    const baseUrl = 'f03/f03011scn1';
    let jsonObject: any = {};
    jsonObject['page'] = this.currentPage.pageIndex + 1;
    jsonObject['per_page'] = this.currentPage.pageSize;
    this.f03011Service.dssCallout(baseUrl, jsonObject).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.dssCalloutSource.data = data.rspBody.items;
      this.tvnoOption = data.rspBody.tvno;
      this.calvOption = data.rspBody.calv;
      this.scklvOption = data.rspBody.scklv;
    });
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getOptionscklv(codeVal: string): string {
    for (const data of this.scklvOption) {
      if (data.codeNo == codeVal) {
        return data.codeDesc;
        break;
      }
    }
    return codeVal;
  }

  getOptioncalv(codeVal: string): string {
    for (const data of this.calvOption) {
      if (data.codeNo == codeVal) {
        return data.codeDesc;
        break;
      }
    }
    return codeVal;
  }

  getOptiontvNo(codeVal: string): string {
    for (const data of this.tvnoOption) {
      if (data.codeNo == codeVal) {
        return data.codeDesc;
        break;
      }
    }
    return codeVal;
  }

  add(){
    const dialogRef = this.dialog.open(F03011addComponent, {
      minHeight: '100vh',
      width: '50%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
        window.location.reload();
      });
  }

  startEdit(tvNo: string, scklv: string, calv: string) {
    const dialogRef = this.dialog.open(F03011editComponent, {
      minHeight: '100vh',
      width: '50%',
      data: {
        tvNo: tvNo,
        scklv : scklv ,
        calv: calv
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
        window.location.reload();
      });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  delete(tvNo: string, scklv: string, calv: string) {
    const dialogRef = this.dialog.open(F03011deleteComponent, {
      minHeight: '30%',
      width: '70%',
      data: {
        tvNo: tvNo,
        scklv : scklv ,
        calv: calv
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == '刪除成功!') {
          this.refreshTable();
          window.location.reload();
        }
      });
  }
}
