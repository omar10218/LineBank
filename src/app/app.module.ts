import { F02003Component } from './f02003/f02003.component';
//import { NgZorroAntdModule } from './ngzorro/ng-zorro-antd.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuListModule } from './menu-list/menu-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BnNgIdleService } from 'bn-ng-idle';
import { MaterialModule } from './material/material.module';
import { F02001Component } from './f02001/f02001.component';
import { F03001Component } from './f03001/f03001.component';
import { F03002Component } from './f03002/f03002.component';
import { F03003Component } from './f03003/f03003.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03005Component } from './f03005/f03005.component';
import { F03006Component } from './f03006/f03006.component';
import { F03007Component } from './f03007/f03007.component';
import { F03006addComponent } from './f03006/f03006add/f03006add.component';
import { F03006editComponent } from './f03006/f03006edit/f03006edit.component';
import { F03005editComponent } from './f03005/f03005edit/f03005edit.component';
import { F03005addComponent } from './f03005/f03005add/f03005add.component';
import { F03006roleComponent } from './f03006/f03006role/f03006role.component';
import { F03004Component } from './f03004/f03004.component';
import { F03004addComponent } from './f03004/f03004add/f03004add.component';
import { F03004editComponent } from './f03004/f03004edit/f03004edit.component';
import { F03008Component } from './f03008/f03008.component';
import { F03002child1Component } from './f03002/f03002child1/f03002child1.component';
import { F03002child2Component } from './f03002/f03002child2/f03002child2.component';
import { F03002child201Component } from './f03002/f03002child2/f03002child201/f03002child201.component';
import { F03002child202Component } from './f03002/f03002child2/f03002child202/f03002child202.component';
import { F03002child203Component } from './f03002/f03002child2/f03002child203/f03002child203.component';
import { TokenInterceptor } from './token.interceptor';
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
import { F03009Component } from './f03009/f03009.component';
import { F03010Component } from './f03010/f03010.component';
import { F03011Component } from './f03011/f03011.component';
import { F03012Component } from './f03012/f03012.component';
import { F03012editComponent } from './f03012/f03012edit/f03012edit.component';
import { F03011editComponent } from './f03011/f03011edit/f03011edit.component';
import { F03010editComponent } from './f03010/f03010edit/f03010edit.component';
import { F04001Component } from './f04001/f04001.component';
import { F04002Component } from './f04002/f04002.component';
import { F01005Component } from './f01005/f01005.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DatePipe, CommonModule, registerLocaleData } from '@angular/common';
import { F03011addComponent } from './f03011/f03011add/f03011add.component';
import { F03010addComponent } from './f03010/f03010add/f03010add.component';
import { F03012addComponent } from './f03012/f03012add/f03012add.component';
import { F03008editComponent } from './f03008/f03008edit/f03008edit.component';
import { F03008uploadComponent } from './f03008/f03008upload/f03008upload.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { F03013Component } from './f03013/f03013.component';
import { F03014Component } from './f03014/f03014.component';
import { F03014editComponent } from './f03014/f03014edit/f03014edit.component';
import { F03014uploadComponent } from './f03014/f03014upload/f03014upload.component';
import { F03015Component } from './f03015/f03015.component';
import { F03015editComponent } from './f03015/f03015edit/f03015edit.component';
import { F03015uploadComponent } from './f03015/f03015upload/f03015upload.component';
import { F03016Component } from './f03016/f03016.component';
import { F03014addComponent } from './f03014/f03014add/f03014add.component';
import { F01006Component } from './f01006/f01006.component';
import { F01006restartComponent } from './f01006/f01006restart/f01006restart.component';
import { F03008deleteComponent } from './f03008/f03008delete/f03008delete.component';
import { F03011deleteComponent } from './f03011/f03011delete/f03011delete.component';
import { F03010deleteComponent } from './f03010/f03010delete/f03010delete.component';
import { NgZorroAntdModule } from './ngzorro/ng-zorro-antd.module';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import zh from '@angular/common/locales/zh';
import { F03017Component } from './f03017/f03017.component';
import { F03017editComponent } from './f03017/f03017edit/f03017edit.component';
import { F03017uploadComponent } from './f03017/f03017upload/f03017upload.component';
import { F02002Component } from './f02002/f02002.component';
import { F01007Component } from './f01007/f01007.component';
import { F01008Component } from './f01008/f01008.component';
import { NZ_I18N, zh_TW } from 'ng-zorro-antd/i18n';
import { F01008addComponent } from './f01008/f01008add/f01008add.component';
import { F01008deleteComponent } from './f01008/f01008delete/f01008delete.component';
import { F03006amtComponent } from './f03006/f03006amt/f03006amt.component';
import { F03006prjComponent } from './f03006/f03006prj/f03006prj.component';
registerLocaleData(zh);
export const TW_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD'
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY MMM'
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    F02001Component,
    F03001Component,
    F03002Component,
    F03003Component,
    F03005Component,
    F03006Component,
    F03007Component,
    F03006addComponent,
    F03006editComponent,
    F03005editComponent,
    F03005addComponent,
    F03006roleComponent,
    F03004Component,
    F03004addComponent,
    F03004editComponent,
    F03008Component,
    F03002child1Component,
    F03002child2Component,
    F03002child201Component,
    F03002child202Component,
    F03002child203Component,
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
    F03009Component,
    F03010Component,
    F03011Component,
    F03012Component,
    F03012editComponent,
    F03011editComponent,
    F03010editComponent,
    F04001Component,
    F04002Component,
    F01005Component,
    F03011addComponent,
    F03010addComponent,
    F03012addComponent,
    F03008editComponent,
    F03008uploadComponent,
    F03013Component,
    F03014Component,
    F03014editComponent,
    F03014uploadComponent,
    F03015Component,
    F03015editComponent,
    F03015uploadComponent,
    F03016Component,
    F03014addComponent,
    F01006Component,
    F01006restartComponent,
    F03008deleteComponent,
    F03011deleteComponent,
    F03010deleteComponent,
    F03017Component,
    F03017editComponent,
    F03017uploadComponent,
    F02002Component,
    F01007Component,
    F01008Component,
    F01008addComponent,
    F01008deleteComponent,
    F03006amtComponent,
    F03006prjComponent,
    F02003Component
  ],
  imports: [
    NzIconModule,
    BrowserModule,
    MenuListModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientJsonpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    NgZorroAntdModule,
    NzButtonModule,
    GoogleMapsModule
  ],
  providers: [
    BnNgIdleService,
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    { provide: MAT_DATE_FORMATS, useValue: TW_FORMATS },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DatePipe,
    {
      provide: NZ_I18N,
      useFactory: () => zh_TW,
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
