import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F01005Service } from '../f01005.service';

@Component({
  selector: 'app-f01005page1',
  templateUrl: './f01005page1.component.html',
  styleUrls: ['./f01005page1.component.css', '../../../assets/css/f01.css']
})
export class F01005page1Component implements OnInit {

  constructor(
    private router: Router,
    private f01005Service: F01005Service,
    public dialog: MatDialog,
  ) { }

  total: number;
  @ViewChild('absBox') absBox: ElementRef // 抓取table id
  currentPage: PageEvent;                             // 分頁
  currentSort: Sort;                                  // 排序
  empNo: string = localStorage.getItem("empNo");      // 當前員編
  swcNationalId: string;                              // 身分證字號
  swcApplno: string;                                  // 案件編號
  caseType: string;                                   // 案件分類
  caseTypeCode: OptionsCode[] = [];                   // 案件分類下拉
  agentEmpNo: string;                                 // 代理人
  agentEmpNoCode: OptionsCode[] = [];                 // 代理人下拉
  cusinfoDataSource = [];  // 案件清單
  fds: string = "";                                   // fds
  stepName: string;                                   // 目前關卡名
  readonly pageSize = 50;
  pageIndex = 1;

  // 計算剩餘table資料長度
  get tableHeight(): string {
    if (this.absBox) {
      return (this.absBox.nativeElement.offsetHeight - 140) + 'px';
    }
  }

  ngOnInit(): void {

    this.agentEmpNo = '';
    this.swcApplno = '';
    this.swcNationalId = '';
    this.caseType = '';
  }
  ngAfterViewInit() {
    this.getCaseList();
  }
  // 查詢案件清單
  getCaseList() {
    let jsonObject: any = {};
    jsonObject['page'] = this.pageIndex;
    jsonObject['per_page'] = this.pageSize;
    jsonObject['swcApplno'] = this.swcApplno;
    jsonObject['swcNationalId'] = this.swcNationalId;
    this.f01005Service.getCaseList(jsonObject).subscribe(data => {
      if (data.rspBody.size > 0)
      {
        this.total = data.rspBody.size;
        this.cusinfoDataSource = data.rspBody.items;
        this.stepName = data.rspBody.items[0].F_StepName;
      }
      else
      {
        this.cusinfoDataSource = null;
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: "查無資料" }})
      }
    });
  }

  // 排序
  sortChange(e: string) {
    this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
      (a, b) => a.swcApplno.localeCompare(b.swcApplno)) : this.cusinfoDataSource.sort((a, b) => b.swcApplno.localeCompare(a.swcApplno))
  }

  //代入條件查詢
  search() {
    if (this.swcNationalId != '' && !this.f01005Service.checkIdNumberIsValid(this.swcNationalId)) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "身分驗證失敗" }
      });
    }
    else {
      if (this.agentEmpNo != '') {
        this.empNo = this.agentEmpNo;
      }
      this.changePage();
      this.getCaseList();
    }
  }

  // 案件子頁籤
  getLockCase(swcApplno: string, swcNationalId: string) {
    let jsonObject: any = {};
    jsonObject['swcApplno'] = swcApplno;
    this.f01005Service.getLockCase(jsonObject).subscribe(data => {
      if (data.rspBody.length > 0) {
        this.fds = data.rspBody[0].fds
      }
      if (data.rspMsg == '案件鎖定成功') {
        sessionStorage.setItem('applno', swcApplno);
        sessionStorage.setItem('cuid', swcNationalId);
        sessionStorage.setItem('search', 'N');
        sessionStorage.setItem('fds', this.fds);
        sessionStorage.setItem('queryDate', '');
        sessionStorage.setItem('stepName', this.stepName);
        sessionStorage.setItem('page', '5');
        this.router.navigate(['./F01005/F01005SCN1']);
      }
    });
  }

  // 儲存案件註記
  saveCaseMemo(swcApplno: string, swcCaseMemo: string) {
    let msg = '';
    let jsonObject: any = {};
    jsonObject['swcApplno'] = swcApplno;
    jsonObject['swcCaseMemo'] = swcCaseMemo;

    this.f01005Service.saveCaseMemo(jsonObject).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == 'success') { window.location.reload(); }
    }, 1000);
  }

  // 參數
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex } = params;
    if (this.pageIndex !== pageIndex) {
      this.pageIndex = pageIndex;
      this.getCaseList();
    }
  }
  changePage() {
    this.pageIndex = 1;
    this.total = 1;
  }
  // 打開通知彈窗
  openNotifyMsg(swcApplno: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      minHeight: '50vh',
      width: '30%',
      data: {
        swcApplno: swcApplno
      }
    });
  }
  // 將案件類型轉成中文
  getOptionCaseType(codeVal: string): string {
    for (const data of this.caseTypeCode) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
  // 清除資料
  clear() {
    this.agentEmpNo = '';
    this.swcApplno = '';
    this.swcNationalId = '';
    this.empNo = localStorage.getItem("empNo");
    this.getCaseList();
  }

}
