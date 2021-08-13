import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f04002confirm',
  templateUrl: './f04002confirm.component.html',
  styleUrls: ['./f04002confirm.component.css']
})
export class F04002confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F04002confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
