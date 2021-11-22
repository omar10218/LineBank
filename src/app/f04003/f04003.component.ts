import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { time } from 'console';
import { F04003Service } from './f04003.service';

// Jay 案件重新指派
interface sysCode {
  value: string;
  viewValue: string;
}
interface checkBox {
  value: string;
  completed: boolean;
  empno:string;
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

  constructor(private f04003Service: F04003Service) { }

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
  Level: string //層級
  personnelCode: sysCode[] = [];;
  personnel: string //人員
  chkArray: any[] = [];
  checkboxArray: checkBox[] = [];
  assignArray: assign[] = [];
  i = 0;
  isAllCheck: boolean = false;
  Transfer: string;//轉件
  TransferCode: sysCode[] = [];

  Dispatch()//搜尋派件人員
  {
    this.personnelCode = [];
    let LevelJson: any = {};
    let url = 'f04/f04003action1'
    LevelJson['level'] = this.Level;
    this.f04003Service.Set(url, LevelJson).subscribe(data => {
      this.personnelCode.push({ value: '', viewValue: '請選擇' })
      for (const jsonObj of data.rspBody) {
        const id = jsonObj['EMP_NAME'];
        const name = jsonObj['EMP_NAME'];
        this.personnelCode.push({ value: id, viewValue: name })
      }
    })

  }
  Inquire()//查詢
  {
    this.TransferCode=[];
    this.setDataSource=[];
    this.i = 0;
    let url = 'f04/f04003action2'
    let personnelJson: any = {};
    personnelJson['level'] = this.Level;
    personnelJson['EMP_NAME'] = this.personnel;
    this.f04003Service.Set(url, personnelJson).subscribe(data => {
      if (data.rspBody.length > 0)
      {

        for (const jsonObj of data.rspBody) {
          const id = jsonObj['empNo'];
          const name = jsonObj['empName'];
          const member = jsonObj['F_WobNum'];
          this.TransferCode.push({ value: id, viewValue: name })
          this.setDataSource = data.rspBody;
          this.checkboxArray.push({ value: member, completed: false ,empno:id})
        }
        this.i = 1;
      }
    })
  }
  setAll(completed: boolean) {
    for (const obj of this.checkboxArray)
    {
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
 change()
   {
    //  if(this.Transfer != )
    for (const obj of this.checkboxArray)
    {
      for (const jsonObj of this.setDataSource)
      {
        if (obj.completed==true)
        {
          if (obj.value == jsonObj['F_WobNum'])
          {
            this.assignArray.push({ F_WobNum: jsonObj['F_WobNum'], swcApplno: jsonObj['swcApplno'] })
          }
        }
      }
    }
    let url = 'f04/f04003action3'
    let changeJson: any = {};
    changeJson['level'] = this.Level;
    changeJson['roleNo'] = this.Transfer;
    changeJson['assign'] = this.assignArray;
    this.f04003Service.Set(url,changeJson).subscribe(data=>
    {
      if(data.rspCode=='0000')
      {
        this.Inquire();
      }
        console.log("data")
        console.log(data)
    })

  }
  tes() {
    console.log(this.checkboxArray)
    console.log(this.setDataSource)
    console.log(this.assignArray)
  }
}
