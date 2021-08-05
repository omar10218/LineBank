import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { F01001scn11Service } from '../f01001scn11.service';

@Component({
  selector: 'app-f01001scn11page4',
  templateUrl: './f01001scn11page4.component.html',
  styleUrls: ['./f01001scn11page4.component.css','../../../../assets/css/f01.css']
})
export class F01001scn11page4Component implements OnInit {

  private applno: string;

  krm043Form: FormGroup = this.fb.group({
    mobileVsMTel6 : ['', []],
    mobileVsMTel12 : ['', []],
    pTelVsHTel6 : ['', []],
    pTelVsHTel12 : ['', []],
    pTelVsOTel6 : ['', []],
    pTelVsOTel12 : ['', []],
    cTelVsHTel6 : ['', []],
    cTelVsHTel12 : ['', []],
    cTelVsOTel6 : ['', []],
    cTelVsOTel12 : ['', []],
    pAddrVsRAddr6 : ['', []],
    pAddrVsRAddr12 : ['', []],
    pAddrVsMAddr6 : ['', []],
    pAddrVsMAddr12 : ['', []],
    pAddrVsRAddrFuzzy6 : ['', []],
    pAddrVsRAddrFuzzy12 : ['', []],
    pAddrVsMAddrFuzzy6 : ['', []],
    cAddrVsRAddr6 : ['', []],
    cAddrVsMAddr6 : ['', []],
    cAddrVsRAddrFuzzy6 : ['', []],
    cAddrVsMAddrFuzzy6 : ['', []],
    cardAddrVsRAddr6 : ['', []],
    cardAddrVsMAddr6 : ['', []],
    cardAddrVsRAddrFuzzy6 : ['', []],
    cardAddrVsMAddrFuzzy6 : ['', []],
    cpName : ['', []],
    cpTelVsHTel : ['', []],
    cpTelVsOTel : ['', []],
    cpAddrVsRAddr6 : ['', []],
    cpAddrVsMAddr6 : ['', []],
    cpAddrVsRAddrFuzzy6 : ['', []],
    cpAddrVsMAddrFuzzy6 : ['', []],
    cpTypeLevel1 : ['', []],
    cpTypeLevel1and2 : ['', []],
    education : ['', []]
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private f01001scn11Service: F01001scn11Service) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
    });
    console.log(this.applno);
    this.getKRM043();
  }

  getKRM043() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('code', 'EL_KRM043_COMPARE');
    this.f01001scn11Service.getCompare(formdata).subscribe(data => {
      console.log(data.rspBody.compare);
      let td_mobileVsMTel6 = document.querySelectorAll(".td_mobileVsMTel6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ mobileVsMTel6: data.rspBody.items[0].MOBILE_VS_M_TEL_6_MONTH });  if ( data.rspBody.items[0].MOBILE_VS_M_TEL_6_MONTH == 1 ) { td_mobileVsMTel6.item(0).style.color = "red"; } 
      let td_mobileVsMTel12 = document.querySelectorAll(".td_mobileVsMTel12") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ mobileVsMTel12: data.rspBody.items[0].MOBILE_VS_M_TEL_12_MONTH });
      let td_pTelVsHTel6 = document.querySelectorAll(".td_pTelVsHTel6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ pTelVsHTel6: data.rspBody.items[0].P_TEL_VS_H_TEL_6_MONTH });
      let td_pTelVsHTel12 = document.querySelectorAll(".td_pTelVsHTel12") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ pTelVsHTel12: data.rspBody.items[0].P_TEL_VS_H_TEL_12_MONTH });
      let td_pTelVsOTel6 = document.querySelectorAll(".td_pTelVsOTel6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ pTelVsOTel6: data.rspBody.items[0].P_TEL_VS_O_TEL_6_MONTH });
      let td_pTelVsOTel12 = document.querySelectorAll(".td_pTelVsOTel12") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ pTelVsOTel12: data.rspBody.items[0].P_TEL_VS_O_TEL_12_MONTH });
      let td_cTelVsHTel6 = document.querySelectorAll(".td_cTelVsHTel6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cTelVsHTel6: data.rspBody.items[0].C_TEL_VS_H_TEL_6_MONTH });
      let td_cTelVsHTel12 = document.querySelectorAll(".td_cTelVsHTel12") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cTelVsHTel12: data.rspBody.items[0].C_TEL_VS_H_TEL_12_MONTH });
      let td_cTelVsOTel6 = document.querySelectorAll(".td_cTelVsOTel6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cTelVsOTel6: data.rspBody.items[0].C_TEL_VS_O_TEL_6_MONTH });
      let td_cTelVsOTel12 = document.querySelectorAll(".td_cTelVsOTel12") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cTelVsOTel12: data.rspBody.items[0].C_TEL_VS_O_TEL_12_MONTH });
      let td_pAddrVsRAddr6 = document.querySelectorAll(".td_pAddrVsRAddr6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ pAddrVsRAddr6: data.rspBody.items[0].P_ADDR_VS_R_ADDR_6_MONTH });
      let td_pAddrVsRAddr12 = document.querySelectorAll(".td_pAddrVsRAddr12") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ pAddrVsRAddr12: data.rspBody.items[0].P_ADDR_VS_R_ADDR_12_MONTH });
      let td_pAddrVsMAddr6 = document.querySelectorAll(".td_pAddrVsMAddr6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ pAddrVsMAddr6: data.rspBody.items[0].P_ADDR_VS_M_ADDR_6_MONTH });
      let td_pAddrVsMAddr12 = document.querySelectorAll(".td_pAddrVsMAddr12") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ pAddrVsMAddr12: data.rspBody.items[0].P_ADDR_VS_M_ADDR_12_MONTH });
      let td_pAddrVsRAddrFuzzy6 = document.querySelectorAll(".td_pAddrVsRAddrFuzzy6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ pAddrVsRAddrFuzzy6: data.rspBody.items[0].P_ADDR_VS_R_ADDR_FUZZY_6_MONTH });
      let td_pAddrVsRAddrFuzzy12 = document.querySelectorAll(".td_pAddrVsRAddrFuzzy12") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ pAddrVsRAddrFuzzy12: data.rspBody.items[0].P_ADDR_VS_R_ADDR_FUZZY_12_MONTH });
      let td_pAddrVsMAddrFuzzy6 = document.querySelectorAll(".td_pAddrVsMAddrFuzzy6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ pAddrVsMAddrFuzzy6: data.rspBody.items[0].P_ADDR_VS_M_ADDR_FUZZY_6_MONTH });
      let td_cAddrVsRAddr6 = document.querySelectorAll(".td_cAddrVsRAddr6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cAddrVsRAddr6: data.rspBody.items[0].C_ADDR_VS_R_ADDR_6_MONTH });
      let td_cAddrVsMAddr6 = document.querySelectorAll(".td_cAddrVsMAddr6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cAddrVsMAddr6: data.rspBody.items[0].C_ADDR_VS_M_ADDR_6_MONTH });
      let td_cAddrVsRAddrFuzzy6 = document.querySelectorAll(".td_cAddrVsRAddrFuzzy6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cAddrVsRAddrFuzzy6: data.rspBody.items[0].C_ADDR_VS_R_ADDR_FUZZY_6_MONTH });
      let td_cAddrVsMAddrFuzzy6 = document.querySelectorAll(".td_cAddrVsMAddrFuzzy6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cAddrVsMAddrFuzzy6: data.rspBody.items[0].C_ADDR_VS_M_ADDR_FUZZY_6_MONTH });
      let td_cardAddrVsRAddr6 = document.querySelectorAll(".td_cardAddrVsRAddr6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cardAddrVsRAddr6: data.rspBody.items[0].CARD_ADDR_VS_R_ADDR_6_MONTH });
      let td_cardAddrVsMAddr6 = document.querySelectorAll(".td_cardAddrVsMAddr6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cardAddrVsMAddr6: data.rspBody.items[0].CARD_ADDR_VS_M_ADDR_6_MONTH });
      let td_cardAddrVsRAddrFuzzy6 = document.querySelectorAll(".td_cardAddrVsRAddrFuzzy6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cardAddrVsRAddrFuzzy6: data.rspBody.items[0].CARD_ADDR_VS_R_ADDR_FUZZY_6_MONTH });
      let td_cardAddrVsMAddrFuzzy6 = document.querySelectorAll(".td_cardAddrVsMAddrFuzzy6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cardAddrVsMAddrFuzzy6: data.rspBody.items[0].CARD_ADDR_VS_M_ADDR_FUZZY_6_MONTH });
      let td_cpName = document.querySelectorAll(".td_cpName") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cpName: data.rspBody.items[0].CP_NAME });
      let td_cpTelVsHTel = document.querySelectorAll(".td_cpTelVsHTel") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cpTelVsHTel: data.rspBody.items[0].CP_TEL_VS_H_TEL });
      let td_cpTelVsOTel = document.querySelectorAll(".td_cpTelVsOTel") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cpTelVsOTel: data.rspBody.items[0].CP_TEL_VS_O_TEL });
      let td_cpAddrVsRAddr6 = document.querySelectorAll(".td_cpAddrVsRAddr6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cpAddrVsRAddr6: data.rspBody.items[0].CP_ADDR_VS_R_ADDR_6_MONTH });
      let td_cpAddrVsMAddr6 = document.querySelectorAll(".td_cpAddrVsMAddr6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cpAddrVsMAddr6: data.rspBody.items[0].CP_ADDR_VS_M_ADDR_6_MONTH });
      let td_cpAddrVsRAddrFuzzy6 = document.querySelectorAll(".td_cpAddrVsRAddrFuzzy6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cpAddrVsRAddrFuzzy6: data.rspBody.items[0].CP_ADDR_VS_R_ADDR_FUZZY_6_MONTH });
      let td_cpAddrVsMAddrFuzzy6 = document.querySelectorAll(".td_cpAddrVsMAddrFuzzy6") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cpAddrVsMAddrFuzzy6: data.rspBody.items[0].CP_ADDR_VS_M_ADDR_FUZZY_6_MONTH });
      let td_cpTypeLevel1 = document.querySelectorAll(".td_cpTypeLevel1") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cpTypeLevel1: data.rspBody.items[0].CP_TYPE_LEVEL_1 });
      let td_cpTypeLevel1and2 = document.querySelectorAll(".td_cpTypeLevel1and2") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ cpTypeLevel1and2: data.rspBody.items[0].CP_TYPE_LEVEL_1_2 });
      let td_education = document.querySelectorAll(".td_education") as NodeListOf<HTMLElement>;
      this.krm043Form.patchValue({ education: data.rspBody.items[0].EDUCATION });
    });
  }

}
