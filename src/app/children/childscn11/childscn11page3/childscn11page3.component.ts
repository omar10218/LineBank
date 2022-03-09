import { DatePipe } from '@angular/common';
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
  styleUrls: ['./childscn11page3.component.css',  '../../../../assets/css/child.css']
})
export class Childscn11page3Component implements OnInit {

  constructor(
    private childscn11Service: Childscn11Service,
    private pipe: DatePipe,
  ) { }

  private applno: string;
  private cuid: string;
  mappingOption: MappingCode[];
  compare: Code[] = [];
  notFind: string;
  loading:boolean=false;
  time:string;
  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.getHistorySameID();
  }
  //取資料
  getHistorySameID() {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;;
    jsonObject['code'] = 'EL_HISTORY_COMPARE_SAMEID';
    this.childscn11Service.getCompare(jsonObject).subscribe(data => {
      console.log(data)
      if ( data.rspBody.compare == 'not find') {
        this.notFind = "此案編查無比對資料";
      } else {
        this.mappingOption = data.rspBody.table;
        this.compare = data.rspBody.compare;
        this.loading =true
      }
      // this.compare=dataList;
    });
    this.childscn11Service.getCompare1(jsonObject).subscribe(data => {
      console.log(data)
      
       
      this.time=this.pipe.transform(new Date(data.rspBody.compareDate), 'yyyy-MM-dd HH:mm:ss');
      
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
  test(x:string){
    if(x=='1'){
      return '絕對值'
    }
    else if(x=='2'){
      return '相對值'
    }
  }

  Inquire(col: string) //查詢
  {
    const url = 'f01/childscn11action2';
    let jsonObject: any = {};
    jsonObject['nationalId'] = this.cuid;
    jsonObject['applno'] = this.applno;
    jsonObject['code'] = 'EL_HISTORY_COMPARE_UNID';
    jsonObject['col'] = col;
    this.childscn11Service.selectCustomer(url, jsonObject).subscribe(data => {

      // if ( data.rspBody.length > 0 ) {
      //   this.fds = data.rspBody[0].fds
      // }
      sessionStorage.setItem('applno', this.applno);
      sessionStorage.setItem('nationalId', this.cuid);
      // sessionStorage.setItem('custId', this.custId);
      sessionStorage.setItem('search','Y');
      sessionStorage.setItem('queryDate', '');
      sessionStorage.setItem('winClose', 'Y');

      //開啟徵審主畫面
      const url = window.location.href.split("/#");
      window.open( url[0] + "/#/F01002/F01002SCN1");
      sessionStorage.setItem('winClose', 'N');
      sessionStorage.setItem('search','N');
      sessionStorage.setItem('applno', this.applno);
    })
  }
}
