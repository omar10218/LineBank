import { OptionsCode } from './../interface/base';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-f02003',
  templateUrl: './f02003.component.html',
  styleUrls: ['./f02003.component.css', '../../assets/css/f02.css']
})
export class F02003Component implements OnInit {

  constructor() { }

  applno: string = '';
  nationalId: string = '';
  custId: string = '';
  custName: string = '';

  //test
  rescanEmpno: string;
  rescanEmpnoCode: OptionsCode[] = [];

  date: [Date, Date];
  dateFormat = 'yyyy/MM/dd';

  ngOnInit(): void {
  }

  search() {

  }

  clear() {

  }

  dateNull() {
    if ( this.date.length < 1 ) {
      this.date = null;
    }
  }
}
