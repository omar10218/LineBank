import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OptionsCode } from 'src/app/interface/base';
import { Childscn10Service } from '../childscn10.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-childscn10page3',
  templateUrl: './childscn10page3.component.html',
  styleUrls: ['./childscn10page3.component.css', '../../../../assets/css/f01.css']
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

  test7=10000
  test1="1";test2="2";test3="3";
  test4="4";test5="5";test6="6";

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    this.search = sessionStorage.getItem('search');
    // this.route.queryParams.subscribe(params => {
    //   this.queryDate = params['queryDate'];
    // });

    const url = 'f01/childscn10';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'DSS3');
    this.childscn10Service.getDate(url, formdata).subscribe(data => {
      for (let i = 0; i < data.rspBody.items.length; i++) {
        this.dateCode.push({ value: data.rspBody.items[i].QUERYDATE, viewValue: data.rspBody.items[i].QUERYDATE })
      }
      this.dateValue = data.rspBody.items[0].QUERYDATE
      this.getDSS3(this.dateValue);
    });
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
  changeDate() {
    this.getDSS3(this.dateValue);
  }
}
