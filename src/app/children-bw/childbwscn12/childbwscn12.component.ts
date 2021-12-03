import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-childbwscn12',
  templateUrl: './childbwscn12.component.html',
  styleUrls: ['./childbwscn12.component.css', '../../../assets/css/child.css']
})
export class Childbwscn12Component implements OnInit {

  constructor(public dialog: MatDialog) {

  }
  empNo: string;
  userId: string;
  swcApplno: string;//案件編號
  swcID: string;//客戶編號
  search: any[] = [];
  ngOnInit(): void {
    this.swcID = sessionStorage.getItem('cuid');

  }
  closure() {
    this.dialog.closeAll()
  }

}
