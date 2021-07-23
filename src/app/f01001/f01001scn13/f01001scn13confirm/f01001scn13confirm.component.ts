import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './f01001scn13confirm.component.html',
  styleUrls: ['./f01001scn13confirm.component.css']
})
export class F01001scn13confirmComponent {
  constructor(public dialogRef: MatDialogRef<F01001scn13confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
