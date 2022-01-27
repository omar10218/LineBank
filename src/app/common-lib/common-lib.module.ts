import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { DynamicDirective } from './directive/dynamic.directive';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { NgZorroAntdModule } from '../ngzorro/ng-zorro-antd.module';


@NgModule({
  declarations: [
    ConfirmComponent,
    DynamicDirective,
    DeleteConfirmComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  exports: [DynamicDirective]
})
export class CommonLibModule { }
