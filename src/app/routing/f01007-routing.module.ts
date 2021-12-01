import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01007Component } from '../f01007/f01007.component';
import { F01007scn1Component } from '../f01007/f01007scn1/f01007scn1.component';

const routes: Routes = [
  {
    path: '',
    component: F01007Component
  },
  {
    path: 'F01007SCN1',
    component: F01007scn1Component,
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
export class F01007RoutingModule { }
