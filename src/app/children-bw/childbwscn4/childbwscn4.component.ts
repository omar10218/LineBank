import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { DynamicDirective } from 'src/app/common-lib/directive/dynamic.directive';
import { OptionsCode } from 'src/app/interface/base';
import { Childbwscn4Service } from './childbwscn4.service';
import { Childbwscn4page1Component } from '../childbwscn4/childbwscn4page1/childbwscn4page1.component'
import { Childbwscn4page2Component } from '../childbwscn4/childbwscn4page2/childbwscn4page2.component'
import { Childbwscn4page3Component } from '../childbwscn4/childbwscn4page3/childbwscn4page3.component'
import { Childbwscn4page4Component } from '../childbwscn4/childbwscn4page4/childbwscn4page4.component'


enum Page {
  Page1,
  Page2,
  Page3,
  Page4
}

@Component({
  selector: 'app-childbwscn4',
  templateUrl: './childbwscn4.component.html',
  styleUrls: ['./childbwscn4.component.css']
})
export class Childbwscn4Component implements OnInit {

  constructor(
    private Childbwscn4Service: Childbwscn4Service,
    private componenFactoryResolver: ComponentFactoryResolver,
  ) { }

  @ViewChild(DynamicDirective) appDynamic: DynamicDirective;
  dateCode: OptionsCode[] = [];
  dateValue: string;

  private applno: string;
  private cuid: string;
  component = new Map<Page, any>(
    [
      [Page.Page1, Childbwscn4page1Component],
      [Page.Page2, Childbwscn4page2Component],
      [Page.Page3, Childbwscn4page3Component],
      [Page.Page4, Childbwscn4page4Component],

    ]
  );
  nowPage = Page.Page1;
  readonly Page = Page;


  ngOnInit(): void {
      this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    const url = 'f01/childscn9';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    //this.router.navigate(['./'+this.routerCase+'/CHILDSCN9/CHILDSCN9PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search, routerCase: this.routerCase, fds: this.fds } });
  }
  ngAfterViewInit() {
    this.changePage(this.nowPage);
  }
  changePage( page: Page ): void {
    this.nowPage = page;
    const componentFactory = this.componenFactoryResolver.resolveComponentFactory( this.component.get(this.nowPage));
    const viewContainerRef = this.appDynamic.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
