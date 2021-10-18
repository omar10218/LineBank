import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-f01008delete',
  templateUrl: './f01008delete.component.html',
  styleUrls: ['./f01008delete.component.css','../../../assets/css/f01.css']
})
export class F01008deleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01008deleteComponent>) { }

  ngOnInit(): void {
  }

  deleteAction()
  {

  }
  onNoClick()
  {
    this.dialogRef.close();
  }
}
