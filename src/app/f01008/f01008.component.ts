import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {F01008addComponent} from './f01008add/f01008add.component'
import {F01008deleteComponent} from './f01008delete/f01008delete.component'
@Component({
  selector: 'app-f01008',
  templateUrl: './f01008.component.html',
  styleUrls: ['./f01008.component.css','../../assets/css/f01.css']
})
export class F01008Component implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  add()
  {
    const dialogRef = this.dialog.open(F01008addComponent, {

    });
  }
}
