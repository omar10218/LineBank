import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Childscn18Service } from './childscn18.service';

@Component({
  selector: 'app-childscn18',
  templateUrl: './childscn18.component.html',
  styleUrls: ['./childscn18.component.css', '../../../assets/css/f01.css']
})
export class Childscn18Component implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Childscn18Component>,
    public childscn18Service: Childscn18Service
  ) { }

  empNo: string;  //上傳員編
  applno: string;  //案件編號
  swcID: string;  //身分證字號
  custID: string;  //客戶編號
  searchArray: string[] = [];  //查詢項目

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.swcID = sessionStorage.getItem('cuid');
    this.custID = "123456";  //待確認
    this.empNo = localStorage.getItem("empNo");
  }
  log(value: string[]): void {
    this.searchArray = value;
  }
  close() {
    this.dialogRef.close();
  }

  checkboxSelect(check: boolean, item: string) {
    console.log(item)
    if ( check ) {
      this.searchArray.push( item );
    } else {
      const index: number = this.searchArray.indexOf( item );
      this.searchArray.splice(index, 1);
    }
  }

  reSearch() {
    const url = "f01/childscn18action1";  //API
    let jsonObject: any = {};
    jsonObject['empNo'] = this.empNo;
    jsonObject['applno'] = this.applno;
    jsonObject['swcID'] = this.swcID;
    jsonObject['custID'] = this.custID;
    jsonObject['searchArray'] = this.searchArray.toString();
    this.childscn18Service.reSearch(url, jsonObject).subscribe(data => {
      console.log(data.rspBody);
    });
  }
}
