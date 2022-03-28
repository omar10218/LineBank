import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuListService } from './menu-list.service';
import { Menu } from './menu.model';
import { LoginService } from '../login/login.service';
import { F01002Service } from '../f01002/f01002.service';
import { Subscription } from 'rxjs';
import { HandleSubscribeService } from '../services/handle-subscribe.service';
import { environment } from 'src/environments/environment';
import { NgxWatermarkOptions } from 'ngx-watermark';
import { DatePipe, LocationStrategy } from '@angular/common';
import { Childscn6Service } from '../children/childscn6/childscn6.service';
import { BaseService } from '../base.service';

//Nick icon/時間登出/照會提醒
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit, OnDestroy {
  empNo: string = BaseService.userId;
  constructor(
    private router: Router,
    private menuListService: MenuListService,
    private loginService: LoginService,
    private f01002Service: F01002Service,
    private handleSubscribeS: HandleSubscribeService,
    private pipe: DatePipe,
    private location: LocationStrategy
  ) {
    this.calloutSource$ = this.handleSubscribeS.calloutSource$.subscribe(() => {
      this.getCalloutList();
    });

    this.WaterMarkSource$ = this.menuListService.WaterMarkSource$.subscribe((data) => {
      this.waterShow = data.show;
    });

    this.urlT$ = this.menuListService.url$.subscribe((data) => {
      this.url.push(data.url);
    });

    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  total: string;
  applno = [];
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

  WaterMarkSource$: Subscription;
  waterShow = false;
  today: string = this.pipe.transform(new Date(), 'yyyyMMdd HH:mm:ss');
  options: NgxWatermarkOptions = {
    text: BaseService.userId + BaseService.empName + this.today,
    width: 300,
    height: 150,
    fontFamily: 'Kanit',
    color: '#999',
    alpha: .3,
    degree: -45,
    fontSize: '15px',
  };

  searchUserId: string = '';
  searchEmpName: string = '';
  empName: string;

  url: Window[] = [];
  urlT$: Subscription;

  ngOnInit() {
    this.empNo = localStorage.getItem("empNo");
    this.empName = localStorage.getItem("empName");
    this.menuListService.setUserId(this.empNo);
    this.menuListService.setEmpName(this.empName);
    this.menuListService.addMenu(this.empNo);
    this.options.text = this.empNo + this.empName + this.today;
    //Nick 設定同時只能登入一個帳號
    window.addEventListener("storage", (e) => { //監聽帳號
      if (localStorage.getItem('oldToken') != null) {
        this.commonLogOut();
      }
    });

    this.winClose = sessionStorage.getItem('winClose');
    this.loginService.setBnIdle();
    this.getCalloutList();
    //設定5分鐘刷新照會提醒
    this.intervalRef = setInterval(
      () => {
        this.getCalloutList();
      }, 5 * 60 * 1000);

    if (sessionStorage.getItem('searchUserId') && sessionStorage.getItem('searchEmpName')) {
      this.searchUserId = sessionStorage.getItem('searchUserId');
      this.searchEmpName = sessionStorage.getItem('searchEmpName');
      this.menuListService.setUserId(this.searchUserId);
      this.menuListService.setEmpName(this.searchEmpName);
      this.options.text = this.searchUserId + this.searchEmpName + this.today;
      sessionStorage.removeItem('searchUserId');
      sessionStorage.removeItem('searchEmpName');
      sessionStorage.removeItem('searchEmpId');
    }
  }

  ngAfterViewInit() {
    // if (environment.from != 'local') {
    //   if (BaseService.userId == null || BaseService.userId == '') {
    //     if (this.searchUserId == '') { window.location.href = environment.allowOrigin + '/sso'; }
    //   }
    // } else {
    //   this.menuListService.setUserId(localStorage.getItem("empNo"));
    // }
  }

  ngOnDestroy() {
    clearInterval(this.intervalRef);
  }

  getMenu(): Menu[] { return this.menuListService.getMap(); }
  returnZero() { return 0; }

  goHome() {
    this.router.navigate(['./home']);
  }

  input() {
    this.router.navigate(['./input']);
  }

  //取照會提醒
  getCalloutList() {
    let jsonObject: any = {};
    jsonObject['swcL3EmpNo'] = BaseService.userId;
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

  onClickOut(): void {
    this.commonLogOut();
  }

  private commonLogOut(): void {
    for (let index = 0; index < this.url.length; index++) {
      this.url[index].close();
    }

    if (this.menuListService.logOutAction()) {
      // window.localStorage.clear();
      localStorage.removeItem('empId');
      localStorage.removeItem('empName');
      localStorage.removeItem('empNo');
      localStorage.removeItem('token');
      window.sessionStorage.clear();
      let form: string = environment.from;
      if ('uat' == form || 'prod' == form) {
        this.router.navigate(['./logOut']).then(async () => {
          window.location.href = 'https://sso.lbtwsys.com:8443/cas/logout?service=' + environment.allowOrigin + '/sso';
        });
      } else {
        this.router.navigate(['./logOut']).then(async () => {
          window.location.reload();
        });
      }
    }
  }

  scrollToTop(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
