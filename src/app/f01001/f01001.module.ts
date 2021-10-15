import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { F01001RoutingModule } from '../routing/f01001-routing.module';

import { F01001Component } from './f01001.component';
import { F01001scn1Component } from './f01001scn1/f01001scn1.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgZorroAntdModule } from '../ngzorro/ng-zorro-antd.module';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [
    F01001Component,
    F01001scn1Component
  ],
  imports: [
    NzTableModule,
    NgZorroAntdModule,
    NzButtonModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    F01001RoutingModule
  ]
})
export class F01001Module { }
