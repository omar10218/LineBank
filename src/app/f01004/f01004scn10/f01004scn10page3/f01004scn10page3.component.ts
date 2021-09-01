import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { F01004scn10Service } from '../f01004scn10.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01004scn10page3',
  templateUrl: './f01004scn10page3.component.html',
  styleUrls: ['./f01004scn10page3.component.css', '../../../../assets/css/f01.css']
})
export class F01004scn10page3Component implements OnInit {

  dss3Form: FormGroup = this.fb.group({
    SYSFLOWCD: ['', []],
    RESLTCD: ['', []],
    UNDW_CD_CNT: ['', []],
    UNDW_CD_LIST: ['', []],
    SPARE_ARRAY1: ['', []],
    SPARE_ARRAY2: ['', []],
  });

  dateCode: dateCode[] = [];
  dateValue: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private f01004scn10Service: F01004scn10Service) { }
  private applno: string;
  private cuid: string;
  private queryDate: string;
  private search: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.cuid = params['cuid'];
      this.search = params['search'];
      this.queryDate = params['queryDate'];
    });

    const url = 'f01/f01004scn10';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'DSS3');
    this.f01004scn10Service.getDate(url, formdata).subscribe(data => {
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
    this.f01004scn10Service.getDSSSearch(formdata).subscribe(data => {
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
