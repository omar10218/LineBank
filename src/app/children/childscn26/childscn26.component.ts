import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-childscn26',
  templateUrl: './childscn26.component.html',
  styleUrls: ['./childscn26.component.css', '../../../assets/css/f01.css']
})
export class Childscn26Component implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Childscn26Component>,
  ) { }

  ngOnInit(): void {
  }

  confirm(value: string) {
    this.dialogRef.close({ value: value });
  }

  cancel(value: string) {
    this.dialogRef.close({ value: value });
  }

}
