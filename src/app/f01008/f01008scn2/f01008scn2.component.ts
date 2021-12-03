import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { F01008addComponent } from '../f01008add/f01008add.component'
import { F01008Service } from '../f01008.service';
import { Data } from '@angular/router';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01008scn2',
  templateUrl: './f01008scn2.component.html',
  styleUrls: ['./f01008scn2.component.css', '../../../assets/css/f01.css']
})
export class F01008scn2Component implements OnInit {

  constructor(
    public dialog: MatDialog,
    private f01008Service: F01008Service) { }

  applno: string;
  page = 1;
  pei_page = 50;
  dataSource: Data[] = [];
  tYPE: sysCode[] = [];
  cONDITION: sysCode[] = [];
  ngOnInit(): void {
    // this.applno = sessionStorage.getItem('applno');
    this.applno = "20211125A00002";
    console.log(this.applno)
    this.set();
    this.tYPE.push({value:'1',viewValue:'公司電話'})
    this.tYPE.push({value:'2',viewValue:'手機號碼'})
    this.tYPE.push({value:'3',viewValue:'住家號碼'})
    this.tYPE.push({value:'4',viewValue:'其他'})

    this.cONDITION.push({value:'1',viewValue:'本人接'})
    this.cONDITION.push({value:'2',viewValue:'他人接'})
    this.cONDITION.push({value:'3',viewValue:'無人接'})
    this.cONDITION.push({value:'4',viewValue:'其他(備註)'})
  }
  add() {
    const dialogRef = this.dialog.open(F01008addComponent, {

    });
  }
  set() {
    let jsonObject: any = {};
    let url = 'f01/f01008scn2';
    jsonObject['applno'] = this.applno;
    jsonObject['page'] = this.page;
    jsonObject['pei_page'] = this.pei_page;
    this.f01008Service.f01008scn2(jsonObject, url).subscribe(data => {
      console.log(data)
      this.dataSource = data.rspBody.list;

    })
  }
  getOptionDesc(option: sysCode[], codeVal: string): string {
    for (const data of option) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
}
