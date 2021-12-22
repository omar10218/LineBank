import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F02002Service } from '../f02002.service'

@Component({
  selector: 'app-f02002return',
  templateUrl: './f02002return.component.html',
  styleUrls: ['./f02002return.component.css','../../../assets/css/f02.css']
})
export class F02002returnComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<F02002returnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private f02002Service: F02002Service,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.set();
  }
  i=1;
  F02002Data = [];//初始陣列
  cancel()//離開
  {
    this.dialogRef.close();
  }

  onChange(evt)
  {

  }
  set()
  {
    let url = 'f02/f02002action3'
    let jsonObject: any = {};
    jsonObject['applno'] = this.data.applno;
    console.log(jsonObject)
    this.f02002Service.postJson(url,jsonObject).subscribe(data=>{
      console.log(data)
      this.F02002Data = data.rspBody;
      console.log(this.F02002Data)
    })
  }
  test()
  {


    if(this.i==0)
    {
      this.i=1;
    }
    else
    {
      this.i=0;
    }
  }
}
