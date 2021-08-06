import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { F01001scn11Service } from '../f01001scn11.service';
import { MappingCode } from 'src/app/mappingcode.model';

interface sysCode {
  value: number;
  valuebool: boolean;
}
interface Code {
  compareColumn: string;
  result: string;
  count: string;
}

@Component({
  selector: 'app-f01001scn11page1',
  templateUrl: './f01001scn11page1.component.html',
  styleUrls: ['./f01001scn11page1.component.css','../../../../assets/css/f01.css']
})
export class F01001scn11page1Component implements OnInit {


  private applno: string;
  mappingOption: MappingCode[];
  compare: Code[] = [];

  compareForm: FormGroup = this.fb.group({
    IP_ADDR : ['', []],
    PHONE_MODEL : ['', []],
    P_TEL : ['', []],
    C_TEL : ['', []],
    CP_NAME : ['', []],
    CP_TEL : ['', []],
    SALARY_YEAR : ['', []],
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private f01001scn11Service: F01001scn11Service) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
    });
    console.log(this.applno);
    this.getCOMPARE();
  }
  getCOMPARE() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
     formdata.append('code', 'EL_APPLY_COMPARE');
    this.f01001scn11Service.getCompare(formdata).subscribe(data => {
      console.log(data.rspBody);
      this.mappingOption = data.rspBody.table;
      this.compare = data.rspBody.compare;
    });
  }


  getOptionDesc(codeVal: string): string {
    for (const data of this.mappingOption) {
      if (data.codeNo == codeVal) {
        return data.codeDesc;
        break;
      }
    }
    return codeVal;
  }


}
