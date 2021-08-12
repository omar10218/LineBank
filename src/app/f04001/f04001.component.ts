import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { F04001Service } from './f04001.service';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f04001',
  templateUrl: './f04001.component.html',
  styleUrls: ['./f04001.component.css','../../assets/css/f03.css']
})

export class F04001Component implements OnInit {
  sysCode: sysCode[] = [];
  selectedValue: string;
  constructor(private f04001Service: F04001Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    const baseUrl = 'f04/f04001';
    this.f04001Service.getSysTypeCode(baseUrl).subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.sysCode.push({value: codeNo, viewValue: desc})
      }
    });
  }



  

  select() {

  }

  unlock() {

  }
}