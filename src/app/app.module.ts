import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuListModule } from './menu-list/menu-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';

import { F01001Component } from './f01001/f01001.component';
import { F01001scn1Component } from './f01001/f01001scn1/f01001scn1.component';
import { F01001scn3Component } from './f01001/f01001scn3/f01001scn3.component';
import { F01001scn4Component } from './f01001/f01001scn4/f01001scn4.component';
import { F01001scn5Component } from './f01001/f01001scn5/f01001scn5.component';
import { F01001scn6Component } from './f01001/f01001scn6/f01001scn6.component';
import { F01001scn7Component } from './f01001/f01001scn7/f01001scn7.component';
import { F01001scn8Component } from './f01001/f01001scn8/f01001scn8.component';
import { F01001scn9Component } from './f01001/f01001scn9/f01001scn9.component';
import { F01001scn10Component } from './f01001/f01001scn10/f01001scn10.component';
import { F01001scn11Component } from './f01001/f01001scn11/f01001scn11.component';
import { F01001scn12Component } from './f01001/f01001scn12/f01001scn12.component';

import { F01001scn2Component } from './f01001/f01001scn2/f01001scn2.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BnNgIdleService } from 'bn-ng-idle';

import { F01001scn13Component } from './f01001/f01001scn13/f01001scn13.component';
import { ShowComponent } from './f01001/f01001scn13/show/show.component';

import { MaterialModule } from './material/material.module';
import { F02001Component } from './f02001/f02001.component';
import { F03001Component } from './f03001/f03001.component';
import { F03002Component } from './f03002/f03002.component';
import { F03003Component } from './f03003/f03003.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03005Component } from './f03005/f03005.component';
import { F03006Component } from './f03006/f03006.component';
import { F03007Component } from './f03007/f03007.component';
import { F03007confirmComponent } from './f03007/f03007confirm/f03007confirm.component';
import { F03006confirmComponent } from './f03006/f03006confirm/f03006confirm.component';
import { F03006addComponent } from './f03006/f03006add/f03006add.component';
import { F03006editComponent } from './f03006/f03006edit/f03006edit.component';
import { F03005editComponent } from './f03005/f03005edit/f03005edit.component';
import { F03005addComponent } from './f03005/f03005add/f03005add.component';
import { F03005confirmComponent } from './f03005/f03005confirm/f03005confirm.component';
import { F03006roleComponent } from './f03006/f03006role/f03006role.component';
import { F03004Component } from './f03004/f03004.component';
import { F03004confirmComponent } from './f03004/f03004confirm/f03004confirm.component';
import { F03004addComponent } from './f03004/f03004add/f03004add.component';
import { F03004editComponent } from './f03004/f03004edit/f03004edit.component';
import { F03008Component } from './f03008/f03008.component';
import { F03003confirmComponent } from './f03003/f03003confirm/f03003confirm.component';
import { F03002child1Component } from './f03002/f03002child1/f03002child1.component';
import { F03002child2Component } from './f03002/f03002child2/f03002child2.component';
import { F03002child201Component } from './f03002/f03002child2/f03002child201/f03002child201.component';
import { F03002child202Component } from './f03002/f03002child2/f03002child202/f03002child202.component';
import { F03002child203Component } from './f03002/f03002child2/f03002child203/f03002child203.component';
import { TokenInterceptor } from './token.interceptor';
import { F01001scn13addComponent } from './f01001/f01001scn13/f01001scn13add/f01001scn13add.component';
import { F01001scn13editComponent } from './f01001/f01001scn13/f01001scn13edit/f01001scn13edit.component';
import { F01001scn13deleteComponent } from './f01001/f01001scn13/f01001scn13delete/f01001scn13delete.component';
import { F02001scn0Component } from './f02001/f02001scn0/f02001scn0.component';
import { F02001scn1Component } from './f02001/f02001scn1/f02001scn1.component';
import { F02001scn2Component } from './f02001/f02001scn2/f02001scn2.component';
import { F02001scn3Component } from './f02001/f02001scn3/f02001scn3.component';
import { F02001scn4Component } from './f02001/f02001scn4/f02001scn4.component';
import { F02001scn5Component } from './f02001/f02001scn5/f02001scn5.component';
import { F02001scn6Component } from './f02001/f02001scn6/f02001scn6.component';
import { F02001scn7Component } from './f02001/f02001scn7/f02001scn7.component';
import { F02001scn8Component } from './f02001/f02001scn8/f02001scn8.component';
import { F02001scn9Component } from './f02001/f02001scn9/f02001scn9.component';
import { F02001scn10Component } from './f02001/f02001scn10/f02001scn10.component';
import { F02001scn11Component } from './f02001/f02001scn11/f02001scn11.component';
import { F02001scn12Component } from './f02001/f02001scn12/f02001scn12.component';
import { F01001scn12addComponent } from './f01001/f01001scn12/f01001scn12add/f01001scn12add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
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
    ShowComponent,
    F02001Component,
    F03001Component,
    F03002Component,
    F03003Component,
    F03005Component,
    F03006Component,
    F03007Component,
    F03007confirmComponent,
    F03006confirmComponent,
    F03006addComponent,
    F03006editComponent,
    F03005editComponent,
    F03005addComponent,
    F03005confirmComponent,
    F03006roleComponent,
    F03004Component,
    F03004confirmComponent,
    F03004addComponent,
    F03004editComponent,
    F03008Component,
    F03003confirmComponent,
    F03002child1Component,
    F03002child2Component,
    F03002child201Component,
    F03002child202Component,
    F03002child203Component,
    F01001scn13addComponent,
    F01001scn13editComponent,
    F01001scn13deleteComponent,
    F02001scn0Component,
    F02001scn1Component,
    F02001scn2Component,
    F02001scn3Component,
    F02001scn4Component,
    F02001scn5Component,
    F02001scn6Component,
    F02001scn7Component,
    F02001scn8Component,
    F02001scn9Component,
    F02001scn10Component,
    F02001scn11Component,
    F02001scn12Component,
    F01001scn12addComponent,
  ],
  imports: [
    BrowserModule,
    MenuListModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientJsonpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    BnNgIdleService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
