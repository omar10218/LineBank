import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f01002scn13confirm',
  templateUrl: './f01002scn13confirm.component.html',
  styleUrls: ['./f01002scn13confirm.component.css']
})
export class F01002scn13confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01002scn13confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
