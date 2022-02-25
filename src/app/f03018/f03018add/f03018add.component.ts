import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F03018Service } from '../f03018.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
interface sysCode {
  value: string
  viewValue: string
}
@Component({
  selector: 'app-f03018add',
  templateUrl: './f03018add.component.html',
  styleUrls: ['./f03018add.component.css', '../../../assets/css/f03.css']
})
export class F03018addComponent implements OnInit {
  cuCpNo: string //公司統編
  cuCpName: string //公司名稱
  cuCpSname: string //公司簡稱
  cuCpType1Value: string = '';//分類1
  cuCpType2Value: string = '';//分類2
  cuCpType3Value: string//分類3
  useFlagValue: string = '' //使用中
  content: string //備註
  cuCpType1Code: sysCode[] = [] //分類1
  cuCpType2Code: sysCode[] = [] //分類2
  useFlagCode: sysCode[] = [
    { value: '', viewValue: '請選擇' },
    { value: 'Y', viewValue: '是' },
    { value: 'N', viewValue: '否' },
  ] //使用中
  constructor(
    public dialogRef: MatDialogRef<F03018addComponent>,
    public dialog: MatDialog,
    public f03018Service: F03018Service
  ) { }

  ngOnInit(): void {

    this.getTypeselect()

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
  onNoClick() {
    this.dialogRef.close();
  }

  public async add(): Promise<void> {
    let jsonObject: any = {};
    jsonObject['cuCpNo'] = this.cuCpNo;
    jsonObject['cuCpName'] = this.cuCpName;
    jsonObject['cuCpSname'] = this.cuCpSname;
    jsonObject['cuCpType1'] = this.cuCpType1Value;
    jsonObject['cuCpType2'] = this.cuCpType2Value;
    jsonObject['cuCpType3'] = this.cuCpType3Value;
    jsonObject['useFlag'] = this.useFlagValue;
    jsonObject['content'] = this.content;
    let msgStr: string = "";
    msgStr = await this.f03018Service.onesave(jsonObject);
    if (msgStr == 'success') {
      msgStr = '儲存成功！'
    }
    this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    setTimeout(() => {
      this.dialog.closeAll();
    }, 1500);
  }

  change() { }



  getTypeselect() {
    const url = "f03/f03018";
    let jsonObject: any = {}
    this.cuCpType1Code.push({ value: '', viewValue: '請選擇' })
    this.cuCpType2Code.push({ value: '', viewValue: '請選擇' })

    this.f03018Service.getValueTypeselect(url, jsonObject).subscribe(data => {
      console.log(data)
      for (const jsonObj of data.rspBody.cuCpType1) {
        if(jsonObj!= null)
        {
          const desc = jsonObj['CU_CP_TYPE1'];
          this.cuCpType1Code.push({ value: desc, viewValue: desc })
        }
      }
      console.log(this.cuCpType1Code)
      for (const jsonObj of data.rspBody.cuCpType2) {
        if(jsonObj!= null)
        {
          const desc = jsonObj['CU_CP_TYPE2'];
          this.cuCpType2Code.push({ value: desc, viewValue: desc })
        }

      }
      console.log(this.cuCpType2Code)
    });
  }


  public async onesave(): Promise<void> {
    if (this.cuCpNo != null)
    {
      if (this.cuCpNo.length < 8)
      {
        this.dialog.open(ConfirmComponent, {
          data: { msgStr: "公司統編長度不正確" }
        });
        return
      }

    }

    let jsonObject: any = {};
    jsonObject['cuCpNo'] = this.cuCpNo;
    jsonObject['cuCpName'] = this.cuCpName;
    jsonObject['cuCpSname'] = this.cuCpSname;
    jsonObject['cuCpType1'] = this.cuCpType1Value;
    jsonObject['cuCpType2'] = this.cuCpType2Value;
    jsonObject['cuCpType3'] = this.cuCpType3Value;
    jsonObject['useFlag'] = this.useFlagValue;
    jsonObject['content'] = this.content;
    let msgStr: string = "";
    console.log(jsonObject)
    msgStr = await this.f03018Service.onesave(jsonObject);
    if (msgStr == 'success') {
      msgStr = '儲存成功！'
    }

    this.dialog.open(ConfirmComponent, {
      data: { msgStr: msgStr }
    });
    setTimeout(() => {
      this.dialog.closeAll();
    }, 1500);

    // this.f01006Service.restartfn();
  }







}



