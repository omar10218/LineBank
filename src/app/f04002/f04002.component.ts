import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F04002Service } from './f04002.service';
import { F04002confirmComponent } from './f04002confirm/f04002confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}

interface checkBox {
  value: string;
  completed: boolean;
}

@Component({
  selector: 'app-f04002',
  templateUrl: './f04002.component.html',
  styleUrls: ['./f04002.component.css', '../../assets/css/f04.css']
})
export class F04002Component implements OnInit {

  sysCode: sysCode[] = [];
  selectedValue: string;
  isAllCheck: boolean = false;
  roleFunctionSource = new MatTableDataSource<any>();

  chkArray: checkBox[] = [];

  constructor(private f04002Service: F04002Service, public dialog: MatDialog) { }

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
    this.f04002Service.getSysTypeCode('STEP_ERROR','f03/f03009').subscribe(data => {
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
    const baseUrl = 'f04/f04002fn1';
     this.f04002Service.newSearch_Decline_STEP_ERRORFunction(baseUrl,this.selectedValue, valArray, 'A').subscribe(data => {
      const childernDialogRef = this.dialog.open(F04002confirmComponent, {
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
    const baseUrl = 'f04/f04002fn1';
     this.f04002Service.newSearch_Decline_STEP_ERRORFunction(baseUrl,this.selectedValue, valArray, 'P').subscribe(data => {
      const childernDialogRef = this.dialog.open(F04002confirmComponent, {
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

    const baseUrl = 'f04/f04002';
    this.f04002Service.getSTEP_ERRORFunction(baseUrl, this.selectedValue,this.currentPage.pageIndex, this.currentPage.pageSize).subscribe(data => {
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
