import { Component, OnInit } from '@angular/core';
import { Childscn7Service } from './childscn7.service';
import { MatTableDataSource } from '@angular/material/table';

//20210906 新增RPM資訊,SRP同一關係人 alvin.lee
//Nick AML/FDS/CSS
@Component({
  selector: 'app-childscn7',
  templateUrl: './childscn7.component.html',
  styleUrls: ['./childscn7.component.css', '../../../assets/css/f01.css']
})
export class Childscn7Component implements OnInit {

  constructor(
    private childscn7Service: Childscn7Service,
  ) { }

  CALLOUTSource = new MatTableDataSource<any>();
  AMLSource: any;
  FDSSource: any;
  CSSSource: any;
  RPMSource: any;
  SRPSource: any;

  private applno: string;
  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.getCALLOUTFunction();
  }

  private async getCALLOUTFunction() {
    const baseUrl = 'f01/childscn7';
    this.childscn7Service.getAML_FDS_CSS(baseUrl, this.applno).subscribe(data => {
      this.AMLSource = data.rspBody.amlList;//alm資料
      this.FDSSource = data.rspBody.fdsList;//FDS資料
      this.CSSSource = data.rspBody.cssList;//CSS資料
      this.RPMSource = data.rspBody.rpmList;//RPM資料
      this.SRPSource = data.rspBody.srpList;//SRP同一關係人
    });
  }

}
