import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { F01001scn11Service } from '../f01001scn11.service';

@Component({
  selector: 'app-f01001scn11page3',
  templateUrl: './f01001scn11page3.component.html',
  styleUrls: ['./f01001scn11page3.component.css','../../../../assets/css/f01.css']
})
export class F01001scn11page3Component implements OnInit {

  private applno: string;

  historySameIDForm: FormGroup = this.fb.group({
    gps1 : ['', []],
    gps2 : ['', []],
    ipAddr1 : ['', []],
    ipAddr2 : ['', []],
    phoneModel1 : ['', []],
    phoneModel2 : ['', []],
    deviceID1 : ['', []],
    deviceID2 : ['', []],
    email : ['', []],
    mTel : ['', []],
    pTel : ['', []],
    cTel : ['', []],
    pAddr : ['', []],
    pAddrFuzzy : ['', []],
    cAddr : ['', []],
    cAddrFuzzy : ['', []],
    mAddr : ['', []],
    mAddrFuzzy : ['', []],
    cpName : ['', []],
    cpTel : ['', []],
    cpAddr : ['', []],
    cpAddrFuzzy : ['', []],
    cpType : ['', []],
    cpTypeLevel1 : ['', []],
    cpTypeLevel1and2 : ['', []],
    cpTitle : ['', []],
    education : ['', []]
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private f01001scn11Service: F01001scn11Service) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
    });
    console.log(this.applno);
    this.getHistorySameID();
  }

  getHistorySameID() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('code', 'EL_HISTORY_COMPARE_SAMEID');
    this.f01001scn11Service.getCompare(formdata).subscribe(data => {
      console.log(data.rspBody.compare);
      let td_gps1 = document.querySelectorAll(".td_gps1") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ gps1: data.rspBody.items[0].GPS_1 });  if ( data.rspBody.items[0].GPS_1 == 1 ) { td_gps1.item(0).style.color = "red"; } 
      let td_gps2 = document.querySelectorAll(".td_gps2") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ gps2: data.rspBody.items[0].GPS_2 });
      let td_ipAddr1 = document.querySelectorAll(".td_ipAddr1") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ ipAddr1: data.rspBody.items[0].IP_ADDR_1 });
      let td_ipAddr2 = document.querySelectorAll(".td_ipAddr2") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ ipAddr2: data.rspBody.items[0].IP_ADDR_2 });
      let td_phoneModel1 = document.querySelectorAll(".td_phoneModel1") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ phoneModel1: data.rspBody.items[0].PHONE_MODEL_1 });
      let td_phoneModel2 = document.querySelectorAll(".td_phoneModel2") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ phoneModel2: data.rspBody.items[0].PHONE_MODEL_2 });
      let td_deviceID1 = document.querySelectorAll(".td_deviceID1") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ deviceID1: data.rspBody.items[0].DEVICE_ID_1 });
      let td_deviceID2 = document.querySelectorAll(".td_deviceID2") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ deviceID2: data.rspBody.items[0].DEVICE_ID_2 });
      let td_email = document.querySelectorAll(".td_email") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ email: data.rspBody.items[0].EMAIL });
      let td_mTel = document.querySelectorAll(".td_mTel") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ mTel: data.rspBody.items[0].M_TEL });
      let td_pTel = document.querySelectorAll(".td_pTel") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ pTel: data.rspBody.items[0].P_TEL });
      let td_cTel = document.querySelectorAll(".td_cTel") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ cTel: data.rspBody.items[0].C_TEL });
      let td_pAddr = document.querySelectorAll(".td_pAddr") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ pAddr: data.rspBody.items[0].P_ADDR });
      let td_pAddrFuzzy = document.querySelectorAll(".td_pAddrFuzzy") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ pAddrFuzzy: data.rspBody.items[0].P_ADDR_FUZZY });
      let td_cAddr = document.querySelectorAll(".td_cAddr") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ cAddr: data.rspBody.items[0].C_ADDR });
      let td_cAddrFuzzy = document.querySelectorAll(".td_cAddrFuzzy") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ cAddrFuzzy: data.rspBody.items[0].C_ADDR_FUZZY });
      let td_mAddr = document.querySelectorAll(".td_mAddr") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ mAddr: data.rspBody.items[0].M_ADDR });
      let td_mAddrFuzzy = document.querySelectorAll(".td_mAddrFuzzy") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ mAddrFuzzy: data.rspBody.items[0].M_ADDR_FUZZY });
      let td_cpName = document.querySelectorAll(".td_cpName") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ cpName: data.rspBody.items[0].CP_NAME });
      let td_cpTel = document.querySelectorAll(".td_cpTel") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ cpTel: data.rspBody.items[0].CP_TEL });
      let td_cpAddr = document.querySelectorAll(".td_cpAddr") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ cpAddr: data.rspBody.items[0].CP_ADDR });
      let td_cpAddrFuzzy = document.querySelectorAll(".td_cpAddrFuzzy") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ cpAddrFuzzy: data.rspBody.items[0].CP_ADDR_FUZZY });
      let td_cpType = document.querySelectorAll(".td_cpType") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ cpType: data.rspBody.items[0].CP_TYPE });
      let td_cpTypeLevel1 = document.querySelectorAll(".td_cpTypeLevel1") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ cpTypeLevel1: data.rspBody.items[0].CP_TYPE_LEVEL_1 });
      let td_cpTypeLevel1and2 = document.querySelectorAll(".td_cpTypeLevel1and2") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ cpTypeLevel1and2: data.rspBody.items[0].CP_TYPE_LEVEL_1_2 });
      let td_cpTitle = document.querySelectorAll(".td_cpTitle") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ cpTitle: data.rspBody.items[0].CP_TITLE });
      let td_education = document.querySelectorAll(".td_education") as NodeListOf<HTMLElement>;
      this.historySameIDForm.patchValue({ education: data.rspBody.items[0].EDUCATION });
    });
  }

}
