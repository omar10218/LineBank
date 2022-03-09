import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-childscn11page6',
  templateUrl: './childscn11page6.component.html',
  styleUrls: ['./childscn11page6.component.css']
})
export class Childscn11page6Component implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Childscn11page6Component>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  applnoDate:any [] = []
  cuid:string
  total: any
	pageSize = 10
	pageIndex = 1
  
  ngOnInit(): void {
    this.applnoDate = this.data.data.rspBody
    this.cuid = sessionStorage.getItem('nationalId');
  }
  Inquire(col: string) //查詢
  {
    console.log(col)
    // const url = 'f01/childscn11action2';
    // let jsonObject: any = {};
    // jsonObject['nationalId'] = this.cuid;
    // jsonObject['applno'] = this.applno;
    // jsonObject['code'] = 'EL_HISTORY_COMPARE_UNID';
    // jsonObject['col'] = col;
    // this.childscn11Service.selectCustomer(url, jsonObject).subscribe(data => {

      
      sessionStorage.setItem('applno', col);
      sessionStorage.setItem('nationalId', this.cuid);
    //   // sessionStorage.setItem('custId', this.custId);
      sessionStorage.setItem('search','Y');
      sessionStorage.setItem('queryDate', '');
      sessionStorage.setItem('winClose', 'Y');

    //   //開啟徵審主畫面
      const url = window.location.href.split("/#");
      window.open( url[0] + "/#/F01002/F01002SCN1");
      sessionStorage.setItem('winClose', 'N');
      sessionStorage.setItem('search','N');
      sessionStorage.setItem('applno', col);
    // })
  }
   //取消
   onNoClick(): void {
    this.dialogRef.close()
  }

}
