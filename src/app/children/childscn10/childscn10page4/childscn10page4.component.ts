import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Childscn10Service } from '../childscn10.service';
import { MatTableDataSource } from '@angular/material/table';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n'
import { NzTableQueryParams } from 'ng-zorro-antd/table';

//Nick 風險模型資訊
@Component({
  selector: 'app-childscn10page4',
  templateUrl: './childscn10page4.component.html',
  styleUrls: ['./childscn10page4.component.css', '../../../../assets/css/child.css']
})
export class Childscn10page4Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private childscn10Service: Childscn10Service,
    private nzI18nService: NzI18nService) {
    this.nzI18nService.setLocale(zh_TW)
  }

  private applno: string;
  total = 1;
  loading = true;
  // pageIndex = 1;
  // pageSize = 50;

  DataSource = new MatTableDataSource<any>();//table資料

  DataForm: FormGroup = this.fb.group({
    RISKMDSUB_A0: ['', []],//風險模型子模型代碼
    RISKMDSUB_A0_DESC: ['', []],//風險模型子模型說明
    RISKMDSCORE_A0: ['', []],//風險模型分數
    RISKMDGRADE_A0: ['', []],//風險模型等級
    RISKMDGRADE_A0_GP: ['', []],//風險模型等級分群
    RISKMDGRADE_A0_ADJ: ['', []],//風險模型等級(策略調整後)
    RISKMDGRADE_A0_GP_ADJ: ['', []],//風險模型等級分群(策略調整後)
  })

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.getData();
    //this.getCALLOUTFunction(this.pageIndex, this.pageSize);
  }

  //取Table
  getData() {

    const url = 'f01/childscn10';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      console.log('data');
      console.log(data);
      this.DataSource.data = data.rspBody.items1
      //系統決策
      this.DataForm.patchValue({ RISKMDSUB_A0: data.rspBody.items1[0].RISKMDSUB_A0 })//風險模型子模型代碼
      this.DataForm.patchValue({ RISKMDSUB_A0_DESC: data.rspBody.items1[0].RISKMDSUB_A0_DESC })//風險模型子模型說明
      this.DataForm.patchValue({ RISKMDSCORE_A0: data.rspBody.items1[0].RISKMDSCORE_A0 })//風險模型分數
      this.DataForm.patchValue({ RISKMDGRADE_A0: data.rspBody.items1[0].RISKMDGRADE_A0 })//風險模型等級
      this.DataForm.patchValue({ RISKMDGRADE_A0_GP: data.rspBody.items1[0].RISKMDGRADE_A0_GP })//風險模型等級分群
      this.DataForm.patchValue({ RISKMDGRADE_A0_ADJ: data.rspBody.items1[0].RISKMDGRADE_A0_ADJ })//風險模型等級(策略調整後)
      this.DataForm.patchValue({ RISKMDGRADE_A0_GP_ADJ: data.rspBody.items1[0].RISKMDGRADE_A0_GP_ADJ })//風險模型等級分群(策略調整後)

      this.total = data.rspBody.items1.size;
    });
  }

  // //取Table
  // private async getCALLOUTFunction(pageIndex: number, pageSize: number) {
  //   const baseUrl = 'f01/childscn8scn1';
  //   let jsonObject: any = {};
  //   jsonObject['page'] = pageIndex;
  //   jsonObject['per_page'] = pageSize
  //   jsonObject['applno'] = this.applno
  //   console.log('jsonObject');
  //   console.log(jsonObject);
  //   this.childscn10Service.postJsonObject_CALLOUT(baseUrl, jsonObject).subscribe(data => {
  //     console.log('data');
  //     console.log(data);
  //     this.DataSource.data = data.rspBody.list;
  //     this.total = data.rspBody.size;
  //     console.log(this.DataSource.data);
  //   });
  //   this.loading = false;
  // }


  // onQueryParamsChange(params: NzTableQueryParams): void {
  //   const { pageSize, pageIndex } = params;
  //   this.pageSize = pageSize;
  //   this.pageIndex = pageIndex;
  //   this.getData();
  // }


}
