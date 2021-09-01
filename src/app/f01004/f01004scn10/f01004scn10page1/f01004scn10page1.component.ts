import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { F01004scn10Service } from '../f01004scn10.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01004scn10page1',
  templateUrl: './f01004scn10page1.component.html',
  styleUrls: ['./f01004scn10page1.component.css', '../../../../assets/css/f01.css']
})
export class F01004scn10page1Component implements OnInit {

  dss1Form: FormGroup = this.fb.group({
    SYSFLOWCD: ['', []],
    RESLTCD: ['', []],
    CALV: ['', []],
    OCUPATN_CUST_GP: ['', []],
    OCUPATN_CUST_GP_DESC: ['', []],
    OCUPATN_CUST_STGP1: ['', []],
    OCUPATN_CUST_STGP1_DESC: ['', []],
    OCUPATN_CUST_STGP2: ['', []],
    GOODBEHAV: ['', []],
    GOODBEHAV_DESC: ['', []],
    RISKMDSUB_A0: ['', []],
    RISKMDSUB_A0_DESC: ['', []],
    RISKMDSCORE_A0: ['', []],
    RISKMDGRADE_A0: ['', []],
    RISKMDGRADE_A0_GP: ['', []],
    RISKMDGRADE_A0_ADJ: ['', []],
    RISKMDGRADE_A0_GP_ADJ: ['', []],
    UNDW_CD_CNT: ['', []],
    UNDW_CD_LIST: ['', []],
    SPECILCASE: ['', []],
    SPECILCASE_DESC: ['', []],
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
    STRGY_TMP_APRFRJ: ['', []],
    STRGY_TMP1_LIMIT: ['', []],
    STRGY_TMP1_SRATE_TYPE: ['', []],
    STRGY_TMP1_SRATE_CNT: ['', []],
    STRGY_TMP1_SRATE_LIST: ['', []],
    STRGY_TMP1_MINPAYRT: ['', []],
    STRGY_TMP1_PERIOD_MIN: ['', []],
    STRGY_TMP1_PERIOD_MAX: ['', []],
    STRGY_TMP1_ORIGINFEE: ['', []],
    STRGY_TMP1_LOANEXTFEE: ['', []],
    STRGY_TMP1_MUEX: ['', []],
    LIMIT_TMP1_MUE: ['', []],
    LIMIT_TMP1_DBR: ['', []],
    LIMIT_TMP1_LAW32: ['', []],
    LIMIT_TMP1_LAW33_UNS: ['', []],
    LIMIT_TMP1_PROD_MAX: ['', []],
    LIMIT_TMP1_PROD_MIN: ['', []],
    LIMIT_TMP1_CUSTAPPLY: ['', []],
    LIMIT_TMP1_DTI: ['', []],
    STRGY_OPTION_CNT: ['', []],
    STRGY_OPTION_LIST: ['', []],
    STRGY_TMP2_PRDT: ['', []],
    STRGY_TMP2_LIMIT: ['', []],
    STRGY_TMP2_SRATE_TYPE: ['', []],
    STRGY_TMP2_SRATE_CNT: ['', []],
    STRGY_TMP2_SRATE_LIST: ['', []],
    STRGY_TMP2_MINPAYRT: ['', []],
    STRGY_TMP2_PERIOD_MIN: ['', []],
    STRGY_TMP2_PERIOD_MAX: ['', []],
    STRGY_TMP2_ORIGINFEE: ['', []],
    STRGY_TMP2_LOANEXTFEE: ['', []],
    STRGY_TMP3_PRDT: ['', []],
    STRGY_TMP3_LIMIT: ['', []],
    STRGY_TMP3_SRATE_TYPE: ['', []],
    STRGY_TMP3_SRATE_CNT: ['', []],
    STRGY_TMP3_SRATE_LIST: ['', []],
    STRGY_TMP3_MINPAYRT: ['', []],
    STRGY_TMP3_PERIOD_MIN: ['', []],
    STRGY_TMP3_PERIOD_MAX: ['', []],
    STRGY_TMP3_ORIGINFEE: ['', []],
    STRGY_TMP3_LOANEXTFEE: ['', []],
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
    formdata.append('code', 'DSS1');
    this.f01004scn10Service.getDate(url, formdata).subscribe(data => {
      for (let i = 0; i < data.rspBody.items.length; i++) {
        this.dateCode.push({ value: data.rspBody.items[i].QUERYDATE, viewValue: data.rspBody.items[i].QUERYDATE })
      }
      this.dateValue = data.rspBody.items[0].QUERYDATE
      this.getDSS1(this.dateValue);
    });
  }

  getDSS1(dateValue: string) {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'DSS1');
    formdata.append('queryDate', dateValue);
    this.f01004scn10Service.getDSSSearch(formdata).subscribe(data => {
      this.dss1Form.patchValue({ SYSFLOWCD: data.rspBody.items[0].SYSFLOWCD })
      this.dss1Form.patchValue({ RESLTCD: data.rspBody.items[0].RESLTCD })
      this.dss1Form.patchValue({ CALV: data.rspBody.items[0].CALV })
      this.dss1Form.patchValue({ OCUPATN_CUST_GP: data.rspBody.items[0].OCUPATN_CUST_GP })
      this.dss1Form.patchValue({ OCUPATN_CUST_GP_DESC: data.rspBody.items[0].OCUPATN_CUST_GP_DESC })
      this.dss1Form.patchValue({ OCUPATN_CUST_STGP1: data.rspBody.items[0].OCUPATN_CUST_STGP1 })
      this.dss1Form.patchValue({ OCUPATN_CUST_STGP1_DESC: data.rspBody.items[0].OCUPATN_CUST_STGP1_DESC })
      this.dss1Form.patchValue({ OCUPATN_CUST_STGP2: data.rspBody.items[0].OCUPATN_CUST_STGP2 })
      this.dss1Form.patchValue({ GOODBEHAV: data.rspBody.items[0].GOODBEHAV })
      this.dss1Form.patchValue({ GOODBEHAV_DESC: data.rspBody.items[0].GOODBEHAV_DESC })
      this.dss1Form.patchValue({ RISKMDSUB_A0: data.rspBody.items[0].RISKMDSUB_A0 })
      this.dss1Form.patchValue({ RISKMDSUB_A0_DESC: data.rspBody.items[0].RISKMDSUB_A0_DESC })
      this.dss1Form.patchValue({ RISKMDSCORE_A0: data.rspBody.items[0].RISKMDSCORE_A0 })
      this.dss1Form.patchValue({ RISKMDGRADE_A0: data.rspBody.items[0].RISKMDGRADE_A0 })
      this.dss1Form.patchValue({ RISKMDGRADE_A0_GP: data.rspBody.items[0].RISKMDGRADE_A0_GP })
      this.dss1Form.patchValue({ RISKMDGRADE_A0_ADJ: data.rspBody.items[0].RISKMDGRADE_A0_ADJ })
      this.dss1Form.patchValue({ RISKMDGRADE_A0_GP_ADJ: data.rspBody.items[0].RISKMDGRADE_A0_GP_ADJ })
      this.dss1Form.patchValue({ UNDW_CD_CNT: data.rspBody.items[0].UNDW_CD_CNT })
      this.dss1Form.patchValue({ UNDW_CD_LIST: data.rspBody.items[0].UNDW_CD_LIST })
      this.dss1Form.patchValue({ SPECILCASE: data.rspBody.items[0].SPECILCASE })
      this.dss1Form.patchValue({ SPECILCASE_DESC: data.rspBody.items[0].SPECILCASE_DESC })
      this.dss1Form.patchValue({ L0CAP: data.rspBody.items[0].L0CAP })
      this.dss1Form.patchValue({ L1CAP_NID: data.rspBody.items[0].L1CAP_NID })
      this.dss1Form.patchValue({ L2CAP_NID_UNSEC: data.rspBody.items[0].L2CAP_NID_UNSEC })
      this.dss1Form.patchValue({ L3CAP_NID_UNSEC_RL: data.rspBody.items[0].L3CAP_NID_UNSEC_RL })
      this.dss1Form.patchValue({ L3CAP_NID_UNSEC_IL: data.rspBody.items[0].L3CAP_NID_UNSEC_IL })
      this.dss1Form.patchValue({ L2CAP_NID_SEC: data.rspBody.items[0].L2CAP_NID_SEC })
      this.dss1Form.patchValue({ L3CAP_NID_SEC_MORTG: data.rspBody.items[0].L3CAP_NID_SEC_MORTG })
      this.dss1Form.patchValue({ L1CAP_CMPY: data.rspBody.items[0].L1CAP_CMPY })
      this.dss1Form.patchValue({ DISB_BTCR_YN: data.rspBody.items[0].DISB_BTCR_YN })
      this.dss1Form.patchValue({ STRGY_MDUL: data.rspBody.items[0].STRGY_MDUL })
      this.dss1Form.patchValue({ STRGY_MDUL_DESC: data.rspBody.items[0].STRGY_MDUL_DESC })
      this.dss1Form.patchValue({ STRGY_MDUL_ATVDT: data.rspBody.items[0].STRGY_MDUL_ATVDT })
      this.dss1Form.patchValue({ STRGY_RATE_ATVDT: data.rspBody.items[0].STRGY_RATE_ATVDT })
      this.dss1Form.patchValue({ STRGY_TMP_APRFRJ: data.rspBody.items[0].STRGY_TMP_APRFRJ })
      this.dss1Form.patchValue({ STRGY_TMP1_LIMIT: data.rspBody.items[0].STRGY_TMP1_LIMIT })
      this.dss1Form.patchValue({ STRGY_TMP1_SRATE_TYPE: data.rspBody.items[0].STRGY_TMP1_SRATE_TYPE })
      this.dss1Form.patchValue({ STRGY_TMP1_SRATE_CNT: data.rspBody.items[0].STRGY_TMP1_SRATE_CNT })
      this.dss1Form.patchValue({ STRGY_TMP1_SRATE_LIST: data.rspBody.items[0].STRGY_TMP1_SRATE_LIST })
      this.dss1Form.patchValue({ STRGY_TMP1_MINPAYRT: data.rspBody.items[0].STRGY_TMP1_MINPAYRT })
      this.dss1Form.patchValue({ STRGY_TMP1_PERIOD_MIN: data.rspBody.items[0].STRGY_TMP1_PERIOD_MIN })
      this.dss1Form.patchValue({ STRGY_TMP1_PERIOD_MAX: data.rspBody.items[0].STRGY_TMP1_PERIOD_MAX })
      this.dss1Form.patchValue({ STRGY_TMP1_ORIGINFEE: data.rspBody.items[0].STRGY_TMP1_ORIGINFEE })
      this.dss1Form.patchValue({ STRGY_TMP1_LOANEXTFEE: data.rspBody.items[0].STRGY_TMP1_LOANEXTFEE })
      this.dss1Form.patchValue({ STRGY_TMP1_MUEX: data.rspBody.items[0].STRGY_TMP1_MUEX })
      this.dss1Form.patchValue({ LIMIT_TMP1_MUE: data.rspBody.items[0].LIMIT_TMP1_MUE })
      this.dss1Form.patchValue({ LIMIT_TMP1_DBR: data.rspBody.items[0].LIMIT_TMP1_DBR })
      this.dss1Form.patchValue({ LIMIT_TMP1_LAW32: data.rspBody.items[0].LIMIT_TMP1_LAW32 })
      this.dss1Form.patchValue({ LIMIT_TMP1_LAW33_UNS: data.rspBody.items[0].LIMIT_TMP1_LAW33_UNS })
      this.dss1Form.patchValue({ LIMIT_TMP1_PROD_MAX: data.rspBody.items[0].LIMIT_TMP1_PROD_MAX })
      this.dss1Form.patchValue({ LIMIT_TMP1_PROD_MIN: data.rspBody.items[0].LIMIT_TMP1_PROD_MIN })
      this.dss1Form.patchValue({ LIMIT_TMP1_CUSTAPPLY: data.rspBody.items[0].LIMIT_TMP1_CUSTAPPLY })
      this.dss1Form.patchValue({ LIMIT_TMP1_DTI: data.rspBody.items[0].LIMIT_TMP1_DTI })
      this.dss1Form.patchValue({ STRGY_OPTION_CNT: data.rspBody.items[0].STRGY_OPTION_CNT })
      this.dss1Form.patchValue({ STRGY_OPTION_LIST: data.rspBody.items[0].STRGY_OPTION_LIST })
      this.dss1Form.patchValue({ STRGY_TMP2_PRDT: data.rspBody.items[0].STRGY_TMP2_PRDT })
      this.dss1Form.patchValue({ STRGY_TMP2_LIMIT: data.rspBody.items[0].STRGY_TMP2_LIMIT })
      this.dss1Form.patchValue({ STRGY_TMP2_SRATE_TYPE: data.rspBody.items[0].STRGY_TMP2_SRATE_TYPE })
      this.dss1Form.patchValue({ STRGY_TMP2_SRATE_CNT: data.rspBody.items[0].STRGY_TMP2_SRATE_CNT })
      this.dss1Form.patchValue({ STRGY_TMP2_SRATE_LIST: data.rspBody.items[0].STRGY_TMP2_SRATE_LIST })
      this.dss1Form.patchValue({ STRGY_TMP2_MINPAYRT: data.rspBody.items[0].STRGY_TMP2_MINPAYRT })
      this.dss1Form.patchValue({ STRGY_TMP2_PERIOD_MIN: data.rspBody.items[0].STRGY_TMP2_PERIOD_MIN })
      this.dss1Form.patchValue({ STRGY_TMP2_PERIOD_MAX: data.rspBody.items[0].STRGY_TMP2_PERIOD_MAX })
      this.dss1Form.patchValue({ STRGY_TMP2_ORIGINFEE: data.rspBody.items[0].STRGY_TMP2_ORIGINFEE })
      this.dss1Form.patchValue({ STRGY_TMP2_LOANEXTFEE: data.rspBody.items[0].STRGY_TMP2_LOANEXTFEE })
      this.dss1Form.patchValue({ STRGY_TMP3_PRDT: data.rspBody.items[0].STRGY_TMP3_PRDT })
      this.dss1Form.patchValue({ STRGY_TMP3_LIMIT: data.rspBody.items[0].STRGY_TMP3_LIMIT })
      this.dss1Form.patchValue({ STRGY_TMP3_SRATE_TYPE: data.rspBody.items[0].STRGY_TMP3_SRATE_TYPE })
      this.dss1Form.patchValue({ STRGY_TMP3_SRATE_CNT: data.rspBody.items[0].STRGY_TMP3_SRATE_CNT })
      this.dss1Form.patchValue({ STRGY_TMP3_SRATE_LIST: data.rspBody.items[0].STRGY_TMP3_SRATE_LIST })
      this.dss1Form.patchValue({ STRGY_TMP3_MINPAYRT: data.rspBody.items[0].STRGY_TMP3_MINPAYRT })
      this.dss1Form.patchValue({ STRGY_TMP3_PERIOD_MIN: data.rspBody.items[0].STRGY_TMP3_PERIOD_MIN })
      this.dss1Form.patchValue({ STRGY_TMP3_PERIOD_MAX: data.rspBody.items[0].STRGY_TMP3_PERIOD_MAX })
      this.dss1Form.patchValue({ STRGY_TMP3_ORIGINFEE: data.rspBody.items[0].STRGY_TMP3_ORIGINFEE })
      this.dss1Form.patchValue({ STRGY_TMP3_LOANEXTFEE: data.rspBody.items[0].STRGY_TMP3_LOANEXTFEE })
      this.dss1Form.patchValue({ SPARE_ARRAY1: data.rspBody.items[0].SPARE_ARRAY1 })
      this.dss1Form.patchValue({ SPARE_ARRAY2: data.rspBody.items[0].SPARE_ARRAY2 })
    });
  }

  getSearch(): string {
    return this.search;
  }
  changeDate() {
    this.getDSS1(this.dateValue);
  }
}
