import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Childbwscn2Service } from '../childbwscn2.service';
import { MatTableDataSource } from '@angular/material/table';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n'
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';

//Nick 決策結果
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-childbwscn2page1',
  templateUrl: './childbwscn2page1.component.html',
  styleUrls: ['./childbwscn2page1.component.css', '../../../../assets/css/child.css']
})
export class childbwscn2page1Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private Childbwscn2Service: Childbwscn2Service,
    private nzI18nService: NzI18nService,
    public dialog: MatDialog,) {
    this.nzI18nService.setLocale(zh_TW)
  }

  private applno: string;
  private page: string;
  //覆審:L4 覆審主管:L3
  private creditlevel = ""; //儲存層級
  //覆審資訊
  bwCreditAuditinfoList: Data[] = [];
  bwCreditMainList: Data[] = [];
  add_bwCreditMainList: any;
  add_bwCreditAuditinfoList: any;
  cuCName: string;
  custId: string;
  nationalId: string;
  userId: string;
  creditaction: string = ""; //審核註記
  total = 1;
  pageIndex = 1;
  pageSize = 50;
  creditmemoSource: Data[] = [];
  search: string;
  size = 0//此層級是否有資料
  mark: string;
  //審核結果
  BW_creditResult: string
  reason_CODE: sysCode[] = [];//本次執行原因陣列
  reasoncode: string = '';//本次執行原因
  reason_DETAIL: sysCode[] = [];//本次執行原因細項陣列
  reasondetail: string = '';//本次執行原因細項
  limitList: sysCode[] = [];//額度號陣列
  limit: string = '';//額度
  preempt:string;//預佔額度
  //審核結果選項
  BW_creditResult_Code: OptionsCode[] = [{ value: 'FRZ', viewValue: 'FRZ' }, { value: 'DWN', viewValue: 'DWN' }, { value: 'HLD', viewValue: 'HLD' }
    , { value: 'NEX', viewValue: 'NEX' }, { value: 'N00', viewValue: 'N00' }, { value: 'XXX', viewValue: 'XXX' }, { value: '000', viewValue: '000' }];

  ynCode: OptionsCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }];


  //策略1
  EL_DSS4_UNDW_LIST = new MatTableDataSource<any>();//徵審代碼
  EL_DSS4_UNDW_LIST1 = new MatTableDataSource<any>();//徵審代碼-信用異常資訊
  EL_DSS4_UNDW_LIST2 = new MatTableDataSource<any>();//徵審代碼-整體往來
  EL_DSS4_UNDW_LIST3 = new MatTableDataSource<any>();//徵審代碼-信用卡往來
  EL_DSS4_UNDW_LIST4 = new MatTableDataSource<any>();//徵審代碼-授信往來
  EL_DSS4_UNDW_LIST5 = new MatTableDataSource<any>();//徵審代碼-其他
  BW_DSS4_CFC_LIMIT = new MatTableDataSource<any>();//額度策略


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
    this.applno = sessionStorage.getItem('applno');
    this.nationalId = sessionStorage.getItem('swcNationalId');
    this.userId = localStorage.getItem("empNo");
    this.custId = sessionStorage.getItem('swcCustId');
    this.search = sessionStorage.getItem('search');
    this.page = sessionStorage.getItem('page');
    this.creditlevel = this.page == "9" ? "L4" : this.creditlevel;
    this.creditlevel = this.page == "10" ? "L3" : this.creditlevel;
    this.getCreditMainList();
  }
  //取決策1Table
  getDSS11() {
    this.applno = sessionStorage.getItem('applno');
    const url = 'f01/childBwScn2action1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    this.Childbwscn2Service.getDate_Json(url, jsonObject).subscribe(data => {

      if (data.rspBody.bwDss4List != null && data.rspBody.bwDss4List.length > 0) {

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

      }

      this.EL_DSS4_UNDW_LIST.data = data.rspBody.bwDss4UndwList;//徵審代碼
      if (data.rspBody.bwDss4UndwList != null && data.rspBody.bwDss4UndwList.length > 0) {
        this.EL_DSS4_UNDW_LIST1.data = this.EL_DSS4_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '1');//1	信用異常資訊
        this.EL_DSS4_UNDW_LIST2.data = this.EL_DSS4_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '2');//2	整體往來
        this.EL_DSS4_UNDW_LIST3.data = this.EL_DSS4_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '3');//3	信用卡往來
        this.EL_DSS4_UNDW_LIST4.data = this.EL_DSS4_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '4');//4	授信往來
        this.EL_DSS4_UNDW_LIST5.data = this.EL_DSS4_UNDW_LIST.data.filter(c => c.UP_REASON_CODE == '9');//9	其他
      }
      if (data.rspBody.bwDss4CfcLimit != null) {
        this.BW_DSS4_CFC_LIMIT.data = data.rspBody.bwDss4CfcLimit;//試算額度策略
      }

    });
  }
  //查詢 上方主資料
  getCreditMainList() {
    const url = 'f01/childbwscn1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    this.Childbwscn2Service.getDate_Json(url, jsonObject).subscribe(data => {
      console.log(data)
      this.bwCreditMainList = data.rspBody.bwCreditMainList;
      if (this.bwCreditMainList.length < 1) {
        this.add_bwCreditMainList = {
          applno: this.applno,//案件編號
          nationalId: '',//身分證字號
          custId: '',//客戶ID
          cuCname: '',//姓名
          abnormalFlag: '' //符合貸後異常名單
          //客戶身分名單註記
        }
        this.bwCreditMainList.push(this.add_bwCreditMainList);
      }
      this.limitList.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.limitList) {
        const value = jsonObj['limitNo'];
        const viewValue = jsonObj['limitNo'];
        this.limitList.push({ value: value, viewValue: viewValue })
      }
      this.reason_CODE.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.reasonCode) {
        const value = jsonObj['reasonCode'];
        const viewValue = jsonObj['reasonDesc'];
        this.reason_CODE.push({ value: value, viewValue: viewValue })
      }


    });

  }

  creditaction_keyup() {
    sessionStorage.setItem('creditaction', this.creditaction);
  }
  // 1文審 2徵信 3授信 4主管 5Fraud 7授信複合 8徵審後落人 9複審人員 10複審主管  12產生合約前覆核 0申請查詢 02補件資訊查詢 03複審案件查詢 05歷史案件查詢 07客戶案件查詢
  getPage() {
    return this.page
  }
  //查詢 審核意見
  getCreditmemo(pageIndex: number, pageSize: number) {
    const url = 'f01/childbwscn1scn1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.Childbwscn2Service.getDate_Json(url, jsonObject).subscribe(data => {
      this.creditmemoSource = data.rspBody.list;
      for (const data of this.creditmemoSource) {
        this.size = (data.CREDITLEVEL != null && data.CREDITLEVEL == this.creditlevel) ? this.size + 1 : this.size;//判斷是否有資料
        if (data.CREDITLEVEL == this.creditlevel && data.CREDITUSER.includes(this.userId)) {
          this.mark = data.CREDITACTION;
        }
      }
      sessionStorage.setItem('size', this.size.toString());
    });
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params
    this.pageSize = pageSize
    this.pageIndex = pageIndex
    this.getCreditmemo(pageIndex, pageSize)
  }
  //儲存
  save() {
    alert(this.creditaction)
    console.log('aaaaaa')
    alert(this.mark)
    if (this.creditaction == "" || this.creditaction == null) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請輸入審核意見' }
      });
      return;
    }
    let msg = "";
    const url = 'f01/childbwscn1action1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['creditaction'] = this.creditaction;
    jsonObject['creditlevel'] = this.creditlevel;
    console.log(jsonObject)
    this.Childbwscn2Service.getDate_Json(url, jsonObject).subscribe(data => {
      console.log(data)
      msg = data.rspMsg;
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msg }
      });
      this.changePage();
      this.getCreditmemo(this.pageIndex, this.pageSize);
    });
  }
  changePage() {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.total = 1;
  }
  //Level轉換中文
  changeLevel(level: string) {
    if (level == 'L4') {
      return "覆審人員"
    } else if (level == 'L3') {
      return "覆審主管"
    }
  }
  //審核結果 資料改變
  radio_change() {
    sessionStorage.setItem('BW_creditResult', this.BW_creditResult);
    sessionStorage.setItem('BW_reasonCode', this.reasoncode);
    sessionStorage.setItem('BW_reasondetail', this.reasondetail);
    sessionStorage.setItem('BW_limit', this.limit);
    sessionStorage.setItem('BW_preempt', this.preempt !=undefined ?this.Cut(this.preempt):"0");
    // alert(sessionStorage.getItem('BW_creditResult'));


  }
  //是否為查詢
  getSearch() {
    return this.search
  }
  reason()//本次執行原因
  {
    this.radio_change();
    this.reasondetail ='';
    let url ='f01/childbwscn1action3'
    let jsonObject: any = {};
    jsonObject['reasonCode']=this.reasoncode;
    this.Childbwscn2Service.getDate_Json(url,jsonObject).subscribe(data=>{
      console.log(data)
      this.reason_DETAIL.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody) {
        const value = jsonObj['reasonCode'];
        const viewValue = jsonObj['reasonDesc'];
        this.reason_DETAIL.push({ value: value, viewValue: viewValue })
      }
    })
  }
  dealwith(x:string)//篩選加千分號
  {
    x = x.replace(/\D/g, '')
    if (x.length > 0) {
      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    this.preempt = x;
    this.radio_change();
  }
  Cut(s: string)//處理千分位
  {
    if (s != null) {
      s = s.replace(/,/g, "")
    }

    return s
  }
}
