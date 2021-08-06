import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { F01001scn10Service } from './f01001scn10.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f01001scn10',
  templateUrl: './f01001scn10.component.html',
  styleUrls: ['./f01001scn10.component.css','../../../assets/css/f01.css']
})
export class F01001scn10Component implements OnInit {

  dateCode: dateCode[] = [];
  dateValue: string;

  constructor(private route: ActivatedRoute, private router: Router, private f01001scn10Service: F01001scn10Service) { }
  private applno: string;
  private search: string;
  private cuid: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
      this.cuid = params['cuid'];
    });
    const url = 'f01/f01001scn10';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    // formdata.append('code', 'DSS1');
    // this.f01001scn10Service.getDate(url, formdata).subscribe(data => {
    //   for (let i = 0; i < data.rspBody.items.length; i++) {
    //     this.dateCode.push({ value: data.rspBody.items[i].QUERYDATE, viewValue: data.rspBody.items[i].QUERYDATE })
    //   }
    //   this.dateValue = data.rspBody.items[0].QUERYDATE
    // });
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
