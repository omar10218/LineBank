import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f03009confirm',
  templateUrl: './f03009confirm.component.html',
  styleUrls: ['./f03009confirm.component.css']
})
export class F03009confirmComponent  {
  constructor(public dialogRef: MatDialogRef<F03009confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
