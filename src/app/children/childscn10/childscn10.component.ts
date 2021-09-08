import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Childscn10Service } from './childscn10.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn10',
  templateUrl: './childscn10.component.html',
  styleUrls: ['./childscn10.component.css','../../../assets/css/f01.css']
})
export class Childscn10Component implements OnInit {

  dateCode: dateCode[] = [];
  dateValue: string;

  constructor(private route: ActivatedRoute, private router: Router, private childscn10Service: Childscn10Service) { }
  private applno: string;
  private search: string;
  private cuid: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
      this.cuid = params['cuid'];
    });
    const url = 'f01/childscn10';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    this.router.navigate(['./ChildSCN1/ChildSCN10/ChildSCN10PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search } });
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
}
