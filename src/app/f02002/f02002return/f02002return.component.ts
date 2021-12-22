import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F02002Service } from '../f02002.service'

interface sysCode {
  value: string;
  viewValue: string;
}

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
  i=1;
  F02002Data = [];//初始陣列
  isValidFile: boolean;
  fileToUpload: File | null = null;
  uploadForm: FormGroup = this.fb.group({
    DOC_TYPE_CODE: [this.data.DOC_ID, []],
    REMARK: [this.data.REMARK, []],
    ERROR_MESSAGE: []
  });
  remark:string;//註記
  docType:string;
  typeString:string ='';//補件類型
  type:sysCode[] = [];//補件類型陣列
  s=0;
  cancel()//離開
  {
    this.dialogRef.close();
  }

  onChange(evt)
  {
    const target: DataTransfer = <DataTransfer>(evt.target);

    this.isValidFile = !!target.files[0].name.match(/(.jpg|.png|.tif|.JPG)/);
    if (this.isValidFile) {
      this.fileToUpload = target.files.item(0);
    } else {
      this.uploadForm.patchValue({ ERROR_MESSAGE: "非合法圖檔，請檢查檔案格式重新上傳" });
      alert(this.uploadForm.value.ERROR_MESSAGE);
    }
  }
  set()//查詢
  {
    let url = 'f02/f02002action3'
    let jsonObject: any = {};
    jsonObject['applno'] = this.data.applno;
    this.f02002Service.postJson(url,jsonObject).subscribe(data=>{
      this.F02002Data = data.rspBody;
    })
  }
  public async store(): Promise<void>//儲存
  {
    let url ='f02/f02002action4';
    let docTypeCode = this.uploadForm.value.DOC_TYPE_CODE;
    const formdata: FormData = new FormData();
    if (docTypeCode != "" && docTypeCode != null)
    {
      formdata.append('applno',this.data.applno);
    }


  }
  SendBack()//送回案件
  {
    let url = 'f02/f02002action5'
    const formdata: FormData = new FormData();
    console.log(this.F02002Data)
  }

  test()
  {

    if(this.s==0)
    {
      this.s=1;
    }
    else
    {
      this.s=0;
    }
  }
}
