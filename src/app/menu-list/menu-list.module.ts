import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list.component';
import { AppRoutingModule } from '../routing/app-routing.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [MenuListComponent],
  exports: [MenuListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ]
})
export class MenuListModule { }
