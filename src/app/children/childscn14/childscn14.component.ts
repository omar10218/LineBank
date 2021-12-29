import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';

import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DynamicDirective } from 'src/app/common-lib/directive/dynamic.directive';
import { Childscn1Service } from '../childscn1/childscn1.service';
import { Childscn6Service } from '../childscn6/childscn6.service';
import { Childscn14Service } from './childscn14.service';
import { Childscn14page1Component } from './childscn14page1/childscn14page1.component';

import { Childscn14page3Component } from './childscn14page3/childscn14page3.component';
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
    private childscn1Service: Childscn1Service,
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
    this.childscn14Service.childscn14(baseUrl, jsonObject).subscribe(data => {
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
        this.getImageDetail(this.pageIndex, this.pageSize); }
    });
  }

  //刪除影像
  async deleteFile(uploadId: string, docKey: string) {
    if(this.cuid != uploadId) {
      const deleteDialogRef = this.dialog.open(Childscn14page1Component, {
        data: { msgStr: "無法刪除非本人上傳之圖檔" }
      });
      return;
    }
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['docKey'] = docKey;
    jsonObject['cuId'] = this.cuid;
    jsonObject['cuNm'] = this.cuNm;

    this.childscn14Service.childscn14('f01/childscn14action3', jsonObject).subscribe(data => {
      if (data.rspCode == '0000') {
        const deleteDialogRef = this.dialog.open(Childscn14page1Component, {
          data: { msgStr: data.rspMsg }
        });
        deleteDialogRef.afterClosed().subscribe(result => {
          this.getImageDetail(this.pageIndex, this.pageSize);
        });
      }
    });
  }

  //下載影像
  downloadFile(docKey: string) {
    let jsonObject: any = {};
    let blob: Blob;
    jsonObject['applno'] = this.applno;
    jsonObject['docKey'] = docKey;
    jsonObject['cuId'] = this.cuid;
    jsonObject['cuNm'] = this.cuNm;

    this.childscn14Service.downloadFile('f01/childscn14action4', jsonObject).subscribe(data => {
      blob = new Blob([data], { type: 'application/xlsx' });
      let downloadURL = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = downloadURL;
      // link.download = "ProxyIncome_" + this.myDate + ".xlsx"; //瀏覽器下載時的檔案名稱
      link.click();

    });
  }

}
