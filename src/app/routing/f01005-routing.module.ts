import { F01004scn1Component } from './../f01004/f01004scn1/f01004scn1.component';
import { F01004Component } from './../f01004/f01004.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01005scn1Component } from '../f01005/f01005scn1/f01005scn1.component';
import { F01005Component } from '../f01005/f01005.component';


const routes: Routes = [
  {
    path: '',
    component: F01005Component
  },
  {
    path: 'F01005SCN1',
    component: F01005scn1Component,
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
export class F01005RoutingModule { }
