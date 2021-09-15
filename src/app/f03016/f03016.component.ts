import { F03016confirmComponent } from './f03016confirm/f03016confirm.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { F03016Service } from './f03016.service';;
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MappingCode } from '../mappingcode.model';


interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03016',
  templateUrl: './f03016.component.html',
  styleUrls: ['./f03016.component.css']
})
export class F03016Component implements OnInit {

  favoriteSeason: string = '';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  compareTableCode: sysCode[] = [];
  DssJcicSet:number = 0;
  BasicLimit:number = 0;
  IsJcic: string = '';
  // TableName: string;
  // OriginalValue:number = 0;
  // CurrentlValue:number = 0;
  // TransEmpNo:number;
  customerInfoForm: FormGroup = this.fb.group({
    DSS_JCIC_SET: ['', []],
    BASIC_LIMIT: ['', []],
    IS_JCIC: ['', []],

    TABLE_NAME: ['', []],
    COLUMN_NAME: ['', []],
    ORIGINAL_VALUE: ['', []],
    CURRENT_VALUE: ['', []],
    TRANS_DATE: ['', []],
    TRANS_EMP_NO: ['', []],

  });


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<F03016Service>,private f03016Service: F03016Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const baseUrl = 'f03/f03016';
    // this.f03016Service.getTableDataSetList()
    // .subscribe(data => {
    //   this.DssJcicSet = data.rspBody.size;
    //   this.BasicLimit= data.rspBody.items;
    //   this.IsJcic = data.rspBody.compareTable;
    //   this.TableName = data.rspBody.compareTable;
    //   this.OriginalValue = data.rspBody.compareTable;
    //   this.CurrentlValue = data.rspBody.compareTable;
    //   this.TransEmpNo = data.rspBody.compareTable;
    // });
    this.getCustomerInfo();
  }
  getCustomerInfo(){
    const formdata: FormData = new FormData();
    this.f03016Service.getCustomerInfoSearch(formdata).subscribe(data => {
      console.log(data)
      // this.customerInfoForm.patchValue({ DSS_JCIC_SET: data.rspBody.items[0].DssJcicSet })
      // this.customerInfoForm.patchValue({ BASIC_LIMIT: data.rspBody.items[0].BasicLimit })
      // this.customerInfoForm.patchValue({ IS_JCIC: data.rspBody.items[0].IsJcic })
      // this.customerInfoForm.patchValue({ TABLE_NAME: data.rspBody.items[0].TableName })
      // this.customerInfoForm.patchValue({ COLUMN_NAME: data.rspBody.items[0].ColumnName })
      // this.customerInfoForm.patchValue({ ORIGINAL_VALUE: data.rspBody.items[0].OriginalValue })
      // this.customerInfoForm.patchValue({ CURRENT_VALUE: data.rspBody.items[0].CurrentlValue })
      // this.customerInfoForm.patchValue({ TRANS_DATE: data.rspBody.items[0].TransDate })
      // this.customerInfoForm.patchValue({ TRANS_EMP_NO: data.rspBody.items[0].TransEmpNo })

      this.DssJcicSet = data.rspBody.ipList[0].dssJcicSet;
      this.IsJcic = data.rspBody.ipList[0].isJcic;
      console.log(this.IsJcic);
    });
  }

  public async save(): Promise<void> {
    let msgStr: string = "";
    let baseUrl = 'f03/f03016action2';

    msgStr = await this.f03016Service.update(baseUrl, {
        DssJcicSet: this.DssJcicSet,
        BasicLimit: this.DssJcicSet,
        IsJcic: this.IsJcic,
    });

    const childernDialogRef = this.dialog.open(F03016confirmComponent, {
      data: { msgStr: msgStr }
    });
    if (msgStr === '儲存成功！') { this.dialogRef.close({ event: 'success' }); }
  }

  ngAfterViewInit(): void {

  }
}
