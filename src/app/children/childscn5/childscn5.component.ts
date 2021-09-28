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
  styleUrls: ['./childscn5.component.css','../../../assets/css/f01.css']
})
export class Childscn5Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private childscn5Service: Childscn5Service,
  ) { }

  cpTypeCreditCode: dateCode[] = [{ value: '1', viewValue: '測試1號' }, { value: '2', viewValue: '測試2號' }]; ;
  customerInfoForm: FormGroup = this.fb.group({
    EMAIL: ['', []],
    BIRTHDAY: ['', []],
    EDUCATION: ['', []],
    MOBILE: ['', []],
    P_TEL_CODE: ['', []],
    P_TEL: ['', []],
    P_ADDR_CODE: ['', []],
    P_ADDR: ['', []],
    H_ADDR_CODE: ['', []],
    H_ADDR: ['', []],
    H_LIVEING_STATUS: ['', []],
    H_LIVEING_YEAR: ['', []],
    CP_NO: ['', []],
    CP_NAME: ['', []],
    CP_TENURE: ['', []],
    PREVIOUS_CP_NAME: ['', []],
    PREVIOUS_CP_TITLE: ['', []],
    PREVIOUS_CP_TENURE: ['', []],
    CP_TEL_CODE: ['', []],
    CP_TEL: ['', []],
    CP_ADDR_CODE: ['', []],
    CP_ADDR: ['', []],
    CP_TITLE: ['', []],
    CP_TYPE: ['', []],
    CP_TYPE_LEVEL1: ['', []],
    CP_TYPE_LEVEL1_2: ['', []],
    CP_TITLE_NO: ['', []],
    SALARY_YEAR: ['', []],
    GPS_1: ['', []],
    GPS_2: ['', []],
    IP_ADDR_1: ['', []],
    IP_ADDR_2: ['', []],
    PHONE_MODEL_1: ['', []],
    PHONE_MODEL_2: ['', []],
    PHONE_DEVICE_ID_1: ['', []],
    PHONE_DEVICE_ID_2: ['', []],
    H_TEL_CODE: ['', []],
    H_TEL: ['', []],
    APPLY_TIME: ['', []],
    CP_TYPE_CREDIT: ['', []]
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
      console.log(data.rspBody)
      this.customerInfoForm.patchValue({ EMAIL: data.rspBody.items[0].cuEmail })
      this.customerInfoForm.patchValue({ BIRTHDAY: data.rspBody.items[0].birthday })
      this.customerInfoForm.patchValue({ EDUCATION: data.rspBody.items[0].education })
      this.customerInfoForm.patchValue({ MOBILE: data.rspBody.items[0].mobile })
      this.customerInfoForm.patchValue({ P_TEL_CODE: data.rspBody.items[0].pTelCode })
      this.customerInfoForm.patchValue({ P_TEL: data.rspBody.items[0].pTel })
      this.customerInfoForm.patchValue({ P_ADDR_CODE: data.rspBody.items[0].pAddrCode })
      this.customerInfoForm.patchValue({ P_ADDR: data.rspBody.items[0].pAddr })
      this.customerInfoForm.patchValue({ H_ADDR_CODE: data.rspBody.items[0].hAddrCode })
      this.customerInfoForm.patchValue({ H_ADDR: data.rspBody.items[0].hAddr })
      this.customerInfoForm.patchValue({ H_LIVEING_STATUS: data.rspBody.items[0].hLiveingStatus })
      this.customerInfoForm.patchValue({ H_LIVEING_YEAR: data.rspBody.items[0].hLiveingYear })
      this.customerInfoForm.patchValue({ CP_NO: data.rspBody.items[0].cpNo })
      this.customerInfoForm.patchValue({ CP_NAME: data.rspBody.items[0].cpName })
      this.customerInfoForm.patchValue({ CP_TENURE: data.rspBody.items[0].cpTenure })
      this.customerInfoForm.patchValue({ PREVIOUS_CP_NAME: data.rspBody.items[0].previousCpName })
      this.customerInfoForm.patchValue({ PREVIOUS_CP_TITLE: data.rspBody.items[0].previousCpTitle })
      this.customerInfoForm.patchValue({ PREVIOUS_CP_TENURE: data.rspBody.items[0].previousCpTenure })
      this.customerInfoForm.patchValue({ CP_TEL_CODE: data.rspBody.items[0].cpTelCode })
      this.customerInfoForm.patchValue({ CP_TEL: data.rspBody.items[0].cpTel })
      this.customerInfoForm.patchValue({ CP_ADDR_CODE: data.rspBody.items[0].cpAddrCode })
      this.customerInfoForm.patchValue({ CP_ADDR: data.rspBody.items[0].cpAddr })
      this.customerInfoForm.patchValue({ CP_TITLE: data.rspBody.items[0].cpTitle })
      this.customerInfoForm.patchValue({ CP_TYPE: data.rspBody.items[0].cpType })
      this.customerInfoForm.patchValue({ CP_TYPE_LEVEL1: data.rspBody.items[0].cpTypeLevel1 })
      this.customerInfoForm.patchValue({ CP_TYPE_LEVEL1_2: data.rspBody.items[0].cpTypeLevel12 })
      this.customerInfoForm.patchValue({ CP_TITLE_NO: data.rspBody.items[0].cpTitleNo })
      this.customerInfoForm.patchValue({ SALARY_YEAR: data.rspBody.items[0].salaryYear })
      this.customerInfoForm.patchValue({ GPS_1: data.rspBody.items[0].gps1 })
      this.customerInfoForm.patchValue({ GPS_2: data.rspBody.items[0].gps2 })
      this.customerInfoForm.patchValue({ IP_ADDR_1: data.rspBody.items[0].ipAddr1 })
      this.customerInfoForm.patchValue({ IP_ADDR_2: data.rspBody.items[0].ipAddr2 })
      this.customerInfoForm.patchValue({ PHONE_MODEL_1: data.rspBody.items[0].phoneModel1 })
      this.customerInfoForm.patchValue({ PHONE_MODEL_2: data.rspBody.items[0].phoneModel2 })
      this.customerInfoForm.patchValue({ PHONE_DEVICE_ID_1: data.rspBody.items[0].phoneDeviceId1 })
      this.customerInfoForm.patchValue({ PHONE_DEVICE_ID_2: data.rspBody.items[0].phoneDeviceId2 })
      this.customerInfoForm.patchValue({ H_TEL_CODE: data.rspBody.items[0].hTelCode })
      this.customerInfoForm.patchValue({ H_TEL: data.rspBody.items[0].hTel })
      this.customerInfoForm.patchValue({ APPLY_TIME: data.rspBody.items[0].applyTime })
      this.customerInfoForm.patchValue({ CP_TYPE_CREDIT: data.rspBody.items[0].cpTypeCredit })
    });
  }

  edit(){
  }
}
