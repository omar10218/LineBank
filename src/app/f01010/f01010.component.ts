import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { OptionsCode } from '../interface/base';
import { F01010Service } from './f01010.service';

@Component({
  selector: 'app-f01010',
  templateUrl: './f01010.component.html',
  styleUrls: ['./f01010.component.css', '../../assets/css/f01.css']
})
export class F01010Component implements OnInit {

  constructor(
    private f01010Service: F01010Service,
    private router: Router,
    public dialog: MatDialog
  ) { }
  @ViewChild('absBox') absBox: ElementRef             // 抓取table id
  cusinfoDataSource = [];
  readonly pageSize = 50;
  pageIndex = 1;
  total: number;
  fds: string = "";
  empNo: string = localStorage.getItem("empNo");      // 當前員編

  //ngModel區
  swcApplno: string;
  swcNationalId: string;
  swcCustId: string;
  caseType: string;
  agentEmpNo: string;

  //下拉選單區
  caseTypeCode: OptionsCode[] = [];
  agentEmpNoCode: OptionsCode[] = [];
  ynCode: OptionsCode[] = [];

  // 計算剩餘table資料長度
  get tableHeight(): string {
    if (this.absBox) {
      return (this.absBox.nativeElement.offsetHeight - 190) + 'px';
    }
  }


  ngOnInit(): void {
    // 查詢案件分類
    this.f01010Service.getSysTypeCode('CASE_TYPE').subscribe(data => {
      this.caseTypeCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.caseTypeCode.push({ value: codeNo, viewValue: desc })
      }
    });

    this.f01010Service.getSysTypeCode('YN').subscribe(data => {
      this.ynCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.ynCode.push({ value: codeNo, viewValue: desc })
      }
    });
    this.agentEmpNo = '';
    this.swcApplno = '';
    this.swcNationalId = '';
    this.caseType = '';
  }
  ngAfterViewInit() {
    this.getCaseList();
  }
  // 代入條件查詢
  search() {
    if (this.swcNationalId != '' && !this.f01010Service.checkIdNumberIsValid(this.swcNationalId)) {
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
  getCaseList() {
    let jsonObject: any = {};
    jsonObject['page'] = this.pageIndex;
    jsonObject['per_page'] = this.pageSize;
    jsonObject['swcL3EmpNo'] = this.agentEmpNo;
    jsonObject['swcNationalId'] = this.swcNationalId;
    jsonObject['swcApplno'] = this.swcApplno;
    jsonObject['caseType'] = this.caseType;
    this.f01010Service.getCaseList(jsonObject).subscribe(data => {
      this.total = data.rspBody.size;
      this.cusinfoDataSource = data.rspBody.items;
    });
  }

  // 排序
  sortChange(e: string) {
    this.cusinfoDataSource = e === 'ascend' ? this.cusinfoDataSource.sort(
      (a, b) => a.swcApplno.localeCompare(b.swcApplno)) : this.cusinfoDataSource.sort((a, b) => b.swcApplno.localeCompare(a.swcApplno))
  }
  // 參數
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex } = params;
    if (this.pageIndex !== pageIndex) {
      this.pageIndex = pageIndex;
      this.getCaseList();
    }
  }
  // 案件子頁籤
  getLockCase(swcApplno: string, swcNationalId: string) {
    let jsonObject: any = {};
    jsonObject['swcApplno'] = swcApplno;
    this.f01010Service.getLockCase(jsonObject).subscribe(data => {
      if (data.rspBody.length > 0) {
        this.fds = data.rspBody[0].fds
      }
      if (data.rspMsg == '案件鎖定成功') {
        sessionStorage.setItem('applno', swcApplno);
        sessionStorage.setItem('cuid', swcNationalId);
        sessionStorage.setItem('search', 'N');
        sessionStorage.setItem('fds', this.fds);
        sessionStorage.setItem('queryDate', '');
        sessionStorage.setItem('level', '4');
        this.router.navigate(['./F01009/F01009SCN1']);
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

  changePage() {
    this.pageIndex = 1;
    this.total = 1;
  }

  // 清除資料
  clear() {
    this.agentEmpNo = '';
    this.swcApplno = '';
    this.swcNationalId = '';
    this.caseType = '';
    this.empNo = localStorage.getItem("empNo");
    this.getCaseList();
  }
}
