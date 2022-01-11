import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Childbwscn4Service } from '../childbwscn4.service';

@Component({
  selector: 'app-childbwscn4page4',
  templateUrl: './childbwscn4page4.component.html',
  styleUrls: ['./childbwscn4page4.component.css']
})
export class Childbwscn4page4Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private Childbwscn4Service: Childbwscn4Service
  ) { }

  private applno: string;
  private cuid: string;
  dcTransDetailSource: Data[] = [];
  total = 1;
  loading = false;
  pageSize = 10;
  pageIndex = 1;


  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('nationalId');
  }

  ngAfterViewInit() {
    this.getCoreCusInfo('DC_TRANS_DETAIL', this.pageIndex, this.pageSize);
  }

  getCoreCusInfo(code: string, pageIndex: number, pageSize: number) {
    let jsonObject: any = {};
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    jsonObject['applno'] = this.applno;
    jsonObject['cuid'] = this.cuid;
    jsonObject['code'] = code;
    this.Childbwscn4Service.getCoreCusInfo(jsonObject).subscribe(data => {
      this.total = data.rspBody.size;
      this.dcTransDetailSource = data.rspBody.items;
      this.loading = false;
    });
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.getCoreCusInfo('DC_TRANS_DETAIL', this.pageIndex, this.pageSize);
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}
