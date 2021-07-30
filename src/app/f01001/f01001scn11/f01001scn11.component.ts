import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01001scn11',
  templateUrl: './f01001scn11.component.html',
  styleUrls: ['./f01001scn11.component.css']
})
export class F01001scn11Component implements OnInit {

  scklvValue: string;
  calvValue: string;
  tvNoValue: string;
  scklvCode: sysCode[] = [];
  calvCode: sysCode[] = [];
  tvNoCode: sysCode[] = [];

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

  changeSelect() {

  }
}
