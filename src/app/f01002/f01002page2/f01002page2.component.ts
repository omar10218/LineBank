import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01002Service } from '../f01002.service';
import { F01002page2updateComponent } from './f01002page2update/f01002page2update.component';

//20211014 alvin.lee

//徵信照會table框架
interface callout {
  APPLNO: string;
  CON_TYPE: string;
  PHONE: string;
  TEL_CONDITION: string;
  TEL_CHECK: string;
  CON_MEMO: string;
  CALLOUT_DATE: string;
  CALLOUT_RDO: string;
}

@Component({
  selector: 'app-f01002page2',
  templateUrl: './f01002page2.component.html',
  styleUrls: ['./f01002page2.component.css']
})

export class F01002page2Component implements OnInit {
  callOutDataSource = new MatTableDataSource<any>();  // 照會提醒清單
  rspBodyList: callout[] = [];//table資料
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  extendTimeValue: string;
  extendTimeCode = [
    { value: '30', label: '30分' },
    { value: '60', label: '60分' },
    { value: '90', label: '90分' },
    { value: '120', label: '120分' }];

  constructor(
    private f01002Service: F01002Service,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCalloutList(this.pageIndex, this.pageSize);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getCalloutList(pageIndex, pageSize);
  }

  // 照會提醒清單
  getCalloutList(pageIndex: number, pageSize: number) {
    let jsonObject: any = {};
    jsonObject['swcL3EmpNo'] = localStorage.getItem("empNo");
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    console.log(this.pageIndex)
    console.log(this.pageSize)
    this.loading = false;
    this.f01002Service.getCalloutList(jsonObject).subscribe(data => {
      this.total = data.rspBody.size;
      this.rspBodyList = data.rspBody.items;
      this.callOutDataSource.data = this.rspBodyList;
    });
  }

  //延長下次照會提醒時間
  extendTime(ID: string, calloutRdo: string) {
    let msg = '';
    let jsonObject: any = {};
    jsonObject['rowid'] = ID;
    jsonObject['extendTime'] = calloutRdo;
    this.f01002Service.updateCalloutTime(jsonObject).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == '延長成功') { this.getCalloutList(this.pageIndex, this.pageSize); }
    }, 1000);
  }

  //取消照會提醒
  cancelCallout(ID: string) {
    const dialogRef = this.dialog.open(F01002page2updateComponent, {
      minHeight: '70vh',
      width: '50%',
      panelClass: 'mat-dialog-transparent',
      data: {
        ID: ID,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    })
  }

  //透過案編跳轉至徵信照會
  toCalloutPage() {
    this.router.navigate(['./F01002/CHILDSCN8']);
  }

  refreshTable() {
    this.getCalloutList(this.pageIndex, this.pageSize);
  }
  
}
