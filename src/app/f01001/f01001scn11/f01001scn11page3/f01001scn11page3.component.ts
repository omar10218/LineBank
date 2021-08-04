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
    formdata.append('cuid', 'EL_HISTORY_COMPARE_SAMEID');
    this.f01001scn11Service.getCompare(formdata).subscribe(data => {
      console.log(data);
      //自行放入formgroup ex. this.bam061Form.patchValue({ education : data.xxx.xxx});
    });
  }

}
