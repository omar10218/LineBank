import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01005Service } from '../f01005.service';

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
  selector: 'app-f01005page2',
  templateUrl: './f01005page2.component.html',
  styleUrls: ['./f01005page2.component.css']
})
export class F01005page2Component implements OnInit {
  applno: string = localStorage.getItem("empNo");
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
    private f01005Service: F01005Service,
    public dialog: MatDialog,
    private router: Router
  ) { }

  @Input() update: (event: number) => {};
  @Output() update2 = new EventEmitter<number>();

  ngOnInit(): void {
    this.getCalloutList();
  }

  onclick() {
    // this.update();
    this.update2.emit();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getCalloutList();
  }

  // 照會提醒清單
  getCalloutList() {
    let jsonObject: any = {};
    jsonObject['page'] = this.pageIndex;
    jsonObject['per_page'] = this.pageSize;
    this.loading = false;
    this.f01005Service.getCalloutList(jsonObject).subscribe(data => {
      console.log(data)
      this.total = data.rspBody.length;
      this.rspBodyList = data.rspBody.items;
      this.callOutDataSource.data =  data.rspBody;
      this.update(this.total);
      // this.update2.emit( this.total);
    });
  }

  //延長下次照會提醒時間
  extendTime(ID: string, calloutRdo: string) {
    let msg = '';
    let jsonObject: any = {};
    jsonObject['rowid'] = ID;
    jsonObject['extendTime'] = calloutRdo;
    this.f01005Service.updateCalloutTime(jsonObject).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == '延長成功') { this.getCalloutList(); }
    }, 1000);
  }

  //取消照會提醒
  cancelCallout(ID: string) {
    // const dialogRef = this.dialog.open(F01002page2updateComponent, {
    //   minHeight: '70vh',
    //   width: '50%',
    //   panelClass: 'mat-dialog-transparent',
    //   data: {
    //     ID: ID,
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result != null && result.event == 'success') { this.refreshTable(); }
    // })
  }
   //透過案編跳轉至徵信照會
   toCalloutPage(applno:string) {
     alert(applno)
     sessionStorage.setItem('applno',applno)
     alert(applno)
     sessionStorage.setItem('search','Y')
    this.router.navigate(['./F01002/F01002SCN1/CHILDSCN15']);
  }

  refreshTable() {
    this.getCalloutList();
  }
}
