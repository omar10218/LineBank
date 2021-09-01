import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { F01003scn9Service } from '../f01003scn9.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01003scn9page1',
  templateUrl: './f01003scn9page1.component.html',
  styleUrls: ['./f01003scn9page1.component.css', '../../../../assets/css/f01.css']
})
export class F01003scn9page1Component implements OnInit {

  coreCustInfoForm: FormGroup = this.fb.group({
    APPLNO: ['', []],
    AGE: ['', []],
    STAR_SIGN: ['', []],
    CHI_ZODIAC: ['', []],
    CONTACT_DATE: ['', []],
    BLACK_MARK_INFO: ['', []],
    BLOCKING_CODE: ['', []],
    ACCIDENT_RECORD: ['', []],
    NAME: ['', []],
    BIRTHDAY: ['', []],
    EDUCATION: ['', []],
    ACC_OPEN_DATE: ['', []],
    ACC_TYPE: ['', []],
    LOGIN_ID: ['', []],
    EMAIL: ['', []],
    SALARY_YEAR: ['', []],
    CP_NO: ['', []],
    CP_NAME: ['', []],
    CP_TEL: ['', []],
    CP_ADDR: ['', []],
    CP_TITLE: ['', []],
    MOBILE: ['', []],
    P_TEL: ['', []],
    H_TEL: ['', []],
    P_ADDR: ['', []],
    H_ADDR: ['', []],
    SEND_CARD_ADDR: ['', []]
  });

  dateCode: dateCode[] = [];
  dateValue: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private f01003scn9Service: F01003scn9Service) { }

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

    const url = 'f01/f01003scn9';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'CORE_CUS_INFO');
    this.f01003scn9Service.getDate(url, formdata).subscribe(data => {
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
    formdata.append('code', 'CORE_CUS_INFO');
    this.f01003scn9Service.getCoreCusInfo(formdata).subscribe(data => {
      this.coreCustInfoForm.patchValue({ APPLNO: data.rspBody.items[0].APPLNO })
      this.coreCustInfoForm.patchValue({ AGE: data.rspBody.items[0].AGE })
      this.coreCustInfoForm.patchValue({ STAR_SIGN: data.rspBody.items[0].STAR_SIGN })
      this.coreCustInfoForm.patchValue({ CHI_ZODIAC: data.rspBody.items[0].CHI_ZODIAC })
      this.coreCustInfoForm.patchValue({ CONTACT_DATE: data.rspBody.items[0].CONTACT_DATE })
      this.coreCustInfoForm.patchValue({ BLACK_MARK_INFO: data.rspBody.items[0].BLACK_MARK_INFO })
      this.coreCustInfoForm.patchValue({ BLOCKING_CODE: data.rspBody.items[0].BLOCKING_CODE })
      this.coreCustInfoForm.patchValue({ ACCIDENT_RECORD: data.rspBody.items[0].ACCIDENT_RECORD })
      this.coreCustInfoForm.patchValue({ NAME: data.rspBody.items[0].NAME })
      this.coreCustInfoForm.patchValue({ BIRTHDAY: data.rspBody.items[0].BIRTHDAY })
      this.coreCustInfoForm.patchValue({ EDUCATION: data.rspBody.items[0].EDUCATION })
      this.coreCustInfoForm.patchValue({ ACC_OPEN_DATE: data.rspBody.items[0].ACC_OPEN_DATE })
      this.coreCustInfoForm.patchValue({ ACC_TYPE: data.rspBody.items[0].ACC_TYPE })
      this.coreCustInfoForm.patchValue({ LOGIN_ID: data.rspBody.items[0].LOGIN_ID })
      this.coreCustInfoForm.patchValue({ EMAIL: data.rspBody.items[0].EMAIL })
      this.coreCustInfoForm.patchValue({ SALARY_YEAR: data.rspBody.items[0].SALARY_YEAR })
      this.coreCustInfoForm.patchValue({ CP_NO: data.rspBody.items[0].CP_NO })
      this.coreCustInfoForm.patchValue({ CP_NAME: data.rspBody.items[0].CP_NAME })
      this.coreCustInfoForm.patchValue({ CP_TEL: data.rspBody.items[0].CP_TEL })
      this.coreCustInfoForm.patchValue({ CP_ADDR: data.rspBody.items[0].CP_ADDR })
      this.coreCustInfoForm.patchValue({ CP_TITLE: data.rspBody.items[0].CP_TITLE })
      this.coreCustInfoForm.patchValue({ MOBILE: data.rspBody.items[0].MOBILE })
      this.coreCustInfoForm.patchValue({ P_TEL: data.rspBody.items[0].P_TEL })
      this.coreCustInfoForm.patchValue({ H_TEL: data.rspBody.items[0].H_TEL })
      this.coreCustInfoForm.patchValue({ P_ADDR: data.rspBody.items[0].P_ADDR })
      this.coreCustInfoForm.patchValue({ H_ADDR: data.rspBody.items[0].H_ADDR })
      this.coreCustInfoForm.patchValue({ SEND_CARD_ADDR: data.rspBody.items[0].SEND_CARD_ADDR })
      console.log(data.rspBody.items[0].APPLNO)
    });
  }

  getSearch(): string {
    return this.search;
  }
  changeDate() {
    this.getCoreCusInfo(this.dateValue);
  }
}
