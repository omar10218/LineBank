import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OptionsCode } from 'src/app/interface/base';
import { F03012Service } from '../f03012.service';

@Component({
  selector: 'app-f03012add',
  templateUrl: './f03012add.component.html',
  styleUrls: ['./f03012add.component.css','../../../assets/css/f03.css']
})
export class F03012addComponent implements OnInit {

  selectedValue1: string;
  selectedValue2: string;
  //下拉
  selectedColumn: OptionsCode[] = [];
  setValueHight: string;
  compareType: string;
  setValueLow: string;
  compareTableCode: OptionsCode[] = [];
  compareColumnCode: OptionsCode[] = [];

  submitted = false;
  compareTableSetForm: FormGroup = this.fb.group({
    compareTable: ['', [Validators.required]],
    compareColumn: ['', [Validators.required]],
    setValueHight: ['', [Validators.required]],
    setValueLow: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private f03012Service: F03012Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.f03012Service.getSysTypeCode('COMPARE_TABLE')
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.compareTableCode.push({ value: codeNo, viewValue: desc })
        }
        for (let i = 0; i < this.compareTableCode.length; i++) {
          this.f03012Service.getSysTypeCode(this.compareTableCode[i].value)
            .subscribe(data => {
              for (const jsonObj of data.rspBody.mappingList) {
                const codeNo = jsonObj.codeNo;
                const desc = jsonObj.codeDesc;
                this.compareColumnCode.push({ value: codeNo, viewValue: desc })
              }
            });
        }
      });
  }

  changeSelect() {
    this.selectedColumn = [];
    this.f03012Service.getSysTypeCode(this.selectedValue1)
      .subscribe(data => {
        for (const jsonObj of data.rspBody.mappingList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.selectedColumn.push({ value: codeNo, viewValue: desc })
        }
      });
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  add() {
    let msg = '';
    this.submitted = true;
    // if (!this.compareTableSetForm.valid) {
    //   msg = '資料格式有誤，請修正!';
    // } else {
      const url = 'f03/f03012action1';
      const formdata: FormData = new FormData();
      formdata.append('compareTable', this.compareTableSetForm.value.compareTable);
      formdata.append('compareColumn', this.compareTableSetForm.value.compareColumn);
      formdata.append('compareType', this.compareTableSetForm.value.compareType);
      formdata.append('setValueHight', this.compareTableSetForm.value.setValueHight);
      formdata.append('setValueLow', this.compareTableSetForm.value.setValueLow);
      // formdata.append('setValue', this.compareTableSetForm.value.setValue);
      console.log(formdata);
      console.log(url);
      this.f03012Service.saveComePareDataSetList(url, formdata).subscribe(data => {
        msg = data.rspMsg;
        console.log(msg);
      });
    // }
    // setTimeout(() => {
    //   const DialogRef = this.dialog.open(F03012confirmComponent, { data: { msgStr: msg } });
    //   window.location.reload();
    // }, 1500);
  }

  clear(){
    this.selectedValue1 = '';
    this.selectedValue2 = '';
    this.compareType = '';
    this.setValueHight = '';
    this.setValueLow = '';
  }

}
