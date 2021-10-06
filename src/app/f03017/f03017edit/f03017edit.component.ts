import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor( private fb: FormBuilder,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private route: ActivatedRoute,) { }
  reportReason1: sysCode[] = [];  //通報原因1下拉
  reportReason2: sysCode[] = [];  //通報原因2下拉
  reportReason3: sysCode[] = []; //通報原因3下拉
  useFlag: sysCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }]; //使用中下拉
  reportReason1Value: string;  //通報原因1選擇
  reportReason2Value: string;  //通報原因2選擇
  reportReason3Value: string; //通報原因3選擇
  useFlagValue: string; //使用中選擇

  blockListForm: FormGroup = this.fb.group({
    REPORT_UNIT: [this.data.no, []],
    REPORT_REASON1: [this.data.reportReason1Value, []],
    REPORT_REASON2: [this.data.reportReason2Value, []],
    REPORT_REASON3: [this.data.reportReason3Value, []],
    REPORT_CONTENT: [this.data.REPORT_CONTENT, []],
    USE_FLAG: [this.data.USE_FLAG, []],
    BK_COLUMN: [this.data.BK_COLUMN, []],
    BK_CONTENT: [this.data.BK_CONTENT, []],
    CU_CNAME: [this.data.CU_CNAME, []],
    NATIONAL_ID: [this.data.NATIONAL_ID, []],
    CU_H_TEL: [this.data.CU_H_TEL, []],
    CU_CP_TEL: [this.data.CU_CP_TEL, []],
    CU_M_TEL: [this.data.CU_M_TEL, []],
    pageIndex: ['', [Validators.maxLength(3)]],
    pageSize: ['', [Validators.maxLength(3)]]
  });
  formControl = new FormControl('', [
    Validators.required
  ]);

  blockListDataSource = new MatTableDataSource<any>();
  private applno: string;
  chkArray: checkBox[] = [];
  contentArray: checkBox[] = [];
  jsonObject: any = {};
  no: string;//會員帳號


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];//案件代碼
      this.no = localStorage.getItem("empNo");
      // this.selectBlockList()//一進去畫面就抓取資料表

    });

 //查詢資料表
//  selectBlockList() {
//   const url = 'f01/blockListSelect';
//   const applno = this.applno;
//   this.blockListService.gettable(url, applno).subscribe(data => {
//     this.blockListDataSource = data.rspBody.list;
//   })
  }
}
