import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f01001scn2',
  templateUrl: './f01001scn2.component.html',
  styleUrls: ['./f01001scn2.component.css','../../../assets/css/f01.css']
})
export class F01001scn2Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  private applno: string;
  private search: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
    });
    this.router.navigate(['./F01001SCN1/F01001SCN2/F01001SCN2PAGE1'], { queryParams: { applno: this.applno, search: this.search } });
  }

  getApplno(): String {
    return this.applno;
  }

  getSearch() :string {
    return this.search;
  }
}
