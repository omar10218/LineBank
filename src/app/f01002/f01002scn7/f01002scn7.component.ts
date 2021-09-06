import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { F01002scn7Service } from './f01002scn7.service';
import { MatTableDataSource } from '@angular/material/table';

//20210906 新增RPM資訊,SRP同一關係人 alvin.lee
//Nick AML/FDS/CSS
@Component({
  selector: 'app-f01002scn7',
  templateUrl: './f01002scn7.component.html',
  styleUrls: ['./f01002scn7.component.css', '../../../assets/css/f01.css']
})
export class F01002scn7Component implements OnInit {

  CALLOUTSource = new MatTableDataSource<any>();
  AMLSource: any;
  FDSSource: any;
  CSSSource: any;
  RPMSource: any;
  SRPSource: any;


  constructor(private route: ActivatedRoute, private router: Router, private f01002scn7Service: F01002scn7Service) { }
  private applno: string;
  private search: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];//收編
      this.search = params['search'];//判斷徵信/查詢
    });
    this.getCALLOUTFunction();
  }

  //取收編
  getApplno(): String {
    return this.applno;
  }

  //判斷徵信/查詢
  getSearch(): string {
    return this.search;
  }


  private async getCALLOUTFunction() {
    const baseUrl = 'f01/f01002scn7';
    this.f01002scn7Service.getAML_FDS_CSS(baseUrl, this.applno).subscribe(data => {
      this.AMLSource = data.rspBody.amlList;//alm資料
      this.FDSSource = data.rspBody.fdsList;//FDS資料
      this.CSSSource = data.rspBody.cssList;//CSS資料
      this.RPMSource = data.rspBody.rpmList;//RPM資料
      this.SRPSource = data.rspBody.srpList;//SRP同一關係人
    });
  }

}
