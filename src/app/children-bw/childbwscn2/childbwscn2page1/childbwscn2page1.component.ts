import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Childbwscn2Service } from '../childbwscn2.service';
import { MatTableDataSource } from '@angular/material/table';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n'

//Nick 決策結果
@Component({
  selector: 'app-childbwscn2page1',
  templateUrl: './childbwscn2page1.component.html',
  styleUrls: ['./childbwscn2page1.component.css', '../../../../assets/css/child.css']
})
export class childbwscn2page1Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private Childbwscn2Service: Childbwscn2Service,
    private nzI18nService: NzI18nService) {
    this.nzI18nService.setLocale(zh_TW)
  }

  private applno: string;



    //策略1
    EL_DSS4_UNDW_LIST = new MatTableDataSource<any>();//徵審代碼
    EL_DSS4_UNDW_LIST1 = new MatTableDataSource<any>();//徵審代碼-信用異常資訊
    EL_DSS4_UNDW_LIST2 = new MatTableDataSource<any>();//徵審代碼-整體往來
    EL_DSS4_UNDW_LIST3 = new MatTableDataSource<any>();//徵審代碼-信用卡往來
    EL_DSS4_UNDW_LIST4 = new MatTableDataSource<any>();//徵審代碼-授信往來
    EL_DSS4_UNDW_LIST5 = new MatTableDataSource<any>();//徵審代碼-其他
    BW_DSS4_CFC_LIMIT= new MatTableDataSource<any>();//額度策略


  dss1Form1: FormGroup = this.fb.group({
    //系統決策
    RVPRCSCD: ['', []],//系統流程
    RVSTATCD: ['', []],//本次貸後管理狀態(策略調整後)
    RVSTATCD_ORGINAL: ['', []],//本次貸後管理狀態(策略調整前)

    //案件資訊
    RVCOLLFLAG: ['', []],//本次貸後管理註記
    JCICDATADT: ['', []],//本次執行審查使用JCIC日期時間
    RVCRL: ['', []],//本次貸後管理客戶風險等級CRL
    DEFTSTAT_INLB: ['', []],//行內消金往來最嚴重狀態
    DEFTSTAT_INJCIC: ['', []],//行外JCIC往來最嚴重狀態
    RV_NEXTDT: ['', []],//預計下次審查日期
    RV_NEXTDT_JCICREFRESHDAYS: ['', []],//預計下次審查日期之JCIC新鮮度天數
    RV_NEXTDT_QRYITEM: ['', []],//預計下次審查日期之發查範圍
    RV_MINPAYRT: ['', []],//本次貸後管理後-調整每月最低還款比例
    RV_DISB_BTCR_YN: ['', []],//本次帶後管理後-調整結帳日至還款日間客戶可申請動撥Y
    RV_RL_DISB_THRHLD: ['', []],//本次帶後管理後-調整循環信貸簡易檢核動撥金額門檻

    //貸後-風險模型資訊
    RISKMDGRAD_DIFF: ['', []],//與上次風險模型等級差距
    RV_RISKMDSUB: ['', []],//本次貸後管理風險模型
    RV_RISKMDSCORE: ['', []],//本次貸後管理風險模型分數
    RV_RISKMDGRADE: ['', []],//本次帶後管理風險模型等級
    RV_RISKMDGRADE_ADJ: ['', []],//本次貸後管理風險模型等級
    RV_RISKMDGRADE_GP: ['', []],//本次貸後管理風險
    RV_RISKMDGRADE_GP_ADJ: ['', []],//本次貸後管理風險模型等級分群(策略調整後)

    // JCIC註記
    BAM011_PASSDUE_CNT: ['', []],//BAM011最新延遲筆數統計
    BAM070_PASSDUE_CNT: ['', []],//BAM070現金卡日報逾期筆數統計
    LB_REVLN_USAGERT: ['', []],//本行循環信貸目前動用率
    JAS002_Y: ['', []],//信用異常註記JAS002
    VAM108_FY: ['', []],//受監護輔助宣告註記
    VAM106_ABNRMAL: ['', []],//信用異常註記VAM106
    VAM107_ABNRMAL: ['', []],//信用異常註記VAM107
    VAM108_ABNRMAL: ['', []],//信用異常註記VAM108
    BAM305_PASSDUEAMT: ['', []],//保證債務逾期金額
    BAM306_PASSDUEAMT: ['', []],//保證債務逾期金額
    BAM307_PASSDUEAMT: ['', []],//保證債務逾期金額
    UNSDEBT_AMT_501EX: ['', []],//無擔保負債(不含本行)_BAM501月報
    UNSDEBT_AMT_504EX: ['', []],//無擔保負債(不含本行)_BAM504扣除鑑價值
    UNSDEBT_AMTNEW_505EX: ['', []],//無擔保負債(不含本行)_BAM505新增核准額度
    UNSDEBT_AMTNEW_029EX: ['', []],//無擔保負債(不含本行)_BAM029新增核准額度
    UNSDEBT_824_RLLIMIT: ['', []],//本行無擔保負債_循環信貸額度
    UNSDEBT_824_ILBAL: ['', []],//本行無擔保負債_分期信貸放款餘額
    UNSDEBT_824_CCRBAL: ['', []],//本行無擔保負債_信用卡循環預借未到期 (預留)
    UNSDEBT_PAYAMT_029EX: ['', []],//(減項) 無擔保負債(不含本行)_BAM029清償金額
    DBR: ['', []],//無擔保倍數

  });



  ngOnInit(): void {
    this.getDSS11();
  }
  //取決策1Table
  getDSS11() {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childBwScn2action1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    this.Childbwscn2Service.getDate_Json(url, jsonObject).subscribe(data => {
      //系統決策
      this.dss1Form1.patchValue({ RVPRCSCD: data.rspBody.bwDss4List[0].rvprcscd })//系統流程
      this.dss1Form1.patchValue({ RVSTATCD: data.rspBody.bwDss4List[0].rvstatcd })//本次貸後管理狀態(策略調整後)
      this.dss1Form1.patchValue({ RVSTATCD_ORGINAL: data.rspBody.bwDss4List[0].rvstatcdOrginal })//本次貸後管理狀態(策略調整前)
      //案件資訊
      this.dss1Form1.patchValue({ RVCOLLFLAG: data.rspBody.bwDss4List[0].rvcollflag })//本次貸後管理註記
      this.dss1Form1.patchValue({ JCICDATADT: data.rspBody.bwDss4List[0].jcicdatadt })//本次執行審查使用JCIC日期時間
      this.dss1Form1.patchValue({ RVCRL: data.rspBody.bwDss4List[0].rvcrl })//本次貸後管理客戶風險等級CRL
      this.dss1Form1.patchValue({ DEFTSTAT_INLB: data.rspBody.bwDss4List[0].deftstatInlb })//行內消金往來最嚴重狀態
      this.dss1Form1.patchValue({ DEFTSTAT_INJCIC: data.rspBody.bwDss4List[0].deftstatInjcic })//行外JCIC往來最嚴重狀態
      this.dss1Form1.patchValue({ RV_NEXTDT: data.rspBody.bwDss4List[0].rvNextdt })//預計下次審查日期
      this.dss1Form1.patchValue({ RV_NEXTDT_JCICREFRESHDAYS: data.rspBody.bwDss4List[0].rvNextdtJcicrefreshdays })//預計下次審查日期之JCIC新鮮度天數
      this.dss1Form1.patchValue({ RV_NEXTDT_QRYITEM: data.rspBody.bwDss4List[0].rvNextdtQryitem })//預計下次審查日期之發查範圍
      this.dss1Form1.patchValue({ RV_MINPAYRT: data.rspBody.bwDss4List[0].rvMinpayrt })//本次貸後管理後-調整每月最低還款比例
      this.dss1Form1.patchValue({ RV_DISB_BTCR_YN: data.rspBody.bwDss4List[0].rvDisbBtcrYn })//本次貸後管理後-調整結帳日至還款日間客戶可申請動撥Y
      this.dss1Form1.patchValue({ RV_RL_DISB_THRHLD: data.rspBody.bwDss4List[0].rvRlDisbThrhld })//本次貸後管理後-調整循環信貸簡易檢核動撥金額門檻
       //貸後-風險模型資訊
       this.dss1Form1.patchValue({ RISKMDGRAD_DIFF: data.rspBody.bwDss4List[0].riskmdgradDiff })//與上次風險模型等級差距
       this.dss1Form1.patchValue({ RV_RISKMDSUB: data.rspBody.bwDss4List[0].rvRiskmdsub })//本次貸後管理風險模型
       this.dss1Form1.patchValue({ RV_RISKMDSCORE: data.rspBody.bwDss4List[0].rvRiskmdscore })//本次貸後管理風險模型分數
       this.dss1Form1.patchValue({ RV_RISKMDGRADE: data.rspBody.bwDss4List[0].rvRiskmdgrade })//本次帶後管理風險模型等級
       this.dss1Form1.patchValue({ RV_RISKMDGRADE_ADJ: data.rspBody.bwDss4List[0].rvRiskmdgradeAdj })//本次貸後管理風險模型等級
       this.dss1Form1.patchValue({ RV_RISKMDGRADE_GP: data.rspBody.bwDss4List[0].rvRiskmdgradeGp })//本次貸後管理風險
       this.dss1Form1.patchValue({ RV_RISKMDGRADE_GP_ADJ: data.rspBody.bwDss4List[0].rvRiskmdgradeGpAdj })//本次貸後管理風險模型等級分群(策略調整後)
       //JCIC註記
       this.dss1Form1.patchValue({ BAM011_PASSDUE_CNT: data.rspBody.bwDss4List[0].bam011PassdueCnt })//BAM011最新延遲筆數統計
       this.dss1Form1.patchValue({ BAM070_PASSDUE_CNT: data.rspBody.bwDss4List[0].bam070PassdueCnt })//BAM070現金卡日報逾期筆數統計
       this.dss1Form1.patchValue({ LB_REVLN_USAGERT: data.rspBody.bwDss4List[0].lbRevlnUsagert })//本行循環信貸目前動用率
       this.dss1Form1.patchValue({ JAS002_Y: data.rspBody.bwDss4List[0].jas002Y })//信用異常註記JAS002
       this.dss1Form1.patchValue({ VAM108_FY: data.rspBody.bwDss4List[0].vam108Fy })//受監護輔助宣告註記
       this.dss1Form1.patchValue({ VAM106_ABNRMAL: data.rspBody.bwDss4List[0].vam106Abnrmal })//信用異常註記VAM106
       this.dss1Form1.patchValue({ VAM107_ABNRMAL: data.rspBody.bwDss4List[0].vam107Abnrmal })//信用異常註記VAM107
       this.dss1Form1.patchValue({ VAM108_ABNRMAL: data.rspBody.bwDss4List[0].vam108Abnrmal })//信用異常註記VAM108
       this.dss1Form1.patchValue({ BAM305_PASSDUEAMT: data.rspBody.bwDss4List[0].bam305Passdueamt })//保證債務逾期金額
       this.dss1Form1.patchValue({ BAM306_PASSDUEAMT: data.rspBody.bwDss4List[0].bam306Passdueamt })//保證債務逾期金額
       this.dss1Form1.patchValue({ BAM307_PASSDUEAMT: data.rspBody.bwDss4List[0].bam307Passdueamt })//保證債務逾期金額
       this.dss1Form1.patchValue({ UNSDEBT_AMT_501EX: data.rspBody.bwDss4List[0].unsdebtAmt501ex })//無擔保負債(不含本行)_BAM501月報
       this.dss1Form1.patchValue({ UNSDEBT_AMT_504EX: data.rspBody.bwDss4List[0].unsdebtAmt504ex })//無擔保負債(不含本行)_BAM504扣除鑑價值
       this.dss1Form1.patchValue({ UNSDEBT_AMTNEW_505EX: data.rspBody.bwDss4List[0].unsdebtAmtnew505ex })//無擔保負債(不含本行)_BAM505新增核准額度
       this.dss1Form1.patchValue({ UNSDEBT_AMTNEW_029EX: data.rspBody.bwDss4List[0].unsdebtAmtnew029ex })//無擔保負債(不含本行)_BAM029新增核准額度
       this.dss1Form1.patchValue({ UNSDEBT_824_RLLIMIT: data.rspBody.bwDss4List[0].unsdebt824Rllimit })//本行無擔保負債_循環信貸額度
       this.dss1Form1.patchValue({ UNSDEBT_824_ILBAL: data.rspBody.bwDss4List[0].unsdebt824Ilbal })//本行無擔保負債_分期信貸放款餘額
       this.dss1Form1.patchValue({ UNSDEBT_824_CCRBAL: data.rspBody.bwDss4List[0].unsdebt824Ccrbal })//本行無擔保負債_信用卡循環預借未到期 (預留
       this.dss1Form1.patchValue({ UNSDEBT_PAYAMT_029EX: data.rspBody.bwDss4List[0].unsdebtPayamt029ex })//(減項) 無擔保負債(不含本行)_BAM029清償金額
       this.dss1Form1.patchValue({ DBR: data.rspBody.bwDss4List[0].dbr })//無擔保倍數

       this.EL_DSS4_UNDW_LIST.data = data.rspBody.bwDss4UndwList;//徵審代碼
       if (data.rspBody.DSS1UNDWLIST.length > 0) {
         this.EL_DSS4_UNDW_LIST1.data = this.EL_DSS4_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '1');//1	信用異常資訊
         this.EL_DSS4_UNDW_LIST2.data = this.EL_DSS4_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '2');//2	整體往來
         this.EL_DSS4_UNDW_LIST3.data = this.EL_DSS4_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '3');//3	信用卡往來
         this.EL_DSS4_UNDW_LIST4.data = this.EL_DSS4_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '4');//4	授信往來
         this.EL_DSS4_UNDW_LIST5.data = this.EL_DSS4_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '9');//9	其他
       }
      this.BW_DSS4_CFC_LIMIT.data = data.rspBody.bwDss4CfcLimit ;//試算額度策略
    });
  }





}
