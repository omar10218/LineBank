import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-childbwscn5',
  templateUrl: './childbwscn5.component.html',
  styleUrls: ['./childbwscn5.component.css','../../../assets/css/child.css']
})
export class Childbwscn5Component implements OnInit {

  constructor() { }
  applno: string;
  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
  }
  set() {

  }

}
