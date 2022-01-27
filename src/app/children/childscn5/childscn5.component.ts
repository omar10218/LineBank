import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F03015Service } from 'src/app/f03015/f03015.service';
import { Childscn5Service } from './childscn5.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn5',
  templateUrl: './childscn5.component.html',
  styleUrls: ['./childscn5.component.css', '../../../assets/css/child.css']
})
export class Childscn5Component implements OnInit {
  private applno: string;               //案件編號
  private cuid: string;                 //客戶編號
  jobCode: string;                      //職稱
  search: string;
  cuLevel1: string     //行業Level1值
  cuLevel2: string     //行業Level2值
  hiredDate: string     //目前工作年資值
  currJobYear: string     //當前工作在職時長(年數)值
  currJobMonth: string     //當前工作在職時長(月數)值
  cuLevel1CaCode: sysCode[] = [];       //徵信認列行業Level1下拉
  cuLevel1CaValue: string;              //徵信認列行業Level1
  cuLevel2CaCode: sysCode[] = [];       //徵信認列行業Level2下拉
  cuLevel2CaValue: string;              //徵信認列行業Level2
  jobCodeCaCode: sysCode[] = [];        //職業代碼下拉
  jobCodeCaValue: string;               //職業代碼
  companyWhitelistCode: sysCode[] = []; //公司是否為白名單下拉
  companyWhitelistValue: string;        //公司是否為白名單
  genderCode: sysCode[] = [];           //性別下拉
  genderValue: string;                  //性別
  cuCpNameCa: string;                   //徵信確認公司名稱
  cuMTelOther: string;                  //其他-手機(非本行主要)
  contactOther: string;                 //其他-聯絡資訊
  inducCode: string;                     //行職業代碼
  cuType: string;                       //行業別
  preCompNm: string;                    //前一份工作名稱
  preJobTitle: string;                  //前一份工作公司職稱
  preJobYear: string;                   //前一份工作在職時長(年數)

  cuCpTelExt: string;                   //其他-公司電話分機
  setmaterial = [];
  thous: string                         // 千分位處理
  yn: boolean                           // 判斷是否為授信
  pag: string;
  originalData: any                      // 舊值
  //20220113
  educationCode: sysCode[] = [];           //學歷下拉
  livingStatusCode: sysCode[] = [];           //現居狀況下拉
  residenceCode: sysCode[] = [];           //以居住年數下拉
  prvJobMonthCode: sysCode[] = [];           //前份工作在職下拉
  preJobMonthValue: string;                  //前一份工作在職時長(月數)
  hiredDateCode: sysCode[] = [];           //目前工作年資下拉
  hiredDateValue: string;                  //目前工作年資
  currJobYearCode: sysCode[] = []; 
  preJobYearCode: sysCode[] = [];       //前職工作年資(客戶填寫)
  x:string;
  
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private childscn5Service: Childscn5Service,
    private f03015Service: F03015Service
  ) { }

  customerInfoForm: FormGroup = this.fb.group({
    CUCNAME: ['', []],          // 中文姓名
    NATIONAL_ID: ['', []],      // 身分證字號
    CU_SEX: ['', []],           // 性別
    RESIDENCE_YEAR: ['', []],   // 已居住年數
    CU_BIRTHDAY: ['', []],      // 生日
    CU_MARRIED_STATUS: ['', []],// 婚姻
    LIVING_STATUS: ['', []],    // 現居狀況
    CU_EDUCATION: ['', []],     // 學歷
    CU_TITLE: ['', []],         // 職稱
    CU_H_ADDR_CODE: ['', []],   // 住宅郵區
    CU_H_ADDR1: ['', []],       // 住宅地址1
    CU_H_ADDR2: ['', []],       // 住宅地址2
    CU_H_TEL_INO: ['', []],     // 住宅電話區碼
    CU_H_TEL: ['', []],         // 住宅電話
    CU_CP_ADDR_CODE: ['', []],  // 公司郵區
    CU_CP_ADDR1: ['', []],      // 公司地址1
    CU_CP_ADDR2: ['', []],      // 公司地址2
    CU_CP_TEL_INO: ['', []],    // 公司電話區碼
    CU_CP_TEL: ['', []],        // 公司電話
    CU_CP_NAME: ['', []],       // 公司名稱
    CU_CP_NAME_CA: ['', []],       // 徵信確認公司名稱
    CU_CP_NO: ['', []],         // 公司統編
    HIRED_DATE: ['', []],       // 目前工作年資
    CURR_JOB_YEAR: ['', []],       // 當前這份工作在職時長(年數)
    CURR_JOB_MONTH: ['', []],       // 當前這份工作在職時長(月數)
    CU_CP_TEL_EXT: ['', []],        // 其他-公司電話分機
    ANNUAL_INCOME: ['', []],    // 年收入
    CU_EMAIL: ['', []],         // eMail
    CU_M_TEL: ['', []],         // 行動電話
    CU_LEVEL1: ['', []],        // 行業Level1
    CU_LEVEL2: ['', []],        // 行業Level2
    JOB_CODE: ['', []],         // 職業碼
    CU_LEVEL1_CA: ['', []],     // 徵信認列行業Level1
    CU_LEVEL2_CA: ['', []],     // 徵信認列行業Level2
    JOB_CODE_CA: ['', []],      // 徵信認列行業職業碼
    COMPANY_WHITELIST: ['', []], // 公司是否為白名單
    INDU_CODE: ['', []], // 行職業代碼
    CU_TYPE: ['', []], // 行業別
    CU_M_TEL_OTHER: ['', []], // 其他-手機(非本行主要)
    CONTACT_OTHER: ['', []], // 其他-聯絡資訊
    PRE_COMP_NM: ['', []], // 前一份工作名稱
    PRE_JOB_TITLE: ['', []], // 前一份工作公司職稱
    PRE_JOB_YEAR: ['', []], // 前一份工作在職時長(年數)
    PRE_JOB_MONTH: ['', []], // 前一份工作在職時長(月數)

  });
  validationMessage = {
    'CU_M_TEL_OTHER': { 'required': '請填寫用戶名' }
  }
  ngOnInit(): void {
    // this.companyWhitelistValue = ''; 
    this.search = sessionStorage.getItem('search');
    this.pag = sessionStorage.getItem('page');
    this.getBigcompany();

    //取性別
    this.childscn5Service.getSysTypeCode('GENDER')
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.genderCode.push({ value: codeNo, viewValue: desc })
        }
      });

    //取學歷
    this.childscn5Service.getSysTypeCode('EDUCATION')
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.educationCode.push({ value: codeNo, viewValue: desc })
        }
      });

    //取現居狀況
    this.childscn5Service.getSysTypeCode('LIVING_STATUS')
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.livingStatusCode.push({ value: codeNo, viewValue: desc })
        }
      });

    //前職工作年資(客戶填寫)
    this.childscn5Service.getSysTypeCode('PRV_JOB_MONTH')
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.preJobYearCode.push({ value: codeNo, viewValue: desc })
        }
      });

   //目前工作年資
    this.childscn5Service.getSysTypeCode('HIRED_DATE').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.hiredDateCode.push({ value: codeNo, viewValue: desc })
      }
    });
 //目前工作年資(客戶填寫)
 this.childscn5Service.getSysTypeCode('HIRED_DATE').subscribe(data => {
  for (const jsonObj of data.rspBody.mappingList) {
    const codeNo = jsonObj.codeNo;
    const desc = jsonObj.codeDesc;
    this.currJobYearCode.push({ value: codeNo, viewValue: desc })
  }
});
   //已居住年數
    this.childscn5Service.getSysTypeCode('RESIDENCE_YEAR').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.residenceCode.push({ value: codeNo, viewValue: desc })
      }
    });

    // 取徵信認列行業Level1下拉
    let jsonObject: any = {};
    this.f03015Service.getReturn('f03/f03015action6', jsonObject).subscribe(data => {
      for (const jsonObj of data.rspBody.items) {
        const codeNo = jsonObj['INDUC_LEVEL1'];
        const desc = jsonObj['INDUC_LEVEL1_DESC'];
        this.cuLevel1CaCode.push({ value: codeNo, viewValue: desc });
      }
    });

    this.cuLevel2CaValue = '';
    jsonObject['inducLevel1'] = this.cuLevel1CaValue;
    this.f03015Service.getReturn('f03/f03015action6', jsonObject).subscribe(data => {
      for (const jsonObj of data.rspBody.items) {
        const codeNo = jsonObj['INDUC_LEVEL2'];
        const desc = jsonObj['INDUC_LEVEL2_DESC'];
        this.cuLevel2CaCode.push({ value: codeNo, viewValue: desc });
      }
    });
    this.cuLevel2CaValue = '';
    jsonObject['inducLevel1'] = this.cuLevel1CaValue;
    jsonObject['inducLevel2'] = this.cuLevel2CaValue;
    this.f03015Service.getReturn('f03/f03015action6', jsonObject).subscribe(data => {
      for (const jsonObj of data.rspBody.items) {
        const codeNo = jsonObj['JOB_CODE'];
        const desc = jsonObj['JOB_CODE_DESC'];
        this.jobCodeCaCode.push({ value: codeNo, viewValue: desc });
      }
    });
    jsonObject['inducCode'] = this.cuLevel1CaValue + this.cuLevel2CaValue + this.jobCodeCaValue;
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('nationalId');
    this.getCustomerInfo();
    this.yn = sessionStorage.getItem('page') == '2' ? true : false;
  }

  getStepName() {
    return sessionStorage.getItem('stepName');
  }

  getCustomerInfo() {

    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['custId'] = this.cuid;
    this.childscn5Service.getCustomerInfoSearch(jsonObject).subscribe(data => {
      this.setmaterial = data.rspBody.compareCompanies;
      this.originalData = data.rspBody.items[0]
      this.cuLevel1 = data.rspBody.items[0].cuLevel1
      this.cuLevel2 = data.rspBody.items[0].cuLevel2
      this.jobCode = data.rspBody.items[0].jobCode

      this.preJobMonthValue = data.rspBody.items[0].preJobMonth
      this.customerInfoForm.patchValue({ CUCNAME: data.rspBody.items[0].cuCname })
      this.customerInfoForm.patchValue({ NATIONAL_ID: data.rspBody.items[0].nationalId })
      this.customerInfoForm.patchValue({ CU_SEX: this.getGender(data.rspBody.items[0].cuSex) })
      this.customerInfoForm.patchValue({ RESIDENCE_YEAR: this.getresidence(data.rspBody.items[0].residenceYear) })
      this.customerInfoForm.patchValue({ CU_BIRTHDAY: data.rspBody.items[0].cuBirthday })
      this.customerInfoForm.patchValue({ CU_MARRIED_STATUS: data.rspBody.items[0].cuMarriedStatus })
      this.customerInfoForm.patchValue({ LIVING_STATUS:  data.rspBody.items[0].livingStatus+this.getlivingstaus(data.rspBody.items[0].livingStatus) })
      this.customerInfoForm.patchValue({ CU_EDUCATION: data.rspBody.items[0].cuEducation + this.geteducation(data.rspBody.items[0].cuEducation) })
      this.customerInfoForm.patchValue({ CU_TITLE: data.rspBody.items[0].cuTitle })
      this.customerInfoForm.patchValue({ HIRED_DATE: data.rspBody.items[0].hiredDate })
      this.customerInfoForm.patchValue({ CU_H_ADDR_CODE: data.rspBody.items[0].cuHAddrCode })
      this.customerInfoForm.patchValue({ CU_H_ADDR1: data.rspBody.items[0].cuHAddr1 })
      this.customerInfoForm.patchValue({ CU_H_ADDR2: data.rspBody.items[0].cuHAddr2 })
      this.customerInfoForm.patchValue({ CU_H_TEL_INO: data.rspBody.items[0].cuHTelIno })
      this.customerInfoForm.patchValue({ CU_H_TEL: data.rspBody.items[0].cuHTel })
      this.customerInfoForm.patchValue({ CU_CP_ADDR_CODE: data.rspBody.items[0].cuCpAddrCode })
      this.customerInfoForm.patchValue({ CU_CP_ADDR1: data.rspBody.items[0].cuCpAddr1 })
      this.customerInfoForm.patchValue({ CU_CP_ADDR2: data.rspBody.items[0].cuCpAddr2 })
      this.customerInfoForm.patchValue({ CU_CP_TEL_INO: data.rspBody.items[0].cuCpTelIno })
      this.customerInfoForm.patchValue({ CU_CP_TEL: data.rspBody.items[0].cuCpTel })
      this.customerInfoForm.patchValue({ CU_CP_NAME: data.rspBody.items[0].cuCpName })
      this.customerInfoForm.patchValue({ CU_CP_NAME_CA: data.rspBody.items[0].cuCpNameCa })
      this.customerInfoForm.patchValue({ CU_CP_NO: data.rspBody.items[0].cuCpNo })
      this.customerInfoForm.patchValue({ CURR_JOB_YEAR:data.rspBody.items[0].currJobYear+"-"+this.getcurrJobYear( data.rspBody.items[0].currJobYear) })
      this.customerInfoForm.patchValue({ CURR_JOB_MONTH: data.rspBody.items[0].currJobMonth })
      this.customerInfoForm.patchValue({ CU_CP_TEL_EXT: data.rspBody.items[0].cuCpTelExt })
      this.customerInfoForm.patchValue({ ANNUAL_INCOME: data.rspBody.items[0].annualIncome != null ? this.data_number(data.rspBody.items[0].annualIncome) : "" })
      this.customerInfoForm.patchValue({ CU_EMAIL: data.rspBody.items[0].cuEmail })
      this.customerInfoForm.patchValue({ CU_M_TEL: data.rspBody.items[0].cuMTel })
      this.customerInfoForm.patchValue({ CU_M_TEL_OTHER: data.rspBody.items[0].cuMTelOther })
      this.customerInfoForm.patchValue({ CONTACT_OTHER: data.rspBody.items[0].contactOther })
      this.customerInfoForm.patchValue({ INDU_CODE: data.rspBody.items[0].cuLevel1 + data.rspBody.items[0].cuLevel2 + data.rspBody.items[0].jobCode }) //取得行職業代碼
      this.customerInfoForm.patchValue({
        CU_LEVEL1: data.rspBody.items[0].cuLevel1 +
          data.rspBody.items[0].cuLevel2
      })
      // this.customerInfoForm.patchValue({ CU_LEVEL2: data.rspBody.items[0].cuLevel2 })
      // this.customerInfoForm.patchValue({ JOB_CODE: data.rspBody.items[0].jobCode })
      this.customerInfoForm.patchValue({ CU_LEVEL1_CA: data.rspBody.items[0].cuLevel1Ca })
      this.customerInfoForm.patchValue({ CU_LEVEL2_CA: data.rspBody.items[0].cuLevel2Ca })
      this.customerInfoForm.patchValue({ JOB_CODE_CA: data.rspBody.items[0].jobCodeCa })
      this.customerInfoForm.patchValue({ COMPANY_WHITELIST: data.rspBody.items[0].companyWhitelist })
      this.customerInfoForm.patchValue({ PRE_COMP_NM: data.rspBody.items[0].prvCompNm })
      this.customerInfoForm.patchValue({ PRE_JOB_TITLE: data.rspBody.items[0].prvJobTitle })
      this.customerInfoForm.patchValue({ PRE_JOB_YEAR: data.rspBody.items[0].prevJobYear  })
      this.customerInfoForm.patchValue({ PRE_JOB_MONTH: data.rspBody.items[0].prvJobMonth })


      jsonObject['inducCode'] = data.rspBody.items[0].cuLevel1 + data.rspBody.items[0].cuLevel2 + data.rspBody.items[0].jobCode;
      this.childscn5Service.getCuListSearch(jsonObject).subscribe(data => {
        this.customerInfoForm.patchValue({ CU_TYPE: data.rspBody.eroxyIncomeList[0].inducLevel1Desc + ">" + data.rspBody.eroxyIncomeList[0].inducLevel2Desc })//取得行業別
        this.customerInfoForm.patchValue({ JOB_CODE: data.rspBody.eroxyIncomeList[0].jobCodeDesc })//職稱
        this.cuType = data.rspBody.eroxyIncomeList[0].inducLevel1Desc + data.rspBody.eroxyIncomeList[0].inducLevel2Desc
        this.trans(this.cuType)
        // this.jobCode = data.rspBody.eroxyIncomeList[0].jobCodeDesc
      })
    });

  }



  // 千分號標點符號(form顯示用)
  data_number(p: number) {
    this.thous = '';
    this.thous = (p + "")
    if (this.thous != null) {
      this.thous = this.thous.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return this.thous;
  }
  trans(p: string) {
    var w: string
    w = p.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  // 取徵信認列行業Level2下拉
  changeLevel1Select() {
    this.cuLevel2CaCode = [];
    this.cuLevel2CaValue = '';
    this.jobCodeCaCode = [];
    this.jobCodeCaValue = '';
    let jsonObject: any = {};
    jsonObject['inducLevel1'] = this.cuLevel1CaValue;
    this.f03015Service.getReturn('f03/f03015action6', jsonObject).subscribe(data => {

      for (const jsonObj of data.rspBody.items) {
        const codeNo = jsonObj['INDUC_LEVEL2'];
        const desc = jsonObj['INDUC_LEVEL2_DESC'];
        this.cuLevel2CaCode.push({ value: codeNo, viewValue: desc });
        this.cuLevel2CaCode = this.cuLevel2CaCode.filter(c => c.viewValue != undefined);
      }
    });
  }

  // 取徵信認列職業碼下拉
  changeLevel2Select() {
    this.jobCodeCaCode = [];
    this.jobCodeCaValue = '';
    let jsonObject: any = {};
    jsonObject['inducLevel1'] = this.cuLevel1CaValue;
    jsonObject['inducLevel2'] = this.cuLevel2CaValue;

    this.f03015Service.getReturn('f03/f03015action6', jsonObject).subscribe(data => {
      for (const jsonObj of data.rspBody.items) {
        const codeNo = jsonObj['JOB_CODE'];
        const desc = jsonObj['JOB_CODE_DESC'];
        this.jobCodeCaCode.push({ value: codeNo, viewValue: desc });
        this.jobCodeCaCode = this.jobCodeCaCode.filter(c => c.viewValue != undefined);
      }
    });
  }

  insertHistory() {
    const content = []
    let msg = '';
    let jsonObject: any = {};
    content.push(
      {
        userId: localStorage.getItem('empNo'),
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'CU_CP_NAME_CA',
        originalValue: this.originalData.cuCpNameCa,
        currentValue: this.cuCpNameCa,
        transAPname: '基本資料',
      },
      {
        userId: localStorage.getItem('empNo'),
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'CU_LEVEL1_CA',
        originalValue: this.originalData.cuLevel1Ca,
        currentValue: this.cuLevel1CaValue,
        transAPname: '基本資料',
      },
      {
        userId: localStorage.getItem('empNo'),
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'CU_LEVEL2_CA',
        originalValue: this.originalData.cuLevel2Ca,
        currentValue: this.cuLevel2CaValue,
        transAPname: '基本資料',
      },
      {
        userId: localStorage.getItem('empNo'),
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'JOB_CODE_CA',
        originalValue: this.originalData.jobCodeCa,
        currentValue: this.jobCodeCaValue,
        transAPname: '基本資料',
      },
      {
        userId: localStorage.getItem('empNo'),
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'COMPANY_WHITELIST',
        originalValue: this.originalData.companyWhitelist,
        currentValue: this.companyWhitelistValue,
        transAPname: '基本資料',
      },

      {
        userId: localStorage.getItem('empNo'),
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'CU_M_TEL_OTHER',
        originalValue: this.originalData.cuMTelOther,
        currentValue: this.cuMTelOther,
        transAPname: '基本資料',
      },
      {
        userId: localStorage.getItem('empNo'),
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'CONTACT_OTHER',
        originalValue: this.originalData.contactOther,
        currentValue: this.contactOther,
        transAPname: '基本資料',
      },
      {
        userId: localStorage.getItem('empNo'),
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'CU_CP_TEL_EXT',
        originalValue: this.originalData.cuCpTelExt,
        currentValue: this.cuCpTelExt,
        transAPname: '基本資料',
      },
      {
        userId: localStorage.getItem('empNo'),
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'PRV_COMP_NM',
        originalValue: this.originalData.prvCompNm,
        currentValue: this.preCompNm,
        transAPname: '基本資料',
      },
      {
        userId: localStorage.getItem('empNo'),
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'PRV_JOB_TITLE',
        originalValue: this.originalData.prvJobTitle,
        currentValue: this.preJobTitle,
        transAPname: '基本資料',
      },
      {
        userId: localStorage.getItem('empNo'),
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'PREV_JOB_YEAR',
        originalValue: this.originalData.prevJobYear,
        currentValue: this.preJobYear,
        transAPname: '基本資料',
      },
      // {
      //   applno: this.applno,
      //   userId: localStorage.getItem('empNo'),
      //   tableName: 'EL_CUSTOMER_INFO',
      //   columnName: 'PRV_JOB_MONTH',
      //   originalValue: this.originalData.prvJobMonth,
      //   currentValue: this.preJobMonthValue,
      //   transAPname: '基本資料',
      // },



      {
        applno: this.applno,
        userId: localStorage.getItem('empNo'),
        tableName: 'EL_CUSTOMER_INFO',
        columnName: 'HIRED_DATE',
        originalValue: this.originalData.hiredDate,
        currentValue: this.hiredDateValue,
        transAPname: '基本資料',
      },
      // {
      //   applno: this.applno,
      //   userId: localStorage.getItem('empNo'),
      //   tableName: 'EL_CUSTOMER_INFO',
      //   columnName: 'CURR_JOB_YEAR',
      //   originalValue: this.originalData.currJobYear,
      //   currentValue: this.currJobYear,
      //   transAPname: '基本資料',
      // },
      // {
      //   applno: this.applno,
      //   userId: localStorage.getItem('empNo'),
      //   tableName: 'EL_CUSTOMER_INFO',
      //   columnName: 'CURR_JOB_MONTH',
      //   originalValue: this.originalData.currJobMonth,
      //   currentValue: this.currJobMonth,
      //   transAPname: '基本資料',
      // },
    )
    jsonObject['content'] = content;
    
    this.childscn5Service.insertHistory(jsonObject).subscribe(data => {
      msg = data.rspMsg;
    });
  }

  save() {
    let msg = '';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['custId'] = this.cuid;
    jsonObject['cuLevel1Ca'] = this.cuLevel1CaValue;
    jsonObject['cuLevel2Ca'] = this.cuLevel2CaValue;
    jsonObject['jobCodeCa'] = this.jobCodeCaValue;
    jsonObject['companyWhitelist'] = this.companyWhitelistValue;
    jsonObject['cuCpNameCa'] = this.cuCpNameCa;
    jsonObject['cuMTelOther'] = this.cuMTelOther;
    jsonObject['contactOther'] = this.contactOther;
    jsonObject['preCompNm'] = this.preCompNm;
    jsonObject['preJobTitle'] = this.preJobTitle;
    jsonObject['preJobYear'] = this.preJobYear.substring(0,2);
    // jsonObject['preJobMonth'] = this.preJobMonthValue;
    jsonObject['cuCpTelExt'] = this.cuCpTelExt;
    jsonObject['hiredDate'] = this.hiredDateValue;
    jsonObject['currJobYear'] = this.currJobYear;
    jsonObject['currJobMonth'] = this.currJobMonth;
   

    this.childscn5Service.update(jsonObject).subscribe(data => {
      msg = data.rspMsg;
      if ('success' === msg) {
        msg = '基本資料儲存成功!'
      }
    });
    this.insertHistory()
    setTimeout(() => {
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == '基本資料儲存成功!') { this.getCustomerInfo(); }
    }, 1000);
  }

  //性別代碼轉換中文
  getGender(codeVal: string): string {
    for (const data of this.genderCode) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
  //學歷代碼轉換中文
  geteducation(codeVal: string): string {
    for (const data of this.educationCode) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
  //現居裝況轉換中文
  getlivingstaus(codeVal: string): string {
    for (const data of this.livingStatusCode) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
  //現居裝況轉換中文
  getresidence(codeVal: string): string {
    for (const data of this.residenceCode) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }

  //前份工作在職轉換中文
  getprvjobyear(codeVal: string): string {
    for (const data of this.preJobYearCode) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
//目前工作年資(客戶填寫)
getcurrJobYear(codeVal: string): string {
  for (const data of this.currJobYearCode) {
    if (data.value == codeVal) {
      return data.viewValue;
      break;
    }
  }
  return codeVal;
}
  //白名單轉換中文
  // getcompanyWhitelist(codeVal: string){
  //   let jsonObject: any = {};
  //   this.applno = sessionStorage.getItem('applno');
  //   jsonObject['applno'] = this.applno;
  //   this.childscn5Service.getBigcompany(jsonObject).subscribe(data => {
  //     for (const row of data.rspBody.bigcompany) {
  //       if (row.CU_CP_TYPE1.includes(codeVal)) {
  //       
  //         this.customerInfoForm.patchValue({ COMPANY_WHITELIST: row.CU_CP_TYPE1 })

  //         this.customerInfoForm.patchValue({ COMPANY_WHITELIST : this.companyWhitelistCode[codeVal]});
          
  //       }
  //     }
  //   });
  
  // }
  getcompanyWhitelist(codeVal: string){
    for (const row of this.companyWhitelistCode) {
      if (row.value == codeVal) {
        return row.viewValue;
        break;
      }
    }
    return codeVal;
      
  
  
  }

  getSearch() {
    return this.search;
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? '此欄位必填!' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }


  //取公司白名單下拉
  getBigcompany() {
    let jsonObject: any = {};
    this.applno = sessionStorage.getItem('applno');
    jsonObject['applno'] = this.applno;
    
    this.childscn5Service.getBigcompany(jsonObject).subscribe(data => {
      
      for (const jsonObj of data.rspBody.bigcompany) {
        const codeNo = jsonObj.CU_CP_TYPE1.split(".")[0]  ;
        const desc = jsonObj.CU_CP_TYPE1;
        this.companyWhitelistCode.push({ value: codeNo, viewValue: desc, })
      }
      const codeNozz = 'ZZ';
      const desczz ='ZZ.非白名單'
      this.companyWhitelistCode.push({  value: codeNozz,viewValue:desczz,})

    });
  }
  limit(x: string,name: string ) {
    x[name] = x[name].replace(/[^/d.]/g,"");
    x = x.replace(/\D/g, '')

  }
}
