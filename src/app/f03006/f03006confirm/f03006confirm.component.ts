import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f03006confirm',
  templateUrl: './f03006confirm.component.html',
  styleUrls: ['./f03006confirm.component.css']
})
export class F03006confirmComponent {
  constructor(public dialogRef: MatDialogRef<F03006confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

}
