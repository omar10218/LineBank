import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F03011Service } from '../f03011.service';

@Component({
  selector: 'app-f03011add',
  templateUrl: './f03011add.component.html',
  styleUrls: ['./f03011add.component.css','../../../assets/css/f03.css']
})
export class F03011addComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<F03011addComponent>,
    private f03011Service: F03011Service,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  scklvCode: OptionsCode[] = [];
  calvCode: OptionsCode[] = [];
  tvNoCode: OptionsCode[] = [];
  dssCalloutForm: FormGroup = this.fb.group({
    scklv: ['', [Validators.required]],
    calv: ['', [Validators.required]],
    tvNo: ['', [Validators.required]]
  });
  submitted = false;

  ngOnInit(): void {
    this.f03011Service.getSysTypeCode('SCKLV').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.scklvCode.push({value: codeNo, viewValue: desc})
      }
    });
    this.f03011Service.getSysTypeCode('CALV').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.calvCode.push({value: codeNo, viewValue: desc})
      }
    });
    this.f03011Service.getSysTypeCode('TV_NO').subscribe(data => {
      for (const jsonObj of data.rspBody.mappingList) {
        const codeNo = jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.tvNoCode.push({value: codeNo, viewValue: desc})
      }
    });
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  //????????????
  getErrorMessage() {
    return this.formControl.hasError('required') ? '???????????????' : '';
  }

  public async save(): Promise<void> {
    let msg = '';
    this.submitted = true;
    if (!this.dssCalloutForm.valid) {
      msg = '??????????????????????????????!';
    } else {
      const baseUrl = 'f03/f03011action1';
      let jsonObject: any = {};
      jsonObject['scklv'] = this.dssCalloutForm.value.scklv;
      jsonObject['calv'] = this.dssCalloutForm.value.calv;
      jsonObject['tvNo'] = this.dssCalloutForm.value.tvNo;
      msg = await this.f03011Service.add( baseUrl, jsonObject);
      const childernDialogRef = this.dialog.open(ConfirmComponent, {
        data: { msgStr: msg }
      });
      if (msg === '????????????!') { this.dialogRef.close({ event:'success' }); }
    }
  }

  //??????
  onNoClick(): void {
    this.dialogRef.close();
  }

}
