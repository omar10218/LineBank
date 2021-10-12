import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-f01008add',
  templateUrl: './f01008add.component.html',
  styleUrls: ['./f01008add.component.css','../../../assets/css/f01.css']
})
export class F01008addComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01008addComponent>) { }

  ngOnInit(): void {
  }
  save()
  {

  }
  onNoClick()
  {
    this.dialogRef.close();
  }
}
