import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f01001scn8add',
  templateUrl: './f01001scn8add.component.html',
  styleUrls: ['./f01001scn8add.component.css']
})
export class F01001scn8addComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<F01001scn8addComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
