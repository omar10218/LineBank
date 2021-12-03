import { F01008scn1Component } from './f01008scn1/f01008scn1.component';
import { ChildrenModule } from './../children/children.module';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { F01002RoutingModule } from '../routing/f01002-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgZorroAntdModule } from '../ngzorro/ng-zorro-antd.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import zh from '@angular/common/locales/zh';
import { CommonLibModule } from '../common-lib/common-lib.module';
import { F01008RoutingModule } from '../routing/f01008-routing.module';
import { F01008scn2Component } from './f01008scn2/f01008scn2.component';
import { F01008scn3Component } from './f01008scn3/f01008scn3.component';
import { F01008scn4Component } from './f01008scn4/f01008scn4.component';
import { F01008scn3page1Component } from './f01008scn3/f01008scn3page1/f01008scn3page1.component';
registerLocaleData(zh);
@NgModule({
  declarations: [
    F01008scn1Component,
    F01008scn2Component,
    F01008scn3Component,
    F01008scn4Component,
    F01008scn3page1Component,
  ],
  imports: [
    NzButtonModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    F01008RoutingModule,
    NgZorroAntdModule,
    ChildrenModule,
    NzTableModule,
    CommonLibModule
  ]
})
export class F01008Module { }
