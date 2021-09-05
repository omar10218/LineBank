import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { F01001scn7Service } from './f01001scn7.service';
import { MatTableDataSource } from '@angular/material/table';

//Nick AML/FDS/CSS
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
  getSearch() :string {
    return this.search;
  }


  private async getCALLOUTFunction() {
    const baseUrl = 'f01/f01001scn7';
    this.f01001scn7Service.getAML_FDS_CSS(baseUrl,this.applno).subscribe(data => {
       console.log(data);
       this.AMLSource=data.rspBody.amlList;//alm資料
       this.FDSSource= data.rspBody.fdsList;//FDS資料
       this.CSSSource= data.rspBody.cssList;//CSS資料

    });
  }

}
