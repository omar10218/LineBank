import { F01003scn1Component } from './../f01003/f01003scn1/f01003scn1.component';
import { F01003Component } from './../f01003/f01003.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
export class F01003RoutingModule { }
