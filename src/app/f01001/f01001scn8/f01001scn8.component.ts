import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { F01001scn8Service } from './f01001scn8.service';
import { F01001scn8confirmComponent } from './f01001scn8confirm/f01001scn8confirm.component';
import { F01001scn8editComponent } from './f01001scn8edit/f01001scn8edit.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

interface sysCode {
  value: string;
  viewValue: string;
}

interface CALLOUTCode {
  APPLNO: string;
  CALLOUT_DATE: string;
  CON_MEMO: string;
  CON_TARGET: string;
  CON_TEL: string;
  CUST_TYPE: string;
  ID: string;
  NOTE: string;
  PHONE: string;
  ROWNUM_: string;
  CON_MEMO_View: string;
  CON_TARGET_View: string;
  CON_TEL_View: string;
}

@Component({
  selector: 'app-f01001scn8',
  templateUrl: './f01001scn8.component.html',
  styleUrls: ['./f01001scn8.component.css','../../../assets/css/f01.css']
})
export class F01001scn8Component implements OnInit {

  CON_TEL_Code:sysCode[] = [] ;
  CON_TEL_Selected:string;
  CON_TEL_Value:string;
  CON_TARGET_Code:sysCode[] = [] ;
  CON_TARGET_Selected:string;
  CON_TARGET_Value:string;
  CON_MEMO_Code:sysCode[] = [] ;
  CON_MEMO_Selected:string;
  CON_MEMO_Value:string;

  CALLOUTSource = new MatTableDataSource<any>();
  rspBodyList: CALLOUTCode[] = [] ;
  speakingData:any;
  rspBodyData:any;
  AddData:any;
  EditData:any;

  submitted = false;
  compareTableSetForm: FormGroup = this.fb.group({
    CON_TEL_Selected: ['', [Validators.required]],
    CON_TEL_Value: ['', [Validators.required]],
    CON_TARGET_Selected: ['', [Validators.required]],
    CON_TARGET_Value: ['', [Validators.required]],
    CON_MEMO_Selected: ['', [Validators.required]],
    CON_MEMO_Value: ['', [Validators.required]]
  });

  // result:any;

  currentPage: PageEvent;
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private f01001scn8Service: F01001scn8Service) { }
  private applno: string;
  private search: string;
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
    });

    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };

    //this.CALLOUTSource.data=this.dataList;
    this.f01001scn8Service.getSysTypeCode('CON_TEL', 'f01/f01001scn8')
    .subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.CON_TEL_Code.push({ value: codeNo, viewValue: desc })
      }
    });
    this.f01001scn8Service.getSysTypeCode('CON_TARGET', 'f01/f01001scn8')
    .subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.CON_TARGET_Code.push({ value: codeNo, viewValue: desc })
      }
    });
    this.f01001scn8Service.getSysTypeCode('CON_MEMO', 'f01/f01001scn8')
    .subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.CON_MEMO_Code.push({ value: codeNo, viewValue: desc })
      }
    });
  }

  ngAfterViewInit() {
    this.getCALLOUTFunction();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getCALLOUTFunction();
    });
  }

  getApplno(): String {
    return this.applno;
  }

  getSearch() :string {
    return this.search;
  }

   //===========================================================================
   totalCount: any;
   @ViewChild('paginator', { static: true }) paginator: MatPaginator;
   @ViewChild('sortTable', { static: true }) sortTable: MatSort;



  Add() {
    let msg = '';
    this.submitted = true;
    if (!this.compareTableSetForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const url = 'f01/f01001scn8action1';
      const formdata: FormData = new FormData();
      formdata.append('applno', this.applno);
      formdata.append('conTel', this.compareTableSetForm.value.CON_TEL_Selected);
      formdata.append('phone', this.compareTableSetForm.value.CON_TEL_Value);
      formdata.append('conTarget', this.compareTableSetForm.value.CON_TARGET_Selected);
      formdata.append('custType', this.compareTableSetForm.value.CON_TARGET_Value);
      formdata.append('conMemo', this.compareTableSetForm.value.CON_MEMO_Selected);
      formdata.append('note', this.compareTableSetForm.value.CON_MEMO_Value);

      this.f01001scn8Service.AddCALLOUT(url, formdata).subscribe(data => {
        msg = data.rspMsg;
      });
    }
    setTimeout(() => {
      const DialogRef = this.dialog.open(F01001scn8confirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == '新增成功!') { this.refreshTable(); this.reText(); }
    }, 1500);

  }

  startEdit(CON_TEL: string,PHONE: string,CON_TARGET: string,CUST_TYPE: string,CON_MEMO: string,NOTE: string,ID: string) {
    console.log(CON_TEL,PHONE,CON_TARGET,CUST_TYPE,CON_MEMO,NOTE,ID)
    const dialogRef = this.dialog.open(F01001scn8editComponent, {
      minHeight: '100vh',
      width: '50%',
      data: {
        con_TEL: CON_TEL,
        phone : PHONE ,
        con_TARGET: CON_TARGET,
        cust_TYPE: CUST_TYPE,
        con_MEMO: CON_MEMO,
        note: NOTE,
        ID: ID
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
      });
  }

  delete(ID: string) {
    let msg = '';
    const url = 'f01/f01001scn8action3';
    this.f01001scn8Service.DeleteCALLOUT(url, ID).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(F01001scn8confirmComponent, { data: { msgStr: msg } });
      if (msg != null && msg == '刪除成功') { this.refreshTable(); }
    }, 1500);
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  test(): void {

  }
  reText(): void {
     this.compareTableSetForm.value.CON_TEL_Selected=undefined;
      this.compareTableSetForm.value.CON_TEL_Value=undefined;
      this.compareTableSetForm.value.CON_TARGET_Selected=undefined;
      this.compareTableSetForm.value.CON_TARGET_Value=undefined;
      this.compareTableSetForm.value.CON_MEMO_Selected=undefined;
      this.compareTableSetForm.value.CON_MEMO_Value=undefined;
      this.CON_TEL_Selected=undefined;
      this.CON_TEL_Value=undefined;

      this.CON_TARGET_Selected=undefined;
      this.CON_TARGET_Value=undefined;

      this.CON_MEMO_Selected=undefined;
      this.CON_MEMO_Value=undefined;
    // this.compareTableSetForm.value.CON_TEL_Selected='';
    //   this.compareTableSetForm.value.CON_TEL_Value='';
    //   this.compareTableSetForm.value.CON_TARGET_Selected='';
    //   this.compareTableSetForm.value.CON_TARGET_Value='';
    //   this.compareTableSetForm.value.CON_MEMO_Selected='';
    //   this.compareTableSetForm.value.CON_MEMO_Value='';
    //   this.CON_TEL_Selected='';
    //   this.CON_TEL_Value='';

    //   this.CON_TARGET_Selected='';
    //   this.CON_TARGET_Value='';

    //   this.CON_MEMO_Selected='';
    //   this.CON_MEMO_Value='';
  }

  private async getCALLOUTFunction() {
    console.log(this.currentPage.pageIndex)
    console.log(this.currentPage.pageSize)

    const baseUrl = 'f01/f01001scn8scn1';
    this.f01001scn8Service.getCALLOUT(baseUrl, this.currentPage.pageIndex,this.currentPage.pageSize,this.applno).subscribe(data => {
       console.log(data);
       this.rspBodyData=data.rspBody;
       this.rspBodyList= data.rspBody.list;
       this.speakingData=data.rspBody.speaking;
       if(this.rspBodyList.length>0){
        for (let i = 0; i < this.rspBodyList.length; i++) {
          this.rspBodyList[i].CON_TEL_View= this.getSelectView('CON_TEL',this.rspBodyList[i].CON_TEL);
          this.rspBodyList[i].CON_TARGET_View= this.getSelectView('CON_TARGET',this.rspBodyList[i].CON_TARGET);
          this.rspBodyList[i].CON_MEMO_View= this.getSelectView('CON_MEMO',this.rspBodyList[i].CON_MEMO);
        }
       }

       this.CALLOUTSource.data=this.rspBodyList;
       this.totalCount = data.rspBody.size;
    });
  }

  getSelectView(key:string,value:string): string {
    var result = "";
    switch(key) {
      case "CON_TEL": {
        for (const data of this.rspBodyData.conTel) {
          if (data.codeNo == value) {
            result=data.codeDesc;
          }
        }
         break;
      }
      case  "CON_TARGET": {
        for (const data of this.rspBodyData.conTarget) {
          if (data.codeNo == value) {
            result=data.codeDesc;
          }
        }
         break;
      }
      default: {
        for (const data of this.rspBodyData.conMemo) {
          if (data.codeNo == value) {
            result=data.codeDesc;
          }
        }
         break;
      }
   }
    //console.log(this.result);
    return result;
  }

  ShowspeakingContenta(speakingContent:string): void {
    const DialogRef = this.dialog.open(F01001scn8confirmComponent, { data: { msgStr: speakingContent } });
    // alert(speakingContent);
  }

}
