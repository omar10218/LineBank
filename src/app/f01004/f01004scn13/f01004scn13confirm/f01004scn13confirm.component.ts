import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f01004scn13confirm',
  templateUrl: './f01004scn13confirm.component.html',
  styleUrls: ['./f01004scn13confirm.component.css']
})
export class F01004scn13confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01004scn13confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
