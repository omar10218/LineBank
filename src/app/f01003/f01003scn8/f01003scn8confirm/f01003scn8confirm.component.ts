import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f01003scn8confirm',
  templateUrl: './f01003scn8confirm.component.html',
  styleUrls: ['./f01003scn8confirm.component.css']
})
export class F01003scn8confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01003scn8confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
