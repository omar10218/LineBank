import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-f01004scn2',
  templateUrl: './f01004scn2.component.html',
  styleUrls: ['./f01004scn2.component.css','../../../assets/css/f01.css']
})
export class F01004scn2Component implements OnInit {

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
    this.router.navigate(['./F01004SCN1/F01004SCN2/F01004SCN2PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search } });
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
