import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { MappingCode } from 'src/app/mappingcode.model';
import { ChildrenService } from '../children.service';
import { Childscn13Service } from './childscn13.service';
import { Childscn13addComponent } from './childscn13add/childscn13add.component';
import { Childscn13deleteComponent } from './childscn13delete/childscn13delete.component';
import { Childscn13editComponent } from './childscn13edit/childscn13edit.component';
import { Childscn13showComponent } from './childscn13show/childscn13show.component';

@Component({
  selector: 'app-childscn13',
  templateUrl: './childscn13.component.html',
  styleUrls: ['./childscn13.component.css']
})
export class Childscn13Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private childscn13Service: Childscn13Service,
    public dialog: MatDialog,
    public childService: ChildrenService
  ) { }

  private applno: string;
  private search: string;
  private cuid: string;
  currentPage: PageEvent;
  currentSort: Sort;

  ngOnInit(): void {
    const caseParams = this.childService.getData();
    this.applno = caseParams.applno;
    this.search = caseParams.search;
    this.cuid = caseParams.cuid;

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

  getSearch(): String {
    return this.search;
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  webInfoSource = new MatTableDataSource<any>();
  webAddrOption: MappingCode[];

  ngAfterViewInit() {
    this.getWebInfo();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getWebInfo();
    });
  }

  getWebInfo() {
    const formdata: FormData = new FormData();
    formdata.append('page', `${this.currentPage.pageIndex + 1}`);
    formdata.append('per_page', `${this.currentPage.pageSize}`);
    formdata.append('applno', this.applno);
    this.childscn13Service.getWebInfo(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.webInfoSource.data = data.rspBody.items;
      this.webAddrOption = data.rspBody.webAddr;
    });
  }

  openView(web_img: any) {
    let base64String = 'data:image/jpeg;base64,' + web_img;
    const dialogRef = this.dialog.open(Childscn13showComponent, {
      data: { base64Str: base64String }
    });
  }

  getOptionDesc(codeVal: string): string {
    for (const data of this.webAddrOption) {
      if (data.codeNo == codeVal) {
        return data.codeDesc;
        break;
      }
    }
    return codeVal;
  }

  addNew() {
    const dialogRef = this.dialog.open(Childscn13addComponent, {
      data: {
        applno: this.applno,
        search: this.search,
        webAddrOption: this.webAddrOption
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  startEdit(i: number, rowid: string, webCode: string, webUrl: string, msgContent: string, webImg: string) {
    const dialogRef = this.dialog.open(Childscn13editComponent, {
      data: {
        webAddrValue: webCode + '=' + webUrl,
        webAddrOption: this.webAddrOption,
        webAddrUrl: webUrl,
        search: this.search,
        webInfoContent: msgContent,
        base64: webImg,
        rowId: rowid
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  deleteItem(i: number, rowid: string, webCode: string, webUrl: string, msgContent: string, webImg: string) {
    const dialogRef = this.dialog.open(Childscn13deleteComponent, {
      data: {
        webAddrValue: webCode + '=' + webUrl,
        webAddrOption: this.webAddrOption,
        webAddrUrl: webUrl,
        search: this.search,
        webInfoContent: msgContent,
        base64: webImg,
        rowId: rowid
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
