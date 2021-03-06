import { Component, OnInit } from '@angular/core';
import { MappingCode } from 'src/app/mappingcode.model';
import { Childscn11Service } from '../childscn11.service';
interface Code {
  compareColumn: string;
  result: string;
  count: string;
}
//Nick BAM061報送資料比對
@Component({
  selector: 'app-childscn11page5',
  templateUrl: './childscn11page5.component.html',
  styleUrls: ['./childscn11page5.component.css', '../../../../assets/css/f01.css']
})
export class Childscn11page5Component implements OnInit {

  constructor(
    private childscn11Service: Childscn11Service
  ) { }

  private applno: string;
  mappingOption: MappingCode[];
  compare: Code[] = [];
  notFind: string;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.getBAM061();
  }
//取資料
  getBAM061() {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;;
    jsonObject['code'] = 'EL_BAM061_COMPARE';
    this.childscn11Service.getCompare(jsonObject).subscribe(data => {
      if ( data.rspBody.compare == 'not find') {
        this.notFind = "此案編查無比對資料";
      } else {
        this.mappingOption = data.rspBody.table;
        this.compare = data.rspBody.compare;
      }
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
