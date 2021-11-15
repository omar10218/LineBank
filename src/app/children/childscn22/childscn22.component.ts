import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { Childscn22Service } from './childscn22.service';

@Component({
  selector: 'app-childscn22',
  templateUrl: './childscn22.component.html',
  styleUrls: ['./childscn22.component.css', '../../../assets/css/f01.css']
})
export class Childscn22Component implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Childscn22Component>,
    public dialog: MatDialog,
    private childsnc22Service: Childscn22Service
  ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }
  
  public async confirm(): Promise<void> {
    let jsonObject: any = {};
    let msgStr: string = '';
    msgStr = await this.childsnc22Service.doDss1Search(jsonObject);
    const DialogRef = this.dialog.open(ConfirmComponent, { data: { msgStr: msgStr } });
  }
}
