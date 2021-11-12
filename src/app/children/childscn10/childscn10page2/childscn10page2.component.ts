import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Childscn10Service } from '../childscn10.service';
import { MatTableDataSource } from '@angular/material/table';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n'

@Component({
  selector: 'app-childscn10page2',
  templateUrl: './childscn10page2.component.html',
  styleUrls: ['./childscn10page2.component.css', '../../../../assets/css/child.css']
})
export class Childscn10page2Component implements OnInit {



  constructor(
    private fb: FormBuilder,
    private childscn10Service: Childscn10Service,
    private nzI18nService: NzI18nService) {
    this.nzI18nService.setLocale(zh_TW)
  }

  private applno: string;
  private search: string;
  fmData = new MatTableDataSource<any>();////DBR收支表資料 授信

  test7 = 10000
  test1 = "1"; test2 = "2"; test3 = "3";
  test4 = "4"; test5 = "5"; test6 = "6";

  dss2Source1 = new MatTableDataSource<any>();//table資料
  dss2Source2 = new MatTableDataSource<any>();//table資料
  dss2Source3 = new MatTableDataSource<any>();//table資料

  //策略1
  EL_DSS2_UNDW_LIST1 = new MatTableDataSource<any>();//徵審代碼
  EL_DSS2_CFC_LIMIT1 = new MatTableDataSource<any>();//試算額度策略
  EL_DSS2_STRGY_SRATE1 = new MatTableDataSource<any>();//試算利率(多階)
  EL_DSS2_STRGY_MERG1 = new MatTableDataSource<any>();//試算授信策略_債整明細
  //策略2
  EL_DSS2_STRGY_SRATE2 = new MatTableDataSource<any>();//試算利率(多階)
  EL_DSS2_STRGY_MERG2 = new MatTableDataSource<any>();//試算授信策略_債整明細
  //策略3
  EL_DSS2_STRGY_SRATE3 = new MatTableDataSource<any>();//試算利率(多階)
  EL_DSS2_STRGY_MERG3 = new MatTableDataSource<any>();//試算授信策略_債整明細

  dss2Form1: FormGroup = this.fb.group({
    //系統決策
    SYSFLOWCD: ['', []],//系統流程
    RESLTCD: ['', []],//決策結果

    //案件資訊
    CALV: ['', []],//案件等級
    GOODBEHAV_MORT: ['', []],//往來優質特徵註記(房貸)
    GOODBEHAV_CC: ['', []],//往來優質特徵註記(信用卡)
    OCUPATN_CUST_STGP1: ['', []],//策略客群1(客戶填寫)
    OCUPATN_CUST_STGP2: ['', []],//策略客群2(客戶填寫)
    OCUPATN_CUST_GP: ['', []],//行職業代碼分群(客戶填寫)
    OCUPATN_CUST_STGP1_PM: ['', []],//策略客群1(客戶填寫) (PM分群)
    OCUPATN_CUST_STGP2_PM: ['', []],//策略客群2(客戶填寫) (PM分群)
    OCUPATN_CUST_GP_PM: ['', []],//行職業代碼分群(客戶填寫) (PM分群)
    CUST_TAG: ['', []],//客群標籤
    CUST_TAG_DESC: ['', []],//客群標籤說明

    //策略模板資訊
    STRGY_MDUL: ['', []],//試算授信策略模板分類
    STRGY_MDUL_ATVDT: ['', []],//授信策略模板生效日期時間
    STRGY_RATE_ATVDT: ['', []],//利率模板生效日期時間

    //授信及產品條件
    //1.2.3共用
    STRGY_PRDCD: ['', []],//產品名稱
    STRGY_APRFRJ: ['', []],//試算授信策略_准駁
    STRGY_PERIOD_MIN: ['', []],//期數最小值
    STRGY_PERIOD_MAX: ['', []],//期數最大值
    //期數=STRGY_PERIOD_MIN ~ STRGY_PERIOD_MAX
    STRGY_LIMIT_REVING: ['', []],//循環信貸額度
    STRGY_LIMIT_INST: ['', []],//分期信貸金額
    STRGY_LIMIT_CASH: ['', []],//分期信貸-現金額度
    STRGY_LIMIT_MERG: ['', []],//分期信貸-債整額度
    STRGY_MINPAYRT: ['', []],//每月最低還款比例(僅限循環信貸)
    STRGY_DISB_BTCR_YN: ['', []],//結帳日至還款日間客戶可申請動撥Y
    STRGY_RL_DISB_THRHLD: ['', []],//循環信貸簡易檢核動撥金額門檻
    STRGY_ORIGINFEE: ['', []],//開辦費(首次簽約用)
    STRGY_LOANEXTFEE: ['', []],//帳戶管理費(續約用)

    //額度限額資訊 3種方案相同
    LIMIT_DBR: ['', []],//限額_DBR
    LIMIT_PRDMUE: ['', []],//限額_產品MUE
    LIMIT_LAW32: ['', []],//限額_本行利害關係人(銀行法第32條)
    LIMIT_LAW33_UNS: ['', []],//限額_同一自然人無擔保授信限額(銀行法第33條)
    LIMIT_PROD_MAX: ['', []],//限額_產品/專案額度上限
    LIMIT_PROD_MIN: ['', []],//限額_產品/專案額度下限
    LIMIT_CUSTAPPLY: ['', []],//限額_客戶申請金額
    LIMIT_DTI: ['', []],//限額_月付收支比
    LIMIT_NIDMUE: ['', []],//限額_歸戶MUE
    LIMIT_MERGEAMT: ['', []],//限額_債整額度
    STRGY_NIDMUEX: ['', []],//試算授信策略_歸戶MUE倍數
    STRGY_NIDMUECAP: ['', []],//試算授信策略_歸戶MUECAP
    STRGY_PRDMUEX: ['', []],//試算授信策略_產品MUE倍數
    STRGY_PRDMUEXCAP: ['', []],//試算授信策略_產品MUECAP
    STRGY_DBRX: ['', []],//試算授信策略_DBR限額倍數
    STRGY_DTIX: ['', []],//試算授信策略_DTI參數

  });

  dss2Form2: FormGroup = this.fb.group({

    //授信及產品條件
    //1.2.3共用
    STRGY_PRDCD: ['', []],//產品名稱
    STRGY_APRFRJ: ['', []],//試算授信策略_准駁
    STRGY_PERIOD_MIN: ['', []],//期數最小值
    STRGY_PERIOD_MAX: ['', []],//期數最大值
    //期數=STRGY_PERIOD_MIN ~ STRGY_PERIOD_MAX
    STRGY_LIMIT_REVING: ['', []],//循環信貸額度
    STRGY_LIMIT_INST: ['', []],//分期信貸金額
    STRGY_LIMIT_CASH: ['', []],//分期信貸-現金額度
    STRGY_LIMIT_MERG: ['', []],//分期信貸-債整額度
    STRGY_MINPAYRT: ['', []],//每月最低還款比例(僅限循環信貸)
    STRGY_DISB_BTCR_YN: ['', []],//結帳日至還款日間客戶可申請動撥Y
    STRGY_RL_DISB_THRHLD: ['', []],//循環信貸簡易檢核動撥金額門檻
    STRGY_ORIGINFEE: ['', []],//開辦費(首次簽約用)
    STRGY_LOANEXTFEE: ['', []],//帳戶管理費(續約用)
    //2.3用
    STRGY_EXPIRDATE: ['', []],//效期截止日

    //額度限額資訊 3種方案相同
    LIMIT_DBR: ['', []],//限額_DBR
    LIMIT_PRDMUE: ['', []],//限額_產品MUE
    LIMIT_LAW32: ['', []],//限額_本行利害關係人(銀行法第32條)
    LIMIT_LAW33_UNS: ['', []],//限額_同一自然人無擔保授信限額(銀行法第33條)
    LIMIT_PROD_MAX: ['', []],//限額_產品/專案額度上限
    LIMIT_PROD_MIN: ['', []],//限額_產品/專案額度下限
    LIMIT_CUSTAPPLY: ['', []],//限額_客戶申請金額
    LIMIT_DTI: ['', []],//限額_月付收支比
    LIMIT_NIDMUE: ['', []],//限額_歸戶MUE
    LIMIT_MERGEAMT: ['', []],//限額_債整額度
    STRGY_NIDMUEX: ['', []],//試算授信策略_歸戶MUE倍數
    STRGY_NIDMUECAP: ['', []],//試算授信策略_歸戶MUECAP
    STRGY_PRDMUEX: ['', []],//試算授信策略_產品MUE倍數
    STRGY_PRDMUEXCAP: ['', []],//試算授信策略_產品MUECAP
    STRGY_DBRX: ['', []],//試算授信策略_DBR限額倍數
    STRGY_DTIX: ['', []],//試算授信策略_DTI參數

  });

  dss2Form3: FormGroup = this.fb.group({
    //授信及產品條件
    //1.2.3共用
    STRGY_PRDCD: ['', []],//產品名稱
    STRGY_APRFRJ: ['', []],//試算授信策略_准駁
    STRGY_PERIOD_MIN: ['', []],//期數最小值
    STRGY_PERIOD_MAX: ['', []],//期數最大值
    //期數=STRGY_PERIOD_MIN ~ STRGY_PERIOD_MAX
    STRGY_LIMIT_REVING: ['', []],//循環信貸額度
    STRGY_LIMIT_INST: ['', []],//分期信貸金額
    STRGY_LIMIT_CASH: ['', []],//分期信貸-現金額度
    STRGY_LIMIT_MERG: ['', []],//分期信貸-債整額度
    STRGY_MINPAYRT: ['', []],//每月最低還款比例(僅限循環信貸)
    STRGY_DISB_BTCR_YN: ['', []],//結帳日至還款日間客戶可申請動撥Y
    STRGY_RL_DISB_THRHLD: ['', []],//循環信貸簡易檢核動撥金額門檻
    STRGY_ORIGINFEE: ['', []],//開辦費(首次簽約用)
    STRGY_LOANEXTFEE: ['', []],//帳戶管理費(續約用)
    //2.3用
    STRGY_EXPIRDATE: ['', []],//效期截止日

    //額度限額資訊 3種方案相同
    LIMIT_DBR: ['', []],//限額_DBR
    LIMIT_PRDMUE: ['', []],//限額_產品MUE
    LIMIT_LAW32: ['', []],//限額_本行利害關係人(銀行法第32條)
    LIMIT_LAW33_UNS: ['', []],//限額_同一自然人無擔保授信限額(銀行法第33條)
    LIMIT_PROD_MAX: ['', []],//限額_產品/專案額度上限
    LIMIT_PROD_MIN: ['', []],//限額_產品/專案額度下限
    LIMIT_CUSTAPPLY: ['', []],//限額_客戶申請金額
    LIMIT_DTI: ['', []],//限額_月付收支比
    LIMIT_NIDMUE: ['', []],//限額_歸戶MUE
    LIMIT_MERGEAMT: ['', []],//限額_債整額度
    STRGY_NIDMUEX: ['', []],//試算授信策略_歸戶MUE倍數
    STRGY_NIDMUECAP: ['', []],//試算授信策略_歸戶MUECAP
    STRGY_PRDMUEX: ['', []],//試算授信策略_產品MUE倍數
    STRGY_PRDMUEXCAP: ['', []],//試算授信策略_產品MUECAP
    STRGY_DBRX: ['', []],//試算授信策略_DBR限額倍數
    STRGY_DTIX: ['', []],//試算授信策略_DTI參數

  });

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.getDSS21();
    this.getDSS22();
    this.getDSS23();
    this.getDBR_DTI();
  }

  getSearch(): string {
    return this.search;
  }
  getApplno(): String {
    return this.applno;
  }

  //取決策1Table
  getDSS21() {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10action3';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['strgy'] = "1";
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      // console.log('data dss2Form1');
      // console.log(data);
      //系統決策
      this.dss2Form1.patchValue({ SYSFLOWCD: data.rspBody.DSS2[0].SYSFLOWCD })//系統流程
      this.dss2Form1.patchValue({ RESLTCD: data.rspBody.DSS2[0].RESLTCD })//決策結果

      //案件資訊
      this.dss2Form1.patchValue({ CALV: data.rspBody.DSS2[0].CALV })//案件等級
      this.dss2Form1.patchValue({ GOODBEHAV_MORT: data.rspBody.DSS2[0].GOODBEHAV_MORT })//往來優質特徵註記(房貸)
      this.dss2Form1.patchValue({ GOODBEHAV_CC: data.rspBody.DSS2[0].GOODBEHAV_CC })//往來優質特徵註記(信用卡)
      this.dss2Form1.patchValue({ OCUPATN_CUST_STGP1: data.rspBody.DSS2[0].OCUPATN_CUST_STGP1 })//策略客群1(客戶填寫)
      this.dss2Form1.patchValue({ OCUPATN_CUST_STGP2: data.rspBody.DSS2[0].OCUPATN_CUST_STGP2 })//策略客群2(客戶填寫)
      this.dss2Form1.patchValue({ OCUPATN_CUST_GP: data.rspBody.DSS2[0].OCUPATN_CUST_GP })//行職業代碼分群(客戶填寫)
      this.dss2Form1.patchValue({ OCUPATN_CUST_STGP1_PM: data.rspBody.DSS2[0].OCUPATN_CUST_STGP1_PM })//策略客群1(客戶填寫) (PM分群)
      this.dss2Form1.patchValue({ OCUPATN_CUST_STGP2_PM: data.rspBody.DSS2[0].OCUPATN_CUST_STGP2_PM })//策略客群2(客戶填寫) (PM分群)
      this.dss2Form1.patchValue({ OCUPATN_CUST_GP_PM: data.rspBody.DSS2[0].OCUPATN_CUST_GP_PM })//行職業代碼分群(客戶填寫) (PM分群)
      this.dss2Form1.patchValue({ CUST_TAG: data.rspBody.DSS2[0].CUST_TAG })//客群標籤
      this.dss2Form1.patchValue({ CUST_TAG_DESC: data.rspBody.DSS2[0].CUST_TAG_DESC })//客群標籤說明

      //策略模板資訊
      this.dss2Form1.patchValue({ STRGY_MDUL: data.rspBody.DSS2[0].STRGY_MDUL })//試算授信策略模板分類
      this.dss2Form1.patchValue({ STRGY_MDUL_ATVDT: data.rspBody.DSS2[0].STRGY_MDUL_ATVDT })//授信策略模板生效日期時間
      this.dss2Form1.patchValue({ STRGY_RATE_ATVDT: data.rspBody.DSS2[0].STRGY_RATE_ATVDT })//利率模板生效日期時間

      //授信及產品條件
      //1.2.3共用
      this.dss2Form1.patchValue({ STRGY_PRDCD: data.rspBody.DSS2STRGY[0].STRGY_PRDCD })//產品名稱
      this.dss2Form1.patchValue({ STRGY_APRFRJ: data.rspBody.DSS2STRGY[0].STRGY_APRFRJ })//試算授信策略_准駁
      this.dss2Form1.patchValue({ STRGY_PERIOD_MIN: data.rspBody.DSS2STRGY[0].STRGY_PERIOD_MIN })//期數最小值
      this.dss2Form1.patchValue({ STRGY_PERIOD_MAX: data.rspBody.DSS2STRGY[0].STRGY_PERIOD_MAX })//期數最大值
      //期數=STRGY_PERIOD_MIN ~ STRGY_PERIOD_MAX
      this.dss2Form1.patchValue({ STRGY_LIMIT_REVING: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_REVING })//循環信貸額度
      this.dss2Form1.patchValue({ STRGY_LIMIT_INST: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_INST })//分期信貸金額
      this.dss2Form1.patchValue({ STRGY_LIMIT_CASH: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_CASH })//分期信貸-現金額度
      this.dss2Form1.patchValue({ STRGY_LIMIT_MERG: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_MERG })//分期信貸-債整額度
      this.dss2Form1.patchValue({ STRGY_MINPAYRT: data.rspBody.DSS2STRGY[0].STRGY_MINPAYRT })//每月最低還款比例(僅限循環信貸)
      this.dss2Form1.patchValue({ STRGY_DISB_BTCR_YN: data.rspBody.DSS2STRGY[0].STRGY_DISB_BTCR_YN })//結帳日至還款日間客戶可申請動撥Y
      this.dss2Form1.patchValue({ STRGY_RL_DISB_THRHLD: data.rspBody.DSS2STRGY[0].STRGY_RL_DISB_THRHLD })//循環信貸簡易檢核動撥金額門檻
      this.dss2Form1.patchValue({ STRGY_ORIGINFEE: data.rspBody.DSS2STRGY[0].STRGY_ORIGINFEE })//開辦費(首次簽約用)
      this.dss2Form1.patchValue({ STRGY_LOANEXTFEE: data.rspBody.DSS2STRGY[0].STRGY_LOANEXTFEE })//帳戶管理費(續約用)

      //額度限額資訊 3種方案相同
      this.dss2Form1.patchValue({ LIMIT_DBR: data.rspBody.DSS2STRGY[0].LIMIT_DBR })//限額_DBR
      this.dss2Form1.patchValue({ LIMIT_PRDMUE: data.rspBody.DSS2STRGY[0].LIMIT_PRDMUE })//限額_產品MUE
      this.dss2Form1.patchValue({ LIMIT_LAW32: data.rspBody.DSS2STRGY[0].LIMIT_LAW32 })//限額_本行利害關係人(銀行法第32條)
      this.dss2Form1.patchValue({ LIMIT_LAW33_UNS: data.rspBody.DSS2STRGY[0].LIMIT_LAW33_UNS })//限額_同一自然人無擔保授信限額(銀行法第33條)
      this.dss2Form1.patchValue({ LIMIT_PROD_MAX: data.rspBody.DSS2STRGY[0].LIMIT_PROD_MAX })//限額_產品/專案額度上限
      this.dss2Form1.patchValue({ LIMIT_PROD_MIN: data.rspBody.DSS2STRGY[0].LIMIT_PROD_MIN })//限額_產品/專案額度下限
      this.dss2Form1.patchValue({ LIMIT_CUSTAPPLY: data.rspBody.DSS2STRGY[0].LIMIT_CUSTAPPLY })//限額_客戶申請金額
      this.dss2Form1.patchValue({ LIMIT_DTI: data.rspBody.DSS2STRGY[0].LIMIT_DTI })//限額_月付收支比
      this.dss2Form1.patchValue({ LIMIT_NIDMUE: data.rspBody.DSS2STRGY[0].LIMIT_NIDMUE })//限額_歸戶MUE
      this.dss2Form1.patchValue({ LIMIT_MERGEAMT: data.rspBody.DSS2STRGY[0].LIMIT_MERGEAMT })//限額_債整額度
      this.dss2Form1.patchValue({ STRGY_NIDMUEX: data.rspBody.DSS2STRGY[0].STRGY_NIDMUEX })//試算授信策略_歸戶MUE倍數
      this.dss2Form1.patchValue({ STRGY_NIDMUECAP: data.rspBody.DSS2STRGY[0].STRGY_NIDMUECAP })//試算授信策略_歸戶MUECAP
      this.dss2Form1.patchValue({ STRGY_PRDMUEX: data.rspBody.DSS2STRGY[0].STRGY_PRDMUEX })//試算授信策略_產品MUE倍數
      this.dss2Form1.patchValue({ STRGY_PRDMUEXCAP: data.rspBody.DSS2STRGY[0].STRGY_PRDMUEXCAP })//試算授信策略_產品MUECAP
      this.dss2Form1.patchValue({ STRGY_DBRX: data.rspBody.DSS2STRGY[0].STRGY_DBRX })//試算授信策略_DBR限額倍數
      this.dss2Form1.patchValue({ STRGY_DTIX: data.rspBody.DSS2STRGY[0].STRGY_DTIX })//試算授信策略_DTI參數 注意名稱差異

      this.EL_DSS2_UNDW_LIST1.data = data.rspBody.DSS2UNDWLIST;//徵審代碼
      // console.log('this.EL_DSS2_UNDW_LIST1.data');
      // console.log(this.EL_DSS2_UNDW_LIST1.data);
      this.EL_DSS2_CFC_LIMIT1.data = data.rspBody.DSS2CFCLIMIT;//試算額度策略
      // console.log('this.EL_DSS2_CFC_LIMIT1.data');
      // console.log(this.EL_DSS2_CFC_LIMIT1.data);
      this.EL_DSS2_STRGY_SRATE1.data = data.rspBody.DSS2STRGYSRATE;//試算利率(多階)
      // console.log('this.EL_DSS2_STRGY_SRATE1.data');
      // console.log(this.EL_DSS2_STRGY_SRATE1.data);
      this.EL_DSS2_STRGY_MERG1.data = data.rspBody.DSS2STRGYMERG;//試算授信策略_債整明細
      // console.log('this.EL_DSS2_STRGY_MERG1.data');
      // console.log(this.EL_DSS2_STRGY_MERG1.data);

    });
  }
  //取決策2Table
  getDSS22() {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10action3';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['strgy'] = "2";
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      // console.log('data');
      // console.log(data);
      //系統決策
      this.dss2Form2.patchValue({ SYSFLOWCD: data.rspBody.DSS2[0].SYSFLOWCD })//系統流程
      this.dss2Form2.patchValue({ RESLTCD: data.rspBody.DSS2[0].RESLTCD })//決策結果

      //案件資訊
      this.dss2Form2.patchValue({ CALV: data.rspBody.DSS2[0].CALV })//案件等級
      this.dss2Form2.patchValue({ GOODBEHAV_MORT: data.rspBody.DSS2[0].GOODBEHAV_MORT })//往來優質特徵註記(房貸)
      this.dss2Form2.patchValue({ GOODBEHAV_CC: data.rspBody.DSS2[0].GOODBEHAV_CC })//往來優質特徵註記(信用卡)
      this.dss2Form2.patchValue({ OCUPATN_CUST_STGP1: data.rspBody.DSS2[0].OCUPATN_CUST_STGP1 })//策略客群1(客戶填寫)
      this.dss2Form2.patchValue({ OCUPATN_CUST_STGP2: data.rspBody.DSS2[0].OCUPATN_CUST_STGP2 })//策略客群2(客戶填寫)
      this.dss2Form2.patchValue({ OCUPATN_CUST_GP: data.rspBody.DSS2[0].OCUPATN_CUST_GP })//行職業代碼分群(客戶填寫)
      this.dss2Form2.patchValue({ OCUPATN_CUST_STGP1_PM: data.rspBody.DSS2[0].OCUPATN_CUST_STGP1_PM })//策略客群1(客戶填寫) (PM分群)
      this.dss2Form2.patchValue({ OCUPATN_CUST_STGP2_PM: data.rspBody.DSS2[0].OCUPATN_CUST_STGP2_PM })//策略客群2(客戶填寫) (PM分群)
      this.dss2Form2.patchValue({ OCUPATN_CUST_GP_PM: data.rspBody.DSS2[0].OCUPATN_CUST_GP_PM })//行職業代碼分群(客戶填寫) (PM分群)
      this.dss2Form2.patchValue({ CUST_TAG: data.rspBody.DSS2[0].CUST_TAG })//客群標籤
      this.dss2Form2.patchValue({ CUST_TAG_DESC: data.rspBody.DSS2[0].CUST_TAG_DESC })//客群標籤說明

      //策略模板資訊
      this.dss2Form2.patchValue({ STRGY_MDUL: data.rspBody.DSS2[0].STRGY_MDUL })//試算授信策略模板分類
      this.dss2Form2.patchValue({ STRGY_MDUL_ATVDT: data.rspBody.DSS2[0].STRGY_MDUL_ATVDT })//授信策略模板生效日期時間
      this.dss2Form2.patchValue({ STRGY_RATE_ATVDT: data.rspBody.DSS2[0].STRGY_RATE_ATVDT })//利率模板生效日期時間

      //授信及產品條件
      //1.2.3共用
      this.dss2Form2.patchValue({ STRGY_PRDCD: data.rspBody.DSS2STRGY[0].STRGY_PRDCD })//產品名稱
      this.dss2Form2.patchValue({ STRGY_APRFRJ: data.rspBody.DSS2STRGY[0].STRGY_APRFRJ })//試算授信策略_准駁
      this.dss2Form2.patchValue({ STRGY_PERIOD_MIN: data.rspBody.DSS2STRGY[0].STRGY_PERIOD_MIN })//期數最小值
      this.dss2Form2.patchValue({ STRGY_PERIOD_MAX: data.rspBody.DSS2STRGY[0].STRGY_PERIOD_MAX })//期數最大值
      //期數=STRGY_PERIOD_MIN ~ STRGY_PERIOD_MAX
      this.dss2Form2.patchValue({ STRGY_LIMIT_REVING: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_REVING })//循環信貸額度
      this.dss2Form2.patchValue({ STRGY_LIMIT_INST: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_INST })//分期信貸金額
      this.dss2Form2.patchValue({ STRGY_LIMIT_CASH: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_CASH })//分期信貸-現金額度
      this.dss2Form2.patchValue({ STRGY_LIMIT_MERG: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_MERG })//分期信貸-債整額度
      this.dss2Form2.patchValue({ STRGY_MINPAYRT: data.rspBody.DSS2STRGY[0].STRGY_MINPAYRT })//每月最低還款比例(僅限循環信貸)
      this.dss2Form2.patchValue({ STRGY_DISB_BTCR_YN: data.rspBody.DSS2STRGY[0].STRGY_DISB_BTCR_YN })//結帳日至還款日間客戶可申請動撥Y
      this.dss2Form2.patchValue({ STRGY_RL_DISB_THRHLD: data.rspBody.DSS2STRGY[0].STRGY_RL_DISB_THRHLD })//循環信貸簡易檢核動撥金額門檻
      this.dss2Form2.patchValue({ STRGY_ORIGINFEE: data.rspBody.DSS2STRGY[0].STRGY_ORIGINFEE })//開辦費(首次簽約用)
      this.dss2Form2.patchValue({ STRGY_LOANEXTFEE: data.rspBody.DSS2STRGY[0].STRGY_LOANEXTFEE })//帳戶管理費(續約用)
      //2.3用
      this.dss2Form2.patchValue({ STRGY_EXPIRDATE: data.rspBody.DSS2STRGY[0].STRGY_EXPIRDATE })//效期截止日  注意名稱差異

      //額度限額資訊 3種方案相同
      this.dss2Form2.patchValue({ LIMIT_DBR: data.rspBody.DSS2STRGY[0].LIMIT_DBR })//限額_DBR
      this.dss2Form2.patchValue({ LIMIT_PRDMUE: data.rspBody.DSS2STRGY[0].LIMIT_PRDMUE })//限額_產品MUE
      this.dss2Form2.patchValue({ LIMIT_LAW32: data.rspBody.DSS2STRGY[0].LIMIT_LAW32 })//限額_本行利害關係人(銀行法第32條)
      this.dss2Form2.patchValue({ LIMIT_LAW33_UNS: data.rspBody.DSS2STRGY[0].LIMIT_LAW33_UNS })//限額_同一自然人無擔保授信限額(銀行法第33條)
      this.dss2Form2.patchValue({ LIMIT_PROD_MAX: data.rspBody.DSS2STRGY[0].LIMIT_PROD_MAX })//限額_產品/專案額度上限
      this.dss2Form2.patchValue({ LIMIT_PROD_MIN: data.rspBody.DSS2STRGY[0].LIMIT_PROD_MIN })//限額_產品/專案額度下限
      this.dss2Form2.patchValue({ LIMIT_CUSTAPPLY: data.rspBody.DSS2STRGY[0].LIMIT_CUSTAPPLY })//限額_客戶申請金額
      this.dss2Form2.patchValue({ LIMIT_DTI: data.rspBody.DSS2STRGY[0].LIMIT_DTI })//限額_月付收支比
      this.dss2Form2.patchValue({ LIMIT_NIDMUE: data.rspBody.DSS2STRGY[0].LIMIT_NIDMUE })//限額_歸戶MUE
      this.dss2Form2.patchValue({ LIMIT_MERGEAMT: data.rspBody.DSS2STRGY[0].LIMIT_MERGEAMT })//限額_債整額度
      this.dss2Form2.patchValue({ STRGY_NIDMUEX: data.rspBody.DSS2STRGY[0].STRGY_NIDMUEX })//試算授信策略_歸戶MUE倍數
      this.dss2Form2.patchValue({ STRGY_NIDMUECAP: data.rspBody.DSS2STRGY[0].STRGY_NIDMUECAP })//試算授信策略_歸戶MUECAP
      this.dss2Form2.patchValue({ STRGY_PRDMUEX: data.rspBody.DSS2STRGY[0].STRGY_PRDMUEX })//試算授信策略_產品MUE倍數
      this.dss2Form2.patchValue({ STRGY_PRDMUEXCAP: data.rspBody.DSS2STRGY[0].STRGY_PRDMUEXCAP })//試算授信策略_產品MUECAP
      this.dss2Form2.patchValue({ STRGY_DBRX: data.rspBody.DSS2STRGY[0].STRGY_DBRX })//試算授信策略_DBR限額倍數
      this.dss2Form2.patchValue({ STRGY_DTIX: data.rspBody.DSS2STRGY[0].STRGY_DTIX })//試算授信策略_DTI參數 注意名稱差異

      this.EL_DSS2_STRGY_SRATE2.data = data.rspBody.DSS2STRGYSRATE;//試算利率(多階)
      this.EL_DSS2_STRGY_MERG2.data = data.rspBody.DSS2STRGYMERG;//試算授信策略_債整明細

    });
  }

  //取決策3Table
  getDSS23() {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10action3';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['strgy'] = "3";
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      // console.log('data');
      // console.log(data);
      //系統決策
      this.dss2Form3.patchValue({ SYSFLOWCD: data.rspBody.DSS2[0].SYSFLOWCD })//系統流程
      this.dss2Form3.patchValue({ RESLTCD: data.rspBody.DSS2[0].RESLTCD })//決策結果

      //案件資訊
      this.dss2Form3.patchValue({ CALV: data.rspBody.DSS2[0].CALV })//案件等級
      this.dss2Form3.patchValue({ GOODBEHAV_MORT: data.rspBody.DSS2[0].GOODBEHAV_MORT })//往來優質特徵註記(房貸)
      this.dss2Form3.patchValue({ GOODBEHAV_CC: data.rspBody.DSS2[0].GOODBEHAV_CC })//往來優質特徵註記(信用卡)
      this.dss2Form3.patchValue({ OCUPATN_CUST_STGP1: data.rspBody.DSS2[0].OCUPATN_CUST_STGP1 })//策略客群1(客戶填寫)
      this.dss2Form3.patchValue({ OCUPATN_CUST_STGP2: data.rspBody.DSS2[0].OCUPATN_CUST_STGP2 })//策略客群2(客戶填寫)
      this.dss2Form3.patchValue({ OCUPATN_CUST_GP: data.rspBody.DSS2[0].OCUPATN_CUST_GP })//行職業代碼分群(客戶填寫)
      this.dss2Form3.patchValue({ OCUPATN_CUST_STGP1_PM: data.rspBody.DSS2[0].OCUPATN_CUST_STGP1_PM })//策略客群1(客戶填寫) (PM分群)
      this.dss2Form3.patchValue({ OCUPATN_CUST_STGP2_PM: data.rspBody.DSS2[0].OCUPATN_CUST_STGP2_PM })//策略客群2(客戶填寫) (PM分群)
      this.dss2Form3.patchValue({ OCUPATN_CUST_GP_PM: data.rspBody.DSS2[0].OCUPATN_CUST_GP_PM })//行職業代碼分群(客戶填寫) (PM分群)
      this.dss2Form3.patchValue({ CUST_TAG: data.rspBody.DSS2[0].CUST_TAG })//客群標籤
      this.dss2Form3.patchValue({ CUST_TAG_DESC: data.rspBody.DSS2[0].CUST_TAG_DESC })//客群標籤說明

      //策略模板資訊
      this.dss2Form3.patchValue({ STRGY_MDUL: data.rspBody.DSS2[0].STRGY_MDUL })//試算授信策略模板分類
      this.dss2Form3.patchValue({ STRGY_MDUL_ATVDT: data.rspBody.DSS2[0].STRGY_MDUL_ATVDT })//授信策略模板生效日期時間
      this.dss2Form3.patchValue({ STRGY_RATE_ATVDT: data.rspBody.DSS2[0].STRGY_RATE_ATVDT })//利率模板生效日期時間

      //授信及產品條件
      //1.2.3共用
      this.dss2Form3.patchValue({ STRGY_PRDCD: data.rspBody.DSS2STRGY[0].STRGY_PRDCD })//產品名稱
      this.dss2Form3.patchValue({ STRGY_APRFRJ: data.rspBody.DSS2STRGY[0].STRGY_APRFRJ })//試算授信策略_准駁
      this.dss2Form3.patchValue({ STRGY_PERIOD_MIN: data.rspBody.DSS2STRGY[0].STRGY_PERIOD_MIN })//期數最小值
      this.dss2Form3.patchValue({ STRGY_PERIOD_MAX: data.rspBody.DSS2STRGY[0].STRGY_PERIOD_MAX })//期數最大值
      //期數=STRGY_PERIOD_MIN ~ STRGY_PERIOD_MAX
      this.dss2Form3.patchValue({ STRGY_LIMIT_REVING: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_REVING })//循環信貸額度
      this.dss2Form3.patchValue({ STRGY_LIMIT_INST: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_INST })//分期信貸金額
      this.dss2Form3.patchValue({ STRGY_LIMIT_CASH: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_CASH })//分期信貸-現金額度
      this.dss2Form3.patchValue({ STRGY_LIMIT_MERG: data.rspBody.DSS2STRGY[0].STRGY_LIMIT_MERG })//分期信貸-債整額度
      this.dss2Form3.patchValue({ STRGY_MINPAYRT: data.rspBody.DSS2STRGY[0].STRGY_MINPAYRT })//每月最低還款比例(僅限循環信貸)
      this.dss2Form3.patchValue({ STRGY_DISB_BTCR_YN: data.rspBody.DSS2STRGY[0].STRGY_DISB_BTCR_YN })//結帳日至還款日間客戶可申請動撥Y
      this.dss2Form3.patchValue({ STRGY_RL_DISB_THRHLD: data.rspBody.DSS2STRGY[0].STRGY_RL_DISB_THRHLD })//循環信貸簡易檢核動撥金額門檻
      this.dss2Form3.patchValue({ STRGY_ORIGINFEE: data.rspBody.DSS2STRGY[0].STRGY_ORIGINFEE })//開辦費(首次簽約用)
      this.dss2Form3.patchValue({ STRGY_LOANEXTFEE: data.rspBody.DSS2STRGY[0].STRGY_LOANEXTFEE })//帳戶管理費(續約用)
      //2.3用
      this.dss2Form3.patchValue({ STRGY_EXPIRDATE: data.rspBody.DSS2STRGY[0].STRGY_EXPIRDATE })//效期截止日 注意名稱差異

      //額度限額資訊 3種方案相同
      this.dss2Form3.patchValue({ LIMIT_DBR: data.rspBody.DSS2STRGY[0].LIMIT_DBR })//限額_DBR
      this.dss2Form3.patchValue({ LIMIT_PRDMUE: data.rspBody.DSS2STRGY[0].LIMIT_PRDMUE })//限額_產品MUE
      this.dss2Form3.patchValue({ LIMIT_LAW32: data.rspBody.DSS2STRGY[0].LIMIT_LAW32 })//限額_本行利害關係人(銀行法第32條)
      this.dss2Form3.patchValue({ LIMIT_LAW33_UNS: data.rspBody.DSS2STRGY[0].LIMIT_LAW33_UNS })//限額_同一自然人無擔保授信限額(銀行法第33條)
      this.dss2Form3.patchValue({ LIMIT_PROD_MAX: data.rspBody.DSS2STRGY[0].LIMIT_PROD_MAX })//限額_產品/專案額度上限
      this.dss2Form3.patchValue({ LIMIT_PROD_MIN: data.rspBody.DSS2STRGY[0].LIMIT_PROD_MIN })//限額_產品/專案額度下限
      this.dss2Form3.patchValue({ LIMIT_CUSTAPPLY: data.rspBody.DSS2STRGY[0].LIMIT_CUSTAPPLY })//限額_客戶申請金額
      this.dss2Form3.patchValue({ LIMIT_DTI: data.rspBody.DSS2STRGY[0].LIMIT_DTI })//限額_月付收支比
      this.dss2Form3.patchValue({ LIMIT_NIDMUE: data.rspBody.DSS2STRGY[0].LIMIT_NIDMUE })//限額_歸戶MUE
      this.dss2Form3.patchValue({ LIMIT_MERGEAMT: data.rspBody.DSS2STRGY[0].LIMIT_MERGEAMT })//限額_債整額度
      this.dss2Form3.patchValue({ STRGY_NIDMUEX: data.rspBody.DSS2STRGY[0].STRGY_NIDMUEX })//試算授信策略_歸戶MUE倍數
      this.dss2Form3.patchValue({ STRGY_NIDMUECAP: data.rspBody.DSS2STRGY[0].STRGY_NIDMUECAP })//試算授信策略_歸戶MUECAP
      this.dss2Form3.patchValue({ STRGY_PRDMUEX: data.rspBody.DSS2STRGY[0].STRGY_PRDMUEX })//試算授信策略_產品MUE倍數
      this.dss2Form3.patchValue({ STRGY_PRDMUEXCAP: data.rspBody.DSS2STRGY[0].STRGY_PRDMUEXCAP })//試算授信策略_產品MUECAP
      this.dss2Form3.patchValue({ STRGY_DBRX: data.rspBody.DSS2STRGY[0].STRGY_DBRX })//試算授信策略_DBR限額倍數
      this.dss2Form3.patchValue({ STRGY_DTIX: data.rspBody.DSS2STRGY[0].STRGY_DTIX })//試算授信策略_DTI參數 注意名稱差異

      this.EL_DSS2_STRGY_SRATE3.data = data.rspBody.DSS2STRGYSRATE;//試算利率(多階)
      this.EL_DSS2_STRGY_MERG3.data = data.rspBody.DSS2STRGYMERG;//試算授信策略_債整明細

    });
  }

  //取DBR收支表資料 授信
  getDBR_DTI() {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10action4';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['dssType'] = "Dss2";
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      if (data.rspBody.length > 0) {
        this.fmData.data = data.rspBody
      }
      console.log('DBR_DTI_Data');
      console.log(this.fmData.data);
      this.test();
    });
  }

 test() {
    this.fmData.data[0].dbr_0 = "15";
    this.fmData.data[0].dbr_0CK_B = "2";
    this.fmData.data[0].dbr_0CK_C = "3";
    this.fmData.data[0].dbr_0X = "16";
    this.fmData.data[0].dbr_0XCK_B = "5";
    this.fmData.data[0].dbr_0XCK_C = "6";
    this.fmData.data[0].dbr_1 = "19";
    this.fmData.data[0].dbr_1CK_B = "8";
    this.fmData.data[0].dbr_1CK_C = "9";
    this.fmData.data[0].dti_0 = "70";
    this.fmData.data[0].dti_0CK_B = "11";
    this.fmData.data[0].dti_0CK_C = "12";
    this.fmData.data[0].dti_0X = "71";
    this.fmData.data[0].dti_0XCK_B = "14";
    this.fmData.data[0].dti_0XCK_C = "15";
    this.fmData.data[0].dti_1 = "15";
    this.fmData.data[0].dti_1CK_B = "17";
    this.fmData.data[0].dti_1CK_C = "18";
    //  this.fmData.data[0].mthpay_BAM029="19";
    //  this.fmData.data[0].mthpay_BAM029_B="20";
    this.fmData.data[0].mthpay_BAM029_C = "21";
    //  this.fmData.data[0].mthpay_BAM421="22";
    //  this.fmData.data[0].mthpay_BAM421_B="23";
    this.fmData.data[0].mthpay_BAM421_C = "24";
    //  this.fmData.data[0].mthpay_KRM048="25";
    //  this.fmData.data[0].mthpay_KRM048_B="26";
    this.fmData.data[0].mthpay_KRM048_C = "27";
    //  this.fmData.data[0].mthpay_NONJCIC="28";
    //  this.fmData.data[0].mthpay_NONJCIC_B="29";
    this.fmData.data[0].mthpay_NONJCIC_C = "30";
    this.fmData.data[0].mthpay_SUM_0 = "31";
    this.fmData.data[0].mthpay_SUM_0CK_B = "32";
    this.fmData.data[0].mthpay_SUM_0CK_C = "33";
    //  this.fmData.data[0].unsdebt_824_CCRBAL="34";
    //  this.fmData.data[0].unsdebt_824_CCRBAL_B="35";
    this.fmData.data[0].unsdebt_824_CCRBAL_C = "36";
    //  this.fmData.data[0].unsdebt_824_ILBAL="37";
    //  this.fmData.data[0].unsdebt_824_ILBAL_B="38";
    this.fmData.data[0].unsdebt_824_ILBAL_C = "39";
    //  this.fmData.data[0].unsdebt_824_RLBAL="40";
    //  this.fmData.data[0].unsdebt_824_RLBAL_B="41";
    this.fmData.data[0].unsdebt_824_RLBAL_C = "42";
    //  this.fmData.data[0].unsdebt_824_RLLIMIT="43";
    //  this.fmData.data[0].unsdebt_824_RLLIMIT_B="44";
    this.fmData.data[0].unsdebt_824_RLLIMIT_C = "45";
    //  this.fmData.data[0].unsdebt_AMTNEW_029EX="46";
    //  this.fmData.data[0].unsdebt_AMTNEW_029EX_B="47";
    this.fmData.data[0].unsdebt_AMTNEW_029EX_C = "48";
    //  this.fmData.data[0].unsdebt_AMTNEW_505EX="49";
    //  this.fmData.data[0].unsdebt_AMTNEW_505EX_B="50";
    this.fmData.data[0].unsdebt_AMTNEW_505EX_C = "51";
    //  this.fmData.data[0].unsdebt_AMT_501EX="52";
    //  this.fmData.data[0].unsdebt_AMT_501EX_B="53";
    this.fmData.data[0].unsdebt_AMT_501EX_C = "54";
    //  this.fmData.data[0].unsdebt_AMT_504EX="55";
    //  this.fmData.data[0].unsdebt_AMT_504EX_B="56";
    this.fmData.data[0].unsdebt_AMT_504EX_C = "57";
    //  this.fmData.data[0].unsdebt_NONJCIC="58";
    //  this.fmData.data[0].unsdebt_NONJCIC_B="59";
    this.fmData.data[0].unsdebt_NONJCIC_C = "60";
    //  this.fmData.data[0].unsdebt_PAYAMT_029EX="61";
    //  this.fmData.data[0].unsdebt_PAYAMT_029EX_B="62";
    this.fmData.data[0].unsdebt_PAYAMT_029EX_C = "63";
    this.fmData.data[0].unsdebt_SUM_0 = "64";
    this.fmData.data[0].unsdebt_SUM_0CK_B = "65";
    this.fmData.data[0].unsdebt_SUM_0CK_C = "66";

  }
  //去除符號中文
  data_number(x: string) {
    if(x!=null){
      x = x.replace(/[^\d]/g, '');
      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return x
  }
  //去除符號中文 可負號
  data_number2(x: string) {
    if(x!=null){
      x = x.replace(/[^\d-]/g, '');
      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return x
  }

  //去除符號/中文 可負號 儲存用
  save_data_number(x: string) {
    if(x!=null){
      x = x.replace(/[^\d]/g, '');
    }
    return x
  }

  //去除符號/中文 可負號 儲存用
  save_data_number2(x: string) {
    if(x!=null){
      x = x.replace(/[^\d-]/g, '');
    }
    return x
  }

  //儲存 DBR收支表資料 授信
  save() {
    alert('1');
    const url = 'f01/childscn10action5';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['dssType'] = "Dss2";
    jsonObject['unsdebtAmt501Ex'] = this.save_data_number(this.fmData.data[0].unsdebt_AMT_501EX_B);
    jsonObject['unsdebtAmt504Ex'] = this.save_data_number(this.fmData.data[0].unsdebt_AMT_504EX_B);
    jsonObject['unsdebtAmtnew505Ex'] = this.save_data_number(this.fmData.data[0].unsdebt_AMTNEW_505EX_B);
    jsonObject['unsdebtAmtnew029Ex'] = this.save_data_number(this.fmData.data[0].unsdebt_AMTNEW_029EX_B);
    jsonObject['unsdebt824Rllimit'] = this.save_data_number(this.fmData.data[0].unsdebt_824_RLLIMIT_B);
    jsonObject['unsdebt824Rlbal'] = this.save_data_number(this.fmData.data[0].unsdebt_824_RLBAL_B);
    jsonObject['unsdebt824Ilbal'] = this.save_data_number(this.fmData.data[0].unsdebt_824_ILBAL_B);
    jsonObject['unsdebt824Ccrbal'] = this.save_data_number(this.fmData.data[0].unsdebt_824_CCRBAL_B);
    jsonObject['unsdebtNonjcic'] = this.save_data_number2(this.fmData.data[0].unsdebt_NONJCIC_B);
    jsonObject['unsdebtPayamt029Ex'] = this.save_data_number(this.fmData.data[0].unsdebt_PAYAMT_029EX_B);
    jsonObject['mthpayBam421'] = this.save_data_number(this.fmData.data[0].mthpay_BAM421_B);
    jsonObject['mthpayBam029'] = this.save_data_number(this.fmData.data[0].mthpay_BAM029_B);
    jsonObject['mthpayKrm048'] = this.save_data_number(this.fmData.data[0].mthpay_KRM048_B);
    jsonObject['mthpayNonjcic'] = this.save_data_number2(this.fmData.data[0].mthpay_NONJCIC_B);
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      console.log('savedata')
      console.log(data)
    });
  }


}
