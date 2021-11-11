import { Sort } from '@angular/material/sort';
import { Component, OnInit } from '@angular/core';
import { Childscn23Service } from './childscn23.service';

@Component({
  selector: 'app-childscn23',
  templateUrl: './childscn23.component.html',
  styleUrls: ['./childscn23.component.css', '../../../assets/css/child.css']
})
export class Childscn23Component implements OnInit {

  constructor( private childscn23Service: Childscn23Service) { }
  applno: string;
  i = false;
  ttt:string;
  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.dropdown();
  }
  add() {
    this.i = true;
  }
  test(x: string)
  {
    x=x.replace(/\D/g,'')

    if(x.length>0){

      x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
     }
     this.ttt = x;

  }
  set()
  {
    let jsonObject: any = {};

  }

  dropdown()
  {
    let url ='f01/childscn23action2';
    this.childscn23Service.getdropdown(url).subscribe(data=>{
      console.log(data);
    })
  }
}
