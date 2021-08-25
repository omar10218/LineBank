import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03011Service } from '../f03011.service';
import { F03011confirmComponent } from '../f03011confirm/f03011confirm.component';
interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03011add',
  templateUrl: './f03011add.component.html',
  styleUrls: ['./f03011add.component.css','../../../assets/css/f03.css']
})
export class F03011addComponent implements OnInit {

  scklvCode: sysCode[] = [];
  calvCode: sysCode[] = [];
  tvNoCode: sysCode[] = [];

  dssCalloutForm: FormGroup = this.fb.group({
    scklv: ['', [Validators.required]],
    calv: ['', [Validators.required]],
    tvNo: ['', [Validators.required]]
  });
  submitted = false;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<F03011addComponent>,private f03011Service: F03011Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.f03011Service.getSysTypeCode('SCKLV','f03/f03011').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.scklvCode.push({value: codeNo, viewValue: desc})
      }
    });
    this.f03011Service.getSysTypeCode('CALV','f03/f03011').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.calvCode.push({value: codeNo, viewValue: desc})
      }
    });
    this.f03011Service.getSysTypeCode('TV_NO','f03/f03011').subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.tvNoCode.push({value: codeNo, viewValue: desc})
      }
    });
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  save() {
    let msg = '';
    this.submitted = true;
    if (!this.dssCalloutForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const url = 'f03/f03011action1';
      const formdata: FormData = new FormData();
      formdata.append('scklv', this.dssCalloutForm.value.scklv);
      formdata.append('calv', this.dssCalloutForm.value.calv);
      formdata.append('tvNo', this.dssCalloutForm.value.tvNo);
      this.f03011Service.saveDssCallout( url, formdata).subscribe(data => {
        msg = data.rspMsg;
      });
    }
    setTimeout(() => {
      const DialogRef = this.dialog.open(F03011confirmComponent, { data: { msgStr: msg } });
      window.location.reload();
    }, 1500);
  }

}
