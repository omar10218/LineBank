import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { F03010Service } from './f03010.service';
import { F03010addComponent } from './f03010add/f03010add.component';
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

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  calloutSpeakingSource = new MatTableDataSource<any>();//Tabele資料

  ngOnInit(): void {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };

    this.currentSort = {
      active: '',
      direction: ''
    };
  }

  //表單資料筆數調整
  ngAfterViewInit() {
    this.getSpeaking();
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
      this.getSpeaking();
    });
  }

  //新增
  add() {
    const dialogRef = this.dialog.open(F03010addComponent, {
      minHeight: '100vh',
      width: '50%',
      data: {
        speakingAbbreviation: '',//話術簡稱
        speakingContent : '' ,//話術內容
        stopFlag: 'Y'//暫停使用
      },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result == '1') { this.refreshTable(); }
      });
  }

  //取話術Table
  getSpeaking() {
    const baseUrl = "f03/f03010";
    let jsonObject: any = {};
    jsonObject['page'] = this.currentPage.pageIndex + 1;
    jsonObject['per_page'] = this.currentPage.pageSize
    this.f03010Service.Speaking(baseUrl, jsonObject)
    .subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.calloutSpeakingSource.data = data.rspBody.items;
    });
  }

  //修改
  startEdit(speakingAbbreviation: string, speakingContent: string, stopFlag: string) {
    console.log(speakingAbbreviation,speakingContent,stopFlag)
    const dialogRef = this.dialog.open(F03010editComponent, {
      minHeight: '100vh',
      width: '50%',
      data: {
          speakingAbbreviation: speakingAbbreviation,//話術簡稱
          speakingContent : speakingContent ,//話術內容
          stopFlag: stopFlag//暫停使用
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result == '1') { this.refreshTable(); }
      });
  }

  //刷新表單
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  //刪除
  delete(speakingAbbreviation: string) {
    let msg = '';
    const baseUrl = 'f03/f03010action3';
    let jsonObject: any = {};
    jsonObject['speakingAbbreviation'] = speakingAbbreviation;
    this.f03010Service.Speaking( baseUrl, jsonObject).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
      this.refreshTable();
    }, 1500);
  }

}
