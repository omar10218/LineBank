import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowComponent } from 'src/app/f01002/f01002scn13/show/show.component';
import { MappingCode } from 'src/app/mappingcode.model';
import { F01002scn13Service } from './f01001scn13.service';
import { F01002scn13addComponent } from './f01002scn13add/f01002scn13add.component';
import { F01002scn13deleteComponent } from './f01002scn13delete/f01002scn13delete.component';
import { F01002scn13editComponent } from './f01002scn13edit/f01002scn13edit.component';

@Component({
  selector: 'app-f01002scn13',
  templateUrl: './f01002scn13.component.html',
  styleUrls: ['./f01002scn13.component.css']
})
export class F01002scn13Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private f01002scn13Service: F01002scn13Service, public dialog: MatDialog) { }
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
    this.f01002scn13Service.getWebInfo(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.webInfoSource.data = data.rspBody.items;
      this.webAddrOption = data.rspBody.webAddr;
    });
  }

  openView(web_img: any) {
    let base64String = 'data:image/jpeg;base64,' + web_img;
    const dialogRef = this.dialog.open(ShowComponent, {
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
    const dialogRef = this.dialog.open(F01002scn13addComponent, {
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
    const dialogRef = this.dialog.open(F01002scn13editComponent, {
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
    const dialogRef = this.dialog.open(F01002scn13deleteComponent, {
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
