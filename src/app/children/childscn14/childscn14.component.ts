import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DynamicDirective } from 'src/app/common-lib/directive/dynamic.directive';
import { Childscn6Service } from '../childscn6/childscn6.service';
import { Childscn14Service } from './childscn14.service';
// import { Childscn14page1Component } from './childscn14page1/childscn14page1.component';
// import { Childscn14page2Component } from './childscn14page2/childscn14page2.component';
import { Childscn14page3Component } from './childscn14page3/childscn14page3.component';

// enum Page {
//   Page1,
//   Page2,
//   Page3
// }

@Component({
  selector: 'app-childscn14',
  templateUrl: './childscn14.component.html',
  styleUrls: ['./childscn14.component.css', '../../../assets/css/child.css']
})
export class Childscn14Component implements OnInit {

  constructor(
    // private componenFactoryResolver: ComponentFactoryResolver,
    private childscn6Service: Childscn6Service,
    private childscn14Service: Childscn14Service,
    public dialog: MatDialog,
  ) { }

  @ViewChild(DynamicDirective) appDynamic: DynamicDirective;
  private applno: string;
  private search: string;
  private docKey: string;
  private cuid: string;
  private cuNm: string;
  private host: String;
  imageSource: Data[] = [];
  total = 1;
  loading = false;
  pageSize = 10;
  pageIndex = 1;
  // component = new Map<Page, any>(
  //   [
  //     [Page.Page1, Childscn14page1Component],
  //     [Page.Page2, Childscn14page2Component],
  //     [Page.Page3, Childscn14page3Component],
  //   ]
  // );
  // nowPage = Page.Page1;
  // readonly Page = Page;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.host = this.getHost();

    const baseUrl = 'f01/childscn6action2';
    let jsonObject: any = {};
    this.childscn6Service.getDate(baseUrl, jsonObject).subscribe(data => {
      this.cuid = data.rspBody[0].empNo;
      this.cuNm = data.rspBody[0].empName;
      this.getImageDetail(this.pageIndex, this.pageSize);
    });
  }

  ngAfterViewInit() {
    // this.changePage(this.nowPage);
  }

  getSearch() {
    return this.search;
  }

  // changePage( page: Page ): void {
  //   this.nowPage = page;
  //   const componentFactory = this.componenFactoryResolver.resolveComponentFactory( this.component.get(this.nowPage));
  //   const viewContainerRef = this.appDynamic.viewContainerRef;
  //   viewContainerRef.clear();
  //   const componentRef = viewContainerRef.createComponent(componentFactory);
  // }

  getHost(): String {
    var origin = window.location.origin;
    var host = origin.substring(0, origin.lastIndexOf(":"));
    return host;
  }

  getImageDetail(pageIndex: number, pageSize: number ) {
    const baseUrl = 'f01/childscn14action1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['cuid'] = this.cuid;
    jsonObject['cuNm'] = this.cuNm;
    this.childscn14Service.getImageInfo(baseUrl, jsonObject).subscribe(data => {
      this.docKey = data.rspBody.docKey;
      this.imageSource = data.rspBody.items;
      this.total = data.rspBody.items.size;
    });
  }

  // onQueryParamsChange(params: NzTableQueryParams): void {
  //   const { pageSize, pageIndex } = params;
  //   this.pageSize = pageSize;
  //   this.pageIndex = pageIndex;
  //   this.getImageDetail(this.pageIndex, this.pageSize);
  // }

  //上傳影像
  uploadImage() {
    const dialogRef = this.dialog.open(Childscn14page3Component, {
      panelClass: 'mat-dialog-transparent',
      data: {
        DOC_ID: '',
        FILE_ATTACHMENT_ID: '',
        REMARK: '',
        UPLOAD_PERSON: this.cuid,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        console.log("重整")
        this.getImageDetail(this.pageIndex, this.pageSize); }
    });
  }
}
