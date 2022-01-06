import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { OptionsCode } from '../interface/base';
import { F01008Service } from './f01008.service';

//Nick
@Component({
  selector: 'app-f01008',
  templateUrl: './f01008.component.html',
  styleUrls: ['./f01008.component.css', '../../assets/css/f01.css']
})
export class F01008Component implements OnInit {

  constructor(
    public dialog: MatDialog,
    private f01008Service: F01008Service,
    private router: Router
  ) { }
  total: number;
  @ViewChild('absBox') absBox: ElementRef
  empNo: string = localStorage.getItem("empNo");
  swcNationalId: string;                              // 身分證字號
  swcApplno: string;                                  // 案件編號
  swcCustId: string;                                  // 客戶ID
  caseType: string;                                   // 案件分類
  caseTypeCode: OptionsCode[] = [];                   // 案件分類下拉
  agentEmpNo: string;                                 // 代理人
  agentEmpNoCode: OptionsCode[] = [];                 // 代理人下拉
  cusinfoDataSource = [];                             // 案件清單
  fds: string = "";                                   // fds
  stepName: string;                                   // 目前關卡名
  readonly pageSize = 50;
  pageIndex = 1;
  x: string
  sort: string;
  // 計算剩餘table資料長度
  get tableHeight(): string {
    if (this.absBox) {
      return (this.absBox.nativeElement.offsetHeight - 140) + 'px';
    }
  }
  ngOnInit(): void {

    // 代理人
    let jsonObject: any = {};
    jsonObject['swcD2EmpNo'] = this.empNo;

    this.f01008Service.getEmpNo(jsonObject).subscribe(data => {
      this.agentEmpNoCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody) {
        const empNo = jsonObj['empNo'];
        const empName = jsonObj['empName'];
        this.agentEmpNoCode.push({ value: empNo, viewValue: empName })
      }
    });
    this.sort = 'ascend';
    this.agentEmpNo = '';
    this.swcApplno = '';
    this.swcNationalId = '';
    this.swcCustId = '';
    this.caseType = '';
  }
  ngAfterViewInit() {
    this.getCaseList();
  }
  getCaseList() {
    let jsonObject: any = {};
    jsonObject['page'] = this.pageIndex;
    jsonObject['per_page'] = this.pageSize;
    jsonObject['swcD2EmpNo'] = this.empNo;
    jsonObject['swcNationalId'] = this.swcNationalId;
    jsonObject['swcCustId'] = this.swcCustId;
    jsonObject['swcApplno'] = this.swcApplno;
    this.f01008Service.getCaseList(jsonObject).subscribe(data => {
      if (data.rspBody.size > 0) {
        this.total = data.rspBody.size;
        this.cusinfoDataSource = data.rspBody.items;
        this.stepName = data.rspBody.items[0].F_StepName;
      }
      else {
        this.cusinfoDataSource = null;
        this.total = 0;
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: "查無資料" }
        })
      }
    });
  }

  //代入條件查詢
  select() {
    if (this.swcNationalId != '' && !this.f01008Service.checkIdNumberIsValid(this.swcNationalId)) {
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
  getLockCase(swcApplno: string, swcNationalId: string, swcCustId: string) {
    let jsonObject: any = {};
    jsonObject['swcApplno'] = swcApplno;
    this.f01008Service.getLockCase(jsonObject).subscribe(data => {
      if (data.rspBody.length > 0) {
        this.fds = data.rspBody[0].fds
      }
      if (data.rspMsg == '案件鎖定成功') {
        sessionStorage.setItem('applno', swcApplno);
        sessionStorage.setItem('cuid', swcNationalId);
        sessionStorage.setItem('search', 'N');
        sessionStorage.setItem('fds', this.fds);
        sessionStorage.setItem('queryDate', '');
        sessionStorage.setItem('review', '');
        // sessionStorage.setItem('level', '8');//
        // 1文審 2徵信 3授信 4主管 5Fraud 7授信複合 8徵審後落人 9複審人員 10複審主管 12產生合約前複合 0申請查詢 02補件資訊查詢 03複審案件查詢 05歷史案件查詢 07客戶案件查詢
        sessionStorage.setItem('page', '8');
        sessionStorage.setItem('stepName', this.stepName);
        sessionStorage.setItem('custId', swcCustId);
        this.router.navigate(['./F01008/F01008SCN1']);
      }
    });
  }

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

  // 排序
  sortChange(e: string, param: string) {
    this.sort = '';
    switch (param) {
      case "swcApplyNum":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.swcApplyNum.localeCompare(b.swcApplyNum)) : this.cusinfoDataSource.sort((a, b) => b.swcApplyNum.localeCompare(a.swcApplyNum))
        break;
      case "swcZ21PassDate":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.swcZ21PassDate.localeCompare(b.swcZ21PassDate)) : this.cusinfoDataSource.sort((a, b) => b.swcZ21PassDate.localeCompare(a.swcZ21PassDate))
        break;
      case "swcCustTag":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.swcCustTag.localeCompare(b.swcCustTag)) : this.cusinfoDataSource.sort((a, b) => b.swcCustTag.localeCompare(a.swcCustTag))
        break;
      case "swcApplno":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.swcApplno.localeCompare(b.swcApplno)) : this.cusinfoDataSource.sort((a, b) => b.swcApplno.localeCompare(a.swcApplno))
        break;
      case "swcRiskGrade":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.swcRiskGrade.localeCompare(b.swcRiskGrade)) : this.cusinfoDataSource.sort((a, b) => b.swcRiskGrade.localeCompare(a.swcRiskGrade))
        break;
    }
  }

  // 清除資料
  clear() {
    this.agentEmpNo = '';
    this.swcApplno = '';
    this.swcNationalId = '';
    this.swcCustId = '';
    this.caseType = '';
    this.empNo = localStorage.getItem("empNo");
    this.getCaseList();
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
}
