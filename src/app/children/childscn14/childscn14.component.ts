import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-childscn14',
  templateUrl: './childscn14.component.html',
  styleUrls: ['./childscn14.component.css']
})
export class Childscn14Component implements OnInit {

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
    this.router.navigate(['./ChildSCN1/ChildSCN14/ChildSCN14PAGE1'], { queryParams: { applno: this.applno, cuid: this.cuid , search: this.search } });
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
