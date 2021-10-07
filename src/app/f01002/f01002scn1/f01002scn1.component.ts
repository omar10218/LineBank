import { Childscn19Component } from './../../children/childscn19/childscn19.component';
import { F01002blocklistComponent } from './../f01002blocklist/f01002blocklist.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Childscn18Component } from 'src/app/children/childscn18/childscn18.component';
import { F01002rescanComponent } from '../f01002rescan/f01002rescan.component';

@Component({
  selector: 'app-f01002scn1',
  templateUrl: './f01002scn1.component.html',
  styleUrls: ['./f01002scn1.component.css', '../../../assets/css/f01.css']
})
export class F01002scn1Component implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  private creditLevel: string = 'APPLCreditL3';
  private applno: string;
  private search: string;
  private cuid: string;
  private routerCase: string;
  fds: string

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.search = sessionStorage.getItem('search');
    this.cuid = sessionStorage.getItem('cuid');
    this.fds = sessionStorage.getItem('fds');
  }

  ngAfterViewInit() {
    let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    element.click();
  }

  reScan() {
    const dialogRef = this.dialog.open(Childscn19Component,{
      minHeight: '50%',
      width: '70%',
      data:{
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  reSearch() {
    const dialogRef = this.dialog.open(Childscn18Component,{
      data:{
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  blockList() {
    const dialogRef = this.dialog.open(F01002blocklistComponent,{
      data:{
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }
}
