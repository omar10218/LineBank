import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { F01008addComponent } from '../f01008add/f01008add.component'
import { F01008Service } from '../f01008.service';
import { Data } from '@angular/router';
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
  ngOnInit(): void {
    // this.applno = sessionStorage.getItem('applno');
    this.applno = "20211125A00002";
    console.log(this.applno)
    this.set();
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
      this.dataSource = data.rspBody.telCondition;

      console.log(this.dataSource)
    })
  }
}
