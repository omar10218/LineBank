import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { OptionsCode } from 'src/app/interface/base';
import { F03018Service } from '../f03018.service';
interface sysCode {
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
  cuCpType1Value: string //分類1
  cuCpType2Value: string //分類2
  cuCpType3Value: string//分類3
  useFlagValue: string //使用中
  content: string //備註
  cuCpType1Code: sysCode[] = [] //分類1
  cuCpType2Code: sysCode[] = [] //分類2
  useFlagCode: sysCode[] = [] //使用中
  constructor(
    public dialog: MatDialog,
    public f03018Service: F03018Service
  ) { }

  ngOnInit(): void {
    this.getTypeselect()
  }

  onNoClick() {

  }

  public async add(): Promise<void>  {
    let jsonObject: any = {};
    jsonObject['cuCpNo'] = this.cuCpNo;
    jsonObject['cuCpName'] = this.cuCpName;
    jsonObject['cuCpSname'] = this.cuCpSname;
    jsonObject['cuCpType1Value'] = this.cuCpType1Value;
    jsonObject['cuCpType2Value'] = this.cuCpType2Value;
    jsonObject['cuCpType3Value'] = this.cuCpType3Value;
    jsonObject['useFlagValue'] = this.useFlagValue;
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
    },1500);
    }

    change(){}



    getTypeselect(){
      const url = "f03/f03018"; 
      let jsonObject: any = {}
      this.f03018Service.getValueTypeselect(url,jsonObject).subscribe(data => {
        console.log(data)
        for (const jsonObj of data.rspBody.cuCpType1) {
          const desc = jsonObj.CU_CP_TYPE1;
          this.cuCpType1Code.push({ viewValue: desc})
        }
        console.log(this.cuCpType1Code)
        for (const jsonObj of data.rspBody.cuCpType2) {
         
          const desc = jsonObj.CU_CP_TYPE2;
          this.cuCpType2Code.push({ viewValue: desc})
        }
        console.log(this.cuCpType2Code)
      });
    }


    public async onesave(): Promise<void> {
      let jsonObject: any = {};
      jsonObject['cuCpNo'] = this.cuCpNo;
      jsonObject['cuCpName'] = this.cuCpName;
      jsonObject['cuCpSname'] = this.cuCpSname;
      jsonObject['cuCpType1Value'] = this.cuCpType1Value;
      jsonObject['cuCpType2Value'] = this.cuCpType2Value;
      jsonObject['cuCpType3Value'] = this.cuCpType3Value;
      jsonObject['useFlagValue'] = this.useFlagValue;
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
      },1500);
      // this.f01006Service.restartfn();
    }










  }

  

