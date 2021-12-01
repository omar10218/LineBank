import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { OptionsCode } from 'src/app/interface/base';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { Childbwscn1Service } from './childbwscn1.service';
import { Childbwscn1editComponent } from './childbwscn1edit/childbwscn1edit.component';

@Component({
  selector: 'app-childbwscn1',
  templateUrl: './childbwscn1.component.html',
  styleUrls: ['./childbwscn1.component.css', '../../../assets/css/child.css']
})
export class Childbwscn1Component implements OnInit {

  constructor(
    public dialog: MatDialog,
    public childbwscn1Service: Childbwscn1Service,
  ) { }

  applno: string;
  cuCName: string;
  custId: string;
  nationalId: string;
  mark: string;
  size=0//此層級是否有資料

  private page: string;
  //覆審:L4 覆審主管:L3
  private creditlevel =""; //儲存層級
  creditaction: ""; //審核註記

  ynCode: OptionsCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }];

  //Creditmemo
  creditmemoSource: Data[] = [];
  bwCreditAuditinfoList: Data[] = [];
  bwCreditMainList: Data[] = [];
  total = 1;
  pageIndex = 1;
  pageSize = 50;

  //審核結果
  BW_creditResult: string
  //審核結果選項
  BW_creditResult_Code: OptionsCode[] = [{ value: 'FRZ', viewValue: 'FRZ' }, { value: 'DWN', viewValue: 'DWN' }, { value: 'HLD', viewValue: 'HLD' }
    , { value: 'NEX', viewValue: 'NEX' }, { value: 'N00', viewValue: 'N00' }, { value: 'XXX', viewValue: 'XXX' }, { value: '000', viewValue: '000' }];

  ngOnInit(): void {
    sessionStorage.setItem('BW_creditResult', "");
    sessionStorage.setItem('size', "0");
    sessionStorage.setItem('creditaction', "");
    this.page = sessionStorage.getItem('page');
    this.applno = sessionStorage.getItem('applno');
    this.creditlevel = this.page == "9" ? "L4" : this.creditlevel;
    this.creditlevel = this.page == "10" ? "L3" : this.creditlevel;
    this.getCreditmemo(this.pageIndex, this.pageSize);
    this.getCreditMainList();
  }

  //查詢 審核意見
  getCreditmemo(pageIndex: number, pageSize: number) {
    const url = 'f01/childbwscn1scn1';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.childbwscn1Service.postJson(url, jsonObject).subscribe(data => {
      this.creditmemoSource=data.rspBody.list;
      for(const data of this.creditmemoSource){
        this.size=(data.CREDITLEVEL!=null&&data.CREDITLEVEL==this.creditlevel)?this.size+1:this.size;//判斷是否有資料
      }
      sessionStorage.setItem('size', this.size.toString());
      console.log('getCreditmemo')
      console.log(data)
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
		const {pageSize, pageIndex} = params
		this.pageSize = pageSize
		this.pageIndex = pageIndex
		this.getCreditmemo(pageIndex, pageSize)
	}

  //0查詢 1文審 2徵信 3授信 4主管 5Fraud 6申覆 8產生合約前回查 9複審人員 10複審主管
  getPage() {
    return this.page
    //測試用
    // return '0'
  }

   //查詢 上方主資料
   getCreditMainList() {
    const url = 'f01/childbwscn1';
    let jsonObject: any = {};
    // jsonObject['applno'] = this.applno;
    //測試用
    jsonObject['applno'] = '20210927E011';
    this.childbwscn1Service.postJson(url, jsonObject).subscribe(data => {
      // console.log('getCreditMainList')
      // console.log(data)
      this.bwCreditAuditinfoList=data.rspBody.bwCreditAuditinfoList;
      this.bwCreditMainList=data.rspBody.bwCreditMainList;
      console.log('bwCreditAuditinfoList')
      console.log(this.bwCreditAuditinfoList)
      console.log('bwCreditMainList')
      console.log(this.bwCreditMainList)
    });
  }

  //儲存
  save() {
    if(this.creditaction==""||this.creditaction==null){
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
    console.log('jsonObject')
    console.log(jsonObject)
    this.childbwscn1Service.postJson(url, jsonObject).subscribe(data => {
      if(data.rspMsg=="儲存成功!"){this.getCreditmemo(this.pageIndex, this.pageSize);}
      msg = data.rspMsg ;
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msg }
      });
      // console.log('savedata')
      // console.log(data)
    });
  }

    //審核註記編輯
    startEdit(creditaction: string, rowId: string) {
      const dialogRef = this.dialog.open(Childbwscn1editComponent, {
        minHeight: '70vh',
        width: '50%',
        panelClass: 'mat-dialog-transparent',
        data: {
          creditaction: creditaction,
          applno: this.applno,
          level:this.creditlevel,
          rowId: rowId
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getCreditmemo(this.pageIndex, this.pageSize);
      });
    }

    //審核結果 資料改變
    radio_change(){
      sessionStorage.setItem('BW_creditResult', this.BW_creditResult);
      // alert(sessionStorage.getItem('BW_creditResult'));
    }

    creditaction_keyup(){
      sessionStorage.setItem('creditaction', this.creditaction);
    }

}
