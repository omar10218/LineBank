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

  bam043Form: FormGroup = this.fb.group({
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
    this.getBAM043();
  }

  getBAM043() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', 'EL_KRM043_COMPARE');
    this.f01001scn11Service.getCompare(formdata).subscribe(data => {
      console.log(data);
      //自行放入formgroup ex. this.bam061Form.patchValue({ education : data.xxx.xxx});
    });
  }

}
