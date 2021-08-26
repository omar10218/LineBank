import { Component, OnInit } from '@angular/core';
import { F01001scn9Service } from './../f01001scn9.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

//日期
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01001scn9page2',
  templateUrl: './f01001scn9page2.component.html',
  styleUrls: ['./f01001scn9page2.component.css', '../../../../assets/css/f01.css']
})
export class F01001scn9page2Component implements OnInit {
  coreCustInfoForm: FormGroup = this.fb.group({
    APPLNO: ['', []],
    ACC_TYPE: ['', []],
    ACC_STATUS: ['', []],
    ACC_OPEN_DATE: ['', []],
    ACC_EXP_DATE: ['', []],
    ACTIVATE_DAY: ['', []]
  });

  dateCode: dateCode[] = [];
  dateValue: string;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private f01001scn9Service: F01001scn9Service) { }
  private applno: string;
  private cuid: string;
  private queryDate: string;
  private search: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.cuid = params['cuid'];
      this.search = params['search'];
    });

    const url = 'f01/f01001scn9';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'DEPOSIT');
    this.f01001scn9Service.getDate(url, formdata).subscribe(data => {
      for (let i = 0; i < data.rspBody.items.length; i++) {
        this.dateCode.push({ value: data.rspBody.items[i].QUERYDATE, viewValue: data.rspBody.items[i].QUERYDATE })
      }
      this.dateValue = data.rspBody.items[0].QUERYDATE
      this.getCoreCusInfo(this.dateValue);
    });
  }

  getCoreCusInfo(dateValue: string) {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'DEPOSIT');
    this.f01001scn9Service.getCoreCusInfo(formdata).subscribe(data => {
      this.coreCustInfoForm.patchValue({ APPLNO: data.rspBody.items[0].APPLNO })
      this.coreCustInfoForm.patchValue({ ACC_TYPE: data.rspBody.items[0].ACC_TYPE })
      this.coreCustInfoForm.patchValue({ ACC_STATUS: data.rspBody.items[0].ACC_STATUS })
      this.coreCustInfoForm.patchValue({ ACC_OPEN_DATE: data.rspBody.items[0].ACC_OPEN_DATE })
      this.coreCustInfoForm.patchValue({ ACC_EXP_DATE: data.rspBody.items[0].ACC_EXP_DATE })
      this.coreCustInfoForm.patchValue({ ACTIVATE_DAY: data.rspBody.items[0].ACTIVATE_DAY })
    });
  }

  getSearch(): string {
    return this.search;
  }
  changeDate() {
    this.getCoreCusInfo(this.dateValue);
  }
}
