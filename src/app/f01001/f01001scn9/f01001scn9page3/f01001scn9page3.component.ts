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
  selector: 'app-f01001scn9page3',
  templateUrl: './f01001scn9page3.component.html',
  styleUrls: ['./f01001scn9page3.component.css', '../../../../assets/css/f01.css']
})
export class F01001scn9page3Component implements OnInit {
  coreCustInfoForm: FormGroup = this.fb.group({
    APPLNO: ['', []],
    ACC_TYPE: ['', []],
    ACC_NUM: ['', []],
    ACC_STATUS: ['', []],
    TRANS_PRESS_DATE: ['', []],
    TRANS_BD_DATE: ['', []],
    IB_AGGRE_EST_DATE: ['', []],
    NEGO_APPLY_DATE: ['', []],
    NEGO_EST_DATE: ['', []],
    REFRESH_DATE: ['', []],
    LIQUIDATION_DATE: ['', []],
    INSTALL_ACC_1: ['', []],
    INSTALL_ACC_2: ['', []],
    INSTALL_TOTAL: ['', []],
    REVOLVING_ACC: ['', []],
    HOME_LOAN_INFO: ['', []],
    CREDIT_INFO: ['', []]

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
    formdata.append('code', 'CON_PRODUCT');
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
    formdata.append('code', 'CON_PRODUCT');
    this.f01001scn9Service.getCoreCusInfo(formdata).subscribe(data => {
      this.coreCustInfoForm.patchValue({ APPLNO: data.rspBody.items[0].APPLNO })
      this.coreCustInfoForm.patchValue({ ACC_TYPE: data.rspBody.items[0].ACC_TYPE })
      this.coreCustInfoForm.patchValue({ ACC_NUM: data.rspBody.items[0].ACC_NUM })
      this.coreCustInfoForm.patchValue({ ACC_STATUS: data.rspBody.items[0].ACC_STATUS })
      this.coreCustInfoForm.patchValue({ TRANS_PRESS_DATE: data.rspBody.items[0].TRANS_PRESS_DATE })
      this.coreCustInfoForm.patchValue({ TRANS_BD_DATE: data.rspBody.items[0].TRANS_BD_DATE })
      this.coreCustInfoForm.patchValue({ IB_AGGRE_EST_DATE: data.rspBody.items[0].IB_AGGRE_EST_DATE })
      this.coreCustInfoForm.patchValue({ NEGO_APPLY_DATE: data.rspBody.items[0].NEGO_APPLY_DATE })
      this.coreCustInfoForm.patchValue({ NEGO_EST_DATE: data.rspBody.items[0].NEGO_EST_DATE })
      this.coreCustInfoForm.patchValue({ REFRESH_DATE: data.rspBody.items[0].REFRESH_DATE })
      this.coreCustInfoForm.patchValue({ LIQUIDATION_DATE: data.rspBody.items[0].LIQUIDATION_DATE })
      this.coreCustInfoForm.patchValue({ INSTALL_ACC_1: data.rspBody.items[0].INSTALL_ACC_1 })
      this.coreCustInfoForm.patchValue({ INSTALL_ACC_2: data.rspBody.items[0].INSTALL_ACC_2 })
      this.coreCustInfoForm.patchValue({ INSTALL_TOTAL: data.rspBody.items[0].INSTALL_TOTAL })
      this.coreCustInfoForm.patchValue({ REVOLVING_ACC: data.rspBody.items[0].REVOLVING_ACC })
      this.coreCustInfoForm.patchValue({ HOME_LOAN_INFO: data.rspBody.items[0].HOME_LOAN_INFO })
      this.coreCustInfoForm.patchValue({ CREDIT_INFO: data.rspBody.items[0].CREDIT_INFO })
    });
  }

  getSearch(): string {
    return this.search;
  }
  changeDate() {
    this.getCoreCusInfo(this.dateValue);
  }
}
