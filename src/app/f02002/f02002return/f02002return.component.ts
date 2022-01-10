import { Key, logging } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F02002Service } from '../f02002.service'
import { F02008return2Component } from '../f02002return/f02008return2/f02008return2.component'
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}
interface test {
  value: string;
  viewValue: File;
}
interface te {
  rowId: string;
  rescanReason: string;
  imageContent: string;
}

@Component({
  selector: 'app-f02002return',
  templateUrl: './f02002return.component.html',
  styleUrls: ['./f02002return.component.css', '../../../assets/css/f02.css']
})
export class F02002returnComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<F02002returnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private f02002Service: F02002Service,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.set();
    this.f02002Service.getSysTypeCode('DOC_TYPE').subscribe(data => {
      this.type.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody.mappingList) {
        const id = jsonObj['codeNo'];
        const name = jsonObj['codeDesc'];
        this.type.push({ value: id, viewValue: name })
      }

    })


  }
  i = 1;
  F02002Data = [];//初始陣列
  isValidFile: boolean;
  fileToUpload: File | null = null;
  uploadForm: FormGroup = this.fb.group({
    DOC_TYPE_CODE: [this.data.DOC_ID, []],
    REMARK: [this.data.REMARK, []],
    ERROR_MESSAGE: []
  });
  remark: string;//註記
  docType: string;
  typeString: string = '';//補件類型
  type: sysCode[] = [];//補件類型陣列
  quantity: number;
  fileList: test[] = [];
  formdata: FormData;
  formdata2: FormData = new FormData();
  list: te[] = [];
  onChangelength:number;
  jsonstr: string;
  formControl = new FormControl('', [
    Validators.required
  ]);

  //欄位驗證
  getErrorMessage() {
    return this.formControl.hasError('required') ? '此欄位必填!' :
      '';
  }

  cancel()//離開
  {
    this.dialogRef.close({ event: 'success' });
  }

  onChange(evt, rid: string,) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isValidFile = !!target.files[0].name.match(/(.jpg|.jpeg|.png|.JPG|.JPEG|.PNG|.xls|.xlsx|.doc|.docx|.XLS|.DOC|.DOCX)/);
    var rid = rid;
    this.fileToUpload = target.files.item(0);
    if (this.isValidFile) {
      this.fileList = this.fileList.filter(e => e.value != rid);
      this.fileList.push({value:rid,viewValue:this.fileToUpload}) ;
      console.log(this.fileToUpload)
    }
    else
    {
      this.uploadForm.patchValue({ ERROR_MESSAGE: "非合法檔，請檢查檔案格式重新上傳" });
      alert(this.uploadForm.value.ERROR_MESSAGE);
    }
    this.onChangelength = this.fileList.length;
  }
  set()//查詢
  {
    let url = 'f02/f02002action3'
    let jsonObject: any = {};
    jsonObject['applno'] = this.data.applno;
    this.f02002Service.postJson(url, jsonObject).subscribe(data => {
      console.log(data)
      this.F02002Data = data.rspBody;
      this.quantity = data.rspBody.length

      for (const i of data.rspBody) {
        if (i.IMAGE_NAME != null) {
          this.quantity = this.quantity - 1
        }
      }
      // console.log(data.rspBody.length)
    })
  }

  store()//儲存
  {
    const formdata = new FormData();
    // const formdata: FormData = new FormData();
    let url = 'f02/f02002action5';
    console.log(this.F02002Data.length);
    let jsonarry: string[] = []
    for(const n of this.fileList)
    {
      this.formdata2.append(n.value, n.viewValue)
    }
    for (const it of this.F02002Data) {
      this.list = [];
      const fileObj = this.formdata2.get(it.ROW_ID);
      this.list.push({ rowId: it.ROW_ID, rescanReason: it.rescanReason, imageContent: it.IMAGE_CONTENT });
      this.jsonstr = JSON.stringify(this.list);
      jsonarry.push(this.jsonstr);
      formdata.append('file', fileObj != null ? fileObj : new Blob);
    }
    formdata.append('jsonArray', jsonarry.toString());
    formdata.append('userId', localStorage.getItem('empNo'));
    formdata.append('applno', this.data.applno);

    this.f02002Service.setformdata(url, formdata).subscribe(data => {
      console.log(data)
      if (data.rspCode === '0000') {
        this.dialogRef.close({ event: 'success' });
      }
      else {
        this.dialog.open(ConfirmComponent, {
          data: { msgStr: data.rspMsg }
        });
      }
    });
    // this.dialogRef.close({ event: 'success' });
  }


  SendBack(result: string)//送回案件
  {
    const formdata = new FormData();
    console.log(this.F02002Data.length);
    let jsonarry: string[] = []
    for(const n of this.fileList)
    {
      this.formdata2.append(n.value, n.viewValue)
    }
    for (const it of this.F02002Data) {
      this.list = [];
      const fileObj = this.formdata2.get(it.ROW_ID);
      this.list.push({ rowId: it.ROW_ID, rescanReason: it.rescanReason, imageContent: it.IMAGE_CONTENT });
      this.jsonstr = JSON.stringify(this.list);
      jsonarry.push(this.jsonstr);
      formdata.append('file', fileObj != null ? fileObj : new Blob);
    }
    formdata.append('jsonArray', jsonarry.toString());
    formdata.append('userId', localStorage.getItem('empNo'));
    formdata.append('applno', this.data.applno);
    const dialogRef = this.dialog.open(F02008return2Component, {
      minHeight: '50%',
      width: '30%',
      panelClass: 'mat-dialog-transparent',
      data: {
        value: result
      }
    });
    let ul = 'f02/f02002action4';
    let url = 'f02/f02002action5';

    dialogRef.afterClosed().subscribe(result => {
      if (result.value == 'confirm') {
        this.f02002Service.setformdata(url, formdata).subscribe(data => {

          if (data.rspCode === '0000') {
            this.f02002Service.setformdata(ul, formdata).subscribe(data => {
              if (data.rspCode === '0000')
              {
                this.dialogRef.close({ event: 'success' });
              }
              else
              {
                this.dialog.open(ConfirmComponent, {
                  data: { msgStr: data.rspMsg }
                });
              }
            })
          }
          else {
            this.dialog.open(ConfirmComponent, {
              data: { msgStr: data.rspMsg }
            });
          }

        })
      }
    })

  }


  test() //測試用
  {

    console.log(this.fileToUpload)
    // alert( this.fileToUpload)
    console.log( this.fileList)
    console.log( this.fileList.length)
  }
}
