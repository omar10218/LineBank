import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-childscn1',
  templateUrl: './childscn1.component.html',
  styleUrls: ['./childscn1.component.css','../../../assets/css/child.css']
})
export class Childscn1Component implements OnInit {

  constructor() { }

  mark: string;
  ngOnInit(): void {
  }

  save() {

  }
}
