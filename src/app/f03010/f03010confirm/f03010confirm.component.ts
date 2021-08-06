import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f03010confirm',
  templateUrl: './f03010confirm.component.html',
  styleUrls: ['./f03010confirm.component.css']
})
export class F03010confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F03010confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
