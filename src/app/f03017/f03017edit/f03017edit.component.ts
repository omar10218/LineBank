import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ChildrenService } from 'src/app/children/children.service';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F03015Service } from 'src/app/f03015/f03015.service';

interface checkBox {
  value: string;
  completed: boolean;
}
interface sysCode {
  value: string;
  viewValue: string;
}
//Mount 提報黑名單
@Component({
  selector: 'app-f03017edit',
  templateUrl: './f03017edit.component.html',
  styleUrls: ['./f03017edit.component.css']
})
export class F03017editComponent implements OnInit {
  reportReason1: sysCode[] = [];  //通報原因1下拉
  reportReason2: sysCode[] = [];  //通報原因2下拉
  reportReason3: sysCode[] = []; //通報原因3下拉
  useFlag: sysCode[] = [{ value: 'Y', viewValue: '是' }, { value: 'N', viewValue: '否' }]; //使用中下拉
  reportReason1Value: string;  //通報原因1選擇
  reportReason2Value: string;  //通報原因2選擇
  reportReason3Value: string; //通報原因3選擇
  useFlagValue: string; //使用中選擇
  currentPage: PageEvent;
  currentSort: Sort;
  dialogRef: any;

  constructor(
    public f03017Service: F03015Service,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public childService: ChildrenService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

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

  blockListDataSource: readonly Data[] = [];
  chkArray: checkBox[] = [];
  contentArray: checkBox[] = [];
  jsonObject: any = {};
  no: string;//會員帳號
  total = 1;
  loading = true;
  pageSize = 5;
  pageIndex = 1;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.no = localStorage.getItem("empNo");
      // this.selectBlockList(this.pageIndex, this.pageSize)//一進去畫面就抓取資料表
    });

    //抓取資料表
    this.blockListForm.patchValue({ 'REPORT_UNIT': this.no })
    // this.selectBlockList(this.pageIndex, this.pageSize);

    //取Customer_info資料
    // this.selectCustInfo();

    //取下拉選單資料
    this.f03017Service.getSysTypeCode('BK_REASON')//通報原因下拉選單
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.reportReason1.push({ value: codeNo, viewValue: desc })
          this.reportReason2.push({ value: codeNo, viewValue: desc })
          this.reportReason3.push({ value: codeNo, viewValue: desc })
        }
      });
  }

  checkboxSelect(check: boolean, data: any, value: any) {
    console.log(check)
    console.log(data)
    console.log(value)
    if (check && value != null) {
      this.chkArray.push(data);
      this.contentArray.push(value);

    } else {
      this.chkArray.forEach((element, index) => {
        if (element == data) {
          this.chkArray.splice(index, 1);
          this.contentArray.splice(index, 1);
        }
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  //新增
  insertData() {

    if (this.blockListForm.value.REPORT_REASON1 == '' || this.blockListForm.value.REPORT_REASON1 == null) {
      this.dialog.open(ConfirmComponent, { data: { msgStr: "請選擇通報原因1" } });
    } else {
      this.jsonObject['REPORT_UNIT'] = this.blockListForm.value.REPORT_UNIT;
      this.jsonObject['REPORT_REASON1'] = this.blockListForm.value.REPORT_REASON1;
      this.jsonObject['REPORT_REASON2'] = this.blockListForm.value.REPORT_REASON2;
      this.jsonObject['REPORT_REASON3'] = this.blockListForm.value.REPORT_REASON3;
      this.jsonObject['REPORT_CONTENT'] = this.blockListForm.value.REPORT_CONTENT;
      this.jsonObject['USE_FLAG'] = this.blockListForm.value.USE_FLAG;
      this.jsonObject['BK_COLUMN'] = this.chkArray;
      this.jsonObject['BK_CONTENT'] = this.contentArray;
      console.log(this.chkArray)
      console.log(this.contentArray)
      alert()
      const url = 'f01/blockListInsert';
      this.f03017Service.insert(url, this.jsonObject).subscribe(data => {

        if (data.rspMsg == "儲存成功") {
          this.dialog.open(ConfirmComponent, { data: { msgStr: "儲存成功" } });
          this.dialogRef.close({ event: 'success' });
        }
      })
    }
  }

  //查詢客戶資料
  // selectCustInfo() {
  //   const url = 'f01/selectCustInfo';
  //   const applno = this.applno;
  //   let jsonObject: any = {};
  //   this.f03017Service.gettable(url, applno, jsonObject).subscribe(data => {
  //     this.blockListForm.patchValue({ 'CU_CNAME': data.rspBody.list[0].cuCname })
  //     this.blockListForm.patchValue({ 'NATIONAL_ID': data.rspBody.list[0].nationalId })
  //     this.blockListForm.patchValue({ 'CU_H_TEL': data.rspBody.list[0].cuHTel })
  //     this.blockListForm.patchValue({ 'CU_CP_TEL': data.rspBody.list[0].cuCpTel })
  //     this.blockListForm.patchValue({ 'CU_M_TEL': data.rspBody.list[0].cuMTel })
  //   })
  // }

  //查詢資料表
  // selectBlockList(pageIndex: number, pageSize: number) {
  //   const url = 'f01/blockListSelect';
  //   const applno = this.applno;

  //   let jsonObject: any = {};
  //   jsonObject['page'] = pageIndex;
  //   jsonObject['per_page'] = pageSize;

  //   this.f03017Service.gettable(url, applno, jsonObject).subscribe(data => {
  //     this.blockListDataSource = data.rspBody.list;
  //     this.total = data.rspBody.size;
  //     this.loading = false;
  //   })
  // }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    // this.selectBlockList(this.pageIndex, this.pageSize);
  }
}
