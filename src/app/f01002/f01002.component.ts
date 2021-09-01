import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { F01002Service } from './f01002.service';
import { MatDialog } from '@angular/material/dialog';
import { F01002confirmComponent } from './f01002confirm/f01002confirm.component';

interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f01002',
  templateUrl: './f01002.component.html',
  styleUrls: ['./f01002.component.css','../../assets/css/f01.css']
})
export class F01002Component implements OnInit, AfterViewInit {
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  empNo: string = localStorage.getItem("empNo");
  swcID: string;
  swcApplno: string;
  caseType: string;
  note: string;
  caseTypeCode: sysCode[] = [];
  empNoCode: sysCode[] = [];
  cusinfoDataSource = new MatTableDataSource<any>();
  clicked = false;

  constructor(private router: Router, private f01002Service: F01002Service, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.f01002Service.getSysTypeCode('CASE_TYPE', 'sys/getMappingCode').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.caseTypeCode.push({ value: codeNo, viewValue: desc })
      }
    });

    this.f01002Service.getEmpNo(this.empNo).subscribe(data => {
      console.log(data)
      for (const jsonObj of data.rspBody) {
        const empNo = jsonObj['empNo'];
        const empName = jsonObj['empName'];
        this.empNoCode.push({ value: empNo, viewValue: empName })
      }
    });

    this.swcApplno = '';
    this.swcID = '';
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };

    this.currentSort = {
      active: '',
      direction: ''
    };
  }

  ngAfterViewInit() {
    this.getCaseList(this.empNo, this.swcID, this.swcApplno);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCaseList(this.empNo, this.swcID, this.swcApplno);
    });
  }

  changeSort(sortInfo: Sort) {
    if (sortInfo.active === 'created_at') {
      sortInfo.active = 'created';
    }
    this.currentSort = sortInfo;
    this.getCaseList(this.empNo, this.swcID, this.swcApplno);
  }

  getCaseList(empNo: string, swcID: string, swcApplno: string) {
    this.f01002Service.getCaseList(this.currentPage.pageIndex, this.currentPage.pageSize
      , empNo, swcID, swcApplno).subscribe(data => {
        this.totalCount = data.rspBody.size;
        this.cusinfoDataSource.data = data.rspBody.items;
        this.cusinfoDataSource.sort = this.sortTable;
        console.log(this.cusinfoDataSource.data)
      });
  }

  select() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getCaseList(this.empNo, this.swcID, this.swcApplno);
  }

  getLockCase(swcApplno: string) {
    this.f01002Service.getLockCase(swcApplno).subscribe(data => {
      if (data.rspMsg == '案件鎖定成功') {
        this.router.navigate(['./F01001SCN1'], { queryParams: { applno: swcApplno, search: 'N' } });
      }
    });
  }

  saveCaseMemo(swcApplno: string, swcCaseMemo: string) {
    this.f01002Service.saveCaseMemo(swcApplno, swcCaseMemo).subscribe(data => {
      if (data.rspMsg == 'success') {
        this.getCaseList(this.empNo, this.swcID, this.swcApplno);
        window.location.reload();
      }
    });
  }

  openNotifyMsg(swcApplno: string){
    const dialogRef = this.dialog.open(F01002confirmComponent, {
      minHeight: '50vh',
      width: '30%',
      data: {
        swcApplno: swcApplno
        }
      });
  }
}
