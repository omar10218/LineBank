import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { OptionsCode } from 'src/app/interface/base';

@Component({
  selector: 'app-childbwscn1',
  templateUrl: './childbwscn1.component.html',
  styleUrls: ['./childbwscn1.component.css', '../../../assets/css/child.css']
})
export class Childbwscn1Component implements OnInit {

  constructor() { }

  applno: string;
  cuCName: string;
  custId: string;
  nationalId: string;
  mark: string;

  ynCode: OptionsCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }];

  //Creditmemo
  creditmemoSource: Data[] = [];
  total = 1;
  pageIndex = 1;
  pageSize = 50;

  //審核結果
  BW_creditResult: string
  //審核結果選項
  BW_creditResult_Code: OptionsCode[] = [{ value: 'FRZ', viewValue: 'FRZ' }, { value: 'DWN', viewValue: 'DWN' }, { value: 'HLD', viewValue: 'HLD' }
    , { value: 'NEX', viewValue: 'NEX' }, { value: 'N00', viewValue: 'N00' }, { value: 'XXX', viewValue: 'XXX' }, { value: '000', viewValue: '000' }];

  ngOnInit(): void {
  }

  //儲存
  public async save(): Promise<void> {

  }

  getCreditmemo(pageIndex: number, pageSize: number) {

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.getCreditmemo(pageIndex, pageSize);
  }

  test(){
    alert(this.BW_creditResult);
  }
}
