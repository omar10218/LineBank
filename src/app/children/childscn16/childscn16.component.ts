import { Component, OnInit } from '@angular/core';
import { ChildrenService } from '../children.service';
import { Childscn16Service } from './childscn16.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {Childscn2Component} from'../childscn2/childscn2.component'
@Component({
  selector: 'app-childscn16',
  templateUrl: './childscn16.component.html',
  styleUrls: ['./childscn16.component.css']
})
export class Childscn16Component implements OnInit {

  constructor(
    private childscn16Service: Childscn16Service,
    private pipe: DatePipe,
    public childService: ChildrenService,
    public dialog: MatDialog,) { }
  applno: string;
  jsonObject: any = {};
  data: any;//裝一開始的資料表
  ruleParamCondition = new MatTableDataSource<any>();
  ngOnInit(): void {
    const caseParams = this.childService.getData();
    this.applno = caseParams.applno;
    this.test();
  }
  Inquire(id:string)
  {
    const dialogRef = this.dialog.open(Childscn2Component, {

    });

  }
  test()
  {
    let url = 'f01/childscn16';
    this.jsonObject['applno'] = this.applno;
    this.childscn16Service.selectCustomer(url,this.jsonObject).subscribe(data=>{
      this.data = data.rspBody;
      console.log(this.data);
    })
  }
}
