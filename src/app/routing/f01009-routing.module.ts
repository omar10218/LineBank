import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01009Component } from '../f01009/f01009.component';
import { F01009scn1Component } from '../f01009/f01009scn1/f01009scn1.component';

const routes: Routes = [
  {
    path: '',
    component: F01009Component
  },
  {
    path: 'F01009SCN1',
    component: F01009scn1Component,
    children: [
      {
        path: '',
        loadChildren: () => import ('../children-bw/children-bw.module').then(m => m.ChildrenBwModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F01009RoutingModule { }
