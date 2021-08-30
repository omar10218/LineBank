import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f03008confirm',
  templateUrl: './f03008confirm.component.html',
  styleUrls: ['./f03008confirm.component.css']
})
export class F03008confirmComponent  {
  constructor(public dialogRef: MatDialogRef<F03008confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
