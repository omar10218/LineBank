import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { OptionsCode } from 'src/app/interface/base'
import { F03012Service } from '../f03012.service'
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FADE_CLASS_NAME_MAP } from 'ng-zorro-antd/modal'
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component'
@Component({
  selector: 'app-f03012add',
  templateUrl: './f03012add.component.html',
  styleUrls: ['./f03012add.component.css', '../../../assets/css/f03.css'],
})
export class F03012addComponent implements OnInit {
  selectedValue1: string
  selectedValue2: string
  error: string
  myDiv: boolean //最高門檻是否啟動判斷
  //下拉
  selectedColumn: OptionsCode[] = []
  setValueHight: string
  compareType: string
  setValueLow: string

  compareTableCode: OptionsCode[] = []
  compareColumnCode: OptionsCode[] = []

  submitted = false
  // compareTableSetForm: FormGroup = this.fb.group({
  // 	compareTable: ['', [Validators.required]],
  // 	compareColumn: ['', [Validators.required]],
  // 	compareType: ['', [Validators.required]],
  // 	setValueHight: ['', [Validators.required]],
  // 	setValueLow: ['', [Validators.required]],
  // })

  constructor(
    public dialogRef: MatDialogRef<F03012addComponent>,
    private fb: FormBuilder,
    private f03012Service: F03012Service,
    public dialog: MatDialog,
    private alert: NzAlertModule) { }

  ngOnInit(): void {
    this.getData()
    // this.f03012Service.getSysTypeCode('COMPARE_TABLE').subscribe(data => {
    // 	for (const jsonObj of data.rspBody.mappingList) {
    // 		const codeNo = jsonObj.codeNo
    // 		const desc = jsonObj.codeDesc
    // 		this.compareTableCode.push({value: codeNo, viewValue: desc})
    // 	}
    // 	for (let i = 0; i < this.compareTableCode.length; i++) {
    // 		this.f03012Service.getSysTypeCode(this.compareTableCode[i].value).subscribe(data => {
    // 			for (const jsonObj of data.rspBody.mappingList) {
    // 				const codeNo = jsonObj.codeNo
    // 				const desc = jsonObj.codeDesc
    // 				this.compareColumnCode.push({value: codeNo, viewValue: desc})
    // 			}
    // 		})
    // 	}
    // })
  }
  formControl = new FormControl('', [
    Validators.required
  ]);
  //欄位驗證
  getErrorMessage() {
    return this.formControl.hasError('required') ? '此欄位必填!' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  getData() {
    this.f03012Service.getSysTypeCode('COMPARE_TABLE').subscribe(data => {
      console.log(data)
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo
        const desc = jsonObj.codeDesc
        this.compareTableCode.push({ value: codeNo, viewValue: desc })
      }
      for (let i = 0; i < this.compareTableCode.length; i++) {
        this.f03012Service.getSysTypeCode(this.compareTableCode[i].value).subscribe(data => {
          console.log(data)
          for (const jsonObj of data.rspBody.mappingList) {
            const codeNo = jsonObj.codeNo
            const desc = jsonObj.codeDesc
            this.compareColumnCode.push({ value: codeNo, viewValue: desc })
          }
        })
      }
    })
  }

  changeSelect() {
    let jsonObject: any = {};
    jsonObject['compareTable'] = this.selectedValue1;
    this.f03012Service.getColumn(jsonObject)
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.selectedColumn.push({ value: codeNo, viewValue: desc })
        }
      })
    this.selectedColumn = []
    // this.f03012Service.getSysTypeCode(this.selectedValue1).subscribe(data => {
    // 	console.log(data)
    // 	for (const jsonObj of data.rspBody.mappingList) {
    // 		const codeNo = jsonObj.codeNo
    // 		const desc = jsonObj.codeDesc
    // 		this.selectedColumn.push({value: codeNo, viewValue: desc})
    // 	}
    // })
  }

  //儲存前處理千分位
  Cut(s: string) {
    if (s != null) {
      s = s.replace(/,/g, "")
    }

    return s
  }

  add() {
    let msg = ''
    this.submitted = true
    // if (!this.compareTableSetForm.valid) {
    //   msg = '資料格式有誤，請修正!';
    // } else {
    const url = 'f03/f03012action5'

    let jsonObject: any = {}
    jsonObject['compareTable'] = this.selectedValue1
    jsonObject['compareColumn'] = this.selectedValue2
    jsonObject['compareType'] = this.compareType
    if (this.compareType == '1') {
      jsonObject['setValueLow'] = this.setValueLow != "" ? this.Cut(this.setValueLow) : "0";
    }
    else {
      jsonObject['setValueLow'] = this.setValueLow != "" ? this.Cut(this.setValueLow) : "0";
      jsonObject['setValueHight'] = this.setValueHight != "" ? this.Cut(this.setValueHight) : "0";
    }

    console.log(this.compareType)
    this.error = 'test'
    this.f03012Service.submit(url, jsonObject).subscribe(data => {
      // alert((msg = data.rspMsg))
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: data.rspMsg }
      });
      // this.getData()
      this.error = data.rspMsg
      if (data.rspMsg == '成功新增') { this.dialogRef.close({ event: 'success' }); }
      this.f03012Service.resetfn(); // 儲存成功後通知f03012頁面啟動呼叫table function
      // if (data.rspMsg == '成功新增') {

      //   this.dialog.closeAll();
      // }

    })
    // const formdata: FormData = new FormData();
    // formdata.append('elCompareDataSet[0].compareTable', this.compareTableSetForm.value.compareTable);
    // formdata.append('elCompareDataSet[0].compareColumn', this.compareTableSetForm.value.compareColumn);
    // formdata.append('elCompareDataSet[0].compareType', this.compareTableSetForm.value.compareType);
    // formdata.append('elCompareDataSet[0].setValueHight', this.compareTableSetForm.value.setValueHight);
    // formdata.append('elCompareDataSet[0].setValueLow', this.compareTableSetForm.value.setValueLow);
    // formdata.append('setValue', this.compareTableSetForm.value.setValue);
    // console.log(formdata);
    // console.log(url);
    // this.f03012Service.saveComePareDataSetList(url, formdata).subscribe(data => {
    //  alert(msg = data.rspMsg)
    //  window.location.reload();
    //   console.log(formdata);
    // console.log(url);
    //   console.log(data);
    // });
    // }
    // setTimeout(() => {
    //   const DialogRef = this.dialog.open(F03012confirmComponent, { data: { msgStr: msg } });
    //   window.location.reload();
    // }, 1500);
  }

  clear() {
    this.dialog.closeAll();
  }
  isNumber(value: any) { return /^-?[\d.]+(?:e-?\d+)?$/.test(value); }

  //去除符號/中英文
  toNumber(data: string) {
    return data != null ? data.replace(/[^\w\s]|_/g, '') : data;

  }
  // 只允許輸入數字
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    console.log(event)
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode < 110 && charCode > 110) {
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: '請輸入數字!' }
      });
      return false;
    }
    return true;
  }

  //+逗號
  toCurrency(amount: string) {
    return amount != null ? amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : amount;
  }
// 判斷比對方式來去鎖住最高門檻
  test123(a) {
    console.log
    if (a == 1) {
      return this.myDiv = true
    }
    else {
      return this.myDiv = false
    }
  }
  ngAfterViewInit(): void {
    console.log(this.compareType)
  }
}
