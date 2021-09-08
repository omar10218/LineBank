import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01004Component } from './../f01004/f01004.component';
import { F01004scn1Component } from './../f01004/f01004scn1/f01004scn1.component';

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
        path: '',
        loadChildren: () => import ('../children/children.module').then(m => m.ChildrenModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F01004RoutingModule { }
