import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-childscn15confirm',
  templateUrl: './childscn15confirm.component.html',
  styleUrls: ['./childscn15confirm.component.css']
})
export class Childscn15confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<Childscn15confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
