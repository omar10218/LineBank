import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  i=1;
  cancel()//離開
  {
    this.dialogRef.close();
  }

  onChange(evt)
  {

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
