import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { F01001RoutingModule } from '../routing/f01001-routing.module';

import { F01001Component } from './f01001.component';
import { F01001scn1Component } from './f01001scn1/f01001scn1.component';
import { F01001scn10Component } from './f01001scn10/f01001scn10.component';
import { F01001scn10page1Component } from './f01001scn10/f01001scn10page1/f01001scn10page1.component';
import { F01001scn10page2Component } from './f01001scn10/f01001scn10page2/f01001scn10page2.component';
import { F01001scn10page3Component } from './f01001scn10/f01001scn10page3/f01001scn10page3.component';
import { F01001scn11Component } from './f01001scn11/f01001scn11.component';
import { F01001scn11page1Component } from './f01001scn11/f01001scn11page1/f01001scn11page1.component';
import { F01001scn11page2Component } from './f01001scn11/f01001scn11page2/f01001scn11page2.component';
import { F01001scn11page3Component } from './f01001scn11/f01001scn11page3/f01001scn11page3.component';
import { F01001scn11page4Component } from './f01001scn11/f01001scn11page4/f01001scn11page4.component';
import { F01001scn11page5Component } from './f01001scn11/f01001scn11page5/f01001scn11page5.component';
import { F01001scn12Component } from './f01001scn12/f01001scn12.component';
import { F01001scn12addComponent } from './f01001scn12/f01001scn12add/f01001scn12add.component';
import { F01001scn12confirmComponent } from './f01001scn12/f01001scn12confirm/f01001scn12confirm.component';
import { F01001scn12deleteComponent } from './f01001scn12/f01001scn12delete/f01001scn12delete.component';
import { F01001scn12editComponent } from './f01001scn12/f01001scn12edit/f01001scn12edit.component';
import { F01001scn13Component } from './f01001scn13/f01001scn13.component';
import { F01001scn13addComponent } from './f01001scn13/f01001scn13add/f01001scn13add.component';
import { F01001scn13confirmComponent } from './f01001scn13/f01001scn13confirm/f01001scn13confirm.component';
import { F01001scn13deleteComponent } from './f01001scn13/f01001scn13delete/f01001scn13delete.component';
import { F01001scn13editComponent } from './f01001scn13/f01001scn13edit/f01001scn13edit.component';
import { F01001scn14Component } from './f01001scn14/f01001scn14.component';
import { F01001scn14page1Component } from './f01001scn14/f01001scn14page1/f01001scn14page1.component';
import { F01001scn14page2Component } from './f01001scn14/f01001scn14page2/f01001scn14page2.component';
import { F01001scn14page3Component } from './f01001scn14/f01001scn14page3/f01001scn14page3.component';
import { F01001scn2Component } from './f01001scn2/f01001scn2.component';
import { F01001scn2page1Component } from './f01001scn2/f01001scn2page1/f01001scn2page1.component';
import { F01001scn3Component } from './f01001scn3/f01001scn3.component';
import { F01001scn4Component } from './f01001scn4/f01001scn4.component';
import { F01001scn5Component } from './f01001scn5/f01001scn5.component';
import { F01001scn6Component } from './f01001scn6/f01001scn6.component';
import { F01001scn6page1Component } from './f01001scn6/f01001scn6page1/f01001scn6page1.component';
import { F01001scn7Component } from './f01001scn7/f01001scn7.component';
import { F01001scn8Component } from './f01001scn8/f01001scn8.component';
import { F01001scn8addComponent } from './f01001scn8/f01001scn8add/f01001scn8add.component';
import { F01001scn8confirmComponent } from './f01001scn8/f01001scn8confirm/f01001scn8confirm.component';
import { F01001scn8editComponent } from './f01001scn8/f01001scn8edit/f01001scn8edit.component';
import { F01001scn9Component } from './f01001scn9/f01001scn9.component';
import { F01001scn9page1Component } from './f01001scn9/f01001scn9page1/f01001scn9page1.component';
import { F01001scn9page2Component } from './f01001scn9/f01001scn9page2/f01001scn9page2.component';
import { F01001scn9page3Component } from './f01001scn9/f01001scn9page3/f01001scn9page3.component';
import { F01001scn9page4Component } from './f01001scn9/f01001scn9page4/f01001scn9page4.component';
import { ShowComponent } from './f01001scn13/show/show.component';

@NgModule({
  declarations: [
    ShowComponent,
    F01001Component,
    F01001scn1Component,
    F01001scn2Component,
    F01001scn3Component,
    F01001scn4Component,
    F01001scn5Component,
    F01001scn6Component,
    F01001scn7Component,
    F01001scn8Component,
    F01001scn9Component,
    F01001scn10Component,
    F01001scn11Component,
    F01001scn12Component,
    F01001scn13Component,
    F01001scn13addComponent,
    F01001scn13editComponent,
    F01001scn13deleteComponent,
    F01001scn12addComponent,
    F01001scn13confirmComponent,
    F01001scn12editComponent,
    F01001scn12deleteComponent,
    F01001scn12confirmComponent,
    F01001scn6page1Component,
    F01001scn10page1Component,
    F01001scn10page2Component,
    F01001scn10page3Component,
    F01001scn11page1Component,
    F01001scn11page2Component,
    F01001scn11page3Component,
    F01001scn11page4Component,
    F01001scn11page5Component,
    F01001scn9page1Component,
    F01001scn9page2Component,
    F01001scn9page3Component,
    F01001scn8addComponent,
    F01001scn8editComponent,
    F01001scn8confirmComponent,
    F01001scn14Component,
    F01001scn14page1Component,
    F01001scn14page2Component,
    F01001scn14page3Component,
    F01001scn2page1Component,
    F01001scn9page4Component
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    F01001RoutingModule
  ]
})
export class F01001Module { }
