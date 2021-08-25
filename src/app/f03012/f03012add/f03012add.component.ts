import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { F03012Service } from '../f03012.service';
import { F03012confirmComponent } from '../f03012confirm/f03012confirm.component';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03012add',
  templateUrl: './f03012add.component.html',
  styleUrls: ['./f03012add.component.css','../../../assets/css/f03.css']
})
export class F03012addComponent implements OnInit {

  selectedValue1: string;
  selectedValue2: string;
  //下拉
  selectedColumn: sysCode[] = [];
  setValue: string;
  compareTableCode: sysCode[] = [];
  compareColumnCode: sysCode[] = [];

  submitted = false;
  compareTableSetForm: FormGroup = this.fb.group({
    compareTable: ['', [Validators.required]],
    compareColumn: ['', [Validators.required]],
    setValue: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private f03012Service: F03012Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.f03012Service.getSysTypeCode('COMPARE_TABLE', 'f03/f03012')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.compareTableCode.push({ value: codeNo, viewValue: desc })
        }
        for (let i = 0; i < this.compareTableCode.length; i++) {
          this.f03012Service.getSysTypeCode(this.compareTableCode[i].value, 'f03/f03012')
            .subscribe(data => {
              for (const jsonObj of data.rspBody) {
                const codeNo = jsonObj['codeNo'];
                const desc = jsonObj['codeDesc'];
                this.compareColumnCode.push({ value: codeNo, viewValue: desc })
              }
            });
        }
      });
  }

  changeSelect() {
    this.selectedColumn = [];
    this.f03012Service.getSysTypeCode(this.selectedValue1, 'f03/f03012')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
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
    if (!this.compareTableSetForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const url = 'f03/f03012action1';
      const formdata: FormData = new FormData();
      formdata.append('compareTable', this.compareTableSetForm.value.compareTable);
      formdata.append('compareColumn', this.compareTableSetForm.value.compareColumn);
      formdata.append('setValue', this.compareTableSetForm.value.setValue);
      this.f03012Service.saveComePareDataSetList(url, formdata).subscribe(data => {
        msg = data.rspMsg;
      });
    }
    setTimeout(() => {
      const DialogRef = this.dialog.open(F03012confirmComponent, { data: { msgStr: msg } });
      window.location.reload();
    }, 1500);
  }

  clear(){
    this.selectedValue1 = '';
    this.selectedValue2 = '';
    this.setValue = '';
  }

}
