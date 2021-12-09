import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { F01002Component } from '../f01002/f01002.component';
import { F01002scn1Component } from '../f01002/f01002scn1/f01002scn1.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: F01002Component,
    canActivate: [AuthGuard], // 守衛路由
  },
  {
    path: 'F01002SCN1',
    component: F01002scn1Component,
    //canActivate: [AuthGuard], // 守衛路由
    children: [
      {
        path: '',
        loadChildren: () => import ('../children/children.module').then(m => m.ChildrenModule),
        //canActivate: [AuthGuard], // 守衛路由
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F01002RoutingModule { }
