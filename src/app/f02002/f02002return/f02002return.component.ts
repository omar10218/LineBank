import { logging } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F02002Service } from '../f02002.service'
import { F02008return2Component } from '../f02002return/f02008return2/f02008return2.component'
interface sysCode {
  value: string;
  viewValue: string;
}
interface code {
  value: string;
  viewValue: File;
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
  quantity:number;
  fileList:code []=[];
  formdata: FormData = new FormData();
  formdata2: FormData = new FormData();

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

  onChange(evt, ROWID: string,rescanReason:string) {

    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isValidFile = !!target.files[0].name.match(/(.jpg|.png|.tif|.JPG|.PNG)/);
    // console.log(!!target.files[0].name.match(/(.jpg|.png|.tif|.JPG)/))
    if (this.isValidFile)
    {

      this.fileToUpload = target.files.item(0);
      this.fileList.push({value:ROWID,viewValue:this.fileToUpload})

      // this.formdata2.append('rowId', ROWID);
      // this.formdata2.append('files', this.fileToUpload);
      // this.formdata2.append('rescanReason',rescanReason)
      // this.formdata2.append('userId', localStorage.getItem("empNo"))
      // this.formdata2.append('applno', localStorage.getItem("empNo"))
      this.quantity = this.quantity -1;

      // this.formdata.append('applno', this.data.applno);
      // this.formdata.append('rowId', ROWID);
      // this.formdata.append('files', this.fileToUpload);
      // this.formdata.append('userId', localStorage.getItem("empNo"))


      // this.formdata2.append('rileName',)
      // alert(this.fileToUpload)
    } else
    {
      this.uploadForm.patchValue({ ERROR_MESSAGE: "非合法圖檔，請檢查檔案格式重新上傳" });
      alert(this.uploadForm.value.ERROR_MESSAGE);
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
      this.quantity = data.rspBody.length

      for(const i of data.rspBody)
      {
        if(i.IMAGE_NAME !=null)
        {
          this.quantity =this.quantity - 1
        }
      }
      // console.log(data.rspBody.length)
    })
  }


  store()//儲存
  {
    let url = 'f02/f02002action5';
    // let ur = 'f02/f02002action6';
    // let jsonObject: any = {};
    // const content = []
    // let docTypeCode = this.uploadForm.value.DOC_TYPE_CODE;

    // const formdata: FormData = new FormData();

    for (const it of this.F02002Data)
    {
      for(let iit of this.fileList)
      {
        if(it.ROW_ID == iit.value)
        {
          this.formdata.append('rowId',iit.value)
          this.formdata.append('userId', localStorage.getItem("empNo"))
          this.formdata.append('rescanReason',it.rescanReason)
          this.formdata.append('applno',this.data.applno)
          this.formdata.append('files',iit.viewValue)
          this.formdata.append('imageContent',it.IMAGE_CONTENT)
        }
      }
      // content.push(
      //   {
      //     rowId: it.ROW_ID,
      //     rescanReason: it.rescanReason,
      //     remark: it.IMAGE_CONTENT,
      //   }
      // )
      // this.formdata2.append('rescanReason',it.rescanReason)
    }

    // jsonObject['F02002req'] = content;
    // if (this.fileToUpload != null)
    // {

      this.f02002Service.test(url, this.formdata).subscribe(data => {

        console.log(data)
      });
    // }
    // this.f02002Service.f02002(url, jsonObject).subscribe(data => {

    // })


    // this.dialogRef.close({ event: 'success' });


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
      if (result.value == 'confirm')
      {
        this.f02002Service.f02002(u, jsonObject).subscribe(data => {

        })
        if(this.fileToUpload == null)
        {
          this.formdata.append('applno', this.data.applno);
          // this.formdata.append('rowId', ROWID);
          // this.formdata.append('files', this.fileToUpload);
          this.formdata.append('userId', localStorage.getItem("empNo"))
          this.f02002Service.test(url, this.formdata).subscribe(data => {
            console.log("111111111")
            console.log(data)

          })
        }
        else
        {
          // this.formdata.append('applno', this.data.applno);
          // this.formdata.append('rowId', ROWID);
          this.f02002Service.test(url, this.formdata).subscribe(data => {
            console.log("222222")
            console.log(data)

          })
        }

      }
      this.dialogRef.close({ event: 'success' });

    })
  }


  test() //測試用
  {
    console.log(this.formdata.getAll('rowId') )
    console.log(this.formdata.getAll('applno') )
    console.log(this.F02002Data )
    // alert( this.fileToUpload)
  }
}
