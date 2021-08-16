import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { F01001scn7Service } from './f01001scn7.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-f01001scn7',
  templateUrl: './f01001scn7.component.html',
  styleUrls: ['./f01001scn7.component.css', '../../../assets/css/f01.css']
})
export class F01001scn7Component implements OnInit {

   CALLOUTSource = new MatTableDataSource<any>();
  AMLSource:any;
  FDSSource:any;
  CSSSource:any;



  constructor(private route: ActivatedRoute, private router: Router, private f01001scn7Service: F01001scn7Service) { }
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
    const baseUrl = 'f01/f01001scn7';
    this.f01001scn7Service.getAML_FDS_CSS(baseUrl,this.applno).subscribe(data => {
       console.log(data);
       this.AMLSource=data.rspBody.amlList;
       this.FDSSource= data.rspBody.fdsList;
       this.CSSSource= data.rspBody.cssList;

    });
  }

}
