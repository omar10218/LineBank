import { DatePipe } from '@angular/common';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { OptionsCode } from '../interface/base';
import { F01015Service } from './f01015.service';

interface sysCode {
  value:string;
  viewValue: string;
}
@Component({
  selector: 'app-f01015',
  templateUrl: './f01015.component.html',
  styleUrls: ['./f01015.component.css', '../../assets/css/f01.css']
})
export class F01015Component implements OnInit {
  nationalId: string; //身分證字號
  custId: string; //customer_ID
  targetCustSource = []; //解凍降額Table
  creditMainSource = []; //貸後管理紀錄Table
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  YNCode: OptionsCode[] = []; //通知客戶
  resonCode: sysCode[] = []; //執行原因
  resonDetailCode: sysCode[] = []; //執行細項
  limitCode: sysCode[] = []; //額度號
  contactCode: sysCode[] = []; //通知方式
  bossCreditCode: sysCode[] = []; //主管核決
  executeCode: sysCode[] = [
    {value:'', viewValue: '請選擇' },
    {value:'1', viewValue: 'FRZ' },
    {value:'2', viewValue: 'DWN' },
    {value:'3', viewValue: 'HLD' }
   ];//執行策略
  YNValue: string;//通知客戶值
  executeValue:string;//執行措施策略值
  resonValue:string;//執行原因值
  resonDetail:string;//執行細項值
  limitNo:string//額度號值
  contact:string//通知方式值
  contactContent:string//通知內容值
  reserveLimit:number//預佔額度
  creditMemo:string //本次執行說明
  creditTime:any//本次執行時間
  creditEmpno:any//執行員編
  bossCreditValue:string//主管核決值
  bossContent:string//主管覆核值
  bossTime:any//主管覆核時間
  bossEmpno:any//主管覆核員編

  x: string
  constructor(
    private f01015Service: F01015Service,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
   this.getYNresult();
   this.getreson();
   this.YNValue = '';
   this.executeValue = '';

  }
  getTargetCustList() {
    if ((this.nationalId == null || this.nationalId == '') && (this.custId == null || this.custId == '')) {
      const confirmDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請輸入一項查詢項目" }
      });
    } else {
      let jsonObject: any = {};
      jsonObject['nationalId'] = this.nationalId
      jsonObject['custId'] = this.custId
      this.f01015Service.getImpertmentParameter(jsonObject).subscribe(data => {
        console.log(data)
        this.targetCustSource = data.rspBody.items
        this.creditMainSource = data.rspBody.creditMainlist
        console.log(data.rspBody.creditMainlist)
      })
    }
  }

getYNresult(){
  this.f01015Service.getSysTypeCode('YN').subscribe(data => {
    this.YNCode.push({ value: '', viewValue: '請選擇' })
    for (const jsonObj of data.rspBody.mappingList) {
      const codeNo = jsonObj.codeNo;
      const desc = jsonObj.codeDesc;
      this.YNCode.push({ value: codeNo, viewValue: desc })
    }
  
  });
}

//取本次執行原因下拉
 getreson(){
  let jsonObject: any = {};
  this.f01015Service.getReturn('f01/f01015', jsonObject).subscribe(data => {
    console.log(data)
    for (const jsonObj of data.rspBody.adrCodelist) {
      const codeNo = jsonObj.reasonCode;
      const desc = jsonObj.reasonDesc;
      this.resonCode.push({ value: codeNo, viewValue: desc });
    }
  });
 }

 //取本次執行原因下拉
 changeresonDetail(){
  let jsonObject: any = {};
  this.resonDetailCode=[];
  this.resonDetail="";
  jsonObject['reason']=this.resonValue
  console.log(this.resonValue)
  this.f01015Service.getReturn('f01/f01015action2', jsonObject).subscribe(data => {
    console.log(data)
   
  });
 }


	//+逗號
	toCurrency(amount: number) {
    this.x = '';
		this.x = (amount + "")
    if (this.x != null) {
			this.x = this.x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
		return this.x
		// return amount != null ? amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : amount;
	}

}
