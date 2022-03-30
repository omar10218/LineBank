import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BaseService } from '../base.service';
import { Childscn19Component } from '../children/childscn19/childscn19.component';
import { Childscn30Component } from '../children/childscn30/childscn30.component';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { OptionsCode } from '../interface/base';
import { F01007Service } from './f01007.service';

@Component({
  selector: 'app-f01007',
  templateUrl: './f01007.component.html',
  styleUrls: ['./f01007.component.css']
})
export class F01007Component implements OnInit {

  constructor(
    private router: Router,
    private f01007Service: F01007Service,
    public dialog: MatDialog,
  ) { }

  total: number;
  @ViewChild('absBox') absBox: ElementRef             // 抓取table id
  empNo: string = BaseService.userId;      // 當前員編
  swcNationalId: string;                              // 身分證字號
  swcApplno: string;                                  // 案件編號
  caseType: string;                                   // 案件分類
  caseTypeCode: OptionsCode[] = [];                   // 案件分類下拉
  agentEmpNo: string;                                 // 代理人
  agentEmpNoCode: OptionsCode[] = [];                 // 代理人下拉
  cusinfoDataSource = [];                             // 案件清單
  newData = [];                                       // 處理排序後的清單
  swcCustId: string;                                  // 客戶ID
  fds: string = "";                                   // fds
  stepName: string;                                   // 目前關卡名
  readonly pageSize = 50;
  pageIndex = 1;
  x: string;
  sort: string;

  // 計算剩餘table資料長度
  get tableHeight(): string {
    if (this.absBox) {
      return (this.absBox.nativeElement.offsetHeight - 140) + 'px';
    }
  }
  ngOnInit(): void {

    // 查詢案件分類
    this.f01007Service.getSysTypeCode('CASE_TYPE').subscribe(data => {
      this.caseTypeCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.caseTypeCode.push({ value: codeNo, viewValue: desc })
      }
    });

    // 代理人
    let jsonObject: any = {};
    jsonObject['swcL1EmpNo'] = this.empNo;

    this.f01007Service.getEmpNo(jsonObject).subscribe(data => {
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
    this.caseType = '';
    this.swcCustId = '';
  }

  ngAfterViewInit() {
    this.getCaseList();
  }

  // 查詢案件清單
  getCaseList() {
    let jsonObject: any = {};
    jsonObject['page'] = this.pageIndex;
    jsonObject['per_page'] = this.pageSize;
    jsonObject['swcL1EmpNo'] = this.empNo;
    jsonObject['swcNationalId'] = this.swcNationalId;
    jsonObject['swcApplno'] = this.swcApplno;
    jsonObject['caseType'] = this.caseType;
    jsonObject['swcCustId'] = this.swcCustId;
    this.f01007Service.getCaseList(jsonObject).subscribe(data => {
      if (data.rspBody.size > 0) {
        this.total = data.rspBody.size;
        this.cusinfoDataSource = data.rspBody.items;
        this.newData = this.f01007Service.getTableDate(this.pageIndex, this.pageSize, this.cusinfoDataSource);
        this.stepName = data.rspBody.items[0].F_StepName;
        this.newData.forEach(element => {
          if (element.F_StartTime != null && element.F_StartTime != '') {
            element.F_StartTime = formatDate(element.F_StartTime, 'yyyy-MM-dd HH:mm:ss', 'zh-Hant-TW', '-0600').toString();
          }
        });
      }
      else {
        this.newData = null;
        this.total = 0;
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: "查無資料" }
        })
      }
    });
  }

  //代入條件查詢
  select() {
    if (this.agentEmpNo != '') {
      this.empNo = this.agentEmpNo;
    } else {
      this.empNo = BaseService.userId;
    }
    this.changePage();
    this.getCaseList();

  }

  // 案件子頁籤
  getLockCase(swcApplno: string, swcNationalId: string, swcCustId: string) {
    let jsonObject: any = {};
    jsonObject['swcApplno'] = swcApplno;

    if (swcNationalId == BaseService.empId) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "案件身分證不可與登入者身分證相同!" }
      });
      return;
    }

    this.f01007Service.getLockCase(jsonObject).subscribe(data => {
      if (data.rspBody.length > 0) {
        this.fds = data.rspBody[0].fds
      }
      if (data.rspMsg == '案件鎖定成功') {
        sessionStorage.setItem('applno', swcApplno);
        sessionStorage.setItem('nationalId', swcNationalId);
        sessionStorage.setItem('search', 'N');
        sessionStorage.setItem('fds', this.fds);
        sessionStorage.setItem('queryDate', '');
        sessionStorage.setItem('stepName', this.stepName);
        //主管 L0 授信複核 L1 授信作業 L2 徵信作業 L3 文審作業 L4 總經理 S1 風管處 S2
        sessionStorage.setItem('level', '1');
        // 1文審 2徵信 3授信 4主管 5Fraud 7授信複合 8徵審後落人 9複審人員 10複審主管 0申請查詢 02補件資訊查詢 03複審案件查詢 05歷史案件查詢 07客戶案件查詢
        sessionStorage.setItem('page', '7');
        sessionStorage.setItem('custId', swcCustId);
        this.router.navigate(['./F01007/F01007SCN1']);
      }
    });
  }

  // 儲存案件註記
  saveCaseMemo(swcApplno: string, swcCaseMemo: string) {
    let msg = '';
    let jsonObject: any = {};
    jsonObject['swcApplno'] = swcApplno;
    jsonObject['swcCaseMemo'] = swcCaseMemo;

    this.f01007Service.saveCaseMemo(jsonObject).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == 'success') { this.getCaseList }
    }, 1000);
    setTimeout(() => {
      this.dialog.closeAll();
    }, 2500)
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

  // 參數
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex } = params;
    if (this.pageIndex !== pageIndex) {
      this.pageIndex = pageIndex;
      this.newData = this.f01007Service.getTableDate(pageIndex, this.pageSize, this.cusinfoDataSource);
      // this.getCaseList();
      const matTable = document.getElementById('matTable');
      matTable.scrollIntoView();
    }
  }

  changePage() {
    this.pageIndex = 1;
    this.total = 1;
  }

  // 打開通知彈窗
  openNotifyMsg(swcApplno: string) {
    const dialogRef = this.dialog.open(Childscn30Component, {
      panelClass: 'mat-dialog-transparent',
      minHeight: '60vh',
      width: '90%',
      data: {
        swcApplno: swcApplno,
        // flag: 'Y'
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

  // 排序
  sortChange(e: string, param: string) {
    this.sort = '';
    switch (param) {
      case "swcApplyNum":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.swcApplyNum.localeCompare(b.swcApplyNum)) : this.cusinfoDataSource.sort((a, b) => b.swcApplyNum.localeCompare(a.swcApplyNum))
        this.newData = this.f01007Service.getTableDate(this.pageIndex, this.pageSize, this.cusinfoDataSource);
        break;
      case "F_StartTime":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.F_StartTime.localeCompare(b.F_StartTime)) : this.cusinfoDataSource.sort((a, b) => b.F_StartTime.localeCompare(a.F_StartTime))
        this.newData = this.f01007Service.getTableDate(this.pageIndex, this.pageSize, this.cusinfoDataSource);
        break;
      case "swcCustTag":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.swcCustTag.localeCompare(b.swcCustTag)) : this.cusinfoDataSource.sort((a, b) => b.swcCustTag.localeCompare(a.swcCustTag))
        this.newData = this.f01007Service.getTableDate(this.pageIndex, this.pageSize, this.cusinfoDataSource);
        break;
      case "swcApplno":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.swcApplno.localeCompare(b.swcApplno)) : this.cusinfoDataSource.sort((a, b) => b.swcApplno.localeCompare(a.swcApplno))
        this.newData = this.f01007Service.getTableDate(this.pageIndex, this.pageSize, this.cusinfoDataSource);
        break;
      case "swcRiskGrade":
        this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
          (a, b) => a.swcRiskGrade.localeCompare(b.swcRiskGrade)) : this.cusinfoDataSource.sort((a, b) => b.swcRiskGrade.localeCompare(a.swcRiskGrade))
        this.newData = this.f01007Service.getTableDate(this.pageIndex, this.pageSize, this.cusinfoDataSource);
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
    this.empNo = BaseService.userId;
    this.getCaseList();
  }
}


