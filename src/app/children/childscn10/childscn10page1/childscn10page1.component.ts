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

  dss1Source = new MatTableDataSource<any>();//table資料
  dss2Source = new MatTableDataSource<any>();//table資料
  dss3Source = new MatTableDataSource<any>();//table資料
  dss1_RSource = new MatTableDataSource<any>();//table資料

  dss1Form: FormGroup = this.fb.group({
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
    OCUPATN_CUST_GP_PM: ['', []],//策略客群2(客戶填寫) (PM分群)
    CUST_TAG: ['', []],//客群標籤
    CUST_TAG_DESC: ['', []],//客群標籤說明

    //風險模型資訊 (暫定移至別的頁面)?20211025
    RISKMDSUB_A0: ['', []],//風險模型子模型代碼
    RISKMDSUB_A0_DESC: ['', []],//風險模型子模型說明
    RISKMDSCORE_A0: ['', []],//風險模型分數
    RISKMDGRADE_A0: ['', []],//風險模型等級
    RISKMDGRADE_A0_GP: ['', []],//風險模型等級分群
    RISKMDGRADE_A0_ADJ: ['', []],//風險模型等級(策略調整後)
    RISKMDGRADE_A0_GP_ADJ: ['', []],//風險模型等級分群(策略調整後)

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
    LIMIT_TMP_NIDMU: ['', []],//限額_歸戶MUE
    LIMIT_TMP_MERGEAMT: ['', []],//限額_債整額度
    STRGY_NIDMUEX: ['', []],//試算授信策略_歸戶MUE倍數
    STRGY_NIDMUECAP: ['', []],//試算授信策略_歸戶MUECAP
    STRGY_PRDMUEX: ['', []],//試算授信策略_產品MUE倍數
    STRGY_PRDMUEXCAP: ['', []],//試算授信策略_產品MUECAP
    STRGY_DBRX: ['', []],//試算授信策略_DBR限額倍數
    STRGY_DTIX: ['', []],//試算授信策略_DTI參數

  });

  dss2Form: FormGroup = this.fb.group({
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

    //風險模型資訊 (暫定移至別的頁面)?20211025
    RISKMDSUB_A0: ['', []],//風險模型子模型代碼
    RISKMDSUB_A0_DESC: ['', []],//風險模型子模型說明
    RISKMDSCORE_A0: ['', []],//風險模型分數
    RISKMDGRADE_A0: ['', []],//風險模型等級
    RISKMDGRADE_A0_GP: ['', []],//風險模型等級分群
    RISKMDGRADE_A0_ADJ: ['', []],//風險模型等級(策略調整後)
    RISKMDGRADE_A0_GP_ADJ: ['', []],//風險模型等級分群(策略調整後)

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
    STRGY_TMP_LIMIT_CASH: ['', []],//分期信貸-現金額度
    STRGY_TMP_LIMIT_MERG: ['', []],//分期信貸-債整額度
    STRGY_TMP_MINPAYRT: ['', []],//每月最低還款比例(僅限循環信貸)
    STRGY_TMP_DISB_BTCR_YN: ['', []],//結帳日至還款日間客戶可申請動撥Y
    STRGY_TMP_RL_DISB_THRHLD: ['', []],//循環信貸簡易檢核動撥金額門檻
    STRGY_TMP_ORIGINFEE: ['', []],//開辦費(首次簽約用)
    STRGY_TMP_LOANEXTFEE: ['', []],//帳戶管理費(續約用)
    //2.3用
    STRGY_TMP_EXPIRDATE: ['', []],//效期截止日期

    //額度限額資訊 3種方案相同
    LIMIT_TMP_DBR: ['', []],//限額_DBR
    LIMIT_TMP_PRDMUE: ['', []],//限額_產品MUE
    LIMIT_TMP_LAW32: ['', []],//限額_本行利害關係人(銀行法第32條)
    LIMIT_TMP_LAW33_UNS: ['', []],//限額_同一自然人無擔保授信限額(銀行法第33條)
    LIMIT_TMP_PROD_MAX: ['', []],//限額_產品/專案額度上限
    LIMIT_TMP_PROD_MIN: ['', []],//限額_產品/專案額度下限
    LIMIT_TMP_CUSTAPPLY: ['', []],//限額_客戶申請金額
    LIMIT_TMP_DTI: ['', []],//限額_月付收支比
    LIMIT_TMP_NIDMU: ['', []],//限額_歸戶MUE
    LIMIT_TMP_MERGEAMT: ['', []],//限額_債整額度
    STRGY_NIDMUEX: ['', []],//試算授信策略_歸戶MUE倍數
    STRGY_NIDMUECAP: ['', []],//試算授信策略_歸戶MUECAP
    STRGY_PRDMUEX: ['', []],//試算授信策略_產品MUE倍數
    STRGY_PRDMUEXCAP: ['', []],//試算授信策略_產品MUECAP
    STRGY_DBRX: ['', []],//試算授信策略_DBR限額倍數
    STRGY_DTIX: ['', []],//試算授信策略_DTI參數

  });

  dss3Form: FormGroup = this.fb.group({
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

    //風險模型資訊 (暫定移至別的頁面)?20211025
    RISKMDSUB_A0: ['', []],//風險模型子模型代碼
    RISKMDSUB_A0_DESC: ['', []],//風險模型子模型說明
    RISKMDSCORE_A0: ['', []],//風險模型分數
    RISKMDGRADE_A0: ['', []],//風險模型等級
    RISKMDGRADE_A0_GP: ['', []],//風險模型等級分群
    RISKMDGRADE_A0_ADJ: ['', []],//風險模型等級(策略調整後)
    RISKMDGRADE_A0_GP_ADJ: ['', []],//風險模型等級分群(策略調整後)

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
    STRGY_TMP_LIMIT_CASH: ['', []],//分期信貸-現金額度
    STRGY_TMP_LIMIT_MERG: ['', []],//分期信貸-債整額度
    STRGY_TMP_MINPAYRT: ['', []],//每月最低還款比例(僅限循環信貸)
    STRGY_TMP_DISB_BTCR_YN: ['', []],//結帳日至還款日間客戶可申請動撥Y
    STRGY_TMP_RL_DISB_THRHLD: ['', []],//循環信貸簡易檢核動撥金額門檻
    STRGY_TMP_ORIGINFEE: ['', []],//開辦費(首次簽約用)
    STRGY_TMP_LOANEXTFEE: ['', []],//帳戶管理費(續約用)
    //2.3用
    STRGY_TMP_EXPIRDATE: ['', []],//效期截止日期

    //額度限額資訊 3種方案相同
    LIMIT_TMP_DBR: ['', []],//限額_DBR
    LIMIT_TMP_PRDMUE: ['', []],//限額_產品MUE
    LIMIT_TMP_LAW32: ['', []],//限額_本行利害關係人(銀行法第32條)
    LIMIT_TMP_LAW33_UNS: ['', []],//限額_同一自然人無擔保授信限額(銀行法第33條)
    LIMIT_TMP_PROD_MAX: ['', []],//限額_產品/專案額度上限
    LIMIT_TMP_PROD_MIN: ['', []],//限額_產品/專案額度下限
    LIMIT_TMP_CUSTAPPLY: ['', []],//限額_客戶申請金額
    LIMIT_TMP_DTI: ['', []],//限額_月付收支比
    LIMIT_TMP_NIDMU: ['', []],//限額_歸戶MUE
    LIMIT_TMP_MERGEAMT: ['', []],//限額_債整額度
    STRGY_NIDMUEX: ['', []],//試算授信策略_歸戶MUE倍數
    STRGY_NIDMUECAP: ['', []],//試算授信策略_歸戶MUECAP
    STRGY_PRDMUEX: ['', []],//試算授信策略_產品MUE倍數
    STRGY_PRDMUEXCAP: ['', []],//試算授信策略_產品MUECAP
    STRGY_DBRX: ['', []],//試算授信策略_DBR限額倍數
    STRGY_DTIX: ['', []],//試算授信策略_DTI參數

  });



  ngOnInit(): void {
    this.getDSS1();
  }

  //取Table
  getDSS1() {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childscn10';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    this.childscn10Service.getDate_Json(url, jsonObject).subscribe(data => {
      console.log('data');
      console.log(data);
      this.dss1Source.data = data.rspBody.items1
      this.dss2Source.data = data.rspBody.items2
      this.dss3Source.data = data.rspBody.items3
      this.dss1_RSource = data.rspBody.items4
      //系統決策
      this.dss1Form.patchValue({ SYSFLOWCD: data.rspBody.items1[0].SYSFLOWCD })//系統流程
      this.dss1Form.patchValue({ RESLTCD: data.rspBody.items1[0].RESLTCD })//決策結果
      // //案件資訊
      this.dss1Form.patchValue({ CALV: data.rspBody.items1[0].CALV })//案件等級
      this.dss1Form.patchValue({ GOODBEHAV_MORT: data.rspBody.items1[0].GOODBEHAV_MORT })//往來優質特徵註記(房貸)
      this.dss1Form.patchValue({ GOODBEHAV_CC: data.rspBody.items1[0].GOODBEHAV_CC })//往來優質特徵註記(信用卡)
      this.dss1Form.patchValue({ OCUPATN_CUST_STGP1: data.rspBody.items1[0].OCUPATN_CUST_STGP1 })//策略客群1(客戶填寫)
      this.dss1Form.patchValue({ OCUPATN_CUST_STGP2: data.rspBody.items1[0].OCUPATN_CUST_STGP2 })//策略客群2(客戶填寫)
      this.dss1Form.patchValue({ OCUPATN_CUST_GP: data.rspBody.items1[0].OCUPATN_CUST_GP })//行職業代碼分群(客戶填寫)
      this.dss1Form.patchValue({ OCUPATN_CUST_STGP1_PM: data.rspBody.items1[0].OCUPATN_CUST_STGP1_PM })//策略客群1(客戶填寫) (PM分群)
      this.dss1Form.patchValue({ OCUPATN_CUST_STGP2_PM: data.rspBody.items1[0].OCUPATN_CUST_STGP2_PM })//策略客群2(客戶填寫) (PM分群)
      this.dss1Form.patchValue({ OCUPATN_CUST_GP_PM: data.rspBody.items1[0].OCUPATN_CUST_GP_PM })//行職業代碼分群(客戶填寫) (PM分群)
      this.dss1Form.patchValue({ CUST_TAG: data.rspBody.items1[0].CUST_TAG })//客群標籤
      this.dss1Form.patchValue({ CUST_TAG_DESC: data.rspBody.items1[0].CUST_TAG_DESC })//客群標籤說明
      //風險模型資訊 (暫定移至別的頁面)?20211025
      this.dss1Form.patchValue({ RISKMDSUB_A0: data.rspBody.items1[0].RISKMDSUB_A0 })//風險模型子模型代碼
      this.dss1Form.patchValue({ RISKMDSUB_A0_DESC: data.rspBody.items1[0].RISKMDSUB_A0_DESC })//風險模型子模型說明
      this.dss1Form.patchValue({ RISKMDSCORE_A0: data.rspBody.items1[0].RISKMDSCORE_A0 })//風險模型分數
      this.dss1Form.patchValue({ RISKMDGRADE_A0: data.rspBody.items1[0].RISKMDGRADE_A0 })//風險模型等級
      this.dss1Form.patchValue({ RISKMDGRADE_A0_GP: data.rspBody.items1[0].RISKMDGRADE_A0_GP })//風險模型等級分群
      this.dss1Form.patchValue({ RISKMDGRADE_A0_ADJ: data.rspBody.items1[0].RISKMDGRADE_A0_ADJ })//風險模型等級(策略調整後)
      this.dss1Form.patchValue({ RISKMDGRADE_A0_GP_ADJ: data.rspBody.items1[0].RISKMDGRADE_A0_GP_ADJ })//風險模型等級分群(策略調整後)
      //策略模板資訊
      this.dss1Form.patchValue({ STRGY_MDUL: data.rspBody.items1[0].STRGY_MDUL })//試算授信策略模板分類
      this.dss1Form.patchValue({ STRGY_MDUL_ATVDT: data.rspBody.items1[0].STRGY_MDUL_ATVDT })//授信策略模板生效日期時間
      this.dss1Form.patchValue({ STRGY_RATE_ATVDT: data.rspBody.items1[0].STRGY_RATE_ATVDT })//利率模板生效日期時間
      //授信及產品條件
      this.dss1Form.patchValue({ STRGY_TMP_APRFRJ: data.rspBody.items1[0].STRGY_TMP_APRFRJ })//試算授信策略_准駁
      //額度限額資訊

      // this.dss1Form.patchValue({ STRGY_TMP_PRDCD:"1" })
      // this.dss2Form.patchValue({ STRGY_TMP_PRDCD:"2" })
      // this.dss3Form.patchValue({ STRGY_TMP_PRDCD:"3" })
    });
  }


}
