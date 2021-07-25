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
  styleUrls: ['./f03005.component.css','../../assets/css/f03.css']
})
export class F03005Component implements OnInit {
  adrType: sysCode[] = [];
  adType: sysCode[] = [];
  selectedAdrValue: string;
  selectedAdValue: string;
  constructor(private f03005Service: F03005Service, public dialog: MatDialog) { }
  ngOnInit(): void { 
    this.f03005Service.getSysTypeCode('ADR_TYPE','f03/f03005').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.adrType.push({value: codeNo, viewValue: desc})
      }
    });
    this.f03005Service.getSysTypeCode('AD_TYPE','f03/f03005').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.adType.push({value: codeNo, viewValue: desc})
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
      this.getAdrCode();
    });
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getAdrCode();
  }

  changeSelect() {
    if (this.selectedAdrValue != 'R') { this.selectedAdValue = ''; }
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getAdrCode();
  }

  getAdrCode() {
    const baseUrl = 'f03/f03005action1';
    const adrVal = this.selectedAdrValue != null ? this.selectedAdrValue : '';
    const adVal = this.selectedAdValue != null ? this.selectedAdValue : '';
    this.f03005Service.getAdrCodeList(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize, adrVal, adVal).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.adrCodeSource.data = data.rspBody.items;
    });
  }

  addNew() {
    if (this.selectedAdrValue == null) {
      alert('請選擇：原因碼類別');

    } else if (this.selectedAdrValue == 'R' && (this.selectedAdValue == null || this.selectedAdValue == '')) {
      alert('請選擇：補件類別');

    } else {
      const dialogRef = this.dialog.open(F03005addComponent, {
        data: {
          reasonKind: this.selectedAdrValue,
          adType: this.selectedAdValue,
          reasonCode : '',
          reasonDesc: '',
          reasonSort: '',
          reasonFlag: 'N'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
      });
    }
  }

  startEdit(i: number,
    reasonKind: string, adType: string, reasonCode: string,
    reasonDesc: string, reasonSort: string, reasonFlag: string) {
      const dialogRef = this.dialog.open(F03005editComponent, {
        data: {
          reasonKind: reasonKind,
          adType : adType,
          reasonCode: reasonCode,
          reasonDesc: reasonDesc,
          reasonSort: reasonSort,
          reasonFlag: reasonFlag
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
      });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
