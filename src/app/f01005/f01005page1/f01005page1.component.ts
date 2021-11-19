import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  @ViewChild('absBox')absBox:ElementRef // 抓取table id
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
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  // 計算剩餘table資料長度
  get tableHeight():string{
    if(this.absBox){
      return(this.absBox.nativeElement.offsetHeight-210)+'px';
    }
  }

  ngOnInit(): void {

    // 查詢案件分類
    this.f01005Service.getSysTypeCode('CASE_TYPE').subscribe(data => {
      this.caseTypeCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.caseTypeCode.push({ value: codeNo, viewValue: desc })
      }
    });
    // 查詢代理人
    // let jsonObject: any = {};
    // jsonObject['swcL3EmpNo'] = this.empNo;

    // this.f01005Service.getEmpNo(jsonObject).subscribe(data => {
    //   this.agentEmpNoCode.push({ value: '', viewValue: '請選擇' })
    //   for (const jsonObj of data.rspBody) {
    //     const empNo = jsonObj['empNo'];
    //     const empName = jsonObj['empName'];
    //     this.agentEmpNoCode.push({ value: empNo, viewValue: empName })
    //   }
    // });
    this.agentEmpNo = '';
    this.swcApplno = '';
    this.swcNationalId = '';
    this.caseType = '';
  }
  ngAfterViewInit() {
    this.getCaseList(this.empNo, this.swcNationalId, this.swcApplno, this.pageIndex, this.pageSize);
  }
  // 查詢案件清單
  getCaseList(empNo: string, swcNationalId: string, swcApplno: string, pageIndex: number, pageSize: number) {
    let jsonObject: any = {};
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    // jsonObject['swcL3EmpNo'] = empNo;
    // jsonObject['swcNationalId'] = swcNationalId;
    // jsonObject['swcApplno'] = swcApplno;
    this.loading = false;
    this.f01005Service.getCaseList(jsonObject).subscribe(data => {
      this.total = data.rspBody.size;
      this.cusinfoDataSource = data.rspBody.items;
      this.stepName = data.rspBody.items[0].F_StepName;
    });
  }
  //代入條件查詢
  select() {
    this.changePage();
    this.getCaseList(this.empNo, this.swcNationalId, this.swcApplno, this.pageIndex, this.pageSize);
  }
  // 案件子頁籤
  getLockCase(swcApplno: string, swcNationalId: string) {
    let jsonObject: any = {};
    jsonObject['swcApplno'] = swcApplno;

        sessionStorage.setItem('applno', swcApplno);
        sessionStorage.setItem('cuid', swcNationalId);
        sessionStorage.setItem('search', 'N');
        sessionStorage.setItem('fds', this.fds);
        sessionStorage.setItem('queryDate', '');
        sessionStorage.setItem('stepName', this.stepName);
        this.router.navigate(['./F01002/F01002SCN1']);

  }
  // 儲存案件註記
  saveCaseMemo(swcApplno: string, swcCaseMemo: string) {
    let jsonObject: any = {};
    jsonObject['swcApplno'] = swcApplno;
    jsonObject['swcCaseMemo'] = swcCaseMemo;

    this.f01005Service.saveCaseMemo(jsonObject).subscribe(data => {
      if (data.rspMsg == 'success') {
        this.getCaseList(this.empNo, this.swcNationalId, this.swcApplno, this.pageIndex, this.pageSize);
        window.location.reload();
      }
    });
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getCaseList(this.empNo, this.swcNationalId, this.swcApplno, pageIndex, pageSize);
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
