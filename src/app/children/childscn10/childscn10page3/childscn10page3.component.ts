import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OptionsCode } from 'src/app/interface/base';
import { Childscn10Service } from '../childscn10.service';
import { MatTableDataSource } from '@angular/material/table';

//Nick 產生合約前重查
@Component({
  selector: 'app-childscn10page3',
  templateUrl: './childscn10page3.component.html',
  styleUrls: ['./childscn10page3.component.css', '../../../../assets/css/child.css']
})
export class Childscn10page3Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private childscn10Service: Childscn10Service
  ) { }

  dss3Form: FormGroup = this.fb.group({
    SYSFLOWCD: ['', []],
    RESLTCD: ['', []],
    UNDW_CD_CNT: ['', []],
    UNDW_CD_LIST: ['', []],
    SPARE_ARRAY1: ['', []],
    SPARE_ARRAY2: ['', []],
  });

  dateCode: OptionsCode[] = [];
  dateValue: string;

  private applno: string;
  private cuid: string;
  private search: string;

  fmData = new MatTableDataSource<any>();//判斷結果資料表

  // test7=10000
  // test1="1";test2="2";test3="3";
  // test4="4";test5="5";test6="6";

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    this.search = sessionStorage.getItem('search');
    this.getDBR_DTI();

    // const url = 'f01/childscn10';
    // const formdata: FormData = new FormData();
    // formdata.append('applno', this.applno);
    // formdata.append('cuid', this.cuid);
    // formdata.append('code', 'DSS3');
    // this.childscn10Service.getDate(url, formdata).subscribe(data => {
    //   for (let i = 0; i < data.rspBody.items.length; i++) {
    //     this.dateCode.push({ value: data.rspBody.items[i].QUERYDATE, viewValue: data.rspBody.items[i].QUERYDATE })
    //   }
    //   this.dateValue = data.rspBody.items[0].QUERYDATE
    //   this.getDSS3(this.dateValue);
    // });
  }

  getDSS3(dateValue: string) {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'DSS3');
    formdata.append('queryDate', dateValue);
    this.childscn10Service.getDSSSearch(formdata).subscribe(data => {
      this.dss3Form.patchValue({ SYSFLOWCD: data.rspBody.items[0].SYSFLOWCD })
      this.dss3Form.patchValue({ RESLTCD: data.rspBody.items[0].RESLTCD })
      this.dss3Form.patchValue({ UNDW_CD_CNT: data.rspBody.items[0].UNDW_CD_CNT })
      this.dss3Form.patchValue({ UNDW_CD_LIST: data.rspBody.items[0].UNDW_CD_LIST })
      this.dss3Form.patchValue({ SPARE_ARRAY1: data.rspBody.items[0].SPARE_ARRAY1 })
      this.dss3Form.patchValue({ SPARE_ARRAY2: data.rspBody.items[0].SPARE_ARRAY2 })
    });
  }

  getSearch(): string {
    return this.search;
  }
  // changeDate() {
  //   this.getDSS3(this.dateValue);
  // }


  //取DBR收支表資料 產生合約前回查 _M前端欄位改取_B
  getDBR_DTI() {

    const url = 'f01/childscn10action6';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    // 測試用
    // jsonObject['applno'] = '20210827E001';
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      console.log('data');
      console.log(data);
      if (data.rspBody.length > 0) {
        this.fmData.data = data.rspBody

        //測試用
        // this.fmData.data[0].unsdebt_AMT_501EX = "1";
        // this.fmData.data[0].unsdebt_AMT_504EX = "2";
        // this.fmData.data[0].unsdebt_AMTNEW_505EX = "3";
        // this.fmData.data[0].unsdebt_AMTNEW_029EX = "4";
        // this.fmData.data[0].unsdebt_824_RLLIMIT = "5";
        // this.fmData.data[0].unsdebt_824_RLBAL = "6";
        // this.fmData.data[0].unsdebt_824_ILBAL = "7";
        // this.fmData.data[0].unsdebt_824_CCRBAL = "8";
        // this.fmData.data[0].unsdebt_NONJCIC = "9";
        // this.fmData.data[0].unsdebt_PAYAMT_029EX = "10";
        // this.fmData.data[0].unsdebt_SUM_0 = "11";
        // this.fmData.data[0].unsdebt_SUM_0CK_B = "12";

        // this.fmData.data[0].unsdebt_AMT_501EX_B = null;
        // this.fmData.data[0].unsdebt_AMT_504EX_B = null;
        // this.fmData.data[0].unsdebt_AMTNEW_505EX_B = null;
        // this.fmData.data[0].unsdebt_AMTNEW_029EX_B = null;
        // this.fmData.data[0].unsdebt_824_RLLIMIT_B = null;
        // this.fmData.data[0].unsdebt_824_RLBAL_B = null;
        // this.fmData.data[0].unsdebt_824_ILBAL_B = null;
        // this.fmData.data[0].unsdebt_824_CCRBAL_B = null;
        // this.fmData.data[0].unsdebt_NONJCIC_B = null;
        // this.fmData.data[0].unsdebt_PAYAMT_029EX_B = null;

        // this.fmData.data[0].dbr_2CK = "16";
        // this.fmData.data[0].dbr_2 = "14";
        // this.fmData.data[0].dbr_0 = "15";
        // this.fmData.data[0].dbr_0CK = "17";

        console.log(this.fmData.data);

        this.fmData.data[0].unsdebt_AMT_501EX_B = this.fmData.data[0].unsdebt_AMT_501EX_B == null ? this.fmData.data[0].unsdebt_AMT_501EX : this.fmData.data[0].unsdebt_AMT_501EX_B;
        this.fmData.data[0].unsdebt_AMT_504EX_B = this.fmData.data[0].unsdebt_AMT_504EX_B == null ? this.fmData.data[0].unsdebt_AMT_504EX : this.fmData.data[0].unsdebt_AMT_504EX_B;
        this.fmData.data[0].unsdebt_AMTNEW_505EX_B = this.fmData.data[0].unsdebt_AMTNEW_505EX_B == null ? this.fmData.data[0].unsdebt_AMTNEW_505EX : this.fmData.data[0].unsdebt_AMTNEW_505EX_B;
        this.fmData.data[0].unsdebt_AMTNEW_029EX_B = this.fmData.data[0].unsdebt_AMTNEW_029EX_B == null ? this.fmData.data[0].unsdebt_AMTNEW_029EX : this.fmData.data[0].unsdebt_AMTNEW_029EX_B;
        this.fmData.data[0].unsdebt_824_RLLIMIT_B = this.fmData.data[0].unsdebt_824_RLLIMIT_B == null ? this.fmData.data[0].unsdebt_824_RLLIMIT : this.fmData.data[0].unsdebt_824_RLLIMIT_B;
        this.fmData.data[0].unsdebt_824_RLBAL_B = this.fmData.data[0].unsdebt_824_RLBAL_B == null ? this.fmData.data[0].unsdebt_824_RLBAL : this.fmData.data[0].unsdebt_824_RLBAL_B;
        this.fmData.data[0].unsdebt_824_ILBAL_B = this.fmData.data[0].unsdebt_824_ILBAL_B == null ? this.fmData.data[0].unsdebt_824_ILBAL : this.fmData.data[0].unsdebt_824_ILBAL_B;
        this.fmData.data[0].unsdebt_824_CCRBAL_B = this.fmData.data[0].unsdebt_824_CCRBAL_B == null ? this.fmData.data[0].unsdebt_824_CCRBAL : this.fmData.data[0].unsdebt_824_CCRBAL_B;
        this.fmData.data[0].unsdebt_NONJCIC_B = this.fmData.data[0].unsdebt_NONJCIC_B == null ? this.fmData.data[0].unsdebt_NONJCIC : this.fmData.data[0].unsdebt_NONJCIC_B;
        this.fmData.data[0].unsdebt_PAYAMT_029EX_B = this.fmData.data[0].unsdebt_PAYAMT_029EX_B == null ? this.fmData.data[0].unsdebt_PAYAMT_029EX : this.fmData.data[0].unsdebt_PAYAMT_029EX_B;

        this.fmData.data[0].unsdebt_AMT_501EX_B = this.data_number2(this.fmData.data[0].unsdebt_AMT_501EX_B);
        this.fmData.data[0].unsdebt_AMT_504EX_B = this.data_number2(this.fmData.data[0].unsdebt_AMT_504EX_B);
        this.fmData.data[0].unsdebt_AMTNEW_505EX_B = this.data_number2(this.fmData.data[0].unsdebt_AMTNEW_505EX_B);
        this.fmData.data[0].unsdebt_AMTNEW_029EX_B = this.data_number2(this.fmData.data[0].unsdebt_AMTNEW_029EX_B);
        this.fmData.data[0].unsdebt_824_RLLIMIT_B = this.data_number2(this.fmData.data[0].unsdebt_824_RLLIMIT_B);
        this.fmData.data[0].unsdebt_824_RLBAL_B = this.data_number2(this.fmData.data[0].unsdebt_824_RLBAL_B);
        this.fmData.data[0].unsdebt_824_ILBAL_B = this.data_number2(this.fmData.data[0].unsdebt_824_ILBAL_B);
        this.fmData.data[0].unsdebt_824_CCRBAL_B = this.data_number2(this.fmData.data[0].unsdebt_824_CCRBAL_B);
        this.fmData.data[0].unsdebt_NONJCIC_B = this.data_number2(this.fmData.data[0].unsdebt_NONJCIC_B);
        this.fmData.data[0].unsdebt_PAYAMT_029EX_B = this.data_number2(this.fmData.data[0].unsdebt_PAYAMT_029EX_B);



      }

    });
  }


  //去除符號中文+千分位
  data_number(x: string) {
    if (x != null) {
      x = x.replace(/[^\d]/g, '');
      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return x
  }
  //去除符號中文 可負號 +千分位
  data_number2(x: string) {
    if (x != null) {
      x = x.replace(/[^\d-]/g, '');
      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return x
  }

  //去除符號/中文 可負號 儲存用
  save_data_number(x: string) {
    if (x != null) {
      x = x.replace(/[^\d]/g, '');
    }
    return x
  }

  //去除符號/中文 可負號 儲存用
  save_data_number2(x: string) {
    if (x != null) {
      x = x.replace(/[^\d-]/g, '');
    }
    return x
  }

  //儲存 DBR收支表資料 產生合約前回查
  save() {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10action7';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    //測試用
    // jsonObject['applno'] = '20210827E001';
    jsonObject['unsdebtAmt501Ex'] = this.save_data_number(this.fmData.data[0].unsdebt_AMT_501EX_B);
    jsonObject['unsdebtAmt504Ex'] = this.save_data_number(this.fmData.data[0].unsdebt_AMT_504EX_B);
    jsonObject['unsdebtAmtnew505Ex'] = this.save_data_number(this.fmData.data[0].unsdebt_AMTNEW_505EX_B);
    jsonObject['unsdebtAmtnew029Ex'] = this.save_data_number(this.fmData.data[0].unsdebt_AMTNEW_029EX_B);
    jsonObject['unsdebt824Rllimit'] = this.save_data_number(this.fmData.data[0].unsdebt_824_RLLIMIT_B);
    jsonObject['unsdebt824Rlbal'] = this.save_data_number(this.fmData.data[0].unsdebt_824_RLBAL_B);
    jsonObject['unsdebt824Ilbal'] = this.save_data_number(this.fmData.data[0].unsdebt_824_ILBAL_B);
    jsonObject['unsdebt824Ccrbal'] = this.save_data_number(this.fmData.data[0].unsdebt_824_CCRBAL_B);
    jsonObject['unsdebtNonjcic'] = this.save_data_number2(this.fmData.data[0].unsdebt_NONJCIC_B);
    jsonObject['unsdebtPayamt029Ex'] = this.save_data_number(this.fmData.data[0].unsdebt_PAYAMT_029EX_B);

    console.log('jsonObject')
    console.log(jsonObject)
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      console.log('savedata')
      console.log(data)
    });
  }
}
