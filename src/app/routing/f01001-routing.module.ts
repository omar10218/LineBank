import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01001Component } from './../f01001/f01001.component';
import { F01001scn1Component } from './../f01001/f01001scn1/f01001scn1.component';
import { F01001scn10Component } from './../f01001/f01001scn10/f01001scn10.component';
import { F01001scn10page1Component } from './../f01001/f01001scn10/f01001scn10page1/f01001scn10page1.component';
import { F01001scn10page2Component } from './../f01001/f01001scn10/f01001scn10page2/f01001scn10page2.component';
import { F01001scn10page3Component } from './../f01001/f01001scn10/f01001scn10page3/f01001scn10page3.component';
import { F01001scn11Component } from './../f01001/f01001scn11/f01001scn11.component';
import { F01001scn11page1Component } from './../f01001/f01001scn11/f01001scn11page1/f01001scn11page1.component';
import { F01001scn11page2Component } from './../f01001/f01001scn11/f01001scn11page2/f01001scn11page2.component';
import { F01001scn11page3Component } from './../f01001/f01001scn11/f01001scn11page3/f01001scn11page3.component';
import { F01001scn11page4Component } from './../f01001/f01001scn11/f01001scn11page4/f01001scn11page4.component';
import { F01001scn11page5Component } from './../f01001/f01001scn11/f01001scn11page5/f01001scn11page5.component';
import { F01001scn12Component } from './../f01001/f01001scn12/f01001scn12.component';
import { F01001scn13Component } from './../f01001/f01001scn13/f01001scn13.component';
import { F01001scn14Component } from './../f01001/f01001scn14/f01001scn14.component';
import { F01001scn14page1Component } from './../f01001/f01001scn14/f01001scn14page1/f01001scn14page1.component';
import { F01001scn14page2Component } from './../f01001/f01001scn14/f01001scn14page2/f01001scn14page2.component';
import { F01001scn14page3Component } from './../f01001/f01001scn14/f01001scn14page3/f01001scn14page3.component';
import { F01001scn2Component } from './../f01001/f01001scn2/f01001scn2.component';
import { F01001scn2page1Component } from './../f01001/f01001scn2/f01001scn2page1/f01001scn2page1.component';
import { F01001scn3Component } from './../f01001/f01001scn3/f01001scn3.component';
import { F01001scn4Component } from './../f01001/f01001scn4/f01001scn4.component';
import { F01001scn5Component } from './../f01001/f01001scn5/f01001scn5.component';
import { F01001scn6Component } from './../f01001/f01001scn6/f01001scn6.component';
import { F01001scn6page1Component } from './../f01001/f01001scn6/f01001scn6page1/f01001scn6page1.component';
import { F01001scn7Component } from './../f01001/f01001scn7/f01001scn7.component';
import { F01001scn8Component } from './../f01001/f01001scn8/f01001scn8.component';
import { F01001scn9Component } from './../f01001/f01001scn9/f01001scn9.component';
import { F01001scn9page1Component } from './../f01001/f01001scn9/f01001scn9page1/f01001scn9page1.component';
import { F01001scn9page2Component } from './../f01001/f01001scn9/f01001scn9page2/f01001scn9page2.component';
import { F01001scn9page3Component } from './../f01001/f01001scn9/f01001scn9page3/f01001scn9page3.component';
import { F01001scn9page4Component } from './../f01001/f01001scn9/f01001scn9page4/f01001scn9page4.component';


const routes: Routes = [
  {
    path: '',
    component: F01001Component
  },
  {
    path: 'F01001SCN1',
    component: F01001scn1Component,
    children: [
      {
        path: 'F01001SCN2',
        component: F01001scn2Component,
        children: [
          {
            path: 'F01001SCN2PAGE1',
            component: F01001scn2page1Component
          }
        ]
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
        component: F01001scn6Component,
        children: [
          {
            path: 'F01001SCN6PAGE1',
            component: F01001scn6page1Component
          }
        ]
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
        component: F01001scn9Component,
        children: [
          {
            path: 'F01001SCN9PAGE1',
            component: F01001scn9page1Component
          },
          {
            path: 'F01001SCN9PAGE2',
            component: F01001scn9page2Component
          },
          {
            path: 'F01001SCN9PAGE3',
            component: F01001scn9page3Component
          },
          {
            path: 'F01001SCN9PAGE4',
            component: F01001scn9page4Component
          }
        ]
      },
      {
        path: 'F01001SCN10',
        component: F01001scn10Component,
        children: [
          {
            path: 'F01001SCN10PAGE1',
            component: F01001scn10page1Component
          },
          {
            path: 'F01001SCN10PAGE2',
            component: F01001scn10page2Component
          },
          {
            path: 'F01001SCN10PAGE3',
            component: F01001scn10page3Component
          }
        ]
      },
      {
        path: 'F01001SCN11',
        component: F01001scn11Component,
        children: [
          {
            path: 'F01001SCN11PAGE1',
            component: F01001scn11page1Component
          },
          {
            path: 'F01001SCN11PAGE2',
            component: F01001scn11page2Component
          },
          {
            path: 'F01001SCN11PAGE3',
            component: F01001scn11page3Component
          },
          {
            path: 'F01001SCN11PAGE4',
            component: F01001scn11page4Component
          },
          {
            path: 'F01001SCN11PAGE5',
            component: F01001scn11page5Component
          },
        ]
      },
      {
        path: 'F01001SCN12',
        component: F01001scn12Component
      },
      {
        path: 'F01001SCN13',
        component: F01001scn13Component
      },
      {
        path: 'F01001SCN14',
        component: F01001scn14Component,
        children: [
          {
            path: 'F01001SCN14PAGE1',
            component: F01001scn14page1Component
          },
          {
            path: 'F01001SCN14PAGE2',
            component: F01001scn14page2Component
          },
          {
            path: 'F01001SCN14PAGE3',
            component: F01001scn14page3Component
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
export class F01001RoutingModule { }
