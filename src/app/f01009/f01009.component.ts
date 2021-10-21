import { OptionsCode } from 'src/app/interface/base';
import { Component, OnInit } from '@angular/core';
import { F01009Service } from './f01009.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-f01009',
  templateUrl: './f01009.component.html',
  styleUrls: ['./f01009.component.css', '../../assets/css/f01.css']
})
export class F01009Component implements OnInit {

  constructor(
    private f01009Service: F01009Service,
    private router: Router,
  ) { }

  //ngModel區
  swcApplno: string;
  swcId: string;
  swcCustId: string;
  caseType: string;
  agentEmpNo: string;

  //下拉選單區
  caseTypeCode: OptionsCode[] = [];
  agentEmpNoCode: OptionsCode[] = [];
  ynCode: OptionsCode[] = [];

  ngOnInit(): void {
    // 查詢案件分類
    this.f01009Service.getSysTypeCode('CASE_TYPE').subscribe(data => {
      this.caseTypeCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.caseTypeCode.push({ value: codeNo, viewValue: desc })
      }
    });

    this.f01009Service.getSysTypeCode('YN').subscribe(data => {
      this.ynCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.ynCode.push({ value: codeNo, viewValue: desc })
      }
    });
  }

  search() {
    sessionStorage.setItem('applno', '20210827E000');
    sessionStorage.setItem('cuid', 'A123456789');
    sessionStorage.setItem('search', 'N');
    sessionStorage.setItem('fds', 'F');
    sessionStorage.setItem('queryDate', '');
    sessionStorage.setItem('review', 'Y');
    this.router.navigate(['./F01009/F01009SCN1']);
  }
}
