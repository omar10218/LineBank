import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuListService } from './menu-list.service';
import { Menu } from './menu.model';
import { LoginService } from '../login/login.service';
import { F01002Service } from '../f01002/f01002.service';
import { Subscription } from 'rxjs';
import { HandleSubscribeService } from '../services/handle-subscribe.service';


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
    private handleSubscribeS: HandleSubscribeService
  ) { 
    this.calloutSource$ = this.handleSubscribeS.calloutSource$.subscribe(() => {
      this.getCalloutList();
    });
  }

  total: string;
  applno= [];
  calloutSource$: Subscription;
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  userOnAction() {
    this.loginService.setBnIdle();
  }
  intervalRef: any;

  private winClose: string = '';//判斷是否顯示menu (查詢不顯示)

  ngOnInit() {
    this.winClose = sessionStorage.getItem('winClose');
    if (localStorage.getItem('empNo') == null || localStorage.getItem('empNo') == '') {
      window.sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['./logOut']).then(() => {
        window.location.reload();
      });
    }
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
    localStorage.clear();
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

  getWinClose(): String {
    return this.winClose;
  }



}
