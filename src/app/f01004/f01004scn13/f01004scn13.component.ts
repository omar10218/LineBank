import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MappingCode } from 'src/app/mappingcode.model';
import { F01004scn13Service } from './f01004scn13.service';
import { F01004scn13addComponent } from './f01004scn13add/f01004scn13add.component';
import { F01004scn13deleteComponent } from './f01004scn13delete/f01004scn13delete.component';
import { F01004scn13editComponent } from './f01004scn13edit/f01004scn13edit.component';
import { F01004scn13showComponent } from './f01004scn13show/f01004scn13show.component';

@Component({
  selector: 'app-f01004scn13',
  templateUrl: './f01004scn13.component.html',
  styleUrls: ['./f01004scn13.component.css']
})
export class F01004scn13Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private f01004scn13Service: F01004scn13Service, public dialog: MatDialog) { }
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
    this.f01004scn13Service.getWebInfo(formdata).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.webInfoSource.data = data.rspBody.items;
      this.webAddrOption = data.rspBody.webAddr;
    });
  }

  openView(web_img: any) {
    let base64String = 'data:image/jpeg;base64,' + web_img;
    const dialogRef = this.dialog.open(F01004scn13showComponent, {
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
    const dialogRef = this.dialog.open(F01004scn13addComponent, {
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
    const dialogRef = this.dialog.open(F01004scn13editComponent, {
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
    const dialogRef = this.dialog.open(F01004scn13deleteComponent, {
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
