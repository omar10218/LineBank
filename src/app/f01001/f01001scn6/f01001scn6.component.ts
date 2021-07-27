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
    this.dateValue = '20210727';
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

  getDate() :string{
    return this.dateValue;
  }

  changeDate() {
   this.router.navigate(['./F01001SCN1/F01001SCN6'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search , queryDate: this.dateValue} });
  }
}
