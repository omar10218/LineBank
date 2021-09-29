import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OptionsCode } from 'src/app/interface/base';

//20210928 alvin.lee 案件申覆

@Component({
  selector: 'app-f01006restart',
  templateUrl: './f01006restart.component.html',
  styleUrls: ['./f01006restart.component.css']
})
export class F01006restartComponent implements OnInit {

  reasonCode: OptionsCode[] = []; //申覆原因下拉
  reason: string;                 //申覆原因
  restartContent: string;         //申覆說明
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  //該案件內容
  restartForm: FormGroup = this.fb.group({
    applno: ['', []],
    nationalId: ['', []],
    custId: ['', []],
    name: ['', []],
    limit: ['', []],
    periods: ['', []],
    rates: ['', []],
    rates_1: ['', []],
    rates_2: ['', []]
  });
  ngOnInit(): void {
    this.restartForm.patchValue({ applno: this.data.applno })
    this.restartForm.patchValue({ nationalId: this.data.nationalId })
    this.restartForm.patchValue({ custId: this.data.custId })
    this.restartForm.patchValue({ name: this.data.name })
    this.restartForm.patchValue({ limit: this.data.limit })
    this.restartForm.patchValue({ periods: this.data.periods })
    this.restartForm.patchValue({ rates: this.data.rates })
  }
  restart(){
    let jsonObject: any = {};

    jsonObject['reason'] = this.reason;
    jsonObject['restartContent'] = this.restartContent;

  }
}
