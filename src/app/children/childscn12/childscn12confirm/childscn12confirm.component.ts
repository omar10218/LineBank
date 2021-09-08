import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-childscn12confirm',
  templateUrl: './childscn12confirm.component.html',
  styleUrls: ['./childscn12confirm.component.css']
})
export class Childscn12confirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<Childscn12confirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
