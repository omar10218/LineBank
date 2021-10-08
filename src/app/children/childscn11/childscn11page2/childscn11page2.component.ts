import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MappingCode } from 'src/app/mappingcode.model';
import { Childscn11Service } from '../childscn11.service';
interface Code {
  compareColumn: string;
  result: string;
  count: string;
}
//Nick COMPARE_UNID 歷史申請書比對 (不同NID)
@Component({
  selector: 'app-childscn11page2',
  templateUrl: './childscn11page2.component.html',
  styleUrls: ['./childscn11page2.component.css', '../../../../assets/css/f01.css']
})
export class Childscn11page2Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private childscn11Service: Childscn11Service
  ) { }

  private applno: string;
  mappingOption: MappingCode[];
  compare: Code[] = [];

  compare_UNIDForm: FormGroup = this.fb.group({
    GPS_1: ['', []],//			GPS - 時點1比對次數
    GPS_2: ['', []],//			GPS - 時點2比對次數
    IP_ADDR_1: ['', []],//			IP address - 時點1比對次數
    IP_ADDR_2: ['', []],//			IP address - 時點2比對次數
    PHONE_MODEL_1: ['', []],//			手機型號 - 時點1比對次數
    PHONE_MODEL_2: ['', []],//			手機型號 - 時點2比對次數
    DEVICE_ID_1: ['', []],//			Device ID - 時點1比對次數
    DEVICE_ID_2: ['', []],//			Device ID - 時點2比對次數
    EMAIL: ['', []],//			eMail比對次數
    MOBILE: ['', []],//			行動電話比對次數
    P_TEL: ['', []],//			戶籍電話比對次數
    C_TEL: ['', []],//			通訊電話比對次數
    P_ADDR: ['', []],//			戶籍地址完整比對次數
    P_ADDR_FUZZY: ['', []],//			戶籍地址模糊比對次數
    C_ADDR: ['', []],//			通訊地址完整比對次數
    C_ADDR_FUZZY: ['', []],//			通訊地址模糊比對次數
    M_ADDR: ['', []],//			寄卡地址完整比對次數
    SEND_ADDR_FUZZY: ['', []],//			寄卡地址模糊比對次數
    CP_NAME: ['', []],//			公司名稱比對次數
    CP_TEL: ['', []],//			公司電話比對次數
    CP_ADDR: ['', []],//			公司地址完整比對次數
    CP_ADDR_FUZZY: ['', []],//			公司地址模糊比對次數
  });

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.getCOMPARE();
  }
//取資料
  getCOMPARE() {
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('code', 'EL_HISTORY_COMPARE_UNID');
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
