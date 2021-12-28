import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01005Service } from '../f01005.service';



@Component({
  selector: 'app-f01005page2',
  templateUrl: './f01005page2.component.html',
  styleUrls: ['./f01005page2.component.css']
})
export class F01005page2Component implements OnInit {
  applno: string = localStorage.getItem("empNo");
  callOutDataSource = [];  // 照會提醒清單
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  extendTimeValue: string;
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
      this.total = data.rspBody.length;
      this.callOutDataSource = data.rspBody;
      this.update(this.total);
      // this.update2.emit( this.total);
    });
  }

   //透過案編跳轉至徵信照會
   toCalloutPage(applno:string) {
     sessionStorage.setItem('applno',applno)
     sessionStorage.setItem('search','N')
     sessionStorage.setItem('winClose', 'N');
     sessionStorage.setItem('level', '3');
     sessionStorage.setItem('page', '5');
    this.router.navigate(['./F01005/F01005SCN1/CHILDSCN15']);
  }

  refreshTable() {
    this.getCalloutList();
  }
}
