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
  empNo: string;
}
interface assign {
  F_WobNum: string;
  swcApplno: string;
  empNo: string;
  swcNationalId: string;
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
  s:string = '';
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  Dispatch()//搜尋派件人員
  {
    this.personnelCode = [];
    let LevelJson: any = {};
    let url = 'f04/f04003action1'
    LevelJson['level'] = this.Level;
    this.f04003Service.Set(url, LevelJson).subscribe(data => {
      this.personnelCode.push({ value: '', viewValue: '請選擇' })
      if (data.rspMsg != "該層級查無人員") {
        for (const jsonObj of data.rspBody) {
          const id = jsonObj['EMP_NO'];
          const name = jsonObj['EMP_NAME'];
          this.personnelCode.push({ value: id, viewValue: id+name })
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
      this.f04003Service.Set(url, personnelJson).subscribe(data => {

        if (data.rspBody.empList.length > 0)
        {
          for (const obj of data.rspBody.empList)
           {
            const id = obj['EMP_NO'];
            const name = obj['EMP_NAME'];
            this.TransferCode.push({ value: id, viewValue: id+name })
          }
        }

        if (data.rspBody.dataList.length > 0) {
          for (const jsonObj of data.rspBody.dataList) {
            const id = jsonObj['empNo'];
            // const name = jsonObj.empList['empName'];
            const member = jsonObj['F_WobNum'];
            // this.TransferCode.push({ value: id, viewValue: name })
            this.setDataSource = data.rspBody.dataList;
            this.checkboxArray.push({ value: member, completed: false, empNo: id })
          }
          this.i = 1;
        }
        else
        {
          if(this.s =='')
          {
            this.dialog.open(ConfirmComponent, {
              data: { msgStr: "查無案件" }
            });
          }

          this.s='';
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
      if (obj.empNo != this.Transfer) {
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
              this.assignArray.push({
                F_WobNum: jsonObj['F_WobNum'],
                swcApplno: jsonObj['swcApplno'] ,
                empNo:jsonObj['empNo'],
                swcNationalId:jsonObj['swcNationalId']
              })
            }
          }
        }
      }
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
              this.s="轉件成功";
              this.dialog.open(ConfirmComponent, {
                data: { msgStr: data.rspMsg }
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
    console.log( this.setDataSource)
  }
  Select()
  {
    for (const obj of this.checkboxArray) {
      if (obj.empNo == this.Transfer) {
        obj.completed = false;
        this.isAllCheck = false;
      }
    }
  }

  //Level轉換 代碼 + 中文
  changeLevel(level: string) {
    if (level == 'L4') {
      return "L4 文審"
    } else if (level == 'L2') {
      return "L2 授信"
    } else if (level == 'L3') {
      return "L3 徵信"
    } else if (level == 'L1') {
      return "L1 授信覆核"
    } else if (level == 'L0') {
      return "L0 主管"
    } else if (level == 'D2') {
      return "D2 產生合約前回查"
    } else if (level == 'D1') {
      return "D1 產生合約前覆核"
    } else if (level == 'S2') {
      return "S2 風管處處長"
    } else if (level == 'S1') {
      return "S1 總經理"
    }
  }
}
