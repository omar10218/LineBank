import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Childscn9Service } from './childscn9.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn9',
  templateUrl: './childscn9.component.html',
  styleUrls: ['./childscn9.component.css','../../../assets/css/f01.css']
})
export class Childscn9Component implements OnInit {

  dateCode: dateCode[] = [];
  dateValue: string;

  constructor(private route: ActivatedRoute, private router: Router, private childscn9Service: Childscn9Service) { }
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
    const url = 'f01/childscn9';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    this.router.navigate(['./'+this.routerCase+'/ChildSCN9/ChildSCN9PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search, routerCase: this.routerCase } });
  }

  getApplno(): String {
    return this.applno;
  }

  getSearch(): string {
    return this.search;
  }

  getCuid(): string {
    return this.cuid;
  }

  getDate(): string {
    return this.dateValue;
  }

  getRouterCase(): string {
    return this.routerCase;
  }
}
