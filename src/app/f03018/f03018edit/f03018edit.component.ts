import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OptionsCode } from 'src/app/interface/base';

@Component({
  selector: 'app-f03018edit',
  templateUrl: './f03018edit.component.html',
  styleUrls: ['./f03018edit.component.css',]
})
export class F03018editComponent implements OnInit {
  cuCpNo: string //公司統編
  cuCpName: string //公司名稱
  cuCpSname: string //公司簡稱
  cuCpType1Value: string //分類1
  cuCpType2Value: string //分類2
  useFlagValue: string //使用中

  cuCpSource = new MatTableDataSource<any>() //千大企業Table

  cuCpType1Code: OptionsCode[] = [] //分類1
  cuCpType2Code: OptionsCode[] = [] //分類2
  useFlagCode: OptionsCode[] = [] //使用中
  constructor() { }

  ngOnInit(): void {
  }

}
