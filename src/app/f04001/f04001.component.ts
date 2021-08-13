import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F04001Service } from './f04001.service';

interface sysCode {
  value: string;
  viewValue: string;
}

interface checkBox {
  value: string;
  completed: boolean;
}

@Component({
  selector: 'app-f04001',
  templateUrl: './f04001.component.html',
  styleUrls: ['./f04001.component.css', '../../assets/css/f03.css']
})

export class F04001Component implements OnInit {

  isAllCheck: boolean = false;
  sysCode: sysCode[] = [];
  selectedValue: string;
  chkArray: checkBox[] = [];
  applnoSource = new MatTableDataSource<any>();
  constructor(private f04001Service: F04001Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    const baseUrl = 'f04/f04001';
    this.f04001Service.getSysTypeCode('FLOW_STEP',baseUrl).subscribe(data => {
      console.log(data)
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.sysCode.push({ value: codeNo, viewValue: desc })
      }
    });
  }
  ngAfterViewInit() {
    // this.currentPage = {
    //   pageIndex: 0,
    //   pageSize: 10,
    //   length: null
    // };
    // this.currentSort = {
    //   active: '',
    //   direction: ''
    // };
    // this.paginator.page.subscribe((page: PageEvent) => {
    //   this.currentPage = page;
    //   this.getLockApplno();
    // });
  }
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;

  setAll(completed: boolean) {
    console.log(this.chkArray)
    for (const obj of this.chkArray) {
      obj.completed = completed;
    }
  }


  unlock() {
    console.log(this.selectedValue)
    var valArray: string[] = new Array;
    for (const obj of this.chkArray) {
      if (obj.completed) { valArray.push(obj.value); }
    }
    const formData: FormData = new FormData();
    formData.append("step", this.selectedValue);
    formData.append("applno", this.selectedValue);
    const baseUrl = 'f04/f04001fn2';
    this.f04001Service.saveFlowStep(baseUrl, formData).subscribe(data => {
      
    });
  }

  changeSelect() {
    // this.isAllCheck = false;
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getLockApplno();
  }

  getLockApplno() {
    const baseUrl = 'f04/f04001fn1';
    this.f04001Service.getLockApplno(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize, this.selectedValue)
    .subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.applnoSource.data = data.rspBody.items;
    });
  }
}
