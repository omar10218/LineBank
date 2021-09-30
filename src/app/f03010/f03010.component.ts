import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { F03010Service } from './f03010.service';
import { F03010addComponent } from './f03010add/f03010add.component';
import { F03010deleteComponent } from './f03010delete/f03010delete.component';
import { F03010editComponent } from './f03010edit/f03010edit.component';

//Nick 照會話術
@Component({
  selector: 'app-f03010',
  templateUrl: './f03010.component.html',
  styleUrls: ['./f03010.component.css', '../../assets/css/f03.css']
})
export class F03010Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private f03010Service: F03010Service,
    public dialog: MatDialog
  ) { }

  listOfData: readonly Data[] = [];
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  ngOnInit(): void {
    this.getSpeaking(this.pageIndex, this.pageSize);
  }

  //新增
  add() {
    const dialogRef = this.dialog.open(F03010addComponent, {
      minHeight: '70vh',
      width: '50%',
      data: {
        speakingAbbreviation: '',//話術簡稱
        speakingContent : '' ,//話術內容
        stopFlag: 'Y'//暫停使用
      },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && (result.event == 'success' || result == '1')) { this.refreshTable(); }
      });
  }

  //取話術Table
  getSpeaking(pageIndex: number, pageSize: number) {
    console.log("pageIndex="+pageIndex+",pageSize"+pageSize)
    const baseUrl = "f03/f03010";
    let jsonObject: any = {};
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize
    this.f03010Service.Speaking(baseUrl, jsonObject)
    .subscribe(data => {
      this.listOfData = data.rspBody.items;
      this.total = data.rspBody.size;
      this.loading = false;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getSpeaking(pageIndex, pageSize);
  }

  //修改
  startEdit(speakingAbbreviation: string, speakingContent: string, stopFlag: string) {
    console.log(speakingAbbreviation,speakingContent,stopFlag)
    const dialogRef = this.dialog.open(F03010editComponent, {
      minHeight: '70vh',
      width: '50%',
      data: {
          speakingAbbreviation: speakingAbbreviation,//話術簡稱
          speakingContent : speakingContent ,//話術內容
          stopFlag: stopFlag//暫停使用
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && (result.event == 'success' || result == '1')) { this.refreshTable(); }
      });
  }

  //刷新表單
  private refreshTable() {
    //this.paginator._changePageSize(this.paginator.pageSize);
  }

  //刪除
  delete(speakingAbbreviation: string, speakingContent: string, stopFlag: string) {
    const dialogRef = this.dialog.open(F03010deleteComponent, {
      minHeight: '70vh',
      width: '50%',
      data: {
        speakingAbbreviation: speakingAbbreviation,
        speakingContent : speakingContent ,
        stopFlag: stopFlag
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == '刪除成功!') {
          this.refreshTable();
          window.location.reload();
        }
      });
  }

}
