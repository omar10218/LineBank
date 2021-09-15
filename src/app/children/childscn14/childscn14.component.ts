import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDirective } from 'src/app/common-lib/directive/dynamic.directive';
import { ChildrenService } from '../children.service';
import { Childscn14page1Component } from './childscn14page1/childscn14page1.component';
import { Childscn14page2Component } from './childscn14page2/childscn14page2.component';
import { Childscn14page3Component } from './childscn14page3/childscn14page3.component';

enum Page {
  Page1,
  Page2,
  Page3
}

@Component({
  selector: 'app-childscn14',
  templateUrl: './childscn14.component.html',
  styleUrls: ['./childscn14.component.css']
})
export class Childscn14Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private componenFactoryResolver: ComponentFactoryResolver,
    public childService: ChildrenService
  ) { }

  @ViewChild(DynamicDirective) appDynamic: DynamicDirective;
  private applno: string;
  private search: string;
  private cuid: string;
  private routerCase: string;
  private fds: string
  component = new Map<Page, any>(
    [
      [Page.Page1, Childscn14page1Component],
      [Page.Page2, Childscn14page2Component],
      [Page.Page3, Childscn14page3Component],
    ]
  );
  nowPage = Page.Page1;
  readonly Page = Page;

  ngOnInit(): void {
    const caseParams = this.childService.getData();
    this.applno = caseParams.applno;
    this.search = caseParams.search;
    this.cuid = caseParams.cuid;
    this.fds = caseParams.fds;
    //this.router.navigate(['./'+this.routerCase+'/CHILDSCN14/CHILDSCN14PAGE1'], { queryParams: { applno: this.applno, cuid: this.cuid , search: this.search, routerCase: this.routerCase, fds: this.fds } });
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
