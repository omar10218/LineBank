import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F01001Service } from './f01001.service';

@Component({
  selector: 'app-f01001',
  templateUrl: './f01001.component.html',
  styleUrls: ['./f01001.component.css']
})
export class F01001Component implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    private f01001Service: F01001Service,
    public dialog: MatDialog,
  ) { }

  total = 1;
  @ViewChild('absBox') absBox: ElementRef // 抓取table id
  currentPage: PageEvent;                             // 分頁
  currentSort: Sort;                                  // 排序
  empNo: string = localStorage.getItem("empNo");      // 當前員編
  swcID: string;                                      // 身分證字號
  swcApplno: string;                                  // 案件編號
  caseType: string;                                   // 案件分類
  caseTypeCode: OptionsCode[] = [];                   // 案件分類下拉
  agentEmpNo: string;                                 // 代理人
  agentEmpNoCode: OptionsCode[] = [];                 // 代理人下拉
  cusinfoDataSource = new MatTableDataSource<any>();  // 案件清單
  fds: string = "";                                   // fds
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  // 計算剩餘table資料長度
  get tableHeight(): string {
    if (this.absBox) {
      return (this.absBox.nativeElement.offsetHeight - 210) + 'px';
    }
  }

  ngOnInit(): void {
    // 查詢案件分類
    this.f01001Service.getSysTypeCode('CASE_TYPE').subscribe(data => {
      this.caseTypeCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.caseTypeCode.push({ value: codeNo, viewValue: desc })
      }
    });
    // 查詢代理人
    let jsonObject: any = {};
    jsonObject['swcL4EmpNo'] = this.empNo;

    this.f01001Service.getEmpNo(jsonObject).subscribe(data => {
      this.agentEmpNoCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody) {
        const empNo = jsonObj['empNo'];
        const empName = jsonObj['empName'];
        this.agentEmpNoCode.push({ value: empNo, viewValue: empName })
      }
    });
    this.agentEmpNo = '';
    this.swcApplno = '';
    this.swcID = '';
    this.caseType = '';
  }

  ngAfterViewInit() {
    this.getCaseList(this.empNo, this.swcID, this.swcApplno, this.pageIndex, this.pageSize);
  }

  // 排序
  // changeSort(sortInfo: Sort) {
  // this.currentSort = sortInfo;
  // this.getCaseList(this.empNo, this.swcID, this.swcApplno);
  // }

  // 查詢案件清單
  getCaseList(empNo: string, swcID: string, swcApplno: string, pageIndex: number, pageSize: number) {
    let jsonObject: any = {};
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    jsonObject['swcL4EmpNo'] = empNo;
    jsonObject['swcID'] = swcID;
    jsonObject['swcApplno'] = swcApplno;
    this.loading = false;
    this.f01001Service.getCaseList(jsonObject).subscribe(data => {
      console.log(data)
      this.total = data.rspBody.size;
      this.cusinfoDataSource.data = data.rspBody.items;
    });
  }

  //代入條件查詢
  select() {
    if (this.agentEmpNo == '' && this.swcApplno == '' && this.swcID == '' && this.caseType == '') {
      const cconfirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請至少選擇一項條件" }
      });
    } else
      this.changePage();
    this.getCaseList(this.empNo, this.swcID, this.swcApplno, this.pageIndex, this.pageSize);
  }

  // 案件子頁籤
  getLockCase(swcApplno: string, swcID: string) {
    let jsonObject: any = {};
    jsonObject['swcApplno'] = swcApplno;
    this.f01001Service.getLockCase(jsonObject).subscribe(data => {
      if (data.rspBody.length > 0) {
        this.fds = data.rspBody[0].fds
      }
      if (data.rspMsg == '案件鎖定成功') {
        sessionStorage.setItem('applno', swcApplno);
        sessionStorage.setItem('cuid', swcID);
        sessionStorage.setItem('search', 'N');
        sessionStorage.setItem('fds', this.fds);
        sessionStorage.setItem('queryDate', '');
        this.router.navigate(['./F01002/F01002SCN1']);
      }
    });
  }

  // 儲存案件註記
  saveCaseMemo(swcApplno: string, swcCaseMemo: string) {
    let jsonObject: any = {};
    jsonObject['swcApplno'] = swcApplno;
    jsonObject['swcCaseMemo'] = swcCaseMemo;

    this.f01001Service.saveCaseMemo(jsonObject).subscribe(data => {
      if (data.rspMsg == 'success') {
        this.getCaseList(this.empNo, this.swcID, this.swcApplno, this.pageIndex, this.pageSize);
        window.location.reload();
      }
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getCaseList(this.empNo, this.swcID, this.swcApplno, pageIndex, pageSize);
  }

  changePage() {
    this.pageIndex = 1;
    this.pageSize = 10;
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
}
