import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { DynamicDirective } from './directive/dynamic.directive';


@NgModule({
  declarations: [
    ConfirmComponent,
    DynamicDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [DynamicDirective]
})
export class CommonLibModule { }
