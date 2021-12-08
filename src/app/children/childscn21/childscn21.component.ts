import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Childscn21Service } from './childscn21.service';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n'
import { OptionsCode } from 'src/app/interface/base';

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

  PERSONSource = [];//table資料
  limitTypeCode: OptionsCode[] = [];
  ngOnInit(): void {
    this.childscn21Service.getSysTypeCode('LIMIT_TYPE').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.limitTypeCode.push({ value: codeNo, viewValue: desc })
      }
    });




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
        this.PERSONSource = data.rspBody;
        console.log(data)
      }
    });
  }

  getStyle(value: string) {
    // value = this.toNumber(value);
    value = value != null ? value.replace(',', '') : value;
    return {
      'text-align': this.isNumber(value) ? 'right' : 'left'
    }
  }

  isNumber(value: any) { return /^-?[\d.]+(?:e-?\d+)?$/.test(value); }

  toCurrency(amount: string) {
    return amount != null ? amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : amount;
  }
  //去除符號/中英文
  toNumber(data: string) {
    return data != null ? data.replace(/[^\w\s]|_/g, '') : data;
  }

   // 轉成中文
   transCode(codeVal: string): string {
    for (const data of this.limitTypeCode) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
}
