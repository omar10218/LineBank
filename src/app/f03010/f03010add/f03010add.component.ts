import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { F03010Service } from '../f03010.service';
import { F03010confirmComponent } from '../f03010confirm/f03010confirm.component';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03010add',
  templateUrl: './f03010add.component.html',
  styleUrls: ['./f03010add.component.css', '../../../assets/css/f03.css']
})
export class F03010addComponent implements OnInit {

  stopFlagCode: sysCode[] = [{ value: 'Y', viewValue: 'Y' }, { value: 'N', viewValue: 'N' }];

  setCalloutSpeakingForm: FormGroup = this.fb.group({
    speakingAbbreviation: ['', [Validators.required]],
    stopFlag: ['Y', [Validators.required]],
    speakingContent: ['', [Validators.required]]
  });
  submitted = false;

  constructor(private fb: FormBuilder, private f03010Service: F03010Service, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  add() {
    let msg = '';
    this.submitted = true;
    if (!this.setCalloutSpeakingForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const url = 'f03/f03010action1';
      const formdata: FormData = new FormData();
      formdata.append('speakingAbbreviation', this.setCalloutSpeakingForm.value.speakingAbbreviation);
      formdata.append('stopFlag', this.setCalloutSpeakingForm.value.stopFlag);
      formdata.append('speakingContent', this.setCalloutSpeakingForm.value.speakingContent);
      this.f03010Service.saveDssCallout( url, formdata).subscribe(data => {
        msg = data.rspMsg;
      });
    }
    setTimeout(() => {
      const DialogRef = this.dialog.open(F03010confirmComponent, { data: { msgStr: msg } });
      window.location.reload();
    }, 1500);
  }

}
