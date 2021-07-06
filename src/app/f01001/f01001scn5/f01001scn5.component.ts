import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f01001scn5',
  templateUrl: './f01001scn5.component.html',
  styleUrls: ['./f01001scn5.component.css']
})
export class F01001scn5Component implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  private applno: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
    });
  }

  getApplno(): String {
    return this.applno;
  }

}
