import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Childbwscn12Component } from 'src/app/children-bw/childbwscn12/childbwscn12.component';
import { Childscn18Component } from 'src/app/children/childscn18/childscn18.component';

@Component({
  selector: 'app-f01009scn1',
  templateUrl: './f01009scn1.component.html',
  styleUrls: ['./f01009scn1.component.css', '../../../assets/css/f01.css']
})
export class F01009scn1Component implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  private applno: string;
  private search: string;
  private cuid: string;
  private fds: string

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

  getSearch(): String {
    return this.search;
  }

  reSearch() {
    const dialogRef = this.dialog.open(Childbwscn12Component,{
      width:"60vw",
      data:{
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  finish() {

  }
}
