import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuListService } from './menu-list.service';
import { Menu } from './menu.model';
import { LoginService } from '../login/login.service';
import { F01002Service } from '../f01002/f01002.service';


//Nick icon/時間登出/照會提醒
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit, OnDestroy {
  empNo: string = localStorage.getItem("empNo");
  constructor(
    private router: Router,
    private menuListService: MenuListService,
    private loginService: LoginService,
    private f01002Service: F01002Service,
  ) { }

  total: string;
  applno= [];

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  userOnAction() {
    this.loginService.setBnIdle();
  }
  intervalRef: any;

  ngOnInit() {
    this.loginService.setBnIdle();
    this.getCalloutList();
    //設定5分鐘刷新照會提醒
    this.intervalRef = setInterval(
      () => {
        this.getCalloutList();
      }, 5* 60 * 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalRef);
  }

  getMenu(): Menu[] { return this.menuListService.getMap(); }
  returnZero() { return 0; }
  logOut() {
    window.sessionStorage.clear();
    this.router.navigate(['./logOut'], { skipLocationChange : true } ).then(() => {
      window.location.reload();
    });
  }

  goHome() {
    this.router.navigate(['./home'], { skipLocationChange : true } );
  }

  input() {
    this.router.navigate(['./input'], { skipLocationChange : true } );
  }

  //取照會提醒
  getCalloutList() {
    let jsonObject: any = {};
    jsonObject['swcL3EmpNo'] = localStorage.getItem("empNo");
    this.f01002Service.getCalloutList(jsonObject).subscribe(data => {
      this.total = data.rspBody.size;
      this.applno = data.rspBody.items;
    });
  }

  bell() {
    sessionStorage.setItem('bell', 'Y')
  }



}
