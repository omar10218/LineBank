import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01003Component } from './../f01003/f01003.component';
import { F01003scn1Component } from './../f01003/f01003scn1/f01003scn1.component';
import { F01003scn10Component } from './../f01003/f01003scn10/f01003scn10.component';
import { F01003scn10page1Component } from './../f01003/f01003scn10/f01003scn10page1/f01003scn10page1.component';
import { F01003scn10page2Component } from './../f01003/f01003scn10/f01003scn10page2/f01003scn10page2.component';
import { F01003scn10page3Component } from './../f01003/f01003scn10/f01003scn10page3/f01003scn10page3.component';
import { F01003scn11Component } from './../f01003/f01003scn11/f01003scn11.component';
import { F01003scn11page1Component } from './../f01003/f01003scn11/f01003scn11page1/f01003scn11page1.component';
import { F01003scn11page2Component } from './../f01003/f01003scn11/f01003scn11page2/f01003scn11page2.component';
import { F01003scn11page3Component } from './../f01003/f01003scn11/f01003scn11page3/f01003scn11page3.component';
import { F01003scn11page4Component } from './../f01003/f01003scn11/f01003scn11page4/f01003scn11page4.component';
import { F01003scn11page5Component } from './../f01003/f01003scn11/f01003scn11page5/f01003scn11page5.component';
import { F01003scn12Component } from './../f01003/f01003scn12/f01003scn12.component';
import { F01003scn13Component } from './../f01003/f01003scn13/f01003scn13.component';
import { F01003scn14Component } from './../f01003/f01003scn14/f01003scn14.component';
import { F01003scn14page1Component } from './../f01003/f01003scn14/f01003scn14page1/f01003scn14page1.component';
import { F01003scn14page2Component } from './../f01003/f01003scn14/f01003scn14page2/f01003scn14page2.component';
import { F01003scn14page3Component } from './../f01003/f01003scn14/f01003scn14page3/f01003scn14page3.component';
import { F01003scn2Component } from './../f01003/f01003scn2/f01003scn2.component';
import { F01003scn2page1Component } from './../f01003/f01003scn2/f01003scn2page1/f01003scn2page1.component';
import { F01003scn3Component } from './../f01003/f01003scn3/f01003scn3.component';
import { F01003scn4Component } from './../f01003/f01003scn4/f01003scn4.component';
import { F01003scn5Component } from './../f01003/f01003scn5/f01003scn5.component';
import { F01003scn6Component } from './../f01003/f01003scn6/f01003scn6.component';
import { F01003scn6page1Component } from './../f01003/f01003scn6/f01003scn6page1/f01003scn6page1.component';
import { F01003scn7Component } from './../f01003/f01003scn7/f01003scn7.component';
import { F01003scn8Component } from './../f01003/f01003scn8/f01003scn8.component';
import { F01003scn9Component } from './../f01003/f01003scn9/f01003scn9.component';
import { F01003scn9page1Component } from './../f01003/f01003scn9/f01003scn9page1/f01003scn9page1.component';
import { F01003scn9page2Component } from './../f01003/f01003scn9/f01003scn9page2/f01003scn9page2.component';
import { F01003scn9page3Component } from './../f01003/f01003scn9/f01003scn9page3/f01003scn9page3.component';
import { F01003scn9page4Component } from './../f01003/f01003scn9/f01003scn9page4/f01003scn9page4.component';

const routes: Routes = [
  {
    path: '',
    component: F01003Component
  },
  {
    path: 'F01003SCN1',
    component: F01003scn1Component,
    children: [
      {
        path: 'F01003SCN2',
        component: F01003scn2Component,
        children: [
          {
            path: 'F01003SCN2PAGE1',
            component: F01003scn2page1Component
          }
        ]
      },
      {
        path: 'F01003SCN3',
        component: F01003scn3Component
      },
      {
        path: 'F01003SCN4',
        component: F01003scn4Component
      },
      {
        path: 'F01003SCN5',
        component: F01003scn5Component
      },
      {
        path: 'F01003SCN6',
        component: F01003scn6Component,
        children: [
          {
            path: 'F01003SCN6PAGE1',
            component: F01003scn6page1Component
          },
        ]
      },
      {
        path: 'F01003SCN7',
        component: F01003scn7Component
      },
      {
        path: 'F01003SCN8',
        component: F01003scn8Component
      },
      {
        path: 'F01003SCN9',
        component: F01003scn9Component,
        children: [
          {
            path: 'F01003SCN9PAGE1',
            component: F01003scn9page1Component
          },
          {
            path: 'F01003SCN9PAGE2',
            component: F01003scn9page2Component
          },
          {
            path: 'F01003SCN9PAGE3',
            component: F01003scn9page3Component
          },
          {
            path: 'F01003SCN9PAGE4',
            component: F01003scn9page4Component
          }
        ]
      },
      {
        path: 'F01003SCN10',
        component: F01003scn10Component,
        children: [
          {
            path: 'F01003SCN10PAGE1',
            component: F01003scn10page1Component
          },
          {
            path: 'F01003SCN10PAGE2',
            component: F01003scn10page2Component
          },
          {
            path: 'F01003SCN10PAGE3',
            component: F01003scn10page3Component
          }
        ]
      },
      {
        path: 'F01003SCN11',
        component: F01003scn11Component,
        children: [
          {
            path: 'F01003SCN11PAGE1',
            component: F01003scn11page1Component
          },
          {
            path: 'F01003SCN11PAGE2',
            component: F01003scn11page2Component
          },
          {
            path: 'F01003SCN11PAGE3',
            component: F01003scn11page3Component
          },
          {
            path: 'F01003SCN11PAGE4',
            component: F01003scn11page4Component
          },
          {
            path: 'F01003SCN11PAGE5',
            component: F01003scn11page5Component
          },
        ]
      },
      {
        path: 'F01003SCN12',
        component: F01003scn12Component
      },
      {
        path: 'F01003SCN13',
        component: F01003scn13Component
      },
      {
        path: 'F01003SCN14',
        component: F01003scn14Component,
        children: [
          {
            path: 'F01003SCN14PAGE1',
            component: F01003scn14page1Component
          },
          {
            path: 'F01003SCN14PAGE2',
            component: F01003scn14page2Component
          },
          {
            path: 'F01003SCN14PAGE3',
            component: F01003scn14page3Component
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F01003RoutingModule { }
