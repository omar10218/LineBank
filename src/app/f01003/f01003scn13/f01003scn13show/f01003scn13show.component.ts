import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f01003scn13show',
  templateUrl: './f01003scn13show.component.html',
  styleUrls: ['./f01003scn13show.component.css']
})
export class F01003scn13showComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01003scn13showComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
