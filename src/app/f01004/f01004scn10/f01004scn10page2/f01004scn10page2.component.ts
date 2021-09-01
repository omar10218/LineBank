import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { F01004scn10Service } from '../f01004scn10.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01004scn10page2',
  templateUrl: './f01004scn10page2.component.html',
  styleUrls: ['./f01004scn10page2.component.css', '../../../../assets/css/f01.css']
})
export class F01004scn10page2Component implements OnInit {

  dss2Form: FormGroup = this.fb.group({
    SYSFLOWCD: ['', []],
    RESLTCD: ['', []],
    CALV: ['', []],
    OCUPATN_UNDW_GP: ['', []],
    OCUPATN_UNDW_GP_DESC: ['', []],
    OCUPATN_UNDW_STGP1: ['', []],
    OCUPATN_UNDW_STGP1_DESC: ['', []],
    OCUPATN_UNDW_STGP2: ['', []],
    GOODBEHAV: ['', []],
    GOODBEHAV_DESC: ['', []],
    RISKMDSUB_A1: ['', []],
    RISKMDSUB_A1_DESC: ['', []],
    RISKMDSCORE_A1: ['', []],
    RISKMDGRADE_A1: ['', []],
    RISKMDGRADE_A1_GP: ['', []],
    RISKMDGRADE_A1_ADJ: ['', []],
    RISKMDGRADE_A1_GP_ADJ: ['', []],
    UNDW_CD_CNT: ['', []],
    UNDW_CD_LIST: ['', []],
    L0CAP: ['', []],
    L1CAP_NID: ['', []],
    L2CAP_NID_UNSEC: ['', []],
    L3CAP_NID_UNSEC_RL: ['', []],
    L3CAP_NID_UNSEC_IL: ['', []],
    L2CAP_NID_SEC: ['', []],
    L3CAP_NID_SEC_MORTG: ['', []],
    L1CAP_CMPY: ['', []],
    DISB_BTCR_YN: ['', []],
    STRGY_MDUL: ['', []],
    STRGY_MDUL_DESC: ['', []],
    STRGY_MDUL_ATVDT: ['', []],
    STRGY_RATE_ATVDT: ['', []],
    STRGY_APRFRJ: ['', []],
    STRGY_1_LIMIT: ['', []],
    STRGY_1_SRATE_TYPE: ['', []],
    STRGY_T1_SRATE_CNT: ['', []],
    STRGY_1_SRATE_LIST: ['', []],
    STRGY_1_MINPAYRT: ['', []],
    STRGY_1_PERIOD_MIN: ['', []],
    STRGY_1_PERIOD_MAX: ['', []],
    STRGY_1_ORIGINFEE: ['', []],
    STRGY_1_LOANEXTFEE: ['', []],
    STRGY_1_MUEX: ['', []],
    LIMIT_1_MUE: ['', []],
    LIMIT_1_DBR: ['', []],
    LIMIT_1_LAW32: ['', []],
    LIMIT_1_LAW33_UNS: ['', []],
    LIMIT_1_PROD_MAX: ['', []],
    LIMIT_1_PROD_MIN: ['', []],
    LIMIT_1_CUSTAPPLY: ['', []],
    LIMIT_1_DTI: ['', []],
    STRGY_OPTION_CNT: ['', []],
    STRGY_OPTION_LIST: ['', []],
    STRGY_2_PRDT: ['', []],
    STRGY_2_LIMIT: ['', []],
    STRGY_2_SRATE_TYPE: ['', []],
    STRGY_2_SRATE_CNT: ['', []],
    STRGY_2_SRATE_LIST: ['', []],
    STRGY_2_MINPAYRT: ['', []],
    STRGY_2_PERIOD_MIN: ['', []],
    STRGY_2_PERIOD_MAX: ['', []],
    STRGY_2_ORIGINFEE: ['', []],
    STRGY_2_LOANEXTFEE: ['', []],
    STRGY_3_PRDT: ['', []],
    STRGY_3_LIMIT: ['', []],
    STRGY_3_SRATE_TYPE: ['', []],
    STRGY_3_SRATE_CNT: ['', []],
    STRGY_3_SRATE_LIST: ['', []],
    STRGY_3_MINPAYRT: ['', []],
    STRGY_3_PERIOD_MIN: ['', []],
    STRGY_3_PERIOD_MAX: ['', []],
    STRGY_3_ORIGINFEE: ['', []],
    STRGY_3_LOANEXTFEE: ['', []],
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
    formdata.append('code', 'DSS2');
    this.f01004scn10Service.getDate(url, formdata).subscribe(data => {
      for (let i = 0; i < data.rspBody.items.length; i++) {
        this.dateCode.push({ value: data.rspBody.items[i].QUERYDATE, viewValue: data.rspBody.items[i].QUERYDATE })
      }
      this.dateValue = data.rspBody.items[0].QUERYDATE
      this.getDSS2(this.dateValue);
    });
  }

  getDSS2(dateValue: string) {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'DSS2');
    formdata.append('queryDate', dateValue);
    this.f01004scn10Service.getDSSSearch(formdata).subscribe(data => {
      this.dss2Form.patchValue({ SYSFLOWCD: data.rspBody.items[0].SYSFLOWCD })
      this.dss2Form.patchValue({ RESLTCD: data.rspBody.items[0].RESLTCD })
      this.dss2Form.patchValue({ CALV: data.rspBody.items[0].CALV })
      this.dss2Form.patchValue({ OCUPATN_UNDW_GP: data.rspBody.items[0].OCUPATN_UNDW_GP })
      this.dss2Form.patchValue({ OCUPATN_UNDW_GP_DESC: data.rspBody.items[0].OCUPATN_UNDW_GP_DESC })
      this.dss2Form.patchValue({ OCUPATN_UNDW_STGP1: data.rspBody.items[0].OCUPATN_UNDW_STGP1 })
      this.dss2Form.patchValue({ OCUPATN_UNDW_STGP1_DESC: data.rspBody.items[0].OCUPATN_UNDW_STGP1_DESC })
      this.dss2Form.patchValue({ OCUPATN_UNDW_STGP2: data.rspBody.items[0].OCUPATN_UNDW_STGP2 })
      this.dss2Form.patchValue({ GOODBEHAV: data.rspBody.items[0].GOODBEHAV })
      this.dss2Form.patchValue({ GOODBEHAV_DESC: data.rspBody.items[0].GOODBEHAV_DESC })
      this.dss2Form.patchValue({ RISKMDSUB_A1: data.rspBody.items[0].RISKMDSUB_A1 })
      this.dss2Form.patchValue({ RISKMDSUB_A1_DESC: data.rspBody.items[0].RISKMDSUB_A1_DESC })
      this.dss2Form.patchValue({ RISKMDSCORE_A1: data.rspBody.items[0].RISKMDSCORE_A1 })
      this.dss2Form.patchValue({ RISKMDGRADE_A1: data.rspBody.items[0].RISKMDGRADE_A1 })
      this.dss2Form.patchValue({ RISKMDGRADE_A1_GP: data.rspBody.items[0].RISKMDGRADE_A1_GP })
      this.dss2Form.patchValue({ RISKMDGRADE_A1_ADJ: data.rspBody.items[0].RISKMDGRADE_A1_GP_ADJ })
      this.dss2Form.patchValue({ UNDW_CD_CNT: data.rspBody.items[0].UNDW_CD_CNT })
      this.dss2Form.patchValue({ UNDW_CD_LIST: data.rspBody.items[0].UNDW_CD_LIST })
      this.dss2Form.patchValue({ L0CAP: data.rspBody.items[0].L0CAP })
      this.dss2Form.patchValue({ L1CAP_NID: data.rspBody.items[0].L1CAP_NID })
      this.dss2Form.patchValue({ L2CAP_NID_UNSEC: data.rspBody.items[0].L2CAP_NID_UNSEC })
      this.dss2Form.patchValue({ L3CAP_NID_UNSEC_RL: data.rspBody.items[0].L3CAP_NID_UNSEC_RL })
      this.dss2Form.patchValue({ L3CAP_NID_UNSEC_IL: data.rspBody.items[0].L3CAP_NID_UNSEC_IL })
      this.dss2Form.patchValue({ L2CAP_NID_SEC: data.rspBody.items[0].L2CAP_NID_SEC })
      this.dss2Form.patchValue({ L3CAP_NID_SEC_MORTG: data.rspBody.items[0].L3CAP_NID_SEC_MORTG })
      this.dss2Form.patchValue({ L1CAP_CMPY: data.rspBody.items[0].L1CAP_CMPY })
      this.dss2Form.patchValue({ DISB_BTCR_YN: data.rspBody.items[0].DISB_BTCR_YN })
      this.dss2Form.patchValue({ STRGY_MDUL: data.rspBody.items[0].STRGY_MDUL })
      this.dss2Form.patchValue({ STRGY_MDUL_DESC: data.rspBody.items[0].STRGY_MDUL_DESC })
      this.dss2Form.patchValue({ STRGY_MDUL_ATVDT: data.rspBody.items[0].STRGY_MDUL_ATVDT })
      this.dss2Form.patchValue({ STRGY_RATE_ATVDT: data.rspBody.items[0].STRGY_RATE_ATVDT })
      this.dss2Form.patchValue({ STRGY_APRFRJ: data.rspBody.items[0].STRGY_APRFRJ })
      this.dss2Form.patchValue({ STRGY_1_LIMIT: data.rspBody.items[0].STRGY_1_LIMIT })
      this.dss2Form.patchValue({ STRGY_1_SRATE_TYPE: data.rspBody.items[0].STRGY_1_SRATE_TYPE })
      this.dss2Form.patchValue({ STRGY_T1_SRATE_CNT: data.rspBody.items[0].STRGY_T1_SRATE_CNT })
      this.dss2Form.patchValue({ STRGY_1_SRATE_LIST: data.rspBody.items[0].STRGY_1_SRATE_LIST })
      this.dss2Form.patchValue({ STRGY_1_MINPAYRT: data.rspBody.items[0].STRGY_1_MINPAYRT })
      this.dss2Form.patchValue({ STRGY_1_PERIOD_MIN: data.rspBody.items[0].STRGY_1_PERIOD_MIN })
      this.dss2Form.patchValue({ STRGY_1_PERIOD_MAX: data.rspBody.items[0].STRGY_1_PERIOD_MAX })
      this.dss2Form.patchValue({ STRGY_1_ORIGINFEE: data.rspBody.items[0].STRGY_1_ORIGINFEE })
      this.dss2Form.patchValue({ STRGY_1_LOANEXTFEE: data.rspBody.items[0].STRGY_1_LOANEXTFEE })
      this.dss2Form.patchValue({ STRGY_1_MUEX: data.rspBody.items[0].STRGY_1_MUEX })
      this.dss2Form.patchValue({ LIMIT_1_MUE: data.rspBody.items[0].LIMIT_1_MUE })
      this.dss2Form.patchValue({ LIMIT_1_DBR: data.rspBody.items[0].LIMIT_1_DBR })
      this.dss2Form.patchValue({ LIMIT_1_LAW32: data.rspBody.items[0].LIMIT_1_LAW32 })
      this.dss2Form.patchValue({ LIMIT_1_LAW33_UNS: data.rspBody.items[0].LIMIT_1_LAW33_UNS })
      this.dss2Form.patchValue({ LIMIT_1_PROD_MAX: data.rspBody.items[0].LIMIT_1_PROD_MAX })
      this.dss2Form.patchValue({ LIMIT_1_PROD_MIN: data.rspBody.items[0].LIMIT_1_PROD_MIN })
      this.dss2Form.patchValue({ LIMIT_1_CUSTAPPLY: data.rspBody.items[0].LIMIT_1_CUSTAPPLY })
      this.dss2Form.patchValue({ LIMIT_1_DTI: data.rspBody.items[0].LIMIT_1_DTI })
      this.dss2Form.patchValue({ STRGY_OPTION_CNT: data.rspBody.items[0].STRGY_OPTION_CNT })
      this.dss2Form.patchValue({ STRGY_OPTION_LIST: data.rspBody.items[0].STRGY_OPTION_LIST })
      this.dss2Form.patchValue({ STRGY_2_PRDT: data.rspBody.items[0].STRGY_2_PRDT })
      this.dss2Form.patchValue({ STRGY_2_LIMIT: data.rspBody.items[0].STRGY_2_LIMIT })
      this.dss2Form.patchValue({ STRGY_2_SRATE_TYPE: data.rspBody.items[0].STRGY_2_SRATE_TYPE })
      this.dss2Form.patchValue({ STRGY_2_SRATE_CNT: data.rspBody.items[0].STRGY_2_SRATE_CNT })
      this.dss2Form.patchValue({ STRGY_2_SRATE_LIST: data.rspBody.items[0].STRGY_2_SRATE_LIST })
      this.dss2Form.patchValue({ STRGY_2_MINPAYRT: data.rspBody.items[0].STRGY_2_MINPAYRT })
      this.dss2Form.patchValue({ STRGY_2_PERIOD_MIN: data.rspBody.items[0].STRGY_2_PERIOD_MIN })
      this.dss2Form.patchValue({ STRGY_2_PERIOD_MAX: data.rspBody.items[0].STRGY_2_PERIOD_MAX })
      this.dss2Form.patchValue({ STRGY_2_ORIGINFEE: data.rspBody.items[0].STRGY_2_ORIGINFEE })
      this.dss2Form.patchValue({ STRGY_2_LOANEXTFEE: data.rspBody.items[0].STRGY_2_LOANEXTFEE })
      this.dss2Form.patchValue({ STRGY_3_PRDT: data.rspBody.items[0].STRGY_3_PRDT })
      this.dss2Form.patchValue({ STRGY_3_LIMIT: data.rspBody.items[0].STRGY_3_LIMIT })
      this.dss2Form.patchValue({ STRGY_3_SRATE_TYPE: data.rspBody.items[0].STRGY_3_SRATE_TYPE })
      this.dss2Form.patchValue({ STRGY_3_SRATE_CNT: data.rspBody.items[0].STRGY_3_SRATE_CNT })
      this.dss2Form.patchValue({ STRGY_3_SRATE_LIST: data.rspBody.items[0].STRGY_3_SRATE_LIST })
      this.dss2Form.patchValue({ STRGY_3_MINPAYRT: data.rspBody.items[0].STRGY_3_MINPAYRT })
      this.dss2Form.patchValue({ STRGY_3_PERIOD_MIN: data.rspBody.items[0].STRGY_3_PERIOD_MIN })
      this.dss2Form.patchValue({ STRGY_3_PERIOD_MAX: data.rspBody.items[0].STRGY_3_PERIOD_MAX })
      this.dss2Form.patchValue({ STRGY_3_ORIGINFEE: data.rspBody.items[0].STRGY_3_ORIGINFEE })
      this.dss2Form.patchValue({ STRGY_3_LOANEXTFEE: data.rspBody.items[0].STRGY_3_LOANEXTFEE })
      this.dss2Form.patchValue({ SPARE_ARRAY1: data.rspBody.items[0].SPARE_ARRAY1 })
      this.dss2Form.patchValue({ SPARE_ARRAY2: data.rspBody.items[0].SPARE_ARRAY2 })
    });
  }

  getSearch(): string {
    return this.search;
  }
  changeDate() {
    this.getDSS2(this.dateValue);
  }
}
