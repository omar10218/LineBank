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
import { F01001scn13confirmComponent } from './f01001/f01001scn13/f01001scn13confirm/f01001scn13confirm.component';
import { F01001scn12editComponent } from './f01001/f01001scn12/f01001scn12edit/f01001scn12edit.component';
import { F01001scn12deleteComponent } from './f01001/f01001scn12/f01001scn12delete/f01001scn12delete.component';
import { F01001scn12confirmComponent } from './f01001/f01001scn12/f01001scn12confirm/f01001scn12confirm.component';
import { F01001scn6page1Component } from './f01001/f01001scn6/f01001scn6page1/f01001scn6page1.component';
import { F01001scn6page2Component } from './f01001/f01001scn6/f01001scn6page2/f01001scn6page2.component';
import { F01001scn6page3Component } from './f01001/f01001scn6/f01001scn6page3/f01001scn6page3.component';
import { F01001scn6page4Component } from './f01001/f01001scn6/f01001scn6page4/f01001scn6page4.component';
import { F01001scn6page5Component } from './f01001/f01001scn6/f01001scn6page5/f01001scn6page5.component';
import { F01001scn6page6Component } from './f01001/f01001scn6/f01001scn6page6/f01001scn6page6.component';
import { F01001scn6page7Component } from './f01001/f01001scn6/f01001scn6page7/f01001scn6page7.component';
import { F01001scn6page8Component } from './f01001/f01001scn6/f01001scn6page8/f01001scn6page8.component';
import { F01001scn6page9Component } from './f01001/f01001scn6/f01001scn6page9/f01001scn6page9.component';
import { F01001scn6page10Component } from './f01001/f01001scn6/f01001scn6page10/f01001scn6page10.component';
import { F01001scn6page11Component } from './f01001/f01001scn6/f01001scn6page11/f01001scn6page11.component';
import { F01001scn6page12Component } from './f01001/f01001scn6/f01001scn6page12/f01001scn6page12.component';
import { F01001scn6page13Component } from './f01001/f01001scn6/f01001scn6page13/f01001scn6page13.component';
import { F01001scn6page14Component } from './f01001/f01001scn6/f01001scn6page14/f01001scn6page14.component';
import { F01001scn6page15Component } from './f01001/f01001scn6/f01001scn6page15/f01001scn6page15.component';
import { F01001scn6page16Component } from './f01001/f01001scn6/f01001scn6page16/f01001scn6page16.component';
import { F01001scn6page17Component } from './f01001/f01001scn6/f01001scn6page17/f01001scn6page17.component';
import { F01001scn6page18Component } from './f01001/f01001scn6/f01001scn6page18/f01001scn6page18.component';
import { F01001scn6page19Component } from './f01001/f01001scn6/f01001scn6page19/f01001scn6page19.component';
import { F01001scn6page20Component } from './f01001/f01001scn6/f01001scn6page20/f01001scn6page20.component';
import { F01001scn6page21Component } from './f01001/f01001scn6/f01001scn6page21/f01001scn6page21.component';
import { F01001scn6page22Component } from './f01001/f01001scn6/f01001scn6page22/f01001scn6page22.component';
import { F01001scn6page23Component } from './f01001/f01001scn6/f01001scn6page23/f01001scn6page23.component';
import { F01001scn6page24Component } from './f01001/f01001scn6/f01001scn6page24/f01001scn6page24.component';
import { F01001scn6page25Component } from './f01001/f01001scn6/f01001scn6page25/f01001scn6page25.component';
import { F01001scn6page26Component } from './f01001/f01001scn6/f01001scn6page26/f01001scn6page26.component';
import { F01001scn6page27Component } from './f01001/f01001scn6/f01001scn6page27/f01001scn6page27.component';
import { F01001scn6page28Component } from './f01001/f01001scn6/f01001scn6page28/f01001scn6page28.component';
import { F01001scn6page29Component } from './f01001/f01001scn6/f01001scn6page29/f01001scn6page29.component';
import { F01001scn6page30Component } from './f01001/f01001scn6/f01001scn6page30/f01001scn6page30.component';
import { F01001scn6page31Component } from './f01001/f01001scn6/f01001scn6page31/f01001scn6page31.component';
import { F03009Component } from './f03009/f03009.component';
import { F03009confirmComponent } from './f03009/f03009confirm/f03009confirm.component';
import { F01001scn10page1Component } from './f01001/f01001scn10/f01001scn10page1/f01001scn10page1.component';
import { F01001scn10page2Component } from './f01001/f01001scn10/f01001scn10page2/f01001scn10page2.component';
import { F01001scn10page3Component } from './f01001/f01001scn10/f01001scn10page3/f01001scn10page3.component';
import { F03010Component } from './f03010/f03010.component';
import { F03011Component } from './f03011/f03011.component';
import { F03011confirmComponent } from './f03011/f03011confirm/f03011confirm.component';
import { F03010confirmComponent } from './f03010/f03010confirm/f03010confirm.component';
import { F03012Component } from './f03012/f03012.component';
import { F03012confirmComponent } from './f03012/f03012confirm/f03012confirm.component';
import { F03012editComponent } from './f03012/f03012edit/f03012edit.component';
import { F01001scn11page1Component } from './f01001/f01001scn11/f01001scn11page1/f01001scn11page1.component';
import { F01001scn11page2Component } from './f01001/f01001scn11/f01001scn11page2/f01001scn11page2.component';
import { F01001scn11page3Component } from './f01001/f01001scn11/f01001scn11page3/f01001scn11page3.component';
import { F01001scn11page4Component } from './f01001/f01001scn11/f01001scn11page4/f01001scn11page4.component';
import { F01001scn11page5Component } from './f01001/f01001scn11/f01001scn11page5/f01001scn11page5.component';
import { F03011editComponent } from './f03011/f03011edit/f03011edit.component';
import { F03010editComponent } from './f03010/f03010edit/f03010edit.component';
import { F01001scn9page1Component } from './f01001/f01001scn9/f01001scn9page1/f01001scn9page1.component';
import { F01001scn9page2Component } from './f01001/f01001scn9/f01001scn9page2/f01001scn9page2.component';
import { F01001scn9page3Component } from './f01001/f01001scn9/f01001scn9page3/f01001scn9page3.component';
import { F01002Component } from './f01002/f01002.component';
import { F04001Component } from './f04001/f04001.component';
import { F01001scn8addComponent } from './f01001/f01001scn8/f01001scn8add/f01001scn8add.component';
import { F01001scn8editComponent } from './f01001/f01001scn8/f01001scn8edit/f01001scn8edit.component';
import { F01001scn8confirmComponent } from './f01001/f01001scn8/f01001scn8confirm/f01001scn8confirm.component';
import { F01001scn14Component } from './f01001/f01001scn14/f01001scn14.component';
import { F01001scn14page1Component } from './f01001/f01001scn14/f01001scn14page1/f01001scn14page1.component';
import { F01001scn14page2Component } from './f01001/f01001scn14/f01001scn14page2/f01001scn14page2.component';
import { F01001scn14page3Component } from './f01001/f01001scn14/f01001scn14page3/f01001scn14page3.component';
import { F04002Component } from './f04002/f04002.component';
import { F04002confirmComponent } from './f04002/f04002confirm/f04002confirm.component';
import { F01001scn2page1Component } from './f01001/f01001scn2/f01001scn2page1/f01001scn2page1.component';
import { F04001confirmComponent } from './f04001/f04001confirm/f04001confirm.component';
import { F01003Component } from './f01003/f01003.component';
import { F01004Component } from './f01004/f01004.component';
import { F01005Component } from './f01005/f01005.component';
// import { GoogleMapsModule } from '@angular/google-maps';
import { F01001scn9page4Component } from './f01001/f01001scn9/f01001scn9page4/f01001scn9page4.component';
import { DatePipe } from '@angular/common';
import { F03011addComponent } from './f03011/f03011add/f03011add.component';
import { F03010addComponent } from './f03010/f03010add/f03010add.component';
import { F03012addComponent } from './f03012/f03012add/f03012add.component';
import { F03008editComponent } from './f03008/f03008edit/f03008edit.component';
import { F03008uploadComponent } from './f03008/f03008upload/f03008upload.component';
import { F01002scn1Component } from './f01002/f01002scn1/f01002scn1.component';
import { F01002scn2Component } from './f01002/f01002scn2/f01002scn2.component';
import { F01002scn2page1Component } from './f01002/f01002scn2/f01002scn2page1/f01002scn2page1.component';
import { F01002scn3Component } from './f01002/f01002scn3/f01002scn3.component';
import { F01002scn4Component } from './f01002/f01002scn4/f01002scn4.component';
import { F01002scn5Component } from './f01002/f01002scn5/f01002scn5.component';
import { F01002scn6Component } from './f01002/f01002scn6/f01002scn6.component';
import { F01002scn6page1Component } from './f01002/f01002scn6/f01002scn6page1/f01002scn6page1.component';
import { F01002scn7Component } from './f01002/f01002scn7/f01002scn7.component';
import { F01002scn8Component } from './f01002/f01002scn8/f01002scn8.component';
import { F01002scn8addComponent } from './f01002/f01002scn8/f01002scn8add/f01002scn8add.component';
import { F01002scn8confirmComponent } from './f01002/f01002scn8/f01002scn8confirm/f01002scn8confirm.component';
import { F01002scn8editComponent } from './f01002/f01002scn8/f01002scn8edit/f01002scn8edit.component';
import { F01002scn9Component } from './f01002/f01002scn9/f01002scn9.component';
import { F01002scn9page1Component } from './f01002/f01002scn9/f01002scn9page1/f01002scn9page1.component';
import { F01002scn9page2Component } from './f01002/f01002scn9/f01002scn9page2/f01002scn9page2.component';
import { F01002scn9page3Component } from './f01002/f01002scn9/f01002scn9page3/f01002scn9page3.component';
import { F01002scn9page4Component } from './f01002/f01002scn9/f01002scn9page4/f01002scn9page4.component';
import { F01002scn10Component } from './f01002/f01002scn10/f01002scn10.component';
import { F01002scn10page1Component } from './f01002/f01002scn10/f01002scn10page1/f01002scn10page1.component';
import { F01002scn10page2Component } from './f01002/f01002scn10/f01002scn10page2/f01002scn10page2.component';
import { F01002scn10page3Component } from './f01002/f01002scn10/f01002scn10page3/f01002scn10page3.component';
import { F01002scn11Component } from './f01002/f01002scn11/f01002scn11.component';
import { F01002scn11page1Component } from './f01002/f01002scn11/f01002scn11page1/f01002scn11page1.component';
import { F01002scn11page2Component } from './f01002/f01002scn11/f01002scn11page2/f01002scn11page2.component';
import { F01002scn11page3Component } from './f01002/f01002scn11/f01002scn11page3/f01002scn11page3.component';
import { F01002scn11page4Component } from './f01002/f01002scn11/f01002scn11page4/f01002scn11page4.component';
import { F01002scn11page5Component } from './f01002/f01002scn11/f01002scn11page5/f01002scn11page5.component';
import { F01002scn12Component } from './f01002/f01002scn12/f01002scn12.component';
import { F01002scn12addComponent } from './f01002/f01002scn12/f01002scn12add/f01002scn12add.component';
import { F01002scn12confirmComponent } from './f01002/f01002scn12/f01002scn12confirm/f01002scn12confirm.component';
import { F01002scn12deleteComponent } from './f01002/f01002scn12/f01002scn12delete/f01002scn12delete.component';
import { F01002scn12editComponent } from './f01002/f01002scn12/f01002scn12edit/f01002scn12edit.component';
import { F01002scn13Component } from './f01002/f01002scn13/f01002scn13.component';
import { F01002scn13addComponent } from './f01002/f01002scn13/f01002scn13add/f01002scn13add.component';
import { F01002scn13confirmComponent } from './f01002/f01002scn13/f01002scn13confirm/f01002scn13confirm.component';
import { F01002scn13deleteComponent } from './f01002/f01002scn13/f01002scn13delete/f01002scn13delete.component';
import { F01002scn13editComponent } from './f01002/f01002scn13/f01002scn13edit/f01002scn13edit.component';
import { F01002scn14Component } from './f01002/f01002scn14/f01002scn14.component';
import { F01002scn14page1Component } from './f01002/f01002scn14/f01002scn14page1/f01002scn14page1.component';
import { F01002scn14page2Component } from './f01002/f01002scn14/f01002scn14page2/f01002scn14page2.component';
import { F01002scn14page3Component } from './f01002/f01002scn14/f01002scn14page3/f01002scn14page3.component';
import { F01002noticeComponent } from './f01002/f01002notice/f01002notice.component';
import { F01003scn1Component } from './f01003/f01003scn1/f01003scn1.component';
import { F01003scn2Component } from './f01003/f01003scn2/f01003scn2.component';
import { F01003scn2page1Component } from './f01003/f01003scn2/f01003scn2page1/f01003scn2page1.component';
import { F01003scn3Component } from './f01003/f01003scn3/f01003scn3.component';
import { F01003scn4Component } from './f01003/f01003scn4/f01003scn4.component';
import { F01003scn5Component } from './f01003/f01003scn5/f01003scn5.component';
import { F01003scn6Component } from './f01003/f01003scn6/f01003scn6.component';
import { F01003scn6page1Component } from './f01003/f01003scn6/f01003scn6page1/f01003scn6page1.component';
import { F01003scn7Component } from './f01003/f01003scn7/f01003scn7.component';
import { F01003scn8Component } from './f01003/f01003scn8/f01003scn8.component';
import { F01003scn8addComponent } from './f01003/f01003scn8/f01003scn8add/f01003scn8add.component';
import { F01003scn8confirmComponent } from './f01003/f01003scn8/f01003scn8confirm/f01003scn8confirm.component';
import { F01003scn8editComponent } from './f01003/f01003scn8/f01003scn8edit/f01003scn8edit.component';
import { F01003scn9Component } from './f01003/f01003scn9/f01003scn9.component';
import { F01003scn9page1Component } from './f01003/f01003scn9/f01003scn9page1/f01003scn9page1.component';
import { F01003scn9page2Component } from './f01003/f01003scn9/f01003scn9page2/f01003scn9page2.component';
import { F01003scn9page3Component } from './f01003/f01003scn9/f01003scn9page3/f01003scn9page3.component';
import { F01003scn9page4Component } from './f01003/f01003scn9/f01003scn9page4/f01003scn9page4.component';
import { F01003scn10Component } from './f01003/f01003scn10/f01003scn10.component';
import { F01003scn10page1Component } from './f01003/f01003scn10/f01003scn10page1/f01003scn10page1.component';
import { F01003scn10page2Component } from './f01003/f01003scn10/f01003scn10page2/f01003scn10page2.component';
import { F01003scn10page3Component } from './f01003/f01003scn10/f01003scn10page3/f01003scn10page3.component';
import { F01003scn11Component } from './f01003/f01003scn11/f01003scn11.component';
import { F01003scn11page1Component } from './f01003/f01003scn11/f01003scn11page1/f01003scn11page1.component';
import { F01003scn11page2Component } from './f01003/f01003scn11/f01003scn11page2/f01003scn11page2.component';
import { F01003scn11page3Component } from './f01003/f01003scn11/f01003scn11page3/f01003scn11page3.component';
import { F01003scn11page4Component } from './f01003/f01003scn11/f01003scn11page4/f01003scn11page4.component';
import { F01003scn11page5Component } from './f01003/f01003scn11/f01003scn11page5/f01003scn11page5.component';
import { F01003scn12Component } from './f01003/f01003scn12/f01003scn12.component';
import { F01003scn12addComponent } from './f01003/f01003scn12/f01003scn12add/f01003scn12add.component';
import { F01003scn12confirmComponent } from './f01003/f01003scn12/f01003scn12confirm/f01003scn12confirm.component';
import { F01003scn12deleteComponent } from './f01003/f01003scn12/f01003scn12delete/f01003scn12delete.component';
import { F01003scn12editComponent } from './f01003/f01003scn12/f01003scn12edit/f01003scn12edit.component';
import { F01003scn13Component } from './f01003/f01003scn13/f01003scn13.component';
import { F01003scn13addComponent } from './f01003/f01003scn13/f01003scn13add/f01003scn13add.component';
import { F01003scn13confirmComponent } from './f01003/f01003scn13/f01003scn13confirm/f01003scn13confirm.component';
import { F01003scn13deleteComponent } from './f01003/f01003scn13/f01003scn13delete/f01003scn13delete.component';
import { F01003scn13editComponent } from './f01003/f01003scn13/f01003scn13edit/f01003scn13edit.component';
import { F01003scn13showComponent } from './f01003/f01003scn13/f01003scn13show/f01003scn13show.component';
import { F01003scn14Component } from './f01003/f01003scn14/f01003scn14.component';
import { F01003scn14page1Component } from './f01003/f01003scn14/f01003scn14page1/f01003scn14page1.component';
import { F01003scn14page2Component } from './f01003/f01003scn14/f01003scn14page2/f01003scn14page2.component';
import { F01003scn14page3Component } from './f01003/f01003scn14/f01003scn14page3/f01003scn14page3.component';

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
    F01002Component,
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
    F01001scn13confirmComponent,
    F01001scn12editComponent,
    F01001scn12deleteComponent,
    F01001scn12confirmComponent,
    F01001scn6page1Component,
    F01001scn6page2Component,
    F01001scn6page3Component,
    F01001scn6page4Component,
    F01001scn6page5Component,
    F01001scn6page6Component,
    F01001scn6page7Component,
    F01001scn6page8Component,
    F01001scn6page9Component,
    F01001scn6page10Component,
    F01001scn6page11Component,
    F01001scn6page12Component,
    F01001scn6page13Component,
    F01001scn6page14Component,
    F01001scn6page15Component,
    F01001scn6page16Component,
    F01001scn6page17Component,
    F01001scn6page18Component,
    F01001scn6page19Component,
    F01001scn6page20Component,
    F01001scn6page21Component,
    F01001scn6page22Component,
    F01001scn6page23Component,
    F01001scn6page24Component,
    F01001scn6page25Component,
    F01001scn6page26Component,
    F01001scn6page27Component,
    F01001scn6page28Component,
    F01001scn6page29Component,
    F01001scn6page30Component,
    F01001scn6page31Component,
    F03009Component,
    F03009confirmComponent,
    F01001scn10page1Component,
    F01001scn10page2Component,
    F01001scn10page3Component,
    F03010Component,
    F03011Component,
    F03011confirmComponent,
    F03010confirmComponent,
    F03012Component,
    F03012confirmComponent,
    F03012editComponent,
    F01001scn11page1Component,
    F01001scn11page2Component,
    F01001scn11page3Component,
    F01001scn11page4Component,
    F01001scn11page5Component,
    F03011editComponent,
    F03010editComponent,
    F01001scn9page1Component,
    F01001scn9page2Component,
    F01001scn9page3Component,
    F04001Component,
    F01001scn8addComponent,
    F01001scn8editComponent,
    F01001scn8confirmComponent,
    F01001scn14Component,
    F01001scn14page1Component,
    F01001scn14page2Component,
    F01001scn14page3Component,
    F04002Component,
    F04002confirmComponent,
    F01001scn2page1Component,
    F04001confirmComponent,
    F01003Component,
    F01004Component,
    F01005Component,
    F01001scn9page4Component,
    F03011addComponent,
    F03010addComponent,
    F03012addComponent,
    F03008editComponent,
    F03008uploadComponent,
    F01002scn1Component,
    F01002scn2Component,
    F01002scn2page1Component,
    F01002scn3Component,
    F01002scn4Component,
    F01002scn5Component,
    F01002scn6Component,
    F01002scn6page1Component,
    F01002scn7Component,
    F01002scn8Component,
    F01002scn8addComponent,
    F01002scn8confirmComponent,
    F01002scn8editComponent,
    F01002scn9Component,
    F01002scn9page1Component,
    F01002scn9page2Component,
    F01002scn9page3Component,
    F01002scn9page4Component,
    F01002scn10Component,
    F01002scn10page1Component,
    F01002scn10page2Component,
    F01002scn10page3Component,
    F01002scn11Component,
    F01002scn11page1Component,
    F01002scn11page2Component,
    F01002scn11page3Component,
    F01002scn11page4Component,
    F01002scn11page5Component,
    F01002scn12Component,
    F01002scn12addComponent,
    F01002scn12confirmComponent,
    F01002scn12deleteComponent,
    F01002scn12editComponent,
    F01002scn13Component,
    F01002scn13addComponent,
    F01002scn13confirmComponent,
    F01002scn13deleteComponent,
    F01002scn13editComponent,
    F01002scn14Component,
    F01002scn14page1Component,
    F01002scn14page2Component,
    F01002scn14page3Component,
    F01002noticeComponent,
    F01003scn1Component,
    F01003scn2Component,
    F01003scn2page1Component,
    F01003scn3Component,
    F01003scn4Component,
    F01003scn5Component,
    F01003scn6Component,
    F01003scn6page1Component,
    F01003scn7Component,
    F01003scn8Component,
    F01003scn8addComponent,
    F01003scn8confirmComponent,
    F01003scn8editComponent,
    F01003scn9Component,
    F01003scn9page1Component,
    F01003scn9page2Component,
    F01003scn9page3Component,
    F01003scn9page4Component,
    F01003scn10Component,
    F01003scn10page1Component,
    F01003scn10page2Component,
    F01003scn10page3Component,
    F01003scn11Component,
    F01003scn11page1Component,
    F01003scn11page2Component,
    F01003scn11page3Component,
    F01003scn11page4Component,
    F01003scn11page5Component,
    F01003scn12Component,
    F01003scn12addComponent,
    F01003scn12confirmComponent,
    F01003scn12deleteComponent,
    F01003scn12editComponent,
    F01003scn13Component,
    F01003scn13addComponent,
    F01003scn13confirmComponent,
    F01003scn13deleteComponent,
    F01003scn13editComponent,
    F01003scn13showComponent,
    F01003scn14Component,
    F01003scn14page1Component,
    F01003scn14page2Component,
    F01003scn14page3Component,
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
    FlexLayoutModule,
    // GoogleMapsModule
  ],
  providers: [
    BnNgIdleService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
