import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { F04003Service } from './f04003.service';
@Component({
  selector: 'app-f04003',
  templateUrl: './f04003.component.html',
  styleUrls: ['./f04003.component.css','../../assets/css/f04.css']
})
export class F04003Component implements OnInit {

  constructor(private f04003Service: F04003Service) { }

  ngOnInit(): void {
    this.LevelCode.push({ value: 'L0', viewValue: 'L0' });
    this.LevelCode.push({ value: 'L1', viewValue: 'L1' });
    this.LevelCode.push({ value: 'L2', viewValue: 'L2' });
    this.LevelCode.push({ value: 'L3', viewValue: 'L3' });
    this.LevelCode.push({ value: 'L4', viewValue: 'L4' });

  }
  LevelCode: any[] = [];
  setDataSource:readonly Data[] = [];
  Level:string //層級

  test()
  {
    let  LevelJson:any ={};
    let url = 'f04/f04003action1'
    LevelJson['level'] = this.Level;
    this.f04003Service.Set(url,LevelJson).subscribe(data=>{
      console.log(data)
    })

  }
}
