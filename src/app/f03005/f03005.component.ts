import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F03005Service } from './f03005.service';
import { F03005addComponent } from './f03005add/f03005add.component';
import { F03005editComponent } from './f03005edit/f03005edit.component';
interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03005',
  templateUrl: './f03005.component.html',
  styleUrls: ['./f03005.component.css', '../../assets/css/f03.css']
})
export class F03005Component implements OnInit {

  adrType: sysCode[] = [];  //最上層下拉
  secondType: sysCode[] = [];  //第二層下拉
  thirdType: sysCode[] = [];  //第三層下拉
  selectedAdrValue: string;  //最上層
  selectedSecondValue: string;  //第二層選擇
  selectedThirdValue: string;  //第三層選擇

  constructor(private f03005Service: F03005Service, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.f03005Service.getSysTypeCode('ADR_CODE').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.adrType.push({ value: codeNo, viewValue: desc })
      }
    });
  }
  //============================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  adrCodeSource = new MatTableDataSource<any>();
  ngAfterViewInit() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getAdrCode(null, null);
    });
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getAdrCode(null, null);
  }

  changeSelect() {
    this.secondType = [];
    this.thirdType = [];
    this.selectedSecondValue = "";
    this.selectedThirdValue = "";

    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getAdrCode("Z01", "1");
  }

  changeSelectSecond() {
    this.thirdType = [];
    this.selectedThirdValue = "";
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getAdrCode(this.selectedSecondValue, "2");
  }

  changeSelectThird() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getAdrCode(this.selectedThirdValue, "3");
  }

  getAdrCode(selectType: string, level: string) {
    const baseUrl = 'f03/f03005action1';
    const adrVal = this.selectedAdrValue != null ? this.selectedAdrValue : '';
    const select = selectType != null ? selectType : '';
    this.f03005Service.getAdrCodeList(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize, adrVal, select, level).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.adrCodeSource.data = data.rspBody.items;
      if (data.rspBody.items.length > 0) {
        if (data.rspBody.items[0].upReasonCode == 'Z01') {
          for (let i = 0; i < data.rspBody.items.length; i++) {
            this.secondType.push({ value: data.rspBody.items[i].reasonCode, viewValue: data.rspBody.items[i].reasonDesc });
          }
        }
        if (data.rspBody.items[0].reasonLevel == '2' && data.rspBody.items[0].reasonKind == 'FM') {
          this.thirdType = [];
          for (let i = 0; i < data.rspBody.items.length; i++) {
            this.thirdType.push({ value: data.rspBody.items[i].reasonCode, viewValue: data.rspBody.items[i].reasonDesc });
          }
        }
      }
    });
  }

  addNew() {
    if (this.selectedAdrValue == null || this.selectedAdrValue == '') {
      alert('請選擇：原因碼類別');
    } else if (this.selectedSecondValue == '' && this.selectedThirdValue == '') {
      this.openInsertWindow('Z01', '1');
    } else if (this.selectedSecondValue != '' && this.selectedThirdValue == '') {
      this.openInsertWindow(this.selectedSecondValue, '2');
    } else {
      this.openInsertWindow(this.selectedThirdValue, '3');
    }
  }

  openInsertWindow(upReasonCode: string, reasonLevel: string) {
    const dialogRef = this.dialog.open(F03005addComponent, {
      data: {
        reasonKind: this.selectedAdrValue,
        upReasonCode: upReasonCode,
        reasonCode: '',
        reasonDesc: '',
        reasonSort: '',
        reasonFlag: 'N',
        reasonLevel: reasonLevel
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        if (reasonLevel == '1') { this.secondType = []; this.thirdType = []; this.selectedSecondValue = ""; this.selectedThirdValue = ""; }
        if (reasonLevel == '2') { this.thirdType = []; this.selectedThirdValue = ""; }
        this.getAdrCode(upReasonCode, reasonLevel)
      }
    });
  }

  startEdit(i: number,
    reasonKind: string, upReasonCode: string, reasonCode: string,
    reasonDesc: string, reasonSort: string, reasonFlag: string) {
    let reasonLevel: string = '';
    if (this.selectedSecondValue == '' && this.selectedThirdValue == '') {
      reasonLevel = '1';
    } else if (this.selectedSecondValue != '' && this.selectedThirdValue == '') {
      reasonLevel = '2';
    } else {
      reasonLevel = '3';
    }

    const dialogRef = this.dialog.open(F03005editComponent, {
      data: {
        reasonKind: reasonKind,
        upReasonCode: upReasonCode,
        reasonCode: reasonCode,
        reasonDesc: reasonDesc,
        reasonSort: reasonSort,
        reasonFlag: reasonFlag,
        reasonLevel: reasonLevel
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') {
        if (reasonLevel == '1') { this.secondType = []; this.thirdType = []; this.selectedSecondValue = ""; this.selectedThirdValue = ""; }
        if (reasonLevel == '2') { this.thirdType = []; this.selectedThirdValue = ""; }
        this.getAdrCode(upReasonCode, reasonLevel)
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
