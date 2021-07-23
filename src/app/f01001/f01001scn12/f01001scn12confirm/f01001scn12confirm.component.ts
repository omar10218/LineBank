import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f01001scn12confirm',
  templateUrl: './f01001scn12confirm.component.html',
  styleUrls: ['./f01001scn12confirm.component.css']
})
export class F01001scn12confirmComponent {

  constructor(public dialogRef: MatDialogRef<F01001scn12confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

}
