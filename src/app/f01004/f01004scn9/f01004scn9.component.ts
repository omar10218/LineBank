import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { F01004scn9Service } from './f01004scn9.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01004scn9',
  templateUrl: './f01004scn9.component.html',
  styleUrls: ['./f01004scn9.component.css','../../../assets/css/f01.css']
})
export class F01004scn9Component implements OnInit {

  dateCode: dateCode[] = [];
  dateValue: string;

  constructor(private route: ActivatedRoute, private router: Router, private f01004scn9Service: F01004scn9Service) { }
  private applno: string;
  private search: string;
  private cuid: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
      this.cuid = params['cuid'];
    });
    const url = 'f01/f01004scn9';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    this.router.navigate(['./F01004SCN1/F01004SCN9/F01004SCN9PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search } });
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
