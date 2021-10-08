import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { MappingCode } from 'src/app/mappingcode.model';
import { Childscn13Service } from './childscn13.service';
import { Childscn13addComponent } from './childscn13add/childscn13add.component';
import { Childscn13deleteComponent } from './childscn13delete/childscn13delete.component';
import { Childscn13editComponent } from './childscn13edit/childscn13edit.component';
import { Childscn13showComponent } from './childscn13show/childscn13show.component';

@Component({
  selector: 'app-childscn13',
  templateUrl: './childscn13.component.html',
  styleUrls: ['./childscn13.component.css','../../../assets/css/child.css']
})
export class Childscn13Component implements OnInit {

  constructor(
    private childscn13Service: Childscn13Service,
    public dialog: MatDialog
  ) { }

  private applno: string;
  private search: string;
  private cuid: string;

  webInfoSource: readonly Data[] = [];
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  webAddrOption: MappingCode[];

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    this.search = sessionStorage.getItem('search');
  }

  getApplno(): String {
    return this.applno;
  }

  getSearch(): String {
    return this.search;
  }

  ngAfterViewInit() {
    this.getWebInfo( this.pageIndex, this.pageSize );
  }

  getWebInfo( pageIndex: number, pageSize: number ) {
    const baseurl = 'f01/childscn13';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.childscn13Service.getWebInfo( baseurl, jsonObject ).subscribe(data => {
      console.log(data.rspBody.items)
      this.loading = false;
      this.total = data.rspBody.size;
      this.webInfoSource = data.rspBody.items;
      this.webAddrOption = data.rspBody.webAddr;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getWebInfo( pageIndex, pageSize);
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

  startEdit( rowid: string, webCode: string, webUrl: string, msgContent: string, webImg: string) {
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

  deleteItem( rowid: string, webCode: string, webUrl: string, msgContent: string, webImg: string) {
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
    this.changePage();
    this.getWebInfo( this.pageIndex, this.pageSize );
  }

  changePage() {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.total = 1;
  }
}
