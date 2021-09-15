import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDirective } from 'src/app/common-lib/directive/dynamic.directive';
import { OptionsCode } from 'src/app/interface/base';
import { ChildrenService } from '../children.service';
import { Childscn10Service } from './childscn10.service';
import { Childscn10page1Component } from './childscn10page1/childscn10page1.component';
import { Childscn10page2Component } from './childscn10page2/childscn10page2.component';
import { Childscn10page3Component } from './childscn10page3/childscn10page3.component';

enum Page {
  Page1,
  Page2,
  Page3
}

@Component({
  selector: 'app-childscn10',
  templateUrl: './childscn10.component.html',
  styleUrls: ['./childscn10.component.css','../../../assets/css/f01.css']
})
export class Childscn10Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private childscn10Service: Childscn10Service,
    private componenFactoryResolver: ComponentFactoryResolver,
    public childService: ChildrenService
  ) { }

  @ViewChild(DynamicDirective) appDynamic: DynamicDirective;
  dateCode: OptionsCode[] = [];
  dateValue: string;

  private applno: string;
  private search: string;
  private cuid: string;
  private routerCase: string;
  private fds: string
  component = new Map<Page, any>(
    [
      [Page.Page1, Childscn10page1Component],
      [Page.Page2, Childscn10page2Component],
      [Page.Page3, Childscn10page3Component]
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
    const url = 'f01/childscn10';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    //this.router.navigate(['./'+this.routerCase+'/CHILDSCN10/CHILDSCN10PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search, routerCase: this.routerCase, fds: this.fds } });
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
