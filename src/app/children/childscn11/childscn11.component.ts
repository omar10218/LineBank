import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-childscn11',
  templateUrl: './childscn11.component.html',
  styleUrls: ['./childscn11.component.css','../../../assets/css/f01.css']
})
export class Childscn11Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  private applno: string;
  private search: string;
  private cuid: string;
  private routerCase: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
      this.cuid = params['cuid'];
      this.routerCase = params['routerCase'];
    });
    this.router.navigate(['./'+this.routerCase+'/ChildSCN11/ChildSCN11PAGE1'], { queryParams: { applno: this.applno, cuid: this.cuid , search: this.search } });
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
