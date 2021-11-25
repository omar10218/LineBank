import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-childbwscn12',
  templateUrl: './childbwscn12.component.html',
  styleUrls: ['./childbwscn12.component.css','../../../assets/css/child.css']
})
export class Childbwscn12Component implements OnInit {

  constructor() { }

  swcID:string;
  ngOnInit(): void {
    this.swcID = sessionStorage.getItem('cuid');
  }

}
