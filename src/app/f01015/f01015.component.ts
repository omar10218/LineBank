import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { F01015Service } from './f01015.service';

interface sysCode {
  viewValue: string
}
@Component({
  selector: 'app-f01015',
  templateUrl: './f01015.component.html',
  styleUrls: ['./f01015.component.css', '../../assets/css/f01.css']
})
export class F01015Component implements OnInit {
  nationalId: string //身分證字號
  custId : string //customer_ID
  targetCustSource = new MatTableDataSource<any>() //解凍降額Table

  constructor(
    private F01015Service: F01015Service,
    public dialog: MatDialog,
    private datePipe: DatePipe,

  ) { }

  ngOnInit(): void {
  }
getTargetCustList(){
  if(this.nationalId==" "||this.custId==" ")
  {
    const confirmDialogRef = this.dialog.open(ConfirmComponent, {
      data: { msgStr: "請選擇一項查詢項目" }
    });
  }
}
}
