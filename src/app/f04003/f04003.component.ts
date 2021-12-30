import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { time } from 'console';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { F04003Service } from './f04003.service';

// Jay 案件重新指派
interface sysCode {
  value: string;
  viewValue: string;
}
interface checkBox {
  value: string;
  completed: boolean;
  empno: string;
}
interface assign {
  F_WobNum: string;
  swcApplno: string;
}
@Component({
  selector: 'app-f04003',
  templateUrl: './f04003.component.html',
  styleUrls: ['./f04003.component.css', '../../assets/css/f04.css']
})
export class F04003Component implements OnInit {

  test123 = true;

  constructor(
    private f04003Service: F04003Service,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.LevelCode.push({ value: 'L0', viewValue: 'L0' });
    this.LevelCode.push({ value: 'L1', viewValue: 'L1' });
    this.LevelCode.push({ value: 'L2', viewValue: 'L2' });
    this.LevelCode.push({ value: 'L3', viewValue: 'L3' });
    this.LevelCode.push({ value: 'L4', viewValue: 'L4' });
    this.personnel = '';

  }
  LevelCode: any[] = [];
  setDataSource: readonly Data[] = [];
  Level: string = ''//層級
  personnelCode: sysCode[] = [];;
  personnel: string = ''//人員
  chkArray: any[] = [];
  checkboxArray: checkBox[] = [];
  assignArray: assign[] = [];
  i = 0;
  isAllCheck: boolean = false;
  Transfer: string = '';//轉件
  TransferCode: sysCode[] = [];

  Dispatch()//搜尋派件人員
  {
    this.personnelCode = [];
    let LevelJson: any = {};
    let url = 'f04/f04003action1'
    LevelJson['level'] = this.Level;
    this.f04003Service.Set(url, LevelJson).subscribe(data => {
      console.log("=================")
      console.log(data)
      this.personnelCode.push({ value: '', viewValue: '請選擇' })
      if (data.rspMsg != "該層級查無人員") {
        for (const jsonObj of data.rspBody) {
          const id = jsonObj['EMP_NO'];
          const name = jsonObj['EMP_NAME'];
          this.personnelCode.push({ value: id, viewValue: name })
        }
      }
      else {
        const childernDialogRef = this.dialog.open(ConfirmComponent, {
          data: { msgStr: data.rspMsg }
        })
      }

    })

  }
  Inquire()//查詢
  {
    if (this.Level != '' || this.personnel != '') {
      this.checkboxArray = [];
      this.TransferCode = [];
      this.setDataSource = [];
      this.i = 0;
      let url = 'f04/f04003action2'
      let personnelJson: any = {};
      personnelJson['level'] = this.Level;
      personnelJson['empNo'] = this.personnel;
      console.log(this.Level)
      console.log(this.personnel)
      this.f04003Service.Set(url, personnelJson).subscribe(data => {
        console.log(data)
        if (data.rspBody.empList.length > 0)
        {
          for (const obj of data.rspBody.empList)
           {
            const id = obj['EMP_NO'];
            const name = obj['EMP_NAME'];
            this.TransferCode.push({ value: id, viewValue: name })
          }
        }

        if (data.rspBody.dataList.length > 0) {
          for (const jsonObj of data.rspBody.dataList) {
            const id = jsonObj['empNo'];
            // const name = jsonObj.empList['empName'];
            const member = jsonObj['F_WobNum'];
            // this.TransferCode.push({ value: id, viewValue: name })
            this.setDataSource = data.rspBody.dataList;
            this.checkboxArray.push({ value: member, completed: false, empno: id })
          }
          this.i = 1;
        }
      })
    }
    else {
      this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請選擇派件層級" }
      });
    }

  }
  setAll(completed: boolean) //全選
  {

    if (this.Transfer == '') {
      this.isAllCheck = false;
      this.dialog.open(
        ConfirmComponent, {
        data: { msgStr: "請選擇轉件人員" }
      });
      return;
    }
    for (const obj of this.checkboxArray) {
      if (obj.empno != this.Transfer) {
        obj.completed = completed;
      }
    }
  }

  block(check: boolean, x: string) {
    if (check) {
      this.chkArray.push(x);

    }
    else {
      this.chkArray.splice(this.chkArray.indexOf(x), 1)

    }

  }
  change()//轉件
  {
    if (this.Transfer == '') {
      this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請填轉件人員" }
      });
    }
    else {
      for (const obj of this.checkboxArray) {
        for (const jsonObj of this.setDataSource) {
          if (obj.completed == true) {
            if (obj.value == jsonObj['F_WobNum']) {
              this.assignArray.push({ F_WobNum: jsonObj['F_WobNum'], swcApplno: jsonObj['swcApplno'] })
            }
          }
        }
      }
      console.log(this.assignArray.length)
      if(this.assignArray.length>0)
      {
        let url = 'f04/f04003action3'
        let changeJson: any = {};
        changeJson['level'] = this.Level;
        changeJson['roleNo'] = this.Transfer;
        changeJson['assign'] = this.assignArray;
        if (this.assignArray.length > 0) {
          this.f04003Service.Set(url, changeJson).subscribe(data => {
            if (data.rspCode == '0000') {
              this.Inquire();
              this.assignArray=[]
              this.dialog.open(ConfirmComponent, {
                data: { msgStr: "轉件成功" }
              });
            }
          })
        }
      }
      else
      {
        this.dialog.open(ConfirmComponent, {
          data: { msgStr: "請勾選案件" }
        });
      }


    }

  }
  test()
  {
    console.log(this.personnelCode)
    console.log(this.personnel)
  }
}
