import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { Data, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ChildrenService } from '../children/children.service';
import { F01016Service } from './f01016.service';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-f01016',
  templateUrl: './f01016.component.html',
  styleUrls: ['./f01016.component.css', '../../assets/css/f01.css']
})
export class F01016Component implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('absBox') absBox: ElementRef             // 抓取table id
  applno: string;                                     // 案件編號
  nationalID: string;                                 // 身分證字號
  custID: string;                                     // 客戶編號
  total: number;
  readonly pageSize = 50;
  pageIndex = 1;
  suiManagerSource = [];
  restart$: Subscription;
  x: string



  constructor(
    public dialog: MatDialog,
    private f01016Service: F01016Service,
    public childService: ChildrenService,
    private router: Router,
  ) {
    this.restart$ = this.f01016Service.restart$.subscribe((data) => {
      this.getCaseList();
    });
  }

  // 計算剩餘table資料長度
  get tableHeight(): string {
    if (this.absBox) {
      return (this.absBox.nativeElement.offsetHeight - 140) + 'px';
    }
  }

  ngOnInit(): void {
    this.applno = '';
    this.nationalID = '';
    this.custID = '';
    this.total = 0;
  }
  ngAfterViewInit(): void {
    this.getCaseList();
  }

  ngOnDestroy() {
    this.restart$.unsubscribe();
  }
  //代入條件查詢
  select() {
      this.changePage();
      this.getCaseList();
  }

  changePage() {
    this.pageIndex = 1;
    this.total = 1;
  }

  //跳出申請頁面
  getRestartCase(
    applno: string,
    nationalId: string,
    custId: string,
    name: string,
    limit: string,
    periods: string,
    rates: string,
    opid: string) {
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex } = params;
    if (this.pageIndex !== pageIndex) {
      this.pageIndex = pageIndex;
      this.getCaseList();
    }
  }
  //案件清單
  getCaseList() {
    let jsonObject: any = {};
    // jsonObject['page'] = this.pageIndex;
    // jsonObject['per_page'] = this.pageSize;
    jsonObject['applno'] = this.applno;
    jsonObject['nationalID'] = this.nationalID;
    jsonObject['custID'] = this.custID;

    this.f01016Service.getCaseList(jsonObject).subscribe(data => {
      console.log(data)
      if (data.rspBody.items.length > 0) {
        this.total = data.rspBody.items.length;
        this.suiManagerSource = data.rspBody.items;
      }
      else {
        this.suiManagerSource = null;
        this.total = 0;
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: "查無資料" }
        })
      }
    });
  }

  // 千分號標點符號(form顯示用)
  data_number(p: number) {
    this.x = '';
    this.x = (p + "")
    if (this.x != null) {
      this.x = this.x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return this.x
  }

  // 排序
  sortChange(e: string) {
    this.suiManagerSource = e === 'ascend' ? this.suiManagerSource.sort(
      (a, b) => a.APPLNO.localeCompare(b.APPLNO)) : this.suiManagerSource.sort((a, b) => b.APPLNO.localeCompare(a.APPLNO))
  }

  // 清除資料
  clear() {
    this.applno = '';
    this.nationalID = '';
    this.custID = '';
    this.suiManagerSource = [];
    this.total = 0;
  }

  toCalloutPage(applno: string, reasonCode: string, executeType: string, creditTime: string, creditEmpno: string, customerId: string, nationalId: string,
    reasonDetail: string, limitNo: string, contactYn: string, contactType: string, contactContent: string, creditMemo: string, reserveLimit: string, mobile: string) {
    let jsonObject: any = {};
    jsonObject['applno'] = applno;
    console.log(creditTime)
    this.f01016Service.getCaseList(jsonObject).subscribe(data => {
      sessionStorage.setItem('applno', applno);
      sessionStorage.setItem('reasonCode', reasonCode);//執行原因
      sessionStorage.setItem('executeType', executeType);//執行策略
      sessionStorage.setItem('creditTime', creditTime);//本次執行時間
      sessionStorage.setItem('creditEmpno', creditEmpno);//本次執行員編
      sessionStorage.setItem('customerId', customerId);
      sessionStorage.setItem('nationalId', nationalId);
      sessionStorage.setItem('reasonDetail', reasonDetail); //執行細項
      sessionStorage.setItem('limitNo', limitNo); //額度號
      sessionStorage.setItem('contactYn', contactYn); //通知客戶
      sessionStorage.setItem('contactType', contactType); //通知方式
      sessionStorage.setItem('contactContent', contactContent); //通知內容
      sessionStorage.setItem('creditMemo', creditMemo); //本次執行說明
      sessionStorage.setItem('reserveLimit', reserveLimit); //本次執行說明
      sessionStorage.setItem('mobile', mobile); //本次執行說明
      // 1文審 2徵信 3授信 4主管 5Fraud 7授信複合 8徵審後落人 9複審人員 10複審主管 0申請查詢 02補件資訊查詢 03複審案件查詢 05歷史案件查詢 07客戶案件查詢 16主管凍結
      sessionStorage.setItem('page', '16');
      this.router.navigate(['./F01015']);
    })
  }
} 
