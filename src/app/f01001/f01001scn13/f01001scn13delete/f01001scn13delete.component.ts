import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F01001scn13Service } from '../f01001scn13.service';

@Component({
  templateUrl: './f01001scn13delete.component.html',
  styleUrls: ['./f01001scn13delete.component.css']
})
export class F01001scn13deleteComponent implements OnInit {
  imageSrc: string;
  rowId: string;
  msg: string = "";
  constructor(public dialogRef: MatDialogRef<F01001scn13deleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public f01001scn13Service: F01001scn13Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.rowId = this.data.rowId;
    this.imageSrc = 'data:image/png;base64,' + this.data.base64;
  }

  deleteFile() {
    alert(this.rowId);
    const formdata = new FormData();
    formdata.append('rowid', this.rowId);
    const baseUrl = 'f01/f01001scn13action3';
    this.f01001scn13Service.uploadFile(baseUrl, formdata).subscribe(data => {

    });
  }
}
