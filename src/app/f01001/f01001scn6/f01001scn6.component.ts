import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01001scn6',
  templateUrl: './f01001scn6.component.html',
  styleUrls: ['./f01001scn6.component.css','../../../assets/css/f01.css']
})
export class F01001scn6Component implements OnInit {

  dateCode: dateCode[] = [{value: '20210101', viewValue: '20210101'}, {value: '20210727', viewValue: '20210727'}];
  dateValue: string;

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

  changeDate() {
   console.log("123456="+this.dateValue);
  }
}
