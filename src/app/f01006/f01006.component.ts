import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ChildrenService } from '../children/children.service';
import { F01006Service } from './f01006.service';
import { F01006restartComponent } from './f01006restart/f01006restart.component';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n';
registerLocaleData(zh);


@Component({
  selector: 'app-f01006',
  templateUrl: './f01006.component.html',
  styleUrls: ['./f01006.component.css', '../../assets/css/f01.css']
})
export class F01006Component implements OnInit, AfterViewInit {
  applno: string;                                     // 案件編號
  nationalId: string;                                 // 身分證字號
  custId: string;                                     // 客戶編號
  total: any;                                    // 回傳總筆數
  pageSize = 50;
  pageIndex = 1;
  cusinfoDataSource: readonly Data[] = [];
  constructor(
    public dialog: MatDialog,
    private f01006Service: F01006Service,
    public childService: ChildrenService,
  ) {}


  //假資料
  elements: any = [
    { applno: '20210827E000', nationalId: 'A123456789', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' },
    { applno: '20210827E000', nationalId: 'A123456789', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' },
    { applno: '20210827E000', nationalId: 'A123456789', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' },
    { applno: '20210827E000', nationalId: 'A123456789', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' },
    { applno: '20210827E000', nationalId: 'A123456789', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' },
    { applno: '20210827E000', nationalId: 'A123456789', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' },
    { applno: '20210827E000', nationalId: 'A123456789', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' },
    { applno: '20210827E000', nationalId: 'A123456789', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' },
    { applno: '20210827E000', nationalId: 'A123456789', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' },
    { applno: '20210827E000', nationalId: 'A123456789', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' },
    { applno: '20210827E001', nationalId: 'A123456700', custId: 'A123456789', name: '測試一', limit: '5000', rates: '5%', periods: '12', code: '1001' }
  ];

  ngOnInit(): void {
    this.applno = '';
    this.nationalId = '';
    this.custId = '';
  }

  ngAfterViewInit(): void {
    // this.total = 2;
    // this.cusinfoDataSource = this.elements;
    // this.getCaseList(this.applno, this.nationalId, this.custId, this.pageIndex, this.pageSize);

  }

  //代入條件查詢
  select() {
    if (this.applno == '' && this.nationalId == '' && this.custId == '') { return alert('請至少選擇一項') }

    this.getCaseList(this.applno, this.nationalId, this.custId, this.pageIndex, this.pageSize);
  }

  // 排序
  changeSort(sortInfo: Sort) {
    this.getCaseList(this.applno, this.nationalId, this.custId, this.pageIndex, this.pageSize);
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
      minHeight: '30%',
      width: '70%',
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
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getCaseList(this.applno, this.nationalId, this.custId, pageIndex, pageSize);
  }
  //案件清單
  getCaseList(applno: string, nationalId: string, custId: string, pageIndex: number, pageSize: number) {
    let jsonObject: any = {};

    jsonObject['page'] = this.pageIndex + 1;
    jsonObject['per_page'] = this.pageSize;
    jsonObject['applno'] = applno;
    jsonObject['nationalId'] = nationalId;
    jsonObject['custId'] = custId;
    // this.f01006Service.getCaseList(jsonObject).subscribe(data => {
    //   this.total = data.rspBody.size;
    //   this.cusinfoDataSource = data.rspBody.items;
    // });

  }
}
