import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01004Component } from './../f01004/f01004.component';
import { F01004scn1Component } from './../f01004/f01004scn1/f01004scn1.component';
import { F01004scn10Component } from './../f01004/f01004scn10/f01004scn10.component';
import { F01004scn10page1Component } from './../f01004/f01004scn10/f01004scn10page1/f01004scn10page1.component';
import { F01004scn10page2Component } from './../f01004/f01004scn10/f01004scn10page2/f01004scn10page2.component';
import { F01004scn10page3Component } from './../f01004/f01004scn10/f01004scn10page3/f01004scn10page3.component';
import { F01004scn11Component } from './../f01004/f01004scn11/f01004scn11.component';
import { F01004scn11page1Component } from './../f01004/f01004scn11/f01004scn11page1/f01004scn11page1.component';
import { F01004scn11page2Component } from './../f01004/f01004scn11/f01004scn11page2/f01004scn11page2.component';
import { F01004scn11page3Component } from './../f01004/f01004scn11/f01004scn11page3/f01004scn11page3.component';
import { F01004scn11page4Component } from './../f01004/f01004scn11/f01004scn11page4/f01004scn11page4.component';
import { F01004scn11page5Component } from './../f01004/f01004scn11/f01004scn11page5/f01004scn11page5.component';
import { F01004scn12Component } from './../f01004/f01004scn12/f01004scn12.component';
import { F01004scn13Component } from './../f01004/f01004scn13/f01004scn13.component';
import { F01004scn14Component } from './../f01004/f01004scn14/f01004scn14.component';
import { F01004scn14page1Component } from './../f01004/f01004scn14/f01004scn14page1/f01004scn14page1.component';
import { F01004scn14page2Component } from './../f01004/f01004scn14/f01004scn14page2/f01004scn14page2.component';
import { F01004scn14page3Component } from './../f01004/f01004scn14/f01004scn14page3/f01004scn14page3.component';
import { F01004scn2Component } from './../f01004/f01004scn2/f01004scn2.component';
import { F01004scn2page1Component } from './../f01004/f01004scn2/f01004scn2page1/f01004scn2page1.component';
import { F01004scn3Component } from './../f01004/f01004scn3/f01004scn3.component';
import { F01004scn4Component } from './../f01004/f01004scn4/f01004scn4.component';
import { F01004scn5Component } from './../f01004/f01004scn5/f01004scn5.component';
import { F01004scn6Component } from './../f01004/f01004scn6/f01004scn6.component';
import { F01004scn6page1Component } from './../f01004/f01004scn6/f01004scn6page1/f01004scn6page1.component';
import { F01004scn7Component } from './../f01004/f01004scn7/f01004scn7.component';
import { F01004scn8Component } from './../f01004/f01004scn8/f01004scn8.component';
import { F01004scn9Component } from './../f01004/f01004scn9/f01004scn9.component';
import { F01004scn9page1Component } from './../f01004/f01004scn9/f01004scn9page1/f01004scn9page1.component';
import { F01004scn9page2Component } from './../f01004/f01004scn9/f01004scn9page2/f01004scn9page2.component';
import { F01004scn9page3Component } from './../f01004/f01004scn9/f01004scn9page3/f01004scn9page3.component';
import { F01004scn9page4Component } from './../f01004/f01004scn9/f01004scn9page4/f01004scn9page4.component';


const routes: Routes = [
  {
    path: '',
    component: F01004Component
  },
  {
    path: 'F01004SCN1',
    component: F01004scn1Component,
    children: [
      {
        path: 'F01004SCN2',
        component: F01004scn2Component,
        children: [
          {
            path: 'F01004SCN2PAGE1',
            component: F01004scn2page1Component
          }
        ]
      },
      {
        path: 'F01004SCN3',
        component: F01004scn3Component
      },
      {
        path: 'F01004SCN4',
        component: F01004scn4Component
      },
      {
        path: 'F01004SCN5',
        component: F01004scn5Component
      },
      {
        path: 'F01004SCN6',
        component: F01004scn6Component,
        children: [
          {
            path: 'F01004SCN6PAGE1',
            component: F01004scn6page1Component
          },
        ]
      },
      {
        path: 'F01004SCN7',
        component: F01004scn7Component
      },
      {
        path: 'F01004SCN8',
        component: F01004scn8Component
      },
      {
        path: 'F01004SCN9',
        component: F01004scn9Component,
        children: [
          {
            path: 'F01004SCN9PAGE1',
            component: F01004scn9page1Component
          },
          {
            path: 'F01004SCN9PAGE2',
            component: F01004scn9page2Component
          },
          {
            path: 'F01004SCN9PAGE3',
            component: F01004scn9page3Component
          },
          {
            path: 'F01004SCN9PAGE4',
            component: F01004scn9page4Component
          }
        ]
      },
      {
        path: 'F01004SCN10',
        component: F01004scn10Component,
        children: [
          {
            path: 'F01004SCN10PAGE1',
            component: F01004scn10page1Component
          },
          {
            path: 'F01004SCN10PAGE2',
            component: F01004scn10page2Component
          },
          {
            path: 'F01004SCN10PAGE3',
            component: F01004scn10page3Component
          }
        ]
      },
      {
        path: 'F01004SCN11',
        component: F01004scn11Component,
        children: [
          {
            path: 'F01004SCN11PAGE1',
            component: F01004scn11page1Component
          },
          {
            path: 'F01004SCN11PAGE2',
            component: F01004scn11page2Component
          },
          {
            path: 'F01004SCN11PAGE3',
            component: F01004scn11page3Component
          },
          {
            path: 'F01004SCN11PAGE4',
            component: F01004scn11page4Component
          },
          {
            path: 'F01004SCN11PAGE5',
            component: F01004scn11page5Component
          },
        ]
      },
      {
        path: 'F01004SCN12',
        component: F01004scn12Component
      },
      {
        path: 'F01004SCN13',
        component: F01004scn13Component
      },
      {
        path: 'F01004SCN14',
        component: F01004scn14Component,
        children: [
          {
            path: 'F01004SCN14PAGE1',
            component: F01004scn14page1Component
          },
          {
            path: 'F01004SCN14PAGE2',
            component: F01004scn14page2Component
          },
          {
            path: 'F01004SCN14PAGE3',
            component: F01004scn14page3Component
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
export class F01004RoutingModule { }
