import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Childscn5Service } from './childscn5.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn5',
  templateUrl: './childscn5.component.html',
  styleUrls: ['./childscn5.component.css','../../../assets/css/child.css']
})
export class Childscn5Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private childscn5Service: Childscn5Service,
  ) { }

  // cpTypeCreditCode: dateCode[] = [{ value: '1', viewValue: '測試1號' }, { value: '2', viewValue: '測試2號' }]; ;
  customerInfoForm: FormGroup = this.fb.group({
    CUCNAME: ['', []],          //中文姓名
    NATIONAL_ID: ['', []],      //身分證字號
    CU_SEX: ['', []],           //性別
    CU_RDTL: ['', []],          //住家型態
    CU_BIRTHDAY: ['', []],      //生日
    CU_MARRIED_STATUS: ['', []],//婚姻
    HOUSE_OWNER: ['', []],      //房屋所有權者
    CU_EDUCATION: ['', []],     //學歷
    CU_H_ADDR_CODE: ['', []],   //住宅郵區
    CU_H_ADDR1: ['', []],       //住宅地址1
    CU_H_ADDR2: ['', []],       //住宅地址2
    CU_H_TEL_INO: ['', []],     //住宅電話區碼
    CU_H_TEL: ['', []],         //住宅電話
    CU_CP_ADDR_CODE: ['', []],  //公司郵區
    CU_CP_ADDR1: ['', []],      //公司地址1
    CU_CP_ADDR2: ['', []],      //公司地址2
    CU_CP_TEL_INO: ['', []],    //公司電話區碼
    CU_CP_TEL: ['', []],        //公司電話
    CU_CP_NAME: ['', []],       //公司名稱
    CU_CP_NO: ['', []],         //公司統編
    HIRED_DATE: ['', []],       //到職日
    SENIORITY: ['', []],        //年資
    ANNUAL_INCOME: ['', []],    //年收入
    CU_EMAIL: ['', []],         //eMail
    CU_M_TEL: ['', []],         //行動電話
    CU_TYPE: ['', []],          //行職業
    CU_TITLE: ['', []],         //職稱
  });

  private applno: string;
  private cuid: string;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    this.getCustomerInfo();
  }

  getCustomerInfo(){
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'CUSTOMER_INFO');
    this.childscn5Service.getCustomerInfoSearch(formdata).subscribe(data => {
      console.log(data)
      this.customerInfoForm.patchValue({ CUCNAME: data.rspBody.items[0].cuCname })
      this.customerInfoForm.patchValue({ NATIONAL_ID: data.rspBody.items[0].nationalId })
      this.customerInfoForm.patchValue({ CU_SEX: data.rspBody.items[0].cuSex })
      this.customerInfoForm.patchValue({ CU_RDTL: data.rspBody.items[0].cuRdtl })
      this.customerInfoForm.patchValue({ CU_BIRTHDAY: data.rspBody.items[0].cuBirthday })
      this.customerInfoForm.patchValue({ CU_MARRIED_STATUS: data.rspBody.items[0].cuMarriedStatus })
      this.customerInfoForm.patchValue({ HOUSE_OWNER: data.rspBody.items[0].houseOwner })
      this.customerInfoForm.patchValue({ CU_EDUCATION: data.rspBody.items[0].cuEducation })
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
      this.customerInfoForm.patchValue({ CU_TYPE: data.rspBody.items[0].cuType })
      this.customerInfoForm.patchValue({ CU_TITLE: data.rspBody.items[0].cuTitle })
    });
  }

  edit(){
  }
}
