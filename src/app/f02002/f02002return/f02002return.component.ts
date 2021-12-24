import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F02002Service } from '../f02002.service'
import { F02008return2Component } from '../f02002return/f02008return2/f02008return2.component'
interface sysCode {
  value: string;
  viewValue: string;
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
  // s=0;
  // s :string;
  formdata: FormData = new FormData();
  formdata2: FormData = new FormData();
  cancel()//離開
  {
    this.dialogRef.close();
  }

  onChange(evt, ROWID: string) {

    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isValidFile = !!target.files[0].name.match(/(.jpg|.png|.tif|.JPG)/);
    if (this.isValidFile) {
      this.fileToUpload = target.files.item(0);
      this.formdata2.append('rowId', ROWID);
      this.formdata2.append('files', this.fileToUpload);
      this.formdata2.append('userId', localStorage.getItem("empNo"))

      this.formdata.append('applno', this.data.applno);
      this.formdata.append('rowId', ROWID);
      this.formdata.append('files', this.fileToUpload);
      this.formdata.append('userId', localStorage.getItem("empNo"))

      // this.formdata2.append('rileName',)
      // alert(this.fileToUpload)
    } else {
      this.uploadForm.patchValue({ ERROR_MESSAGE: "非合法圖檔，請檢查檔案格式重新上傳" });
    }
  }
  set()//查詢
  {
    let url = 'f02/f02002action3'
    let jsonObject: any = {};
    jsonObject['applno'] = this.data.applno;
    this.f02002Service.postJson(url, jsonObject).subscribe(data => {
      console.log(data)
      this.F02002Data = data.rspBody;
    })
  }


  store()//儲存
  {


    let url = 'f02/f02002action4';
    let ur = 'f02/f02002action6';
    let jsonObject: any = {};
    const content = []
    // let docTypeCode = this.uploadForm.value.DOC_TYPE_CODE;

    // const formdata: FormData = new FormData();

    for (const it of this.F02002Data) {
      content.push(
        {
          rowId: it.ROW_ID,
          rescanReason: it.rescanReason,
          remark: it.IMAGE_CONTENT,
        }
      )

    }
    jsonObject['F02002req'] = content;
    if (this.fileToUpload != null) {
      this.f02002Service.test(ur, this.formdata2).subscribe(data => {


      });
    }
    this.f02002Service.f02002(url, jsonObject).subscribe(data => {

    })


    this.dialogRef.close();



  }


  SendBack(result: string)//送回案件
  {
    const dialogRef = this.dialog.open(F02008return2Component, {
      minHeight: '50%',
      width: '30%',
      panelClass: 'mat-dialog-transparent',
      data: {
        value: result
      }
    });

    let u = 'f02/f02002action4';
    let url = 'f02/f02002action5'
    let jsonObject: any = {};
    const content = []
    for (const it of this.F02002Data) {
      content.push(
        {
          rowId: it.ROW_ID,
          rescanReason: it.rescanReason,
          remark: it.IMAGE_CONTENT,
        }
      )

    }
    jsonObject['F02002req'] = content;


    dialogRef.afterClosed().subscribe(result => {
      if (result.value == 'confirm') {

        this.f02002Service.f02002(u, jsonObject).subscribe(data => {

        })
        this.f02002Service.test(url, this.formdata).subscribe(data => {
          console.log("111111111")
          console.log(data)

        })

      }
      this.dialogRef.close();

    })
  }


  test() //測試用
  {
    let ur = 'f02/f02002action6';
    let url = 'f02/f02002action4';
    this.f02002Service.test(ur, this.formdata2).subscribe(data => {
      console.log(data)
    })

    let jsonObject: any = {};
    const content = []
    for (const it of this.F02002Data) {
      content.push(
        {
          rowId: it.ROW_ID,
          rescanReason: it.rescanReason,
          remark: it.IMAGE_CONTENT,
        }
      )
    }
    jsonObject['F02002req'] = content;

    console.log(jsonObject)
    console.log(content)
    this.f02002Service.f02002(url, jsonObject).subscribe(data => {
      console.log(data)
    })

  }
}
