import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-f02001',
  templateUrl: './f02001.component.html',
  styleUrls: ['./f02001.component.css']
})
export class F02001Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    this.router.navigate(['./F01001SCN1'], { queryParams: { applno: "1" , search: 'Y'} });
  }

}
