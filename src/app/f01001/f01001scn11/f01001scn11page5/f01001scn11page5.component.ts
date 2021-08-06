import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MappingCode } from 'src/app/mappingcode.model';
import { F01001scn11Service } from '../f01001scn11.service';
interface Code {
  compareColumn: string;
  result: string;
  count: string;
}

@Component({
  selector: 'app-f01001scn11page5',
  templateUrl: './f01001scn11page5.component.html',
  styleUrls: ['./f01001scn11page5.component.css', '../../../../assets/css/f01.css']
})
export class F01001scn11page5Component implements OnInit {

  private applno: string;
  mappingOption: MappingCode[];
  compare: Code[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private f01001scn11Service: F01001scn11Service) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
    });
    console.log(this.applno);
    this.getBAM061();
  }

  getBAM061() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('code', 'EL_BAM061_COMPARE');
    this.f01001scn11Service.getCompare(formdata).subscribe(data => {
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
