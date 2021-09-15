import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MappingCode } from 'src/app/mappingcode.model';
import { ChildrenService } from '../../children.service';
import { Childscn11Service } from '../childscn11.service';
interface Code {
  compareColumn: string;
  result: string;
  count: string;
}

@Component({
  selector: 'app-childscn11page5',
  templateUrl: './childscn11page5.component.html',
  styleUrls: ['./childscn11page5.component.css', '../../../../assets/css/f01.css']
})
export class Childscn11page5Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private childscn11Service: Childscn11Service,
    public childService: ChildrenService
  ) { }

  private applno: string;
  mappingOption: MappingCode[];
  compare: Code[] = [];

  ngOnInit(): void {
    const caseParams = this.childService.getData();
    this.applno = caseParams.applno;
    this.getBAM061();
  }

  getBAM061() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('code', 'EL_BAM061_COMPARE');
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
