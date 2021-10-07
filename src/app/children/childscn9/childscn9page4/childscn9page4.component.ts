import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Childscn9Service } from '../childscn9.service';

@Component({
  selector: 'app-childscn9page4',
  templateUrl: './childscn9page4.component.html',
  styleUrls: ['./childscn9page4.component.css', '../../../../assets/css/child.css']
})
export class Childscn9page4Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private childscn9Service: Childscn9Service
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
    this.cuid = sessionStorage.getItem('cuid');

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
    this.childscn9Service.getCoreCusInfo(jsonObject).subscribe(data => {
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


