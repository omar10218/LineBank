import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Childscn6Service } from './childscn6.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn6',
  templateUrl: './childscn6.component.html',
  styleUrls: ['./childscn6.component.css','../../../assets/css/f01.css']
})
export class Childscn6Component implements OnInit {

  dateCode: dateCode[] = [];
  dateValue: string;
  toggle = true;

  constructor(private route: ActivatedRoute, private router: Router, private childscn6Service: Childscn6Service) { }
  private applno: string;
  private search: string;
  private cuid: string;
  private routerCase: string;
  private fds: string
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
      this.cuid = params['cuid'];
      this.routerCase = params['routerCase'];
      this.fds = params['fds'];
    });
    const url = 'f01/childscn6';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'MASTER');
    this.childscn6Service.getDate(url, formdata).subscribe(data => {
      if ( data.rspBody.items.length > 0 ) {
        for (let i = 0; i < data.rspBody.items.length; i++) {
          this.dateCode.push({value: data.rspBody.items[i].QUERYDATE , viewValue: data.rspBody.items[i].QUERYDATE })
        }
        this.dateValue = data.rspBody.items[0].QUERYDATE
        this.router.navigate(['./'+this.routerCase+'/CHILDSCN6/CHILDSCN6PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search , queryDate: this.dateValue, routerCase: this.routerCase, fds: this.fds} });
      }
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

  getDate() :string{
    return this.dateValue;
  }

  changeDate() {
    this.router.navigate(['./'+this.routerCase+'/CHILDSCN6/CHILDSCN6PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search , queryDate: this.dateValue, routerCase: this.routerCase } });
  }

  getRouterCase(): string {
    return this.routerCase;
  }
}
