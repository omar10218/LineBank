import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MappingCode } from 'src/app/mappingcode.model';
import { F01002scn11Service } from '../f01001scn11.service';
interface Code {
  compareColumn: string;
  result: string;
  count: string;
}

@Component({
  selector: 'app-f01002scn11page3',
  templateUrl: './f01002scn11page3.component.html',
  styleUrls: ['./f01002scn11page3.component.css','../../../../assets/css/f01.css']
})
export class F01002scn11page3Component implements OnInit {

  private applno: string;
  mappingOption: MappingCode[];
  compare: Code[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private f01002scn11Service: F01002scn11Service) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
    });
    this.getHistorySameID();
  }

  getHistorySameID() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('code', 'EL_HISTORY_COMPARE_SAMEID');
    this.f01002scn11Service.getCompare(formdata).subscribe(data => {
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
