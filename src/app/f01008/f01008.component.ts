import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-f01008',
  templateUrl: './f01008.component.html',
  styleUrls: ['./f01008.component.css','../../assets/css/f01.css']
})
export class F01008Component implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = window.location.href.split("/#");
    open( url[0] + "/#/F01008/F01008SCN1" );
  }


}
