import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { F01003RoutingModule } from '../routing/f01003-routing.module';

import { F01003Component } from './f01003.component';
import { F01003scn1Component } from './f01003scn1/f01003scn1.component';
import { F01003scn10Component } from './f01003scn10/f01003scn10.component';
import { F01003scn10page1Component } from './f01003scn10/f01003scn10page1/f01003scn10page1.component';
import { F01003scn10page2Component } from './f01003scn10/f01003scn10page2/f01003scn10page2.component';
import { F01003scn10page3Component } from './f01003scn10/f01003scn10page3/f01003scn10page3.component';
import { F01003scn11Component } from './f01003scn11/f01003scn11.component';
import { F01003scn11page1Component } from './f01003scn11/f01003scn11page1/f01003scn11page1.component';
import { F01003scn11page2Component } from './f01003scn11/f01003scn11page2/f01003scn11page2.component';
import { F01003scn11page3Component } from './f01003scn11/f01003scn11page3/f01003scn11page3.component';
import { F01003scn11page4Component } from './f01003scn11/f01003scn11page4/f01003scn11page4.component';
import { F01003scn11page5Component } from './f01003scn11/f01003scn11page5/f01003scn11page5.component';
import { F01003scn12Component } from './f01003scn12/f01003scn12.component';
import { F01003scn12addComponent } from './f01003scn12/f01003scn12add/f01003scn12add.component';
import { F01003scn12confirmComponent } from './f01003scn12/f01003scn12confirm/f01003scn12confirm.component';
import { F01003scn12deleteComponent } from './f01003scn12/f01003scn12delete/f01003scn12delete.component';
import { F01003scn12editComponent } from './f01003scn12/f01003scn12edit/f01003scn12edit.component';
import { F01003scn13Component } from './f01003scn13/f01003scn13.component';
import { F01003scn13addComponent } from './f01003scn13/f01003scn13add/f01003scn13add.component';
import { F01003scn13confirmComponent } from './f01003scn13/f01003scn13confirm/f01003scn13confirm.component';
import { F01003scn13deleteComponent } from './f01003scn13/f01003scn13delete/f01003scn13delete.component';
import { F01003scn13editComponent } from './f01003scn13/f01003scn13edit/f01003scn13edit.component';
import { F01003scn14Component } from './f01003scn14/f01003scn14.component';
import { F01003scn14page1Component } from './f01003scn14/f01003scn14page1/f01003scn14page1.component';
import { F01003scn14page2Component } from './f01003scn14/f01003scn14page2/f01003scn14page2.component';
import { F01003scn14page3Component } from './f01003scn14/f01003scn14page3/f01003scn14page3.component';
import { F01003scn2Component } from './f01003scn2/f01003scn2.component';
import { F01003scn2page1Component } from './f01003scn2/f01003scn2page1/f01003scn2page1.component';
import { F01003scn3Component } from './f01003scn3/f01003scn3.component';
import { F01003scn4Component } from './f01003scn4/f01003scn4.component';
import { F01003scn5Component } from './f01003scn5/f01003scn5.component';
import { F01003scn6Component } from './f01003scn6/f01003scn6.component';
import { F01003scn6page1Component } from './f01003scn6/f01003scn6page1/f01003scn6page1.component';

import { F01003scn7Component } from './f01003scn7/f01003scn7.component';
import { F01003scn8Component } from './f01003scn8/f01003scn8.component';
import { F01003scn8addComponent } from './f01003scn8/f01003scn8add/f01003scn8add.component';
import { F01003scn8confirmComponent } from './f01003scn8/f01003scn8confirm/f01003scn8confirm.component';
import { F01003scn8editComponent } from './f01003scn8/f01003scn8edit/f01003scn8edit.component';
import { F01003scn9Component } from './f01003scn9/f01003scn9.component';
import { F01003scn9page1Component } from './f01003scn9/f01003scn9page1/f01003scn9page1.component';
import { F01003scn9page2Component } from './f01003scn9/f01003scn9page2/f01003scn9page2.component';
import { F01003scn9page3Component } from './f01003scn9/f01003scn9page3/f01003scn9page3.component';
import { F01003scn9page4Component } from './f01003scn9/f01003scn9page4/f01003scn9page4.component';
import { F01003scn13showComponent } from './f01003scn13/f01003scn13show/f01003scn13show.component';

@NgModule({
  declarations: [
    F01003Component,
    F01003scn1Component,
    F01003scn2Component,
    F01003scn3Component,
    F01003scn4Component,
    F01003scn5Component,
    F01003scn6Component,
    F01003scn7Component,
    F01003scn8Component,
    F01003scn9Component,
    F01003scn10Component,
    F01003scn11Component,
    F01003scn12Component,
    F01003scn13Component,
    F01003scn13addComponent,
    F01003scn13editComponent,
    F01003scn13deleteComponent,
    F01003scn12addComponent,
    F01003scn13confirmComponent,
    F01003scn12editComponent,
    F01003scn12deleteComponent,
    F01003scn12confirmComponent,
    F01003scn6page1Component,
    F01003scn10page1Component,
    F01003scn10page2Component,
    F01003scn10page3Component,
    F01003scn11page1Component,
    F01003scn11page2Component,
    F01003scn11page3Component,
    F01003scn11page4Component,
    F01003scn11page5Component,
    F01003scn9page1Component,
    F01003scn9page2Component,
    F01003scn9page3Component,
    F01003scn8addComponent,
    F01003scn8editComponent,
    F01003scn8confirmComponent,
    F01003scn14Component,
    F01003scn14page1Component,
    F01003scn14page2Component,
    F01003scn14page3Component,
    F01003scn2page1Component,
    F01003scn9page4Component,
    F01003scn13showComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    F01003RoutingModule
  ]
})
export class F01003Module { }
