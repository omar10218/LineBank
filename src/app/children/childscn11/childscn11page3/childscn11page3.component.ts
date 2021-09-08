import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MappingCode } from 'src/app/mappingcode.model';
import { Childscn11Service } from '../childscn11.service';
interface Code {
  compareColumn: string;
  result: string;
  count: string;
}

@Component({
  selector: 'app-childscn11page3',
  templateUrl: './childscn11page3.component.html',
  styleUrls: ['./childscn11page3.component.css','../../../../assets/css/f01.css']
})
export class Childscn11page3Component implements OnInit {

  private applno: string;
  mappingOption: MappingCode[];
  compare: Code[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private childscn11Service: Childscn11Service) { }

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
    this.childscn11Service.getCompare(formdata).subscribe(data => {
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
