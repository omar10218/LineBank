import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01002Service } from '../f01002.service';

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
    this.getCalloutList();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    // this.getCaseList(this.empNo, this.swcID, this.swcApplno, pageIndex, pageSize);
  }

  // 照會提醒清單
  getCalloutList() {
    let jsonObject: any = {};
    jsonObject['swcL3EmpNo'] = localStorage.getItem("empNo");
    this.loading = false;
    this.f01002Service.getCalloutList(jsonObject).subscribe(data => {
      console.log(data)
      this.total = data.rspBody.size;
      this.rspBodyList = data.rspBody.items;
      this.callOutDataSource.data = this.rspBodyList
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
      if (msg != null && msg == '延長成功') { this.getCalloutList(); }
    }, 1000);
  }

  //取消照會提醒
  cancelCallout(ID: string){
    let msg = '';
    let jsonObject: any = {};
    jsonObject['rowid'] = ID;
    this.f01002Service.updateCalloutYN(jsonObject).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == '取消成功') { this.getCalloutList(); }
    }, 1000);
  }
  
  //透過案編跳轉至徵信照會
  toCalloutPage(){
    this.router.navigate(['./F01002/CHILDSCN8']);
  }
}
