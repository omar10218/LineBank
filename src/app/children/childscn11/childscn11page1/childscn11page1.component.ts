import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MappingCode } from 'src/app/mappingcode.model';
import { Childscn11Service } from '../childscn11.service';
interface Code {
  compareColumn: string;
  result: string;
  count: string;
}
//Nick COMPARE本案申請書資訊合理性比對
@Component({
  selector: 'app-childscn11page1',
  templateUrl: './childscn11page1.component.html',
  styleUrls: ['./childscn11page1.component.css', '../../../../assets/css/f01.css']
})
export class Childscn11page1Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private childscn11Service: Childscn11Service
  ) { }

  private applno: string;
  mappingOption: MappingCode[];
  compare: Code[] = [];

  compareForm: FormGroup = this.fb.group({
    IP_ADDR: ['', []],
    PHONE_MODEL: ['', []],
    P_TEL: ['', []],
    C_TEL: ['', []],
    CP_NAME: ['', []],
    CP_TEL: ['', []],
    SALARY_YEAR: ['', []],
  });

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.getCOMPARE();
  }
  //取資料
  getCOMPARE() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('code', 'EL_APPLY_COMPARE');
    this.childscn11Service.getCompare(formdata).subscribe(data => {
      this.mappingOption = data.rspBody.table;
      this.compare = data.rspBody.compare;
    });
  }
  //取viewValue
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
