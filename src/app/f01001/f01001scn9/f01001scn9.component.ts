import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { F01001scn9Service } from './f01001scn9.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01001scn9',
  templateUrl: './f01001scn9.component.html',
  styleUrls: ['./f01001scn9.component.css','../../../assets/css/f01.css']
})
export class F01001scn9Component implements OnInit {

  dateCode: dateCode[] = [];
  dateValue: string;

  constructor(private route: ActivatedRoute, private router: Router, private f01001scn9Service: F01001scn9Service) { }
  private applno: string;
  private search: string;
  private cuid: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
      this.cuid = params['cuid'];
    });
    const url = 'f01/f01001scn9';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    // formdata.append('code', 'DSS1');
    // this.f01001scn9Service.getDate(url, formdata).subscribe(data => {
    //   for (let i = 0; i < data.rspBody.items.length; i++) {
    //     this.dateCode.push({ value: data.rspBody.items[i].QUERYDATE, viewValue: data.rspBody.items[i].QUERYDATE })
    //   }
    //   this.dateValue = data.rspBody.items[0].QUERYDATE
    // });
    this.router.navigate(['./F01001SCN1/F01001SCN9/F01001SCN9PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid } });
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
