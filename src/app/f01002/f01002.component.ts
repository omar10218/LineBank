import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { F01002Service } from './f01002.service';
import { F01002confirmComponent } from './f01002confirm/f01002confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core'

interface sysCode {
  value: string;
  viewValue: string;
}

interface checkBox {
  value: string;
  completed: boolean;
}

@Component({
  selector: 'app-f01002',
  templateUrl: './f01002.component.html',
  styleUrls: ['./f01002.component.css', '../../assets/css/f03.css']
})
export class F01002Component implements OnInit {

  sysCode: sysCode[] = [];
  selectedValue: string;
  isAllCheck: boolean = false;
  roleFunctionSource = new MatTableDataSource<any>();

  chkArray: checkBox[] = [];

  constructor(private f01002Service: F01002Service, public dialog: MatDialog) { }


  calloutSpeakingSource = new MatTableDataSource<any>();
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  totalCount: any;
  currentPage: PageEvent;
  currentSort: Sort;

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
      this.getSTEP_ERRORFunction();
    });
  }

  ngOnInit(): void {
    this.f01002Service.getSysTypeCode('STEP_ERROR','f03/f03009').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.sysCode.push({value: codeNo, viewValue: desc})
      }
    });
  }




  newSearch() {
    //alert('重查');
    var valArray: string[] = new Array;
    for (const obj of this.chkArray) {
      if (obj.completed) { valArray.push(obj.value); }
    }
    console.log(valArray);
    const baseUrl = 'f01/f01002fn1';
     this.f01002Service.newSearch_Decline_STEP_ERRORFunction(baseUrl,this.selectedValue, valArray, 'A').subscribe(data => {
      const childernDialogRef = this.dialog.open(F01002confirmComponent, {
        data: { msgStr: data.rspMsg }
      });
      if(data.rspMsg=='推關成功'){
        this.getSTEP_ERRORFunction();
      }
    });

  }

  Decline() {
    //alert('婉拒');
    var valArray: string[] = new Array;
    for (const obj of this.chkArray) {
      if (obj.completed) { valArray.push(obj.value); }
    }
    console.log(valArray);
    const baseUrl = 'f01/f01002fn1';
     this.f01002Service.newSearch_Decline_STEP_ERRORFunction(baseUrl,this.selectedValue, valArray, 'D').subscribe(data => {
      const childernDialogRef = this.dialog.open(F01002confirmComponent, {
        data: { msgStr: data.rspMsg }
      });
      if(data.rspMsg=='推關成功'){
        this.getSTEP_ERRORFunction();
      }
    });
  }


  setAll(completed: boolean) {
    for (const obj of this.chkArray) {
      obj.completed = completed;
    }
  }

  async changeSelect() {
    this.isAllCheck = false;
    await this.getSTEP_ERRORFunction();
  }


  private async getSTEP_ERRORFunction() {
    console.log(this.currentPage.pageIndex)
    console.log(this.currentPage.pageSize)

    const baseUrl = 'f01/f01002';
    this.f01002Service.getSTEP_ERRORFunction(baseUrl, this.selectedValue,this.currentPage.pageIndex, this.currentPage.pageSize).subscribe(data => {
       console.log(data);
      if (this.chkArray.length > 0) {
        let i: number = 0;
        for (const jsonObj of data.rspBody) {
          const chkValue = jsonObj['applno'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray[i] = {value: chkValue, completed: isChk == 'N'};
          i++;
        }

      } else {
        for (const jsonObj of data.rspBody) {
          const chkValue = jsonObj['applno'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray.push({value: chkValue, completed: isChk == 'N'});
        }
      }
       this.roleFunctionSource.data = data.rspBody;
       this.totalCount = data.rspBody.size;
       this.isAllCheck = false;
    });
  }

}
