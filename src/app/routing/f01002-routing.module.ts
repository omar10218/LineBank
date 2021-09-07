import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01001scn6page1Component } from './../f01001/f01001scn6/f01001scn6page1/f01001scn6page1.component';
import { F01002Component } from './../f01002/f01002.component';
import { F01002scn1Component } from './../f01002/f01002scn1/f01002scn1.component';
import { F01002scn10Component } from './../f01002/f01002scn10/f01002scn10.component';
import { F01002scn10page1Component } from './../f01002/f01002scn10/f01002scn10page1/f01002scn10page1.component';
import { F01002scn10page2Component } from './../f01002/f01002scn10/f01002scn10page2/f01002scn10page2.component';
import { F01002scn10page3Component } from './../f01002/f01002scn10/f01002scn10page3/f01002scn10page3.component';
import { F01002scn11Component } from './../f01002/f01002scn11/f01002scn11.component';
import { F01002scn11page1Component } from './../f01002/f01002scn11/f01002scn11page1/f01002scn11page1.component';
import { F01002scn11page2Component } from './../f01002/f01002scn11/f01002scn11page2/f01002scn11page2.component';
import { F01002scn11page3Component } from './../f01002/f01002scn11/f01002scn11page3/f01002scn11page3.component';
import { F01002scn11page4Component } from './../f01002/f01002scn11/f01002scn11page4/f01002scn11page4.component';
import { F01002scn11page5Component } from './../f01002/f01002scn11/f01002scn11page5/f01002scn11page5.component';
import { F01002scn12Component } from './../f01002/f01002scn12/f01002scn12.component';
import { F01002scn13Component } from './../f01002/f01002scn13/f01002scn13.component';
import { F01002scn14Component } from './../f01002/f01002scn14/f01002scn14.component';
import { F01002scn14page1Component } from './../f01002/f01002scn14/f01002scn14page1/f01002scn14page1.component';
import { F01002scn14page2Component } from './../f01002/f01002scn14/f01002scn14page2/f01002scn14page2.component';
import { F01002scn14page3Component } from './../f01002/f01002scn14/f01002scn14page3/f01002scn14page3.component';
import { F01002scn2Component } from './../f01002/f01002scn2/f01002scn2.component';
import { F01002scn2page1Component } from './../f01002/f01002scn2/f01002scn2page1/f01002scn2page1.component';
import { F01002scn3Component } from './../f01002/f01002scn3/f01002scn3.component';
import { F01002scn4Component } from './../f01002/f01002scn4/f01002scn4.component';
import { F01002scn5Component } from './../f01002/f01002scn5/f01002scn5.component';
import { F01002scn6Component } from './../f01002/f01002scn6/f01002scn6.component';
import { F01002scn7Component } from './../f01002/f01002scn7/f01002scn7.component';
import { F01002scn8Component } from './../f01002/f01002scn8/f01002scn8.component';
import { F01002scn9Component } from './../f01002/f01002scn9/f01002scn9.component';
import { F01002scn9page1Component } from './../f01002/f01002scn9/f01002scn9page1/f01002scn9page1.component';
import { F01002scn9page2Component } from './../f01002/f01002scn9/f01002scn9page2/f01002scn9page2.component';
import { F01002scn9page3Component } from './../f01002/f01002scn9/f01002scn9page3/f01002scn9page3.component';
import { F01002scn9page4Component } from './../f01002/f01002scn9/f01002scn9page4/f01002scn9page4.component';

const routes: Routes = [
  {
    path: '',
    component: F01002Component
  },
  {
    path: 'F01002SCN1',
    component: F01002scn1Component,
    children: [
      {
        path: 'F01002SCN2',
        component: F01002scn2Component,
        children: [
          {
            path: 'F01002SCN2PAGE1',
            component: F01002scn2page1Component
          }
        ]
      },
      {
        path: 'F01002SCN3',
        component: F01002scn3Component
      },
      {
        path: 'F01002SCN4',
        component: F01002scn4Component
      },
      {
        path: 'F01002SCN5',
        component: F01002scn5Component
      },
      {
        path: 'F01002SCN6',
        component: F01002scn6Component,
        children: [
          {
            path: 'F01001SCN6PAGE1',
            component: F01001scn6page1Component
          },
        ]
      },
      {
        path: 'F01002SCN7',
        component: F01002scn7Component
      },
      {
        path: 'F01002SCN8',
        component: F01002scn8Component
      },
      {
        path: 'F01002SCN9',
        component: F01002scn9Component,
        children: [
          {
            path: 'F01002SCN9PAGE1',
            component: F01002scn9page1Component
          },
          {
            path: 'F01002SCN9PAGE2',
            component: F01002scn9page2Component
          },
          {
            path: 'F01002SCN9PAGE3',
            component: F01002scn9page3Component
          },
          {
            path: 'F01002SCN9PAGE4',
            component: F01002scn9page4Component
          }
        ]
      },
      {
        path: 'F01002SCN10',
        component: F01002scn10Component,
        children: [
          {
            path: 'F01002SCN10PAGE1',
            component: F01002scn10page1Component
          },
          {
            path: 'F01002SCN10PAGE2',
            component: F01002scn10page2Component
          },
          {
            path: 'F01002SCN10PAGE3',
            component: F01002scn10page3Component
          }
        ]
      },
      {
        path: 'F01002SCN11',
        component: F01002scn11Component,
        children: [
          {
            path: 'F01002SCN11PAGE1',
            component: F01002scn11page1Component
          },
          {
            path: 'F01002SCN11PAGE2',
            component: F01002scn11page2Component
          },
          {
            path: 'F01002SCN11PAGE3',
            component: F01002scn11page3Component
          },
          {
            path: 'F01002SCN11PAGE4',
            component: F01002scn11page4Component
          },
          {
            path: 'F01002SCN11PAGE5',
            component: F01002scn11page5Component
          },
        ]
      },
      {
        path: 'F01002SCN12',
        component: F01002scn12Component
      },
      {
        path: 'F01002SCN13',
        component: F01002scn13Component
      },
      {
        path: 'F01002SCN14',
        component: F01002scn14Component,
        children: [
          {
            path: 'F01002SCN14PAGE1',
            component: F01002scn14page1Component
          },
          {
            path: 'F01002SCN14PAGE2',
            component: F01002scn14page2Component
          },
          {
            path: 'F01002SCN14PAGE3',
            component: F01002scn14page3Component
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
export class F01002RoutingModule { }
