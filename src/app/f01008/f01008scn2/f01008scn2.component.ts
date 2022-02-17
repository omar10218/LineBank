import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { F01008addComponent } from '../f01008add/f01008add.component'
import { F01008Service } from '../f01008.service';
import { Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01008deleteComponent } from '../f01008delete/f01008delete.component'
import { F01008scn2editComponent } from './f01008scn2edit/f01008scn2edit.component';
import { Childscn26Component } from 'src/app/children/childscn26/childscn26.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { OptionsCode } from 'src/app/interface/base';

interface sysCode {
  value: string;
  viewValue: string;
}
//Jay 審核資料
@Component({
  selector: 'app-f01008scn2',
  templateUrl: './f01008scn2.component.html',
  styleUrls: ['./f01008scn2.component.css', '../../../assets/css/child.css']
})



export class F01008scn2Component implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private f01008Service: F01008Service,
    public datepipe: DatePipe,
    public pipe: DatePipe,) {
    this.JCICSource$ = this.f01008Service.JCICAddSource$.subscribe((data) => {
      if (!data.show) {
        this.set();
      }
    });
    this.JCICSource$ = this.f01008Service.JCICSource$.subscribe((data) => {
      if (!data.show) {
        this.set();
      }
    })

  }


  applno: string;
  custId: string;
  cuCName: string;
  nationalId: string;
  prodCode: string;
  applicationAmount: string;
  caApplicationAmount: string;
  purposeCode: string;

  //聯絡資訊
  cuMTel: string;
  cuHTelIno: string;
  cuHTel: string;
  cuCpTelIno: string;
  cuCpTel: string;
  cuMTelOther: string;
  contactOther: string;
  cuCpTelExt: string;

  page = 1;
  pei_page = 50;
  dataSource: Data[] = [];
  tYPE: sysCode[] = [];
  cONDITION: sysCode[] = [];
  search: string;
  ma: string;
  empNo: string;//員編
  macrSource: Data[] = [];
  showAdd: boolean = false;
  showEdit: boolean = false;
  Sendcheck: string;
  jaicSource: Data[] = [];
  contractArry: Data[] = [];
  block: boolean = false;
  jcicNumb = 0;
  level: string;
  lv: string;
  sortArry = ['ascend', 'descend']
  quota: string;//額度
  repayment: string;//還款
  CreditInterestPeriodSource: Data[] = [];//多階利率
  //判斷是否更新表單
  JCICSource$: Subscription;
  creditResultCode: OptionsCode[] = [];//核決結果下拉選單
  periodTypeCode: OptionsCode[] = [];//期別下拉選單
  interestTypeCode: OptionsCode[] = [];//利率型態下拉選單
  interestCode: OptionsCode[] = [];//基準利率型態下拉選單
  creditResult: string = '';
  ResultCode: OptionsCode[] = [];//審核結果下拉選單
  resulet: string = '';
  ngOnInit(): void {
    this.lv = sessionStorage.getItem('level');
    sessionStorage.setItem('afterResult', '');
    this.applno = sessionStorage.getItem('applno');
    // this.applno = "20211125A00002";
    this.empNo = localStorage.getItem("empNo");
    this.level = sessionStorage.getItem('stepName').split('t')[1];
    this.set();//初始查詢
    this.tYPE.push({ value: '1', viewValue: '公司電話' })
    this.tYPE.push({ value: '2', viewValue: '手機號碼' })
    this.tYPE.push({ value: '3', viewValue: '住家號碼' })
    this.tYPE.push({ value: '4', viewValue: '其他' })

    this.cONDITION.push({ value: '1', viewValue: '本人接' })
    this.cONDITION.push({ value: '2', viewValue: '他人接' })
    this.cONDITION.push({ value: '3', viewValue: '無人接' })
    this.cONDITION.push({ value: '4', viewValue: '其他(備註)' })

    this.search = sessionStorage.getItem('search');

    this.f01008Service.getSysTypeCode('CREDIT_RESULT')//核決結果下拉選單
      .subscribe(data => {
        this.creditResultCode.push({ value: '', viewValue: '請選擇' });
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;

          if (this.level == 'L4') {
            if (codeNo == 'W') {
              this.creditResultCode.push({ value: codeNo, viewValue: desc });
            }
          } else if (this.level == 'L3') {
            if (codeNo == 'C' || codeNo == 'D') {
              this.creditResultCode.push({ value: codeNo, viewValue: desc });
            }
          } else {
            if (codeNo == 'A' || codeNo == 'D') {
              this.creditResultCode.push({ value: codeNo, viewValue: desc });
            }
          }
        }
      });
    this.ResultCode.push({ value: '', viewValue: '請選擇' })
    this.ResultCode.push({ value: 'A', viewValue: '核准' })
    this.ResultCode.push({ value: 'D', viewValue: '婉拒' })
    this.getSearch();

  }
  test() {
    console.log(this.jcicNumb)
  }
  add() //新增
  {
    this.showAdd = !this.showAdd;
    this.f01008Service.setJCICAddSource({
      minHeight: '70vh',
      width: '50%',
      show: this.showAdd,
      applno: this.applno,//案件編號
      // CON_TYPE_Code: this.CON_TYPE_Code,//聯絡方式下拉選單
      CON_TYPE: '',//聯絡方式
      // TEL_CONDITION_Code: this.TEL_CONDITION_Code,//電話狀況下拉選單
      TEL_CONDITION: '',//電話狀況
      // TEL_CHECK_Code: this.TEL_CHECK_Code,//電話種類下拉選單
      TEL_CHECK: '',//電話種類
      // HOURS_Code: this.HOURS_Code,//時下拉選單
      HOURS: '',//時種類
      // MINUTES_Code: this.MINUTES_Code,//分下拉選單
      MINUTES: '',//分種類
      PHONE: '',//手機/市話
      CON_MEMO: '',//備註
      CALLOUT_DATE: '',//設定下次照會時間
      CALLOUT_SETTIME: '',//確認時間
      CALLOUT_EMPNO: this.empNo,//徵信員編

    })
  }
  //編輯
  startEdit(ID: string, CON_TYPE: string, CON_MEMO: string, PHONE: string, TEL_CONDITION: string, CALLOUT_SETTIME: string, CALLOUT_DATE: string) {
    this.showEdit = !this.showEdit;
    this.f01008Service.setJCICSource({
      minHeight: '70vh',
      width: '50%',
      show: this.showEdit,
      applno: this.applno,//案件編號
      // CON_TYPE_Code: this.CON_TYPE_Code,//聯絡方式下拉選單
      CON_TYPE: CON_TYPE,//聯絡方式
      // TEL_CONDITION_Code: this.TEL_CONDITION_Code,//電話狀況下拉選單
      TEL_CONDITION: TEL_CONDITION,//電話狀況
      // TEL_CHECK_Code: this.TEL_CHECK_Code,//電話種類下拉選單
      // TEL_CHECK: TEL_CHECK,//電話種類
      // HOURS_Code: this.HOURS_Code,//時下拉選單
      HOURS: this.datepipe.transform(CALLOUT_DATE, 'HH'),//時
      // MINUTES_Code: this.MINUTES_Code,//分下拉選單
      MINUTES: this.datepipe.transform(CALLOUT_DATE, 'mm'),//分
      PHONE: PHONE,//手機/市話
      CON_MEMO: CON_MEMO,//備註RF
      CALLOUT_DATE: CALLOUT_DATE,//設定下次照會時間
      ID: ID,//java用row ID
      CALLOUT_SETTIME: CALLOUT_SETTIME,//確認時間
      CALLOUT_EMPNO: this.empNo,//徵信員編
    });
  }
  getSearch() //判斷是否鎖按鈕
  {
    if(this.lv =='D2')
    {
      return 'Y'
    }
    // return this.search;
    return 'N';
  }
  set() //查詢
  {
    let jsonObject: any = {};
    let url = 'f01/f01008scn2';
    jsonObject['applno'] = this.applno;
    jsonObject['page'] = this.page;
    jsonObject['pei_page'] = this.pei_page;
    this.f01008Service.getSysTypeCode('PERIOD_TYPE')//期別下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.periodTypeCode.push({ value: codeNo, viewValue: desc })
        }
        // this.periodType = '1';
      });
    this.f01008Service.getSysTypeCode('INTEREST_TYPE')//利率型態下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.interestTypeCode.push({ value: codeNo, viewValue: desc })
        }
      });
    this.f01008Service.getSysTypeCode('INTEREST_CODE')//基準利率型態下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.interestCode.push({ value: codeNo, viewValue: desc })
        }
      });
    this.f01008Service.f01008scn2(jsonObject, url).subscribe(data => {
      console.log(data)
      if (data.rspBody.list != null) {
        this.dataSource = data.rspBody.list;
      }
      this.contractArry = data.rspBody.CfmContractRcdList;
      this.macrSource = data.rspBody.creditmemoList;
      this.jaicSource = data.rspBody.creditMainList;
      this.CreditInterestPeriodSource = data.rspBody.creditInterestPeriodList;
      for (const j of data.rspBody.creditMainList) {
        sessionStorage.setItem('afterResult', j.afterResult);

        if (j.afterResult != '' && j.afterResult != null) {
          this.resulet = j.afterResult;
        }
        this.quota = j.approveAmt;
        this.repayment = j.lowestPayRate;
        this.creditResult = j.creditResult;
        if (j.researchNum != null) {

          sessionStorage.setItem('jcicNumb', j.researchNum);
        }
        else {
          sessionStorage.setItem('jcicNumb', '0');
        }

      }
      for (const jsonObj of data.rspBody.conType) {
        this.tYPE.push({ value: jsonObj.codeNo, viewValue: jsonObj.codeDesc })
      }
      for (const js of data.rspBody.telCondition) {
        this.cONDITION.push({ value: js.codeNo, viewValue: js.codeDesc })
      }
      for (const ii of data.rspBody.creditmemoList) {
        if (ii.CREDITLEVEL == this.lv && ii.CREDITUSER.includes(this.empNo)) {
          this.ma = ii.CREDITACTION;
        }

      }

      //CreditAuditinfo
      if (data.rspBody.CreditAuditinfoList.length > 0) {
        this.cuCName = data.rspBody.CreditAuditinfoList[0].cuCname;
        this.custId = data.rspBody.CreditAuditinfoList[0].custId;
        this.nationalId = data.rspBody.CreditAuditinfoList[0].nationalId;
        this.prodCode = data.rspBody.CreditAuditinfoList[0].prodCode;
        this.applicationAmount = data.rspBody.CreditAuditinfoList[0].applicationAmount == null ? '' : this.toCurrency(data.rspBody.CreditAuditinfoList[0].applicationAmount.toString());
        this.caApplicationAmount = data.rspBody.CreditAuditinfoList[0].applicationAmount == null ? '' : this.toCurrency(data.rspBody.CreditAuditinfoList[0].applicationAmount.toString());
        this.purposeCode = data.rspBody.CreditAuditinfoList[0].purposeCode;
      }

      //CustomerInfo
      if (data.rspBody.elCustomerInfoList.length > 0) {
        this.cuMTel= data.rspBody.elCustomerInfoList[0].cuMTel;
        this.cuHTelIno= data.rspBody.elCustomerInfoList[0].cuHTelIno;
        this.cuHTel= data.rspBody.elCustomerInfoList[0].cuHTel;
        this.cuCpTelIno= data.rspBody.elCustomerInfoList[0].cuCpTelIno;
        this.cuCpTel= data.rspBody.elCustomerInfoList[0].cuCpTel;
        this.cuMTelOther= data.rspBody.elCustomerInfoList[0].cuMTelOther;
        this.contactOther= data.rspBody.elCustomerInfoList[0].contactOther;
        this.cuCpTelExt= data.rspBody.elCustomerInfoList[0].cuCpTelExt;
      }
    })
  }

  getOptionDesc(option: sysCode[], codeVal: string): string {
    for (const data of option) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
  //刪除
  deleteItem(ID: string, CON_TYPE: string, CON_MEMO: string, PHONE: string, TEL_CONDITION: string, CALLOUT_SETTIME: string, CALLOUT_DATE: string) {
    const dialogRef = this.dialog.open(F01008deleteComponent, {
      minHeight: '70vh',
      width: '70%',
      data: {
        show: this.showEdit,
        applno: this.applno,//案件編號
        CON_TYPE: CON_TYPE,//聯絡方式
        TEL_CONDITION: TEL_CONDITION,//電話狀況
        HOURS: this.datepipe.transform(CALLOUT_DATE, 'HH'),//時
        MINUTES: this.datepipe.transform(CALLOUT_DATE, 'mm'),//分
        PHONE: PHONE,//手機/市話
        CON_MEMO: CON_MEMO,//備註
        CALLOUT_DATE: CALLOUT_DATE,//設定下次照會時間
        ID: ID,//java用row ID
        CALLOUT_SETTIME: CALLOUT_SETTIME,//確認時間
        CALLOUT_EMPNO: this.empNo,//徵信員編
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'success' || result === 1) {
        setTimeout(() => {
          this.set();
          // alert("123")
        }, 500);
      }
    });
  }
  macr()//註記新增
  {
    let jsonObject: any = {};
    let url = 'f01/f01008scn2action4';
    jsonObject['applno'] = this.applno;
    jsonObject['userId'] = this.empNo;
    jsonObject['creditaction'] = this.ma;
    jsonObject['creditlevel'] = this.lv;
    this.block = true;
    this.f01008Service.f01008scn2(jsonObject, url).subscribe(data => {
      if (data.rspCode === '0000' || data.rspMsg === '儲存成功') {
        this.ma = '';
        this.block = false;
        this.refresh();
      }
    })
  }
  edit(ID: string, CREDITACTION: string)//註記編輯
  {
    const dialogRef = this.dialog.open(F01008scn2editComponent, {
      minHeight: '70vh',
      width: '50%',
      panelClass: 'mat-dialog-transparent',
      data: {
        creditaction: CREDITACTION,
        applno: this.applno,
        empNo: this.empNo,
        rowId: ID
      }
    })
    dialogRef.afterClosed().subscribe(result => {

      if (result.event == 'success' || result == 1) {
        this.set();
      }

    })
  }
  storageSeve()//暫存
  {
    sessionStorage.setItem('afterResult', this.resulet);
  }
  dataSeve(i: string)
   {
    var researchDate = '';
    researchDate =  researchDate=''? '':this.pipe.transform(new Date(i), 'yyyyMMdd');
    sessionStorage.setItem('researchDate', researchDate);


  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex } = params;
    console.log(params)
  }
  Serial(e: string)//序號排序
  {
    this.dataSource = e === 'ascend' ? this.dataSource.sort(
      (a, b) => a.CALLOUT_SETTIME.localeCompare(b.CALLOUT_SETTIME)) : this.dataSource.sort((a, b) => b.CALLOUT_SETTIME.localeCompare(a.CALLOUT_SETTIME))
  }

  transDate(value: string): string {
    console.log(this.datepipe.transform(new Date(value), "yyyy-MM-dd "))
    return this.datepipe.transform(new Date(value), "yyyy-MM-dd ");
  }
  change(value: any, valueName: string, index: string) {
    if (index != '') {
      sessionStorage.setItem(valueName + index, value);
    } else {
      sessionStorage.setItem(valueName, value);
    }
  }

  //Level轉換中文
  changeLevel(level:string){
    if ( level == 'L4' ) {
      return "文審"
    } else if ( level == 'L2' ) {
      return "授信"
    } else if ( level == 'L3' ) {
      return "徵信"
    } else if ( level == 'L1' ) {
      return "授信覆核"
    } else if ( level == 'L0' ) {
      return "主管"
    } else if ( level == 'D2' ) {
      return "產生合約前回查"
    } else if ( level == 'D1' ) {
      return "產生合約前覆核"
    } else if ( level == 'S2' ) {
      return "風管處處長"
    } else if ( level == 'S1' ) {
      return "總經理"
    }
  }
  disabledDate(time) {
    return time.getTime() < Date.now() - 8.64e7;
  }

  getStyle(value: string) {
    // value = this.toNumber(value);
    value = value != null ? value.replace(',', '') : value;
    return {
      'text-align': this.isNumber(value) ? 'right' : 'left'
    }
  }

  isNumber(value: any) { return /^-?[\d.]+(?:e-?\d+)?$/.test(value); }

  //+逗號
  toCurrency(amount: string) {
    return amount != null ? amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : amount;
  }

  refresh()
  {
    this.macrSource = [];
    let jsonObject: any = {};
    let url = 'f01/f01008scn2';
    jsonObject['applno'] = this.applno;
    jsonObject['page'] = this.page;
    jsonObject['pei_page'] = this.pei_page;
    this.f01008Service.f01008scn2(jsonObject, url).subscribe(data => {
      this.macrSource = data.rspBody.creditmemoList;
    for (const ii of data.rspBody.creditmemoList) {
      if (ii.CREDITLEVEL == this.lv && ii.CREDITUSER.includes(this.empNo))
      {
        this.ma = ii.CREDITACTION;
      }

    }
  })

  }
}


