import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OptionsCode } from '../interface/base';
import { F03018editComponent } from './f03018edit/f03018edit.component';
import { MatDialog } from '@angular/material/dialog'
import { F03018Service } from './f03018.service'

//Kim 千大企業名單維護
@Component({
  selector: 'app-f03018',
  templateUrl: './f03018.component.html',
  styleUrls: ['./f03018.component.css', '../../assets/css/f03.css']
})
export class F03018Component implements OnInit {
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

  constructor(
    private f03018Service: F03018Service,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }


//新增
  addNew(){

  }


//查詢
changeSelect(){

}

// 編輯
edit(){
const dialogRef = this.dialog.open(F03018editComponent,{
  panelClass: 'mat-dialog-transparent',
			minHeight: '70vh',
			width: '50%',
})
}
  //清除資料
  Clear() {
    this.cuCpNo = '' //員工編號
    this.cuCpName = '' //員工姓名
    this.cuCpSname = '' //員工ID
    this.cuCpType1Value = '' //代理人
    this.cuCpType2Value = '' //email
    this.useFlagValue = '' //是否在職

    this.cuCpSource.data = null
  }
}
