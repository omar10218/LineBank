import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-childscn13confirm',
  templateUrl: './childscn13confirm.component.html',
  styleUrls: ['./childscn13confirm.component.css']
})
export class Childscn13confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<Childscn13confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
