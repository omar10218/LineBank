import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { F01001scn11Service } from './f01001scn11.service';

@Component({
  selector: 'app-f01001scn11',
  templateUrl: './f01001scn11.component.html',
  styleUrls: ['./f01001scn11.component.css','../../../assets/css/f01.css']
})
export class F01001scn11Component implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }
  private applno: string;
  private search: string;
  private cuid: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
      this.cuid = params['cuid'];
    });
    this.router.navigate(['./F01001SCN1/F01001SCN11/F01001SCN11PAGE1'], { queryParams: { applno: this.applno, cuid: this.cuid } });
  }

  getApplno(): String {
    return this.applno;
  }

  getSearch() :string {
    return this.search;
  }

  getCuid() :string {
    return this.cuid;
  }
}
