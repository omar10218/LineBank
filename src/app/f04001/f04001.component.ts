import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { OptionsCode } from '../interface/base';
import { F04001Service } from './f04001.service';

interface checkBox {
  value: string;
  completed: boolean;
}

@Component({
  selector: 'app-f04001',
  templateUrl: './f04001.component.html',
  styleUrls: ['./f04001.component.css', '../../assets/css/f04.css']
})

export class F04001Component implements OnInit {

  isAllCheck: boolean = false;
  sysCode: OptionsCode[] = [];
  selectedValue: string;
  chkArray: checkBox[] = [];
  applnoSource = new MatTableDataSource<any>();
  constructor(private f04001Service: F04001Service, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.f04001Service.getSysTypeCode('FLOW_STEP').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.sysCode.push({ value: codeNo, viewValue: desc })
      }
    });
  }
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
      this.getLockApplno();
    });
  }
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;

  setAll(completed: boolean) {
    for (const obj of this.chkArray) {
      obj.completed = completed;
    }
  }

  unlock() {
    const truthy = this.chkArray.filter(el => el.completed)
    if (truthy.length) {
      truthy
    } else {
      return alert('請至少勾選一項')
    }
    var valArray: string[] = new Array;
    for (const obj of truthy) {
      if (obj.completed) { valArray.push(obj.value); }
    }
    const baseUrl = 'f04/f04001fn2';
    this.f04001Service.saveFlowStep(baseUrl, this.selectedValue, valArray)
      .subscribe(data => {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: data.rspMsg }
        });
        if (data.rspCode == '0000') {
          this.getLockApplno();
        }
      });
  }

  async changeSelect() {
    this.isAllCheck = false;
    await this.getLockApplno();
  }

  private async getLockApplno() {
    const baseUrl = 'f04/f04001fn1';
    this.f04001Service.getLockApplno(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize, this.selectedValue)
      .subscribe(data => {
        if (this.chkArray.length > 0) {
          let i: number = 0;
          for (const jsonObj of data.rspBody.items) {
            const chkValue = jsonObj['applno'];
            const isChk = jsonObj['IS_CHK'];
            this.chkArray[i] = { value: chkValue, completed: isChk == 'N' };
            i++;
          }
        } else {
          for (const jsonObj of data.rspBody.items) {
            const chkValue = jsonObj['applno'];
            const isChk = jsonObj['IS_CHK'];
            this.chkArray.push({ value: chkValue, completed: isChk == 'N' });
          }
        }
        this.totalCount = data.rspBody.size;
        this.applnoSource.data = data.rspBody.items;
        this.isAllCheck = false;
      });
  }
}
