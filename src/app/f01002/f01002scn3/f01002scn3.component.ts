import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-f01002scn3',
  templateUrl: './f01002scn3.component.html',
  styleUrls: ['./f01002scn3.component.css']
})
export class F01002scn3Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  private applno: string;
  private search: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
    });
  }

  getApplno(): String {
    return this.applno;
  }

  getSearch() :string {
    return this.search;
  }

}
