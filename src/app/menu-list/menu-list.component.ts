import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuListService } from './menu-list.service';
import { Menu } from './menu.model';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent {
  empNo: string = localStorage.getItem("empNo");
  constructor(
    private router: Router,
    private menuListService: MenuListService,
    private bnIdle: BnNgIdleService
  ) { }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  userOnAction() {
    this.bnIdle.resetTimer();
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




}
