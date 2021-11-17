import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuListService } from './menu-list.service';
import { Menu } from './menu.model';
import { LoginService } from '../login/login.service';
import { F01002Service } from '../f01002/f01002.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  empNo: string = localStorage.getItem("empNo");
  constructor(
    private router: Router,
    private menuListService: MenuListService,
    private loginService: LoginService,
    private f01002Service: F01002Service,
  ) { }

  total: string;

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  userOnAction() {
    this.loginService.setBnIdle();
  }

  ngOnInit() {
    this.loginService.setBnIdle();
    this.getCalloutList();
  }

  getMenu(): Menu[] { return this.menuListService.getMap(); }
  returnZero() { return 0; }
  logOut() {
    window.sessionStorage.clear();
    this.router.navigate(['./logOut']).then(() => {
      window.location.reload();
    });
  }

  goHome() {
    this.router.navigate(['./home']);
  }

  input() {
    this.router.navigate(['./input']);
  }

  getCalloutList() {
    let jsonObject: any = {};
    jsonObject['swcL3EmpNo'] = localStorage.getItem("empNo");
    this.f01002Service.getCalloutList(jsonObject).subscribe(data => {
      console.log("for menu===>"+this.total)
      this.total = data.rspBody.size;
    });
  }

  bell() {
    sessionStorage.setItem( 'bell', 'Y')
  }
}
