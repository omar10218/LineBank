import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-f01004scn1',
  templateUrl: './f01004scn1.component.html',
  styleUrls: ['./f01004scn1.component.css', '../../../assets/css/f01.css']
})
export class F01004scn1Component implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }
  private creditLevel: string = 'APPLCreditL1';
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

  ngAfterViewInit() {
    let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    element.click();
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

  getLevel(): string {
    return this.creditLevel;
  }
}
