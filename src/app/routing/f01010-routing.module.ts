import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01010Component } from '../f01010/f01010.component';
import { F01010scn1Component } from '../f01010/f01010scn1/f01010scn1.component';

const routes: Routes = [
  {
    path: '',
    component: F01010Component
  },
  {
    path: 'F01002SCN1',
    component: F01010scn1Component,
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
export class F01010RoutingModule { }
