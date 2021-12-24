import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OptionsCode } from '../interface/base';
import { F03018editComponent } from './f03018edit/f03018edit.component';
import { MatDialog } from '@angular/material/dialog'
import { F03018Service } from './f03018.service'
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';

interface sysCode {
	value: string
	viewValue: string
}
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
  cuCpType3Value: string //分類3
  useFlagValue: string //使用中
  empNo: string;  //上傳員編

  cuCpSource = new MatTableDataSource<any>() //千大企業Table

  cuCpType1Code: sysCode[] = [] //分類1
  cuCpType2Code: sysCode[] = [] //分類2
  cuCpType3Code: sysCode[] = [] //分類3
  useFlagCode: sysCode[] = [] //使用中

  constructor(
    private f03018Service: F03018Service,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.empNo = localStorage.getItem("empNo");
    //分類1下拉選單
   
    this.getTypeselect()

       //分類2下拉選單
  }

getTypeselect(){
  const url = "f03/f03018"; 
  let jsonObject: any = {}
  this.f03018Service.getValueTypeselect(url,jsonObject).subscribe(data => {
    console.log(data)
    for (const jsonObj of data.rspBody.cuCpType1) {
      const codeNo = jsonObj.codeNo;
      const desc = jsonObj.CU_CP_TYPE1;
      this.cuCpType1Code.push({value: codeNo, viewValue: desc})
    }
    console.log(this.cuCpType1Code)
    for (const jsonObj of data.rspBody.cuCpType2) {
      const codeNo = jsonObj.codeNo;
      const desc = jsonObj.CU_CP_TYPE2;
      this.cuCpType2Code.push({value: codeNo, viewValue: desc})
    }
    console.log(this.cuCpType2Code)
  });
}
//新增
  addNew(){

  }


//查詢
changeSelect(){

}

//取得資料表
getElBigCompanyList() {
  if(this.cuCpNo==''|| this.cuCpName==''||this.cuCpSname==''||this.cuCpType1Value==''||this.cuCpType2Value==''||this.useFlagValue==''){
    const confirmDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: "請選擇建檔項目" }
    });
  }
  else{
    console.log(this.cuCpNo)
    console.log(this.cuCpName)
    console.log(this.cuCpSname)
    console.log(this.cuCpType1Value)
    console.log(this.cuCpType2Value)
    console.log(this.useFlagValue)
    const baseUrl = 'f03/f03018'
    let jsonObject: any = {}
    // jsonObject['empno'] =  this.empNo;
    jsonObject['cuCpNo'] = this.cuCpNo;
    jsonObject['cuCpName'] = this.cuCpName;
    jsonObject['cuCpSname'] = this.cuCpSname;
    jsonObject['cuCpType1'] = this.cuCpType1Value;
    jsonObject['cuCpType2'] = this.cuCpType2Value;
    jsonObject['useFlag'] = this.useFlagValue;
     
    this.f03018Service.getElBigCompanyList(baseUrl, jsonObject).subscribe(data => {
      console.log( data)
      this.cuCpSource=data.rspBody.items
      // console.log( data.rspBody.items)
      // this.total = data.rspBody.size
      // this.compareDataSetSource.data = data.rspBody.items
      // this.compareTableOption = data.rspBody.compareTable
      // this.compareColumnOption = data.rspBody.comparColumn
      // this.one = data.rspBody.items
      // this.useFlag = false
    })
  }
  
}

// 編輯
edit(isUpdate: boolean, row: any){
const dialogRef = this.dialog.open(F03018editComponent,{
  panelClass: 'mat-dialog-transparent',
			minHeight: '70vh',
			width: '50%',
    
      data:{
        cuCpNo:row.CU_CP_NO,
        cuCpName:row.CU_CP_NAME,
        cuCpSname:row.CU_CP_SNAME,
        cuCpType1Value:row.CU_CP_TYPE1,
        cuCpType2Value:row.CU_CP_TYPE2,
        cuCpType3Value:row.CU_CP_TYPE3,
        useFlagValue:row.USE_FLAG,
        content:row.CONTENT,
        cuCpType1Code:this.cuCpType1Code,
        cuCpType2Code:this.cuCpType2Code
      }
      
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
