import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-f01002scn12confirm',
  templateUrl: './f01002scn12confirm.component.html',
  styleUrls: ['./f01002scn12confirm.component.css']
})
export class F01002scn12confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01002scn12confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
