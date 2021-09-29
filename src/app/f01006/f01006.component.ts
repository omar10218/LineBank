import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChildrenService } from '../children/children.service';
import { F01006Service } from './f01006.service';
import { F01006restartComponent } from './f01006restart/f01006restart.component';

//20210928 alvin.lee 案件申覆

@Component({
  selector: 'app-f01006',
  templateUrl: './f01006.component.html',
  styleUrls: ['./f01006.component.css', '../../assets/css/f01.css']
})
export class F01006Component implements OnInit, AfterViewInit {
  applno: string;                                     // 案件編號
  nationalId: string;                                 // 身分證字號
  custId: string;                                     // 客戶編號
  currentPage: PageEvent;                             // 分頁
  currentSort: Sort;                                  // 排序
  totalCount: any;                                    // 回傳總筆數
  cusinfoDataSource = new MatTableDataSource<any>();  // 案件清單
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private f01006Service: F01006Service,
    public childService: ChildrenService,
  ) { }

  //假資料
  elements: any = [
    { applno: '20210827E000', nationalId: 'A123456789', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' },
    { applno: '20210827E001', nationalId: 'A123456700', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' }
  ];

  ngOnInit(): void {

    this.applno = '';
    this.nationalId = '';
    this.custId = '';

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

  ngAfterViewInit(): void {
    this.totalCount = 2;
    this.cusinfoDataSource = this.elements;
    this.getCaseList(this.applno, this.nationalId, this.custId);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCaseList(this.applno, this.nationalId, this.custId);
    });
  }
  
  //代入條件查詢
  select() {
    if (this.applno == '' && this.nationalId == '' && this.custId == '') { return alert('請至少選擇一項') }
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getCaseList(this.applno, this.nationalId, this.custId);
  }

  // 排序
  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getCaseList(this.applno, this.nationalId, this.custId);
  }

  //跳出申請葉面
  getRestartCase(
    applno: string,
    nationalId: string,
    custId: string,
    name: string,
    limit: string,
    periods: string,
    rates: string) {
    const dialogRef = this.dialog.open(F01006restartComponent, {
      data: {
        applno: applno,
        nationalId: nationalId,
        custId: custId,
        name: name,
        limit: limit,
        periods: periods,
        rates: rates
      }
    });
  }

  //案件清單
  getCaseList(applno: string, nationalId: string, custId: string) {
    let jsonObject: any = {};

    jsonObject['page'] = this.currentPage.pageIndex + 1;
    jsonObject['per_page'] = this.currentPage.pageSize;
    jsonObject['applno'] = applno;
    jsonObject['nationalId'] = nationalId;
    jsonObject['custId'] = custId;

    this.f01006Service.getCaseList(jsonObject).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.cusinfoDataSource.data = data.rspBody.items;
    });

  }
}
