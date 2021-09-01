import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { F01003scn7Service } from './f01003scn7.service';

@Component({
  selector: 'app-f01003scn7',
  templateUrl: './f01003scn7.component.html',
  styleUrls: ['./f01003scn7.component.css', '../../../assets/css/f01.css']
})
export class F01003scn7Component implements OnInit {

  CALLOUTSource = new MatTableDataSource<any>();
  AMLSource:any;
  FDSSource:any;
  CSSSource:any;

  constructor(private route: ActivatedRoute, private router: Router, private f01003scn7Service: F01003scn7Service) { }
  private applno: string;
  private search: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
    });
    this.getCALLOUTFunction();
  }

  getApplno(): String {
    return this.applno;
  }

  getSearch() :string {
    return this.search;
  }

  private async getCALLOUTFunction() {
    const baseUrl = 'f01/f01003scn7';
    this.f01003scn7Service.getAML_FDS_CSS(baseUrl,this.applno).subscribe(data => {
       this.AMLSource=data.rspBody.amlList;
       this.FDSSource= data.rspBody.fdsList;
       this.CSSSource= data.rspBody.cssList;

    });
  }
}
