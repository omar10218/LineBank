import { Component, OnInit, ViewChild } from '@angular/core';
import { Childbwscn4Service } from '../childbwscn4.service';
import { ActivatedRoute, Data } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-childbwscn4page5',
  templateUrl: './childbwscn4page5.component.html',
  styleUrls: ['./childbwscn4page5.component.css']
})
export class Childbwscn4page5Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private Childbwscn4Service: Childbwscn4Service,
  ) { }

  private applno: string;
  private cuid: string;
  CORE_DATASource: Data[] = [];
  CORE_MAINLISTSource: Data[] = [];
  total = 1;
  loading = false;
  pageSize = 5;
  pageIndex = 1;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('nationalId');
  }
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;

  ngAfterViewInit() {
    this.getCoreCusInfo('CORE_DATA', this.pageIndex, this.pageSize);
    this.getCoreCusInfo('CORE_MAINLIST', this.pageIndex, this.pageSize);
  }

  getCoreCusInfo(code: string, pageIndex: number, pageSize: number) {
    let jsonObject: any = {};
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    jsonObject['applno'] = this.applno;
    jsonObject['cuid'] = this.cuid;
    jsonObject['code'] = code;
    console.log(jsonObject['code'])
    const baseUrl = 'f01/childBwScn4action';
    this.Childbwscn4Service.getDate(baseUrl,jsonObject).subscribe(data => {
    console.log(data)
      this.totalCount = data.rspBody.size;
      if (code == 'CORE_DATA') { this.CORE_DATASource = data.rspBody.items; }
      if (code == 'CORE_MAINLIST') { this.CORE_MAINLISTSource = data.rspBody.items; }
      console.log( data.rspBody.items)
    });
  }
  toCurrency(amount: string) {
    return amount != null ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : amount;
  }
}
