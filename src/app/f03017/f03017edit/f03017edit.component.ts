import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { F03015Service } from 'src/app/f03015/f03015.service';
interface checkBox {
  value: string;
  completed: boolean;
}
interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03017edit',
  templateUrl: './f03017edit.component.html',
  styleUrls: ['./f03017edit.component.css']
})
export class F03017editComponent implements OnInit {

  constructor(public f03017Service: F03015Service,@Inject(MAT_DIALOG_DATA) public data: any) { }
  bkReasonCode: sysCode[] = [];
  bkReason: string;



  ngOnInit(): void {
    let isInsert = this.data.isInsert;
    this.f03017Service.getSysTypeCode('BK_REASON').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.bkReasonCode.push({ value: codeNo, viewValue: desc })
      }
    });

  }
}
