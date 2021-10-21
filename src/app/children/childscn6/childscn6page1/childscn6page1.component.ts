import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd, Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NgxWatermarkOptions } from 'ngx-watermark';
import { ChildrenService } from '../../children.service';
import { Childscn6Service } from '../childscn6.service';

@Component({
  selector: 'app-childscn6page1',
  templateUrl: './childscn6page1.component.html',
  styleUrls: ['./childscn6page1.component.css', '../../../../assets/css/child.css']
})
export class Childscn6page1Component implements OnInit, AfterViewInit {

  constructor(
    private childscn6Service: Childscn6Service,
    private router: Router,
    public childService: ChildrenService,
    private pipe: DatePipe
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getJcicMultiple();
        this.setBooleanFalse();
        this.list = [];

        // when onSameUrlNavigation: 'reload'，會重新觸發 router event
      }
    });
  }

  AAS003: [] = [];
  APS001: [] = [];
  ACI001: [] = [];
  BAI001: [] = [];
  BAI004: [] = [];
  BAS006: [] = [];
  BAS008: [] = [];
  JAS002: [] = [];
  KRI001: [] = [];
  STS007: [] = [];
  VAM020: [] = [];
  list: any[] = [];

  hideKRI002 = false;
  hideBAM011 = false;
  hideAAS003 = false;
  hideAPS001 = false;
  hideACI001 = false;
  hideBAI001 = false;
  hideBAI004 = false;
  hideBAS006 = false;
  hideBAS008 = false;
  hideKRI001 = false;
  hideJAS002 = false;
  hideVAM020 = false;
  hideSTS007 = false;

  private applno: string;
  private cuid: string;
  private queryDate: string;

  KRI002Source: readonly Data[] = [];
  total1 = 1;
  pageSize1 = 10;
  pageIndex1 = 1;

  BAM011Source: readonly Data[] = [];
  total2 = 1;
  pageSize2 = 20;
  pageIndex2 = 1;

  watermark: string;S

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    this.queryDate = sessionStorage.getItem('queryDate');

    this.getJcicMultiple();
    this.setBooleanFalse();
  }

  ngAfterViewInit() {

  }

  getJcicMultiple() {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['cuid'] = this.cuid;
    jsonObject['code'] = 'AAS003,APS001,ACI001,BAI001,BAI004,BAS006,BAS008,KRI001,JAS002,VAM020,STS007';
    jsonObject['queryDate'] = this.queryDate;
    this.childscn6Service.getMASTERJCICSearch(jsonObject).subscribe(data => {
      this.AAS003 = data.rspBody[0].AAS003;
      this.APS001 = data.rspBody[0].APS001;
      this.ACI001 = data.rspBody[0].ACI001;
      this.BAI001 = data.rspBody[0].BAI001;
      this.BAI004 = data.rspBody[0].BAI004;
      this.BAS006 = data.rspBody[0].BAS006;
      this.BAS008 = data.rspBody[0].BAS008;
      this.JAS002 = data.rspBody[0].JAS002;
      this.KRI001 = data.rspBody[0].KRI001;
      this.STS007 = data.rspBody[0].STS007;
      this.VAM020 = data.rspBody[0].VAM020;
    });
  }

  getJCIC( pageIndex: number, pageSize: number, code: string ) {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['cuid'] = this.cuid;
    jsonObject['code'] = code;
    jsonObject['queryDate'] = this.queryDate;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.childscn6Service.getJCICSearch(jsonObject).subscribe(data => {
      if ( code == 'KRI002' ) {
        this.total1 = data.rspBody.size;
        this.KRI002Source = data.rspBody.items;
      } else if ( code == 'BAM011' ) {
        this.total2 = data.rspBody.size;
        this.BAM011Source = data.rspBody.items;
      } else {

      }

    });
  }

  onQueryParamsChange(params: NzTableQueryParams, code: string): void {
    const { pageSize, pageIndex } = params;
    this.getJCIC(pageIndex, pageSize, code);
  }

  // getKRI002() {
  //   this.KRI002Source.data = null;
  //   const formdata: FormData = new FormData();
  //   formdata.append('applno', this.applno);
  //   formdata.append('cuid', this.cuid);
  //   formdata.append('code', 'KRI002');
  //   formdata.append('queryDate', this.queryDate);
  //   formdata.append('page', `${this.currentPage.pageIndex + 1}`);
  //   formdata.append('per_page', `${this.currentPage.pageSize}`);
  //   this.childscn6Service.getJCICSearch(formdata).subscribe(data => {
  //     this.totalCount = data.rspBody.size;
  //     this.KRI002Source.data = data.rspBody.items;
  //   });
  // }

  // getBAM011() {
  //   this.BAM011Source.data = null;
  //   const formdata: FormData = new FormData();
  //   formdata.append('applno', this.applno);
  //   formdata.append('cuid', this.cuid);
  //   formdata.append('code', 'BAM011');
  //   formdata.append('queryDate', this.queryDate);
  //   formdata.append('page', `${this.currentPage.pageIndex + 1}`);
  //   formdata.append('per_page', `${this.currentPage.pageSize}`);
  //   this.childscn6Service.getJCICSearch(formdata).subscribe(data => {
  //     this.totalCount2 = data.rspBody.size;
  //     this.BAM011Source.data = data.rspBody.items;
  //   });
  // }

  setBooleanTrue() {
    this.hideKRI002 = true;
    this.hideBAM011 = true;
    this.hideAAS003 = true;
    this.hideAPS001 = true;
    this.hideACI001 = true;
    this.hideBAI001 = true;
    this.hideBAI004 = true;
    this.hideBAS006 = true;
    this.hideBAS008 = true;
    this.hideKRI001 = true;
    this.hideJAS002 = true;
    this.hideVAM020 = true;
    this.hideSTS007 = true;
  }

  setBooleanFalse() {
    this.hideKRI002 = false;
    this.hideBAM011 = false;
    this.hideAAS003 = false;
    this.hideAPS001 = false;
    this.hideACI001 = false;
    this.hideBAI001 = false;
    this.hideBAI004 = false;
    this.hideBAS006 = false;
    this.hideBAS008 = false;
    this.hideKRI001 = false;
    this.hideJAS002 = false;
    this.hideVAM020 = false;
    this.hideSTS007 = false;
  }

  exist() {
    for (let index = 0; index < this.list.length; index++) {
      if (this.list[index] == "KRI002") { this.hideKRI002 = !this.hideKRI002; }
      if (this.list[index] == "BAM011") { this.hideBAM011 = !this.hideBAM011; }
      if (this.list[index] == "AAS003") { this.hideAAS003 = !this.hideAAS003; }
      if (this.list[index] == "APS001") { this.hideAPS001 = !this.hideAPS001; }
      if (this.list[index] == "ACI001") { this.hideACI001 = !this.hideACI001; }
    }
  }

  show(who: string) {
    if (this.list.indexOf(who) !== -1) {
      const index: number = this.list.indexOf(who);
      this.list.splice(index, 1);
    } else {
      this.list.push(who);
    }

    if (this.list.length == 0) {
      this.setBooleanFalse();
    } else if (this.list.length == 5) {
      this.setBooleanFalse();
      this.list = [];
    } else {
      this.setBooleanTrue();
      this.exist();
      // if ( who == "KRI002") { this.hideKRI002 = !this.hideKRI002; this.getKRI002(); }
      // if ( who == "BAM011") { this.hideBAM011 = !this.hideBAM011; this.getBAM011(); }
    }
  }
}
