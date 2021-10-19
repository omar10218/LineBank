import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {F01008addComponent} from'../f01008add/f01008add.component'
@Component({
  selector: 'app-f01008scn2',
  templateUrl: './f01008scn2.component.html',
  styleUrls: ['./f01008scn2.component.css','../../../assets/css/f01.css']
})
export class F01008scn2Component implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  add()
  {
    const dialogRef = this.dialog.open(F01008addComponent, {

    });
  }
}
