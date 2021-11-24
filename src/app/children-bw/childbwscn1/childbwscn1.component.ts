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
}
