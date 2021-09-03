import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { F01002scn7Service } from './f01002scn7.service';

//Nick AML/FDS/CSS
@Component({
  selector: 'app-f01002scn7',
  templateUrl: './f01002scn7.component.html',
  styleUrls: ['./f01002scn7.component.css', '../../../assets/css/f01.css']
})
export class F01002scn7Component implements OnInit {

  CALLOUTSource = new MatTableDataSource<any>();
  AMLSource:any;
  FDSSource:any;
  CSSSource:any;

  constructor(private route: ActivatedRoute, private router: Router, private f01002scn7Service: F01002scn7Service) { }
  private applno: string;
  private search: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];//收編
      this.search = params['search']; //判斷徵信/查詢
    });
    this.getCALLOUTFunction();
  }
//取收編
  getApplno(): String {
    return this.applno;
  }
 //判斷徵信/查詢
  getSearch() :string {
    return this.search;
  }

  private async getCALLOUTFunction() {
    const baseUrl = 'f01/f01002scn7';
    this.f01002scn7Service.getAML_FDS_CSS(baseUrl,this.applno).subscribe(data => {
       this.AMLSource=data.rspBody.amlList;
       this.FDSSource= data.rspBody.fdsList;
       this.CSSSource= data.rspBody.cssList;

    });
  }
}
