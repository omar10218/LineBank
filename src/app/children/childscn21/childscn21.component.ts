import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Childscn21Service } from './childscn21.service';
// import { NzTableQueryParams } from 'ng-zorro-antd/table';
import {NzI18nService, zh_TW} from 'ng-zorro-antd/i18n'

//Nick 額度資訊
@Component({
  selector: 'app-childscn21',
  templateUrl: './childscn21.component.html',
  styleUrls: ['./childscn21.component.css']
})
export class Childscn21Component implements OnInit {

  constructor(
    private childscn21Service: Childscn21Service,
    private nzI18nService: NzI18nService
  ) {this.nzI18nService.setLocale(zh_TW) }

  // total = 1;
  // loading = true;
  // pageIndex = 1;
  // pageSize = 50;

  private applno: string;

  PERSONSource = new MatTableDataSource<any>();//table資料

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.getCALLOUTFunction();//載入頁面

  }

  // //頁數切換
  // onQueryParamsChange(params: NzTableQueryParams): void {
  //   const { pageSize, pageIndex } = params;
  //   this.pageSize=pageSize;
  //   this.pageIndex=pageIndex;
  //   this.getCALLOUTFunction(this.pageIndex, this.pageSize);
  // }


 //取Table
 private async getCALLOUTFunction() {
  const baseUrl = 'f01/childscn21';
  let jsonObject: any = {};
  jsonObject['applno'] = this.applno
  console.log('jsonObject');
  console.log(jsonObject);
  this.childscn21Service.postJsonObject_PERSON_MAIN(baseUrl, jsonObject).subscribe(data => {
    console.log('data');
    console.log(data);
    this.PERSONSource.data = data.rspBody;

    //this.total = data.rspBody.size;
    console.log(this.PERSONSource.data);
  });
  //this.loading = false;
}


}
