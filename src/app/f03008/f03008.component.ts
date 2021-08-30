import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03008Service } from './f03008.service';
import { MatTableDataSource } from '@angular/material/table';
import { F03008uploadComponent } from './f03008upload/f03008upload.component';
import { F03008editComponent } from './f03008edit/f03008edit.component';
import { MatDialog } from '@angular/material/dialog';
import { F03008confirmComponent } from './f03008confirm/f03008confirm.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';


@Component({
  selector: 'app-f03008',
  templateUrl: './f03008.component.html',
  styleUrls: ['./f03008.component.css', '../../assets/css/f03.css']
})
export class F03008Component implements OnInit {
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  dialogRef: any;
  empNo: string = localStorage.getItem("empNo");

  ABNORMAL_NID: string = '';
  dataSource = new MatTableDataSource<any>();

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
    this.getAbnormalList();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getAbnormalList();
    });
  }

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f03008Service: F03008Service) { }


  ngOnInit(): void {
  }


  getAbnormalList() {
    console.log(this.ABNORMAL_NID);
    const baseUrl = 'f03/f03008action1';
    this.f03008Service.getAbnormalList(baseUrl, this.ABNORMAL_NID, this.currentPage.pageIndex, this.currentPage.pageSize)
      .subscribe(data => {
        this.totalCount = data.rspBody.size;
        if (this.totalCount == 0) {
          const childernDialogRef = this.dialog.open(F03008confirmComponent, {
            data: { msgStr: "查無資料!" }
          });
        }
        this.dataSource.data = data.rspBody.items;
      });
  }

  uploadNew() {
    const dialogRef = this.dialog.open(F03008uploadComponent, {
      data: {
        ABNORMAL_NID: '',
        ABNORMAL_NAME: '',
        ON_CHECK: 'Y',
        TRANSFER_EMPNO: '',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  startEdit(abnormalNid:string,onCheck:string,transferEmpno:string,transferDate:string,
    changeEmpno:string,changeDate:string,) {
    const dialogRef = this.dialog.open(F03008editComponent, {
      data: {
        abnormalNid: abnormalNid,
        onCheck: onCheck,
        transferEmpno: transferEmpno,
        transferDate: transferDate,
        changeEmpno: changeEmpno,
        changeDate: changeDate,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result == 1) { this.refreshTable(); }
    });
  }

  public async delete(abnormalNid:string): Promise<void> {
    let baseUrl = 'f03/f03008action4';
    this.f03008Service.delete(baseUrl ,abnormalNid).subscribe(data => {
      const childernDialogRef = this.dialog.open(F03008confirmComponent, {
        data: { msgStr: data.rspMsg }
      });
    });
  }




  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getAbnormalList();
  }

  search() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getAbnormalList();
  }

}
