import { GoogleMapsModule } from '@angular/google-maps';
import { NgZorroAntdModule } from './../ngzorro/ng-zorro-antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonLibModule } from '../common-lib/common-lib.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ChildrenBwRoutingModule } from '../routing/children-bw-routing.module';
import { Childbwscn1Component } from './childbwscn1/childbwscn1.component';
import { Childbwscn2Component } from './childbwscn2/childbwscn2.component';
import { Childbwscn3Component } from './childbwscn3/childbwscn3.component';
import { Childbwscn4Component } from './childbwscn4/childbwscn4.component';
import { Childbwscn5Component } from './childbwscn5/childbwscn5.component';
import { Childbwscn6Component } from './childbwscn6/childbwscn6.component';
import { Childbwscn7Component } from './childbwscn7/childbwscn7.component';
import { Childbwscn8Component } from './childbwscn8/childbwscn8.component';
import { Childbwscn9Component } from './childbwscn9/childbwscn9.component';
import { Childbwscn10Component } from './childbwscn10/childbwscn10.component';
import { Childbwscn11Component } from './childbwscn11/childbwscn11.component';
import { NgxWatermarkModule } from 'ngx-watermark';
import { Childbwscn4page1Component } from './childbwscn4/childbwscn4page1/childbwscn4page1.component';
import { Childbwscn4page2Component } from './childbwscn4/childbwscn4page2/childbwscn4page2.component';
import { Childbwscn4page3Component } from './childbwscn4/childbwscn4page3/childbwscn4page3.component';
import { Childbwscn4page4Component } from './childbwscn4/childbwscn4page4/childbwscn4page4.component';
// import { Childbwscn4page1Component } from '../childbwyscn4/childbwscn4page1/childbwscn4page1.component';


@NgModule({
  declarations: [
    Childbwscn1Component,
    Childbwscn2Component,
    Childbwscn3Component,
    Childbwscn4Component,
    Childbwscn5Component,
    Childbwscn6Component,
    Childbwscn7Component,
    Childbwscn8Component,
    Childbwscn9Component,
    Childbwscn10Component,
    Childbwscn11Component,
    Childbwscn4page1Component,
    Childbwscn4page2Component,
    Childbwscn4page3Component,
    Childbwscn4page4Component,
    // Childbwscn4page1Component

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonLibModule,
    NgZorroAntdModule,
    GoogleMapsModule,
    NzTableModule,
    ChildrenBwRoutingModule,
    NgxWatermarkModule
  ]
})
export class ChildrenBwModule {
}
