import { F03016Component } from './../f03016/f03016.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F03013Component } from '../f03013/f03013.component';
import { F03014Component } from '../f03014/f03014.component';
import { F01005Component } from './../f01005/f01005.component';
import { F02001Component } from './../f02001/f02001.component';
import { F02001scn0Component } from './../f02001/f02001scn0/f02001scn0.component';
import { F02001scn1Component } from './../f02001/f02001scn1/f02001scn1.component';
import { F02001scn10Component } from './../f02001/f02001scn10/f02001scn10.component';
import { F02001scn11Component } from './../f02001/f02001scn11/f02001scn11.component';
import { F02001scn12Component } from './../f02001/f02001scn12/f02001scn12.component';
import { F02001scn2Component } from './../f02001/f02001scn2/f02001scn2.component';
import { F02001scn3Component } from './../f02001/f02001scn3/f02001scn3.component';
import { F02001scn4Component } from './../f02001/f02001scn4/f02001scn4.component';
import { F02001scn5Component } from './../f02001/f02001scn5/f02001scn5.component';
import { F02001scn6Component } from './../f02001/f02001scn6/f02001scn6.component';
import { F02001scn7Component } from './../f02001/f02001scn7/f02001scn7.component';
import { F02001scn8Component } from './../f02001/f02001scn8/f02001scn8.component';
import { F02001scn9Component } from './../f02001/f02001scn9/f02001scn9.component';
import { F03001Component } from './../f03001/f03001.component';
import { F03002Component } from './../f03002/f03002.component';
import { F03003Component } from './../f03003/f03003.component';
import { F03004Component } from './../f03004/f03004.component';
import { F03005Component } from './../f03005/f03005.component';
import { F03006Component } from './../f03006/f03006.component';
import { F03007Component } from './../f03007/f03007.component';
import { F03008Component } from './../f03008/f03008.component';
import { F03009Component } from './../f03009/f03009.component';
import { F03010Component } from './../f03010/f03010.component';
import { F03011Component } from './../f03011/f03011.component';
import { F03012Component } from './../f03012/f03012.component';
import { F03015Component } from './../f03015/f03015.component';
import { F04001Component } from './../f04001/f04001.component';
import { F04002Component } from './../f04002/f04002.component';
import { HomeComponent } from './../home/home.component';
import { LoginComponent } from './../login/login.component';
import { MenuListComponent } from './../menu-list/menu-list.component';
import { F01006Component } from '../f01006/f01006.component';
import { F03017Component } from '../f03017/f03017.component';


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
        loadChildren: () => import ('../f01001/f01001.module').then(m => m.F01001Module)
      },
      {
        path: 'F01002',
        loadChildren: () => import ('../f01002/f01002.module').then(m => m.F01002Module)
      },
      {
        path: 'F01003',
        loadChildren: () => import ('../f01003/f01003.module').then(m => m.F01003Module)
      },
      {
        path: 'F01004',
        loadChildren: () => import ('../f01004/f01004.module').then(m => m.F01004Module)
      },
      {
        path: 'F01005',
        component: F01005Component
      },
      {
        path: 'F01006',
        component: F01006Component
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
      {
        path: 'F03009',
        component: F03009Component
      },
      {
        path: 'F03010',
        component: F03010Component
      },
      {
        path: 'F03011',
        component: F03011Component
      },
      {
        path: 'F03012',
        component: F03012Component
      },
      {
        path: 'F03013',
        component: F03013Component
      },
      {
        path: 'F03014',
        component: F03014Component
      },
      {
        path: 'F03015',
        component: F03015Component
      },
      {
        path: 'F03016',
        component: F03016Component
      },
      {
        path: 'F03017',
        component: F03017Component
      },
      {
        path: 'F04001',
        component: F04001Component
      },
      {
        path: 'F04002',
        component: F04002Component
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
