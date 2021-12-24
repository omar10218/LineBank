import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  private search: string;
  cuLevel1CaCode: sysCode[] = [];       //徵信認列行業Level1下拉
  cuLevel1CaValue: string;              //徵信認列行業Level1
  cuLevel2CaCode: sysCode[] = [];       //徵信認列行業Level2下拉
  cuLevel2CaValue: string;              //徵信認列行業Level2
  jobCodeCaCode: sysCode[] = [];        //職業代碼下拉
  jobCodeCaValue: string;               //職業代碼
  companyWhitelistCode: sysCode[] = []; //公司是否為白名單下拉
  companyWhitelistValue: string;//公司是否為白名單
  genderCode: sysCode[] = [];           //性別下拉
  genderValue: string;                  //性別
  cuCpNameCa: string;                  //徵信確認公司名稱
  setmaterial=[];
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
    CU_RDTL: ['', []],          // 住家型態
    CU_BIRTHDAY: ['', []],      // 生日
    CU_MARRIED_STATUS: ['', []],// 婚姻
    HOUSE_OWNER: ['', []],      // 房屋所有權者
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
    CU_CP_NO: ['', []],         // 公司統編
    HIRED_DATE: ['', []],       // 到職日
    SENIORITY: ['', []],        // 年資
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
    CU_CP_NAME_CA: ['', []] // 徵信確認公司名單


  });

  ngOnInit(): void {
    console.log()
    this.companyWhitelistValue = '';
    this.search = sessionStorage.getItem('search');
    //取性別
    this.childscn5Service.getSysTypeCode('GENDER')
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.genderCode.push({ value: codeNo, viewValue: desc })
        }
      });
    //取公司白名單下拉
    this.childscn5Service.getSysTypeCode('COMPANY_WHITELIST').subscribe(data => {
      this.companyWhitelistCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.companyWhitelistCode.push({ value: codeNo, viewValue: desc })
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

    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    this.getCustomerInfo();
    console.log(this.companyWhitelistValue) 
  }

  getCustomerInfo() {

    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['custId'] = this.cuid;

    this.childscn5Service.getCustomerInfoSearch(jsonObject).subscribe(data => {
      this.setmaterial = data.rspBody.compareCompanies;
      console.log(this.setmaterial)
      console.log("111111111")
      console.log(data)
      this.customerInfoForm.patchValue({ CUCNAME: data.rspBody.items[0].cuCname })
      this.customerInfoForm.patchValue({ NATIONAL_ID: data.rspBody.items[0].nationalId })
      this.customerInfoForm.patchValue({ CU_SEX: this.getGender(data.rspBody.items[0].cuSex) })
      this.customerInfoForm.patchValue({ CU_RDTL: data.rspBody.items[0].cuRdtl })
      this.customerInfoForm.patchValue({ CU_BIRTHDAY: data.rspBody.items[0].cuBirthday })
      this.customerInfoForm.patchValue({ CU_MARRIED_STATUS: data.rspBody.items[0].cuMarriedStatus })
      this.customerInfoForm.patchValue({ HOUSE_OWNER: data.rspBody.items[0].houseOwner })
      this.customerInfoForm.patchValue({ CU_EDUCATION: data.rspBody.items[0].cuEducation })
      this.customerInfoForm.patchValue({ CU_TITLE: data.rspBody.items[0].cuTitle })
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
      this.customerInfoForm.patchValue({ CU_CP_NO: data.rspBody.items[0].cuCpNo })
      this.customerInfoForm.patchValue({ HIRED_DATE: data.rspBody.items[0].hiredDate })
      this.customerInfoForm.patchValue({ SENIORITY: data.rspBody.items[0].seniority })
      this.customerInfoForm.patchValue({ ANNUAL_INCOME: data.rspBody.items[0].annualIncome })
      this.customerInfoForm.patchValue({ CU_EMAIL: data.rspBody.items[0].cuEmail })
      this.customerInfoForm.patchValue({ CU_M_TEL: data.rspBody.items[0].cuMTel })
      this.customerInfoForm.patchValue({
        CU_LEVEL1: data.rspBody.items[0].cuLevel1 +
          data.rspBody.items[0].cuLevel2
      })
      // this.customerInfoForm.patchValue({ CU_LEVEL2: data.rspBody.items[0].cuLevel2 })
      this.customerInfoForm.patchValue({ JOB_CODE: data.rspBody.items[0].jobCode })
      this.customerInfoForm.patchValue({ CU_LEVEL1_CA: data.rspBody.items[0].cuLevel1Ca })
      this.customerInfoForm.patchValue({ CU_LEVEL2_CA: data.rspBody.items[0].cuLevel2Ca })
      this.customerInfoForm.patchValue({ JOB_CODE_CA: data.rspBody.items[0].jobCodeCa })
      this.customerInfoForm.patchValue({ COMPANY_WHITELIST: data.rspBody.items[0].companyWhitelist })
    });
  }

  // 取徵信認列行業Level2下拉
  changeLevel1Select() {
    this.cuLevel2CaCode = [];
    this.cuLevel2CaValue = '';
    this.jobCodeCaCode = [];
    this.jobCodeCaValue = '';
    let jsonObject: any = {};
    jsonObject['inducLevel1'] = this.cuLevel1CaValue;
    // const index: number = this.list.indexOf(who);
    var foo = document.getElementById('cuLevel2Ca');
    if (jsonObject['inducLevel1'] == undefined) {
      foo.style['background-color'] = '#E6E6E6';
    }
    else {
      foo.style['background-color'] = '	#FFFFFF';
    }
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

    var v00 = document.getElementById('jobCodeCa');
    if (jsonObject['inducLevel2'] == undefined || jsonObject['inducLevel2'] == "" || jsonObject['inducLevel2'] == null) {
      v00.style['background-color'] = '#E6E6E6';
    }
    else {
      v00.style['background-color'] = '	#FFFFFF';
    }
    this.f03015Service.getReturn('f03/f03015action6', jsonObject).subscribe(data => {
      for (const jsonObj of data.rspBody.items) {
        const codeNo = jsonObj['JOB_CODE'];
        const desc = jsonObj['JOB_CODE_DESC'];
        this.jobCodeCaCode.push({ value: codeNo, viewValue: desc });
        console.log(this.jobCodeCaCode)
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
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: '徵信確認公司名稱',
        currentValue: this.cuCpNameCa,
        transAPname: '基本資料',
      },
      {
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: '徵信認列行業Level1',
        currentValue: this.cuLevel1CaValue,
        transAPname: '基本資料',
      },
      {
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: '徵信認列行業Level2',
        currentValue: this.cuLevel2CaValue,
        transAPname: '基本資料',
      },
      {
        applno: this.applno,
        tableName: 'EL_CUSTOMER_INFO',
        columnName: '徵信認列職業碼',
        currentValue: this.jobCodeCaValue,
        transAPname: '基本資料',
      }
    )
    jsonObject['content'] = content;
    this.childscn5Service.insertHistory(jsonObject).subscribe(data => {
      console.log(data)
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
    console.log(jsonObject)

    this.childscn5Service.update(jsonObject).subscribe(data => {
      console.log(data)
      msg = data.rspMsg;
    });
    this.insertHistory()
    setTimeout(() => {
      const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == '延長成功') { this.getCustomerInfo(); }
    }, 1000);
  }

  getGender(codeVal: string): string {
    for (const data of this.genderCode) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }

  getSearch() {
    return this.search;
  }

}
