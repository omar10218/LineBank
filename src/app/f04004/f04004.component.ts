import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { F04004Service } from './f04004.service';


// Jay 複審案件重新指派
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
  selector: 'app-f04004',
  templateUrl: './f04004.component.html',
  styleUrls: ['./f04004.component.css', '../../assets/css/f04.css']
})
export class F04004Component implements OnInit {

  constructor(private f04004Service: F04004Service,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.LevelCode.push({ value: 'L4', viewValue: 'L4' });
    this.LevelCode.push({ value: 'L3', viewValue: 'L3' });
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
  // s:string = '';
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  Dispatch()//搜尋派件人員
  {
    this.personnelCode = [];
    let LevelJson: any = {};
    let url = 'f04/f04004action3'
    LevelJson['level'] = this.Level;
    this.f04004Service.Set(url, LevelJson).subscribe(data => {
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
  Search()
  {
    this.checkboxArray = [];
    this.setDataSource = [];
    this.TransferCode = [];
    this.Inquire(this.pageIndex,this.pageSize)
  }

  Inquire(pageIndex: number, pageSize: number)//查詢
  {

    if (this.Level != '' || this.personnel != '')
    {
      this.i = 0;
      let url = 'f04/f04004action4'
      let personnelJson: any = {};
      personnelJson['level'] = this.Level;
      personnelJson['empNo'] = this.personnel;
      personnelJson['pageIndex'] = pageIndex;
      personnelJson['pageSize'] = pageSize;
      this.f04004Service.Set(url, personnelJson).subscribe(data => {
        this.total=  data.rspBody.totalPage;
        if (data.rspBody.empList.length > 0)
        {
          for (const obj of data.rspBody.empList)
           {
            const id = obj['EMP_NO'];
            const name = obj['EMP_NAME'];
            this.TransferCode.push({ value: id, viewValue: id+name })
          }
        }

        if (data.rspBody.dataList.length > 0)
        {
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
          this.dialog.open(ConfirmComponent, {
            data: { msgStr: "查無案件" }
          });
          // if(this.s =='')
          // {

          // }

          // this.s='';
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
        let url = 'f04/f04004action2'
        let changeJson: any = {};
        changeJson['level'] = this.Level;
        changeJson['roleNo'] = this.Transfer;
        changeJson['assign'] = this.assignArray;
        if (this.assignArray.length > 0) {
          this.f04004Service.Set(url, changeJson).subscribe(data => {
            if (data.rspCode == '0000') {
              this.Search();
              this.assignArray=[]
              // this.s="轉件成功";
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
    if (level == 'L4')
     {
      return "L4 覆審人員"
    }
    else if (level == 'L3')
     {
      return "L3 覆審主管"
    }
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    if (this.i > 0)
     {
      const { pageSize, pageIndex } = params;
      this.pageSize = pageSize;
      this.pageIndex = pageIndex;
      this.Inquire(pageIndex, pageSize);
    }
  }
}
