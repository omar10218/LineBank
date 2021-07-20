import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01001Component } from './f01001/f01001.component';
import { F01001scn1Component } from './f01001/f01001scn1/f01001scn1.component';
import { F01001scn10Component } from './f01001/f01001scn10/f01001scn10.component';
import { F01001scn11Component } from './f01001/f01001scn11/f01001scn11.component';
import { F01001scn12Component } from './f01001/f01001scn12/f01001scn12.component';
import { F01001scn13Component } from './f01001/f01001scn13/f01001scn13.component';

import { F01001scn2Component } from './f01001/f01001scn2/f01001scn2.component';
import { F01001scn3Component } from './f01001/f01001scn3/f01001scn3.component';
import { F01001scn4Component } from './f01001/f01001scn4/f01001scn4.component';
import { F01001scn5Component } from './f01001/f01001scn5/f01001scn5.component';
import { F01001scn6Component } from './f01001/f01001scn6/f01001scn6.component';
import { F01001scn7Component } from './f01001/f01001scn7/f01001scn7.component';
import { F01001scn8Component } from './f01001/f01001scn8/f01001scn8.component';
import { F01001scn9Component } from './f01001/f01001scn9/f01001scn9.component';
import { F02001Component } from './f02001/f02001.component';
import { F02001scn0Component } from './f02001/f02001scn0/f02001scn0.component';
import { F02001scn1Component } from './f02001/f02001scn1/f02001scn1.component';
import { F02001scn10Component } from './f02001/f02001scn10/f02001scn10.component';
import { F02001scn11Component } from './f02001/f02001scn11/f02001scn11.component';
import { F02001scn12Component } from './f02001/f02001scn12/f02001scn12.component';
import { F02001scn2Component } from './f02001/f02001scn2/f02001scn2.component';
import { F02001scn3Component } from './f02001/f02001scn3/f02001scn3.component';
import { F02001scn4Component } from './f02001/f02001scn4/f02001scn4.component';
import { F02001scn5Component } from './f02001/f02001scn5/f02001scn5.component';
import { F02001scn6Component } from './f02001/f02001scn6/f02001scn6.component';
import { F02001scn7Component } from './f02001/f02001scn7/f02001scn7.component';
import { F02001scn8Component } from './f02001/f02001scn8/f02001scn8.component';
import { F02001scn9Component } from './f02001/f02001scn9/f02001scn9.component';
import { F03001Component } from './f03001/f03001.component';
import { F03002Component } from './f03002/f03002.component';
import { F03003Component } from './f03003/f03003.component';
import { F03004Component } from './f03004/f03004.component';
import { F03005Component } from './f03005/f03005.component';
import { F03006Component } from './f03006/f03006.component';
import { F03007Component } from './f03007/f03007.component';
import { F03008Component } from './f03008/f03008.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuListComponent } from './menu-list/menu-list.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'logIn',
    component: LoginComponent
  },
  {
    path: 'logOut',
    component: LoginComponent
  },
  {
    path: '',
    component: MenuListComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'F01001',
        component: F01001Component
      },
      {
        path: 'F01001SCN1',
        component: F01001scn1Component,
        children: [
          {
            path: 'F01001SCN2',
            component: F01001scn2Component
          },
          {
            path: 'F01001SCN3',
            component: F01001scn3Component
          },
          {
            path: 'F01001SCN4',
            component: F01001scn4Component
          },
          {
            path: 'F01001SCN5',
            component: F01001scn5Component
          },
          {
            path: 'F01001SCN6',
            component: F01001scn6Component
          },
          {
            path: 'F01001SCN7',
            component: F01001scn7Component
          },
          {
            path: 'F01001SCN8',
            component: F01001scn8Component
          },
          {
            path: 'F01001SCN9',
            component: F01001scn9Component
          },
          {
            path: 'F01001SCN10',
            component: F01001scn10Component
          },
          {
            path: 'F01001SCN11',
            component: F01001scn11Component
          },
          {
            path: 'F01001SCN12',
            component: F01001scn12Component
          },
          {
            path: 'F01001SCN13',
            component: F01001scn13Component
          }
        ]
      },
      {
        path: 'F02001',
        component: F02001Component
      },
      {
        path: 'F02001SCN0',
        component: F02001scn0Component,
        children: [
          {
            path: 'F02001SCN1',
            component: F02001scn1Component
          },
          {
            path: 'F02001SCN2',
            component: F02001scn2Component
          },
          {
            path: 'F02001SCN3',
            component: F02001scn3Component
          },
          {
            path: 'F02001SCN4',
            component: F02001scn4Component
          },
          {
            path: 'F02001SCN5',
            component: F02001scn5Component
          },
          {
            path: 'F02001SCN6',
            component: F02001scn6Component
          },
          {
            path: 'F02001SCN7',
            component: F02001scn7Component
          },
          {
            path: 'F02001SCN8',
            component: F02001scn8Component
          },
          {
            path: 'F02001SCN9',
            component: F02001scn9Component
          },
          {
            path: 'F02001SCN10',
            component: F02001scn10Component
          },
          {
            path: 'F02001SCN11',
            component: F02001scn11Component
          },
          {
            path: 'F02001SCN12',
            component: F02001scn12Component
          }
        ]
      },
      {
        path: 'F03001',
        component: F03001Component
      },
      {
        path: 'F03002',
        component: F03002Component
      },
      {
        path: 'F03003',
        component: F03003Component
      },
      {
        path: 'F03004',
        component: F03004Component
      },
      {
        path: 'F03005',
        component: F03005Component
      },
      {
        path: 'F03006',
        component: F03006Component
      },
      {
        path: 'F03007',
        component: F03007Component
      },
      {
        path: 'F03008',
        component: F03008Component
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
