import { Component, OnInit } from '@angular/core';
import { MappingCode } from 'src/app/mappingcode.model';
import { Childscn11Service } from '../childscn11.service';

// export const dataList = [
//   {
//     'compareColumn': 'GPS_1',
//     'count':'1',
//     'result':'N'
//   },
//   {
//     'compareColumn': 'GPS_2',
//     'count':'2',
//     'result':'Y'
//   },
//   {
//     'compareColumn': 'GPS_1',
//     'count':'3',
//     'result':'N'
//   },
//   {
//     'compareColumn': 'GPS_1',
//     'count':'4',
//     'result':'N'
//   },
//   {
//     'compareColumn': 'GPS_1',
//     'count':'5',
//     'result':'N'
//   },
//   {
//     'compareColumn': 'GPS_1',
//     'count':'6',
//     'result':'N'
//   },
//   {
//     'compareColumn': 'GPS_1',
//     'count':'7',
//     'result':'N'
//   },
//   {
//     'compareColumn': 'GPS_1',
//     'count':'8',
//     'result':'N'
//   },
//   {
//     'compareColumn': 'GPS_1',
//     'count':'9',
//     'result':'N'
//   },
//   {
//     'compareColumn': 'GPS_1',
//     'count':'10',
//     'result':'N'
//   }
// ]

interface Code {
  compareColumn: string;
  result: string;
  count: string;
}
//Nick 歷史申請書比對(同一NID)
@Component({
  selector: 'app-childscn11page3',
  templateUrl: './childscn11page3.component.html',
  styleUrls: ['./childscn11page3.component.css', '../../../../assets/css/f03.css']
})
export class Childscn11page3Component implements OnInit {

  constructor(
    private childscn11Service: Childscn11Service
  ) { }

  private applno: string;
  mappingOption: MappingCode[];
  compare: Code[] = [];

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.getHistorySameID();
  }
  //取資料
  getHistorySameID() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('code', 'EL_HISTORY_COMPARE_SAMEID');
    this.childscn11Service.getCompare(formdata).subscribe(data => {
      console.log(data);
      this.mappingOption = data.rspBody.table;
      this.compare = data.rspBody.compare;
      // this.compare=dataList;
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
