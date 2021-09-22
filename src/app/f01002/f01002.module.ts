import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { F01002RoutingModule } from '../routing/f01002-routing.module';

import { F01002Component } from './f01002.component';
import { F01002scn1Component } from './f01002scn1/f01002scn1.component';
import { F01002researchComponent } from './f01002research/f01002research.component';
import { F01002rescanComponent } from './f01002rescan/f01002rescan.component';
import { F01002blocklistComponent } from './f01002blocklist/f01002blocklist.component';

@NgModule({
  declarations: [
    F01002Component,
    F01002scn1Component,
    F01002researchComponent,
    F01002rescanComponent,
    F01002blocklistComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    F01002RoutingModule
  ]
})
export class F01002Module { }
