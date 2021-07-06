import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f03007confirm',
  templateUrl: './f03007confirm.component.html',
  styleUrls: ['./f03007confirm.component.css']
})
export class F03007confirmComponent {
  constructor(public dialogRef: MatDialogRef<F03007confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
