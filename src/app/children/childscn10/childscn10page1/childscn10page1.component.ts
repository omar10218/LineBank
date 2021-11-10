import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Childscn10Service } from '../childscn10.service';
import { MatTableDataSource } from '@angular/material/table';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n'

//Nick 決策結果
@Component({
  selector: 'app-childscn10page1',
  templateUrl: './childscn10page1.component.html',
  styleUrls: ['./childscn10page1.component.css', '../../../../assets/css/child.css']
})
export class Childscn10page1Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private childscn10Service: Childscn10Service,
    private nzI18nService: NzI18nService) {
    this.nzI18nService.setLocale(zh_TW)
  }

  private applno: string;
  private search: string;
  fmData = new MatTableDataSource<any>();//判斷結果資料表

  test7=10000
  test1="1";test2="2";test3="3";
  test4="4";test5="5";test6="6";

  dss1Source1 = new MatTableDataSource<any>();//table資料
  dss1Source2 = new MatTableDataSource<any>();//table資料
  dss1Source3 = new MatTableDataSource<any>();//table資料

  //策略1
  EL_DSS1_UNDW_LIST1 = new MatTableDataSource<any>();//徵審代碼
  EL_DSS1_CFC_LIMIT1= new MatTableDataSource<any>();//試算額度策略
  EL_DSS1_STRGY_SRATE1= new MatTableDataSource<any>();//試算利率(多階)
  EL_DSS1_STRGY_MERG1= new MatTableDataSource<any>();//試算授信策略_債整明細
  //策略2
  EL_DSS1_STRGY_SRATE2= new MatTableDataSource<any>();//試算利率(多階)
  EL_DSS1_STRGY_MERG2= new MatTableDataSource<any>();//試算授信策略_債整明細
  //策略3
  EL_DSS1_STRGY_SRATE3= new MatTableDataSource<any>();//試算利率(多階)
  EL_DSS1_STRGY_MERG3= new MatTableDataSource<any>();//試算授信策略_債整明細

  dss1Form1: FormGroup = this.fb.group({
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
    STRGY_TMP_PRDCD: ['', []],//產品名稱
    STRGY_TMP_APRFRJ: ['', []],//試算授信策略_准駁
    STRGY_TMP_PERIOD_MIN: ['', []],//期數最小值
    STRGY_TMP_PERIOD_MAX: ['', []],//期數最大值
    //期數=STRGY_TMP_PERIOD_MIN ~ STRGY_TMP_PERIOD_MAX
    STRGY_TMP_LIMIT_REVING: ['', []],//循環信貸額度
    STRGY_TMP_LIMIT_INST: ['', []],//分期信貸金額
    STRGY_TMP_LIMIT_CASH: ['', []],//分期信貸-現金額度
    STRGY_TMP_LIMIT_MERG: ['', []],//分期信貸-債整額度
    STRGY_TMP_MINPAYRT: ['', []],//每月最低還款比例(僅限循環信貸)
    STRGY_TMP_DISB_BTCR_YN: ['', []],//結帳日至還款日間客戶可申請動撥Y
    STRGY_TMP_RL_DISB_THRHLD: ['', []],//循環信貸簡易檢核動撥金額門檻
    STRGY_TMP_ORIGINFEE: ['', []],//開辦費(首次簽約用)
    STRGY_TMP_LOANEXTFEE: ['', []],//帳戶管理費(續約用)

    //額度限額資訊 3種方案相同
    LIMIT_TMP_DBR: ['', []],//限額_DBR
    LIMIT_TMP_PRDMUE: ['', []],//限額_產品MUE
    LIMIT_TMP_LAW32: ['', []],//限額_本行利害關係人(銀行法第32條)
    LIMIT_TMP_LAW33_UNS: ['', []],//限額_同一自然人無擔保授信限額(銀行法第33條)
    LIMIT_TMP_PROD_MAX: ['', []],//限額_產品/專案額度上限
    LIMIT_TMP_PROD_MIN: ['', []],//限額_產品/專案額度下限
    LIMIT_TMP_CUSTAPPLY: ['', []],//限額_客戶申請金額
    LIMIT_TMP_DTI: ['', []],//限額_月付收支比
    LIMIT_TMP_NIDMUE: ['', []],//限額_歸戶MUE
    LIMIT_TMP_MERGEAMT: ['', []],//限額_債整額度
    STRGY_TMP_NIDMUEX: ['', []],//試算授信策略_歸戶MUE倍數
    STRGY_TMP_NIDMUECAP: ['', []],//試算授信策略_歸戶MUECAP
    STRGY_TMP_PRDMUEX: ['', []],//試算授信策略_產品MUE倍數
    STRGY_TMP_PRDMUEXCAP: ['', []],//試算授信策略_產品MUECAP
    STRGY_TMP_DBRX: ['', []],//試算授信策略_DBR限額倍數
    STRGY_TMP_DTIX: ['', []],//試算授信策略_DTI參數

  });

  dss1Form2: FormGroup = this.fb.group({

    //授信及產品條件
    //1.2.3共用
    STRGY_TMP_PRDCD: ['', []],//產品名稱
    STRGY_TMP_APRFRJ: ['', []],//試算授信策略_准駁
    STRGY_TMP_PERIOD_MIN: ['', []],//期數最小值
    STRGY_TMP_PERIOD_MAX: ['', []],//期數最大值
    //期數=STRGY_TMP_PERIOD_MIN ~ STRGY_TMP_PERIOD_MAX
    STRGY_TMP_LIMIT_REVING: ['', []],//循環信貸額度
    STRGY_TMP_LIMIT_INST: ['', []],//分期信貸金額
    STRGY_TMP_LIMIT_CASH: ['', []],//分期信貸-現金額度
    STRGY_TMP_LIMIT_MERG: ['', []],//分期信貸-債整額度
    STRGY_TMP_MINPAYRT: ['', []],//每月最低還款比例(僅限循環信貸)
    STRGY_TMP_DISB_BTCR_YN: ['', []],//結帳日至還款日間客戶可申請動撥Y
    STRGY_TMP_RL_DISB_THRHLD: ['', []],//循環信貸簡易檢核動撥金額門檻
    STRGY_TMP_ORIGINFEE: ['', []],//開辦費(首次簽約用)
    STRGY_TMP_LOANEXTFEE: ['', []],//帳戶管理費(續約用)
    //2.3用
    STRGY_TMP_EXPIRDATE: ['', []],//效期截止日

    //額度限額資訊 3種方案相同
    LIMIT_TMP_DBR: ['', []],//限額_DBR
    LIMIT_TMP_PRDMUE: ['', []],//限額_產品MUE
    LIMIT_TMP_LAW32: ['', []],//限額_本行利害關係人(銀行法第32條)
    LIMIT_TMP_LAW33_UNS: ['', []],//限額_同一自然人無擔保授信限額(銀行法第33條)
    LIMIT_TMP_PROD_MAX: ['', []],//限額_產品/專案額度上限
    LIMIT_TMP_PROD_MIN: ['', []],//限額_產品/專案額度下限
    LIMIT_TMP_CUSTAPPLY: ['', []],//限額_客戶申請金額
    LIMIT_TMP_DTI: ['', []],//限額_月付收支比
    LIMIT_TMP_NIDMUE: ['', []],//限額_歸戶MUE
    LIMIT_TMP_MERGEAMT: ['', []],//限額_債整額度
    STRGY_TMP_NIDMUEX: ['', []],//試算授信策略_歸戶MUE倍數
    STRGY_TMP_NIDMUECAP: ['', []],//試算授信策略_歸戶MUECAP
    STRGY_TMP_PRDMUEX: ['', []],//試算授信策略_產品MUE倍數
    STRGY_TMP_PRDMUEXCAP: ['', []],//試算授信策略_產品MUECAP
    STRGY_TMP_DBRX: ['', []],//試算授信策略_DBR限額倍數
    STRGY_TMP_DTIX: ['', []],//試算授信策略_DTI參數

  });

  dss1Form3: FormGroup = this.fb.group({
    //授信及產品條件
    //1.2.3共用
    STRGY_TMP_PRDCD: ['', []],//產品名稱
    STRGY_TMP_APRFRJ: ['', []],//試算授信策略_准駁
    STRGY_TMP_PERIOD_MIN: ['', []],//期數最小值
    STRGY_TMP_PERIOD_MAX: ['', []],//期數最大值
    //期數=STRGY_TMP_PERIOD_MIN ~ STRGY_TMP_PERIOD_MAX
    STRGY_TMP_LIMIT_REVING: ['', []],//循環信貸額度
    STRGY_TMP_LIMIT_INST: ['', []],//分期信貸金額
    STRGY_TMP_LIMIT_CASH: ['', []],//分期信貸-現金額度
    STRGY_TMP_LIMIT_MERG: ['', []],//分期信貸-債整額度
    STRGY_TMP_MINPAYRT: ['', []],//每月最低還款比例(僅限循環信貸)
    STRGY_TMP_DISB_BTCR_YN: ['', []],//結帳日至還款日間客戶可申請動撥Y
    STRGY_TMP_RL_DISB_THRHLD: ['', []],//循環信貸簡易檢核動撥金額門檻
    STRGY_TMP_ORIGINFEE: ['', []],//開辦費(首次簽約用)
    STRGY_TMP_LOANEXTFEE: ['', []],//帳戶管理費(續約用)
    //2.3用
    STRGY_TMP_EXPIRDATE: ['', []],//效期截止日

    //額度限額資訊 3種方案相同
    LIMIT_TMP_DBR: ['', []],//限額_DBR
    LIMIT_TMP_PRDMUE: ['', []],//限額_產品MUE
    LIMIT_TMP_LAW32: ['', []],//限額_本行利害關係人(銀行法第32條)
    LIMIT_TMP_LAW33_UNS: ['', []],//限額_同一自然人無擔保授信限額(銀行法第33條)
    LIMIT_TMP_PROD_MAX: ['', []],//限額_產品/專案額度上限
    LIMIT_TMP_PROD_MIN: ['', []],//限額_產品/專案額度下限
    LIMIT_TMP_CUSTAPPLY: ['', []],//限額_客戶申請金額
    LIMIT_TMP_DTI: ['', []],//限額_月付收支比
    LIMIT_TMP_NIDMUE: ['', []],//限額_歸戶MUE
    LIMIT_TMP_MERGEAMT: ['', []],//限額_債整額度
    STRGY_TMP_NIDMUEX: ['', []],//試算授信策略_歸戶MUE倍數
    STRGY_TMP_NIDMUECAP: ['', []],//試算授信策略_歸戶MUECAP
    STRGY_TMP_PRDMUEX: ['', []],//試算授信策略_產品MUE倍數
    STRGY_TMP_PRDMUEXCAP: ['', []],//試算授信策略_產品MUECAP
    STRGY_TMP_DBRX: ['', []],//試算授信策略_DBR限額倍數
    STRGY_TMP_DTIX: ['', []],//試算授信策略_DTI參數

  });

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.getDSS11();
    this.getDSS12();
    this.getDSS13();
  }

  getSearch(): string {
    return this.search;
  }
  getApplno(): String {
    return this.applno;
  }

  //取決策1Table
  getDSS11() {
    const url = 'f01/childscn10action';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['strgy'] = "1";
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      console.log('data');
      console.log(data);
      //系統決策
      this.dss1Form1.patchValue({ SYSFLOWCD: data.rspBody.DSS1[0].SYSFLOWCD })//系統流程
      this.dss1Form1.patchValue({ RESLTCD: data.rspBody.DSS1[0].RESLTCD })//決策結果

      //案件資訊
      this.dss1Form1.patchValue({ CALV: data.rspBody.DSS1[0].CALV })//案件等級
      this.dss1Form1.patchValue({ GOODBEHAV_MORT: data.rspBody.DSS1[0].GOODBEHAV_MORT })//往來優質特徵註記(房貸)
      this.dss1Form1.patchValue({ GOODBEHAV_CC: data.rspBody.DSS1[0].GOODBEHAV_CC })//往來優質特徵註記(信用卡)
      this.dss1Form1.patchValue({ OCUPATN_CUST_STGP1: data.rspBody.DSS1[0].OCUPATN_CUST_STGP1 })//策略客群1(客戶填寫)
      this.dss1Form1.patchValue({ OCUPATN_CUST_STGP2: data.rspBody.DSS1[0].OCUPATN_CUST_STGP2 })//策略客群2(客戶填寫)
      this.dss1Form1.patchValue({ OCUPATN_CUST_GP: data.rspBody.DSS1[0].OCUPATN_CUST_GP })//行職業代碼分群(客戶填寫)
      this.dss1Form1.patchValue({ OCUPATN_CUST_STGP1_PM: data.rspBody.DSS1[0].OCUPATN_CUST_STGP1_PM })//策略客群1(客戶填寫) (PM分群)
      this.dss1Form1.patchValue({ OCUPATN_CUST_STGP2_PM: data.rspBody.DSS1[0].OCUPATN_CUST_STGP2_PM })//策略客群2(客戶填寫) (PM分群)
      this.dss1Form1.patchValue({ OCUPATN_CUST_GP_PM: data.rspBody.DSS1[0].OCUPATN_CUST_GP_PM })//行職業代碼分群(客戶填寫) (PM分群)
      this.dss1Form1.patchValue({ CUST_TAG: data.rspBody.DSS1[0].CUST_TAG })//客群標籤
      this.dss1Form1.patchValue({ CUST_TAG_DESC: data.rspBody.DSS1[0].CUST_TAG_DESC })//客群標籤說明

      //策略模板資訊
      this.dss1Form1.patchValue({ STRGY_MDUL: data.rspBody.DSS1[0].STRGY_MDUL })//試算授信策略模板分類
      this.dss1Form1.patchValue({ STRGY_MDUL_ATVDT: data.rspBody.DSS1[0].STRGY_MDUL_ATVDT })//授信策略模板生效日期時間
      this.dss1Form1.patchValue({ STRGY_RATE_ATVDT: data.rspBody.DSS1[0].STRGY_RATE_ATVDT })//利率模板生效日期時間

      //授信及產品條件
      //1.2.3共用
      this.dss1Form1.patchValue({ STRGY_TMP_PRDCD: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PRDCD })//產品名稱
      this.dss1Form1.patchValue({ STRGY_TMP_APRFRJ: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_APRFRJ })//試算授信策略_准駁
      this.dss1Form1.patchValue({ STRGY_TMP_PERIOD_MIN: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PERIOD_MIN })//期數最小值
      this.dss1Form1.patchValue({ STRGY_TMP_PERIOD_MAX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PERIOD_MAX })//期數最大值
      //期數=STRGY_TMP_PERIOD_MIN ~ STRGY_TMP_PERIOD_MAX
      this.dss1Form1.patchValue({ STRGY_TMP_LIMIT_REVING: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_REVING })//循環信貸額度
      this.dss1Form1.patchValue({ STRGY_TMP_LIMIT_INST: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_INST })//分期信貸金額
      this.dss1Form1.patchValue({ STRGY_TMP_LIMIT_CASH: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_CASH })//分期信貸-現金額度
      this.dss1Form1.patchValue({ STRGY_TMP_LIMIT_MERG: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_MERG })//分期信貸-債整額度
      this.dss1Form1.patchValue({ STRGY_TMP_MINPAYRT: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_MINPAYRT })//每月最低還款比例(僅限循環信貸)
      this.dss1Form1.patchValue({ STRGY_TMP_DISB_BTCR_YN: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_DISB_BTCR_YN })//結帳日至還款日間客戶可申請動撥Y
      this.dss1Form1.patchValue({ STRGY_TMP_RL_DISB_THRHLD: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_RL_DISB_THRHLD })//循環信貸簡易檢核動撥金額門檻
      this.dss1Form1.patchValue({ STRGY_TMP_ORIGINFEE: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_ORIGINFEE })//開辦費(首次簽約用)
      this.dss1Form1.patchValue({ STRGY_TMP_LOANEXTFEE: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LOANEXTFEE })//帳戶管理費(續約用)

      //額度限額資訊 3種方案相同
      this.dss1Form1.patchValue({ LIMIT_TMP_DBR: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_DBR })//限額_DBR
      this.dss1Form1.patchValue({ LIMIT_TMP_PRDMUE: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_PRDMUE })//限額_產品MUE
      this.dss1Form1.patchValue({ LIMIT_TMP_LAW32: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_LAW32 })//限額_本行利害關係人(銀行法第32條)
      this.dss1Form1.patchValue({ LIMIT_TMP_LAW33_UNS: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_LAW33_UNS })//限額_同一自然人無擔保授信限額(銀行法第33條)
      this.dss1Form1.patchValue({ LIMIT_TMP_PROD_MAX: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_PROD_MAX })//限額_產品/專案額度上限
      this.dss1Form1.patchValue({ LIMIT_TMP_PROD_MIN: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_PROD_MIN })//限額_產品/專案額度下限
      this.dss1Form1.patchValue({ LIMIT_TMP_CUSTAPPLY: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_CUSTAPPLY })//限額_客戶申請金額
      this.dss1Form1.patchValue({ LIMIT_TMP_DTI: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_DTI })//限額_月付收支比
      this.dss1Form1.patchValue({ LIMIT_TMP_NIDMUE: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_NIDMUE })//限額_歸戶MUE
      this.dss1Form1.patchValue({ LIMIT_TMP_MERGEAMT: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_MERGEAMT })//限額_債整額度
      this.dss1Form1.patchValue({ STRGY_TMP_NIDMUEX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_NIDMUEX })//試算授信策略_歸戶MUE倍數
      this.dss1Form1.patchValue({ STRGY_TMP_NIDMUECAP: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_NIDMUECAP })//試算授信策略_歸戶MUECAP
      this.dss1Form1.patchValue({ STRGY_TMP_PRDMUEX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PRDMUEX })//試算授信策略_產品MUE倍數
      this.dss1Form1.patchValue({ STRGY_TMP_PRDMUEXCAP: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PRDMUEXCAP })//試算授信策略_產品MUECAP
      this.dss1Form1.patchValue({ STRGY_TMP_DBRX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_DBRX })//試算授信策略_DBR限額倍數
      this.dss1Form1.patchValue({ STRGY_TMP_DTIX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_DTIX })//試算授信策略_DTI參數 注意名稱差異

      this.EL_DSS1_UNDW_LIST1.data = data.rspBody.DSS1UNDWLIST ;//徵審代碼
      console.log('this.EL_DSS1_UNDW_LIST1.data');
      console.log(this.EL_DSS1_UNDW_LIST1.data);
      this.EL_DSS1_CFC_LIMIT1.data = data.rspBody.DSS1CFCLIMIT ;//試算額度策略
      console.log('this.EL_DSS1_CFC_LIMIT1.data');
      console.log(this.EL_DSS1_CFC_LIMIT1.data);
      this.EL_DSS1_STRGY_SRATE1.data = data.rspBody.DSS1STRGYSRATE ;//試算利率(多階)
      console.log('this.EL_DSS1_STRGY_SRATE1.data');
      console.log(this.EL_DSS1_STRGY_SRATE1.data);
      this.EL_DSS1_STRGY_MERG1.data = data.rspBody.DSS1STRGYMERG ;//試算授信策略_債整明細
      console.log('this.EL_DSS1_STRGY_MERG1.data');
      console.log(this.EL_DSS1_STRGY_MERG1.data);

    });
  }
  //取決策2Table
  getDSS12() {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10action';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['strgy'] = "2";
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      console.log('data');
      console.log(data);
      //系統決策
      this.dss1Form2.patchValue({ SYSFLOWCD: data.rspBody.DSS1[0].SYSFLOWCD })//系統流程
      this.dss1Form2.patchValue({ RESLTCD: data.rspBody.DSS1[0].RESLTCD })//決策結果

      //案件資訊
      this.dss1Form2.patchValue({ CALV: data.rspBody.DSS1[0].CALV })//案件等級
      this.dss1Form2.patchValue({ GOODBEHAV_MORT: data.rspBody.DSS1[0].GOODBEHAV_MORT })//往來優質特徵註記(房貸)
      this.dss1Form2.patchValue({ GOODBEHAV_CC: data.rspBody.DSS1[0].GOODBEHAV_CC })//往來優質特徵註記(信用卡)
      this.dss1Form2.patchValue({ OCUPATN_CUST_STGP1: data.rspBody.DSS1[0].OCUPATN_CUST_STGP1 })//策略客群1(客戶填寫)
      this.dss1Form2.patchValue({ OCUPATN_CUST_STGP2: data.rspBody.DSS1[0].OCUPATN_CUST_STGP2 })//策略客群2(客戶填寫)
      this.dss1Form2.patchValue({ OCUPATN_CUST_GP: data.rspBody.DSS1[0].OCUPATN_CUST_GP })//行職業代碼分群(客戶填寫)
      this.dss1Form2.patchValue({ OCUPATN_CUST_STGP1_PM: data.rspBody.DSS1[0].OCUPATN_CUST_STGP1_PM })//策略客群1(客戶填寫) (PM分群)
      this.dss1Form2.patchValue({ OCUPATN_CUST_STGP2_PM: data.rspBody.DSS1[0].OCUPATN_CUST_STGP2_PM })//策略客群2(客戶填寫) (PM分群)
      this.dss1Form2.patchValue({ OCUPATN_CUST_GP_PM: data.rspBody.DSS1[0].OCUPATN_CUST_GP_PM })//行職業代碼分群(客戶填寫) (PM分群)
      this.dss1Form2.patchValue({ CUST_TAG: data.rspBody.DSS1[0].CUST_TAG })//客群標籤
      this.dss1Form2.patchValue({ CUST_TAG_DESC: data.rspBody.DSS1[0].CUST_TAG_DESC })//客群標籤說明

      //策略模板資訊
      this.dss1Form2.patchValue({ STRGY_MDUL: data.rspBody.DSS1[0].STRGY_MDUL })//試算授信策略模板分類
      this.dss1Form2.patchValue({ STRGY_MDUL_ATVDT: data.rspBody.DSS1[0].STRGY_MDUL_ATVDT })//授信策略模板生效日期時間
      this.dss1Form2.patchValue({ STRGY_RATE_ATVDT: data.rspBody.DSS1[0].STRGY_RATE_ATVDT })//利率模板生效日期時間

      //授信及產品條件
      //1.2.3共用
      this.dss1Form2.patchValue({ STRGY_TMP_PRDCD: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PRDCD })//產品名稱
      this.dss1Form2.patchValue({ STRGY_TMP_APRFRJ: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_APRFRJ })//試算授信策略_准駁
      this.dss1Form2.patchValue({ STRGY_TMP_PERIOD_MIN: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PERIOD_MIN })//期數最小值
      this.dss1Form2.patchValue({ STRGY_TMP_PERIOD_MAX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PERIOD_MAX })//期數最大值
      //期數=STRGY_TMP_PERIOD_MIN ~ STRGY_TMP_PERIOD_MAX
      this.dss1Form2.patchValue({ STRGY_TMP_LIMIT_REVING: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_REVING })//循環信貸額度
      this.dss1Form2.patchValue({ STRGY_TMP_LIMIT_INST: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_INST })//分期信貸金額
      this.dss1Form2.patchValue({ STRGY_TMP_LIMIT_CASH: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_CASH })//分期信貸-現金額度
      this.dss1Form2.patchValue({ STRGY_TMP_LIMIT_MERG: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_MERG })//分期信貸-債整額度
      this.dss1Form2.patchValue({ STRGY_TMP_MINPAYRT: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_MINPAYRT })//每月最低還款比例(僅限循環信貸)
      this.dss1Form2.patchValue({ STRGY_TMP_DISB_BTCR_YN: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_DISB_BTCR_YN })//結帳日至還款日間客戶可申請動撥Y
      this.dss1Form2.patchValue({ STRGY_TMP_RL_DISB_THRHLD: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_RL_DISB_THRHLD })//循環信貸簡易檢核動撥金額門檻
      this.dss1Form2.patchValue({ STRGY_TMP_ORIGINFEE: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_ORIGINFEE })//開辦費(首次簽約用)
      this.dss1Form2.patchValue({ STRGY_TMP_LOANEXTFEE: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LOANEXTFEE })//帳戶管理費(續約用)
      //2.3用
      this.dss1Form2.patchValue({ STRGY_TMP_EXPIRDATE: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_EXPIRDATE })//效期截止日  注意名稱差異

      //額度限額資訊 3種方案相同
      this.dss1Form2.patchValue({ LIMIT_TMP_DBR: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_DBR })//限額_DBR
      this.dss1Form2.patchValue({ LIMIT_TMP_PRDMUE: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_PRDMUE })//限額_產品MUE
      this.dss1Form2.patchValue({ LIMIT_TMP_LAW32: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_LAW32 })//限額_本行利害關係人(銀行法第32條)
      this.dss1Form2.patchValue({ LIMIT_TMP_LAW33_UNS: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_LAW33_UNS })//限額_同一自然人無擔保授信限額(銀行法第33條)
      this.dss1Form2.patchValue({ LIMIT_TMP_PROD_MAX: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_PROD_MAX })//限額_產品/專案額度上限
      this.dss1Form2.patchValue({ LIMIT_TMP_PROD_MIN: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_PROD_MIN })//限額_產品/專案額度下限
      this.dss1Form2.patchValue({ LIMIT_TMP_CUSTAPPLY: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_CUSTAPPLY })//限額_客戶申請金額
      this.dss1Form2.patchValue({ LIMIT_TMP_DTI: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_DTI })//限額_月付收支比
      this.dss1Form2.patchValue({ LIMIT_TMP_NIDMUE: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_NIDMUE })//限額_歸戶MUE
      this.dss1Form2.patchValue({ LIMIT_TMP_MERGEAMT: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_MERGEAMT })//限額_債整額度
      this.dss1Form2.patchValue({ STRGY_TMP_NIDMUEX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_NIDMUEX })//試算授信策略_歸戶MUE倍數
      this.dss1Form2.patchValue({ STRGY_TMP_NIDMUECAP: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_NIDMUECAP })//試算授信策略_歸戶MUECAP
      this.dss1Form2.patchValue({ STRGY_TMP_PRDMUEX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PRDMUEX })//試算授信策略_產品MUE倍數
      this.dss1Form2.patchValue({ STRGY_TMP_PRDMUEXCAP: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PRDMUEXCAP })//試算授信策略_產品MUECAP
      this.dss1Form2.patchValue({ STRGY_TMP_DBRX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_DBRX })//試算授信策略_DBR限額倍數
      this.dss1Form2.patchValue({ STRGY_TMP_DTIX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_DTIX })//試算授信策略_DTI參數 注意名稱差異

      this.EL_DSS1_STRGY_SRATE2.data = data.rspBody.DSS1STRGYSRATE ;//試算利率(多階)
      this.EL_DSS1_STRGY_MERG2.data = data.rspBody.DSS1STRGYMERG ;//試算授信策略_債整明細

    });
  }

  //取決策3Table
  getDSS13() {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10action';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['strgy'] = "3";
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      console.log('data');
      console.log(data);
      //系統決策
      this.dss1Form3.patchValue({ SYSFLOWCD: data.rspBody.DSS1[0].SYSFLOWCD })//系統流程
      this.dss1Form3.patchValue({ RESLTCD: data.rspBody.DSS1[0].RESLTCD })//決策結果

      //案件資訊
      this.dss1Form3.patchValue({ CALV: data.rspBody.DSS1[0].CALV })//案件等級
      this.dss1Form3.patchValue({ GOODBEHAV_MORT: data.rspBody.DSS1[0].GOODBEHAV_MORT })//往來優質特徵註記(房貸)
      this.dss1Form3.patchValue({ GOODBEHAV_CC: data.rspBody.DSS1[0].GOODBEHAV_CC })//往來優質特徵註記(信用卡)
      this.dss1Form3.patchValue({ OCUPATN_CUST_STGP1: data.rspBody.DSS1[0].OCUPATN_CUST_STGP1 })//策略客群1(客戶填寫)
      this.dss1Form3.patchValue({ OCUPATN_CUST_STGP2: data.rspBody.DSS1[0].OCUPATN_CUST_STGP2 })//策略客群2(客戶填寫)
      this.dss1Form3.patchValue({ OCUPATN_CUST_GP: data.rspBody.DSS1[0].OCUPATN_CUST_GP })//行職業代碼分群(客戶填寫)
      this.dss1Form3.patchValue({ OCUPATN_CUST_STGP1_PM: data.rspBody.DSS1[0].OCUPATN_CUST_STGP1_PM })//策略客群1(客戶填寫) (PM分群)
      this.dss1Form3.patchValue({ OCUPATN_CUST_STGP2_PM: data.rspBody.DSS1[0].OCUPATN_CUST_STGP2_PM })//策略客群2(客戶填寫) (PM分群)
      this.dss1Form3.patchValue({ OCUPATN_CUST_GP_PM: data.rspBody.DSS1[0].OCUPATN_CUST_GP_PM })//行職業代碼分群(客戶填寫) (PM分群)
      this.dss1Form3.patchValue({ CUST_TAG: data.rspBody.DSS1[0].CUST_TAG })//客群標籤
      this.dss1Form3.patchValue({ CUST_TAG_DESC: data.rspBody.DSS1[0].CUST_TAG_DESC })//客群標籤說明

      //策略模板資訊
      this.dss1Form3.patchValue({ STRGY_MDUL: data.rspBody.DSS1[0].STRGY_MDUL })//試算授信策略模板分類
      this.dss1Form3.patchValue({ STRGY_MDUL_ATVDT: data.rspBody.DSS1[0].STRGY_MDUL_ATVDT })//授信策略模板生效日期時間
      this.dss1Form3.patchValue({ STRGY_RATE_ATVDT: data.rspBody.DSS1[0].STRGY_RATE_ATVDT })//利率模板生效日期時間

      //授信及產品條件
      //1.2.3共用
      this.dss1Form3.patchValue({ STRGY_TMP_PRDCD: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PRDCD })//產品名稱
      this.dss1Form3.patchValue({ STRGY_TMP_APRFRJ: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_APRFRJ })//試算授信策略_准駁
      this.dss1Form3.patchValue({ STRGY_TMP_PERIOD_MIN: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PERIOD_MIN })//期數最小值
      this.dss1Form3.patchValue({ STRGY_TMP_PERIOD_MAX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PERIOD_MAX })//期數最大值
      //期數=STRGY_TMP_PERIOD_MIN ~ STRGY_TMP_PERIOD_MAX
      this.dss1Form3.patchValue({ STRGY_TMP_LIMIT_REVING: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_REVING })//循環信貸額度
      this.dss1Form3.patchValue({ STRGY_TMP_LIMIT_INST: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_INST })//分期信貸金額
      this.dss1Form3.patchValue({ STRGY_TMP_LIMIT_CASH: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_CASH })//分期信貸-現金額度
      this.dss1Form3.patchValue({ STRGY_TMP_LIMIT_MERG: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LIMIT_MERG })//分期信貸-債整額度
      this.dss1Form3.patchValue({ STRGY_TMP_MINPAYRT: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_MINPAYRT })//每月最低還款比例(僅限循環信貸)
      this.dss1Form3.patchValue({ STRGY_TMP_DISB_BTCR_YN: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_DISB_BTCR_YN })//結帳日至還款日間客戶可申請動撥Y
      this.dss1Form3.patchValue({ STRGY_TMP_RL_DISB_THRHLD: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_RL_DISB_THRHLD })//循環信貸簡易檢核動撥金額門檻
      this.dss1Form3.patchValue({ STRGY_TMP_ORIGINFEE: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_ORIGINFEE })//開辦費(首次簽約用)
      this.dss1Form3.patchValue({ STRGY_TMP_LOANEXTFEE: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_LOANEXTFEE })//帳戶管理費(續約用)
      //2.3用
      this.dss1Form3.patchValue({ STRGY_TMP_EXPIRDATE: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_EXPIRDATE })//效期截止日 注意名稱差異

      //額度限額資訊 3種方案相同
      this.dss1Form3.patchValue({ LIMIT_TMP_DBR: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_DBR })//限額_DBR
      this.dss1Form3.patchValue({ LIMIT_TMP_PRDMUE: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_PRDMUE })//限額_產品MUE
      this.dss1Form3.patchValue({ LIMIT_TMP_LAW32: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_LAW32 })//限額_本行利害關係人(銀行法第32條)
      this.dss1Form3.patchValue({ LIMIT_TMP_LAW33_UNS: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_LAW33_UNS })//限額_同一自然人無擔保授信限額(銀行法第33條)
      this.dss1Form3.patchValue({ LIMIT_TMP_PROD_MAX: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_PROD_MAX })//限額_產品/專案額度上限
      this.dss1Form3.patchValue({ LIMIT_TMP_PROD_MIN: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_PROD_MIN })//限額_產品/專案額度下限
      this.dss1Form3.patchValue({ LIMIT_TMP_CUSTAPPLY: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_CUSTAPPLY })//限額_客戶申請金額
      this.dss1Form3.patchValue({ LIMIT_TMP_DTI: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_DTI })//限額_月付收支比
      this.dss1Form3.patchValue({ LIMIT_TMP_NIDMUE: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_NIDMUE })//限額_歸戶MUE
      this.dss1Form3.patchValue({ LIMIT_TMP_MERGEAMT: data.rspBody.DSS1STRGYTMP[0].LIMIT_TMP_MERGEAMT })//限額_債整額度
      this.dss1Form3.patchValue({ STRGY_TMP_NIDMUEX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_NIDMUEX })//試算授信策略_歸戶MUE倍數
      this.dss1Form3.patchValue({ STRGY_TMP_NIDMUECAP: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_NIDMUECAP })//試算授信策略_歸戶MUECAP
      this.dss1Form3.patchValue({ STRGY_TMP_PRDMUEX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PRDMUEX })//試算授信策略_產品MUE倍數
      this.dss1Form3.patchValue({ STRGY_TMP_PRDMUEXCAP: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_PRDMUEXCAP })//試算授信策略_產品MUECAP
      this.dss1Form3.patchValue({ STRGY_TMP_DBRX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_DBRX })//試算授信策略_DBR限額倍數
      this.dss1Form3.patchValue({ STRGY_TMP_DTIX: data.rspBody.DSS1STRGYTMP[0].STRGY_TMP_DTIX })//試算授信策略_DTI參數 注意名稱差異

      this.EL_DSS1_STRGY_SRATE3.data = data.rspBody.DSS1STRGYSRATE ;//試算利率(多階)
      this.EL_DSS1_STRGY_MERG3.data = data.rspBody.DSS1STRGYMERG ;//試算授信策略_債整明細

    });
  }



}
