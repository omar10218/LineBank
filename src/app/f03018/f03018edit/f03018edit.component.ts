import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F03018Service } from '../f03018.service';

@Component({
  selector: 'app-f03018edit',
  templateUrl: './f03018edit.component.html',
  styleUrls: ['./f03018edit.component.css', '../../../assets/css/f03.css']
})
export class F03018editComponent implements OnInit {
  cuCpNo: string //公司統編
  cuCpName: string //公司名稱
  cuCpSname: string //公司簡稱
  cuCpType1Value: string //分類1
  cuCpType2Value: string //分類2
  cuCpType3Value:string//分類3
  useFlagValue: string //使用中
  codeTag:string //備註
  
  cuCpSource = new MatTableDataSource<any>() //千大企業Table

  cuCpType1Code: OptionsCode[] = [] //分類1
  cuCpType2Code: OptionsCode[] = [] //分類2
  useFlagCode: OptionsCode[] = [] //使用中
  jsonObject: any;
  constructor(
    public dialogRef: MatDialogRef<F03018editComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public f03018Service: F03018Service ,
  ) { }

  ngOnInit(): void {
    // this.oldCompareTable = this.data.compareTable
    this.getData()
  }

getData(){
this.cuCpNo=this.data.cuCpNo//公司統編
this.cuCpName=this.data.cuCpName//公司名稱
console.log(this.cuCpNo)
this.cuCpSname=this.data.cuCpSname//公司簡稱
this.cuCpType1Value=this.data.cuCpType1Value//類別1值
this.cuCpType2Value=this.data.cuCpType2Value//類別2值
console.log(this.cuCpType2Value)
this.cuCpType3Value=this.data.cuCpType3Value//類別3值
console.log(this.data.cuCpType3Value)
this.useFlagValue=this.data.useFlagValue//使用中值
this.codeTag=this.data.content//備註值
this.cuCpType1Code=this.data.cuCpType1Code;//類別1下拉
this.cuCpType2Code=this.data.cuCpType2Code;//類別2下拉

console.log(this.cuCpType1Code)
console.log(this.cuCpType2Code)
}
  //儲存
  public async stopEdit(): Promise<void>  {
    let msgStr: string = "";
    let jsonObject: any = {}
    const url  = 'f03/f03018action1';
    jsonObject['cuCpNo'] = this.cuCpNo
    jsonObject['cuCpName'] = this.cuCpName
    jsonObject['cuCpSname'] = this.cuCpSname
    jsonObject['cuCpType1'] = this.cuCpType1Value
    jsonObject['cuCpType2'] = this.cuCpType2Value
    jsonObject['cuCpType3'] = this.cuCpType3Value
    jsonObject['useFlag'] = this.useFlagValue
    jsonObject['content'] = this.codeTag
    jsonObject['rid'] = this.data.rowID
    console.log(this.codeTag)
    console.log(this.cuCpNo)
    console.log(this.cuCpName)
    console.log(this.cuCpType1Value)
    console.log(this.cuCpType3Value)
    console.log(this.codeTag)
    console.log(this.data.rowID)
     await this.f03018Service.oneseve(url,jsonObject).subscribe(data => {
       console.log(data)
      let msgStr = '';
      msgStr = (data.rspCode === '0000' && data.rspMsg === 'success') ? '儲存成功！' : '儲存失敗！';
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msgStr }
      });
      if (msgStr === '儲存成功！') { this.dialogRef.close({ event: 'success' }); }
      // if (data.rspMsg == '更新成功' && data.rspCode == '0000') {
      // 	this.dialog.open(ConfirmComponent, { data: { msgStr: '儲存成功' } })

      // }
    })
  }
  //離開
   //取消
   onNoClick(): void {
    this.dialogRef.close();
  }
 
}

