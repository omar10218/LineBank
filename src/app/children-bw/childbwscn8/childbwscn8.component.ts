import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Childbwscn8Service } from '../childbwscn8/childbwscn8.service';

@Component({
  selector: 'app-childbwscn8',
  templateUrl: './childbwscn8.component.html',
  styleUrls: ['./childbwscn8.component.css','../../../assets/css/child.css']
})

export class Childbwscn8Component implements OnInit {

  constructor(private Childbwscn8Service: Childbwscn8Service,) { }

  applno: string;
  materialSource: readonly Data[] = [];
  total = 1;
  pageIndex = 1;
  pageSize= 50;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.set()
  }
  set()
  {
    let jsonObject: any = {}
    jsonObject['applno'] = this.applno
    this.Childbwscn8Service.getmaterial(jsonObject).subscribe(data=>{

      if(data.rspMsg == 'success')
      {
        this.materialSource = data.rspBody
      }
      this.materialSource = null;
    })

  }
}
