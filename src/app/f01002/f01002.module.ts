import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { F01002RoutingModule } from '../routing/f01002-routing.module';

import { F01002Component } from './f01002.component';
import { F01002scn1Component } from './f01002scn1/f01002scn1.component';
import { F01002scn10Component } from './f01002scn10/f01002scn10.component';
import { F01002scn10page1Component } from './f01002scn10/f01002scn10page1/f01002scn10page1.component';
import { F01002scn10page2Component } from './f01002scn10/f01002scn10page2/f01002scn10page2.component';
import { F01002scn10page3Component } from './f01002scn10/f01002scn10page3/f01002scn10page3.component';
import { F01002scn11Component } from './f01002scn11/f01002scn11.component';
import { F01002scn11page1Component } from './f01002scn11/f01002scn11page1/f01002scn11page1.component';
import { F01002scn11page2Component } from './f01002scn11/f01002scn11page2/f01002scn11page2.component';
import { F01002scn11page3Component } from './f01002scn11/f01002scn11page3/f01002scn11page3.component';
import { F01002scn11page4Component } from './f01002scn11/f01002scn11page4/f01002scn11page4.component';
import { F01002scn11page5Component } from './f01002scn11/f01002scn11page5/f01002scn11page5.component';
import { F01002scn12Component } from './f01002scn12/f01002scn12.component';
import { F01002scn12addComponent } from './f01002scn12/f01002scn12add/f01002scn12add.component';
import { F01002scn12confirmComponent } from './f01002scn12/f01002scn12confirm/f01002scn12confirm.component';
import { F01002scn12deleteComponent } from './f01002scn12/f01002scn12delete/f01002scn12delete.component';
import { F01002scn12editComponent } from './f01002scn12/f01002scn12edit/f01002scn12edit.component';
import { F01002scn13Component } from './f01002scn13/f01002scn13.component';
import { F01002scn13addComponent } from './f01002scn13/f01002scn13add/f01002scn13add.component';
import { F01002scn13confirmComponent } from './f01002scn13/f01002scn13confirm/f01002scn13confirm.component';
import { F01002scn13deleteComponent } from './f01002scn13/f01002scn13delete/f01002scn13delete.component';
import { F01002scn13editComponent } from './f01002scn13/f01002scn13edit/f01002scn13edit.component';
import { F01002scn14Component } from './f01002scn14/f01002scn14.component';
import { F01002scn14page1Component } from './f01002scn14/f01002scn14page1/f01002scn14page1.component';
import { F01002scn14page2Component } from './f01002scn14/f01002scn14page2/f01002scn14page2.component';
import { F01002scn14page3Component } from './f01002scn14/f01002scn14page3/f01002scn14page3.component';
import { F01002scn2Component } from './f01002scn2/f01002scn2.component';
import { F01002scn2page1Component } from './f01002scn2/f01002scn2page1/f01002scn2page1.component';
import { F01002scn3Component } from './f01002scn3/f01002scn3.component';
import { F01002scn4Component } from './f01002scn4/f01002scn4.component';
import { F01002scn5Component } from './f01002scn5/f01002scn5.component';
import { F01002scn6Component } from './f01002scn6/f01002scn6.component';
import { F01002scn6page1Component } from './f01002scn6/f01002scn6page1/f01002scn6page1.component';

import { F01002scn7Component } from './f01002scn7/f01002scn7.component';
import { F01002scn8Component } from './f01002scn8/f01002scn8.component';
import { F01002scn8addComponent } from './f01002scn8/f01002scn8add/f01002scn8add.component';
import { F01002scn8confirmComponent } from './f01002scn8/f01002scn8confirm/f01002scn8confirm.component';
import { F01002scn8editComponent } from './f01002scn8/f01002scn8edit/f01002scn8edit.component';
import { F01002scn9Component } from './f01002scn9/f01002scn9.component';
import { F01002scn9page1Component } from './f01002scn9/f01002scn9page1/f01002scn9page1.component';
import { F01002scn9page2Component } from './f01002scn9/f01002scn9page2/f01002scn9page2.component';
import { F01002scn9page3Component } from './f01002scn9/f01002scn9page3/f01002scn9page3.component';
import { F01002scn9page4Component } from './f01002scn9/f01002scn9page4/f01002scn9page4.component';
import { ShowComponent } from './f01002scn13/show/show.component';

@NgModule({
  declarations: [
    ShowComponent,
    F01002Component,
    F01002scn1Component,
    F01002scn2Component,
    F01002scn3Component,
    F01002scn4Component,
    F01002scn5Component,
    F01002scn6Component,
    F01002scn7Component,
    F01002scn8Component,
    F01002scn9Component,
    F01002scn10Component,
    F01002scn11Component,
    F01002scn12Component,
    F01002scn13Component,
    F01002scn13addComponent,
    F01002scn13editComponent,
    F01002scn13deleteComponent,
    F01002scn12addComponent,
    F01002scn13confirmComponent,
    F01002scn12editComponent,
    F01002scn12deleteComponent,
    F01002scn12confirmComponent,
    F01002scn6page1Component,
    F01002scn10page1Component,
    F01002scn10page2Component,
    F01002scn10page3Component,
    F01002scn11page1Component,
    F01002scn11page2Component,
    F01002scn11page3Component,
    F01002scn11page4Component,
    F01002scn11page5Component,
    F01002scn9page1Component,
    F01002scn9page2Component,
    F01002scn9page3Component,
    F01002scn8addComponent,
    F01002scn8editComponent,
    F01002scn8confirmComponent,
    F01002scn14Component,
    F01002scn14page1Component,
    F01002scn14page2Component,
    F01002scn14page3Component,
    F01002scn2page1Component,
    F01002scn9page4Component
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
