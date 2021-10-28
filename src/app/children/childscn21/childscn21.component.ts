import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Childscn21Service } from './childscn21.service';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n'

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
  ) { this.nzI18nService.setLocale(zh_TW) }

  private applno: string;

  PERSONSource = new MatTableDataSource<any>();//table資料

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.getCALLOUTFunction();//載入頁面

  }

  //取Table
  private async getCALLOUTFunction() {
    const baseUrl = 'f01/childscn21';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno
    this.childscn21Service.postJsonObject_PERSON_MAIN(baseUrl, jsonObject).subscribe(data => {
      if (data.rspMsg == 'success') {
        this.PERSONSource.data = data.rspBody;
      }
    });
  }


}
