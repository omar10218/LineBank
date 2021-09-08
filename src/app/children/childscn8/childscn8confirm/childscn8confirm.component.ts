import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-childscn8confirm',
  templateUrl: './childscn8confirm.component.html',
  styleUrls: ['./childscn8confirm.component.css']
})
export class Childscn8confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<Childscn8confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
