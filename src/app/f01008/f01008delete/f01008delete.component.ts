import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OptionsCode } from 'src/app/interface/base';
import { F01008Service } from '../f01008.service';
@Component({
  selector: 'app-f01008delete',
  templateUrl: './f01008delete.component.html',
  styleUrls: ['./f01008delete.component.css','../../../assets/css/f01.css']
})
export class F01008deleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<F01008deleteComponent>,
  private f01008Service: F01008Service) { }
  CON_TYPE_Code: OptionsCode[] = null//聯絡方式下拉選單
  TEL_CONDITION_Code: OptionsCode[] = null;//電話狀況下拉選單
  TEL_CHECK_Code: OptionsCode[] = null;//電話種類下拉選單
  HOURS_Code: OptionsCode[] = null;//時下拉選單
  MINUTES_Code: OptionsCode[] = null;//分下拉選單
  @Input() data: any;
  ngOnInit(): void {
    this.HOURS_Code = this.f01008Service.getHOURS();//時下拉選單
    this.MINUTES_Code = this.f01008Service.getMINUTES();//分下拉選單
    this.CON_TYPE_Code = this.f01008Service.getCON_TYPE();//聯絡方式下拉選單
    this.TEL_CONDITION_Code = this.f01008Service.getTEL_CONDITION();//電話狀況下拉選單

  }

  deleteAction()
  {

  }
  onNoClick()
  {
    this.dialogRef.close();
  }
  save()
  {

  }
}
