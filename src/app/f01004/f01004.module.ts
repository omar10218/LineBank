import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { F01004RoutingModule } from '../routing/f01004-routing.module';

import { F01004Component } from './f01004.component';
import { F01004scn1Component } from './f01004scn1/f01004scn1.component';
import { F01004scn10Component } from './f01004scn10/f01004scn10.component';
import { F01004scn10page1Component } from './f01004scn10/f01004scn10page1/f01004scn10page1.component';
import { F01004scn10page2Component } from './f01004scn10/f01004scn10page2/f01004scn10page2.component';
import { F01004scn10page3Component } from './f01004scn10/f01004scn10page3/f01004scn10page3.component';
import { F01004scn11Component } from './f01004scn11/f01004scn11.component';
import { F01004scn11page1Component } from './f01004scn11/f01004scn11page1/f01004scn11page1.component';
import { F01004scn11page2Component } from './f01004scn11/f01004scn11page2/f01004scn11page2.component';
import { F01004scn11page3Component } from './f01004scn11/f01004scn11page3/f01004scn11page3.component';
import { F01004scn11page4Component } from './f01004scn11/f01004scn11page4/f01004scn11page4.component';
import { F01004scn11page5Component } from './f01004scn11/f01004scn11page5/f01004scn11page5.component';
import { F01004scn12Component } from './f01004scn12/f01004scn12.component';
import { F01004scn12addComponent } from './f01004scn12/f01004scn12add/f01004scn12add.component';
import { F01004scn12confirmComponent } from './f01004scn12/f01004scn12confirm/f01004scn12confirm.component';
import { F01004scn12deleteComponent } from './f01004scn12/f01004scn12delete/f01004scn12delete.component';
import { F01004scn12editComponent } from './f01004scn12/f01004scn12edit/f01004scn12edit.component';
import { F01004scn13Component } from './f01004scn13/f01004scn13.component';
import { F01004scn13addComponent } from './f01004scn13/f01004scn13add/f01004scn13add.component';
import { F01004scn13confirmComponent } from './f01004scn13/f01004scn13confirm/f01004scn13confirm.component';
import { F01004scn13deleteComponent } from './f01004scn13/f01004scn13delete/f01004scn13delete.component';
import { F01004scn13editComponent } from './f01004scn13/f01004scn13edit/f01004scn13edit.component';
import { F01004scn14Component } from './f01004scn14/f01004scn14.component';
import { F01004scn14page1Component } from './f01004scn14/f01004scn14page1/f01004scn14page1.component';
import { F01004scn14page2Component } from './f01004scn14/f01004scn14page2/f01004scn14page2.component';
import { F01004scn14page3Component } from './f01004scn14/f01004scn14page3/f01004scn14page3.component';
import { F01004scn2Component } from './f01004scn2/f01004scn2.component';
import { F01004scn2page1Component } from './f01004scn2/f01004scn2page1/f01004scn2page1.component';
import { F01004scn3Component } from './f01004scn3/f01004scn3.component';
import { F01004scn4Component } from './f01004scn4/f01004scn4.component';
import { F01004scn5Component } from './f01004scn5/f01004scn5.component';
import { F01004scn6Component } from './f01004scn6/f01004scn6.component';
import { F01004scn6page1Component } from './f01004scn6/f01004scn6page1/f01004scn6page1.component';

import { F01004scn7Component } from './f01004scn7/f01004scn7.component';
import { F01004scn8Component } from './f01004scn8/f01004scn8.component';
import { F01004scn8addComponent } from './f01004scn8/f01004scn8add/f01004scn8add.component';
import { F01004scn8confirmComponent } from './f01004scn8/f01004scn8confirm/f01004scn8confirm.component';
import { F01004scn8editComponent } from './f01004scn8/f01004scn8edit/f01004scn8edit.component';
import { F01004scn9Component } from './f01004scn9/f01004scn9.component';
import { F01004scn9page1Component } from './f01004scn9/f01004scn9page1/f01004scn9page1.component';
import { F01004scn9page2Component } from './f01004scn9/f01004scn9page2/f01004scn9page2.component';
import { F01004scn9page3Component } from './f01004scn9/f01004scn9page3/f01004scn9page3.component';
import { F01004scn9page4Component } from './f01004scn9/f01004scn9page4/f01004scn9page4.component';
import { F01004scn13showComponent } from './f01004scn13/f01004scn13show/f01004scn13show.component';

@NgModule({
  declarations: [
    F01004Component,
    F01004scn1Component,
    F01004scn2Component,
    F01004scn3Component,
    F01004scn4Component,
    F01004scn5Component,
    F01004scn6Component,
    F01004scn7Component,
    F01004scn8Component,
    F01004scn9Component,
    F01004scn10Component,
    F01004scn11Component,
    F01004scn12Component,
    F01004scn13Component,
    F01004scn13addComponent,
    F01004scn13editComponent,
    F01004scn13deleteComponent,
    F01004scn12addComponent,
    F01004scn13confirmComponent,
    F01004scn12editComponent,
    F01004scn12deleteComponent,
    F01004scn12confirmComponent,
    F01004scn6page1Component,
    F01004scn10page1Component,
    F01004scn10page2Component,
    F01004scn10page3Component,
    F01004scn11page1Component,
    F01004scn11page2Component,
    F01004scn11page3Component,
    F01004scn11page4Component,
    F01004scn11page5Component,
    F01004scn9page1Component,
    F01004scn9page2Component,
    F01004scn9page3Component,
    F01004scn8addComponent,
    F01004scn8editComponent,
    F01004scn8confirmComponent,
    F01004scn14Component,
    F01004scn14page1Component,
    F01004scn14page2Component,
    F01004scn14page3Component,
    F01004scn2page1Component,
    F01004scn9page4Component,
    F01004scn13showComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    F01004RoutingModule
  ]
})
export class F01004Module { }
