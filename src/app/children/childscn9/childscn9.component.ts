import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDirective } from 'src/app/common-lib/directive/dynamic.directive';
import { OptionsCode } from 'src/app/interface/base';
import { ChildrenService } from '../children.service';
import { Childscn9Service } from './childscn9.service';
import { Childscn9page1Component } from './childscn9page1/childscn9page1.component';
import { Childscn9page2Component } from './childscn9page2/childscn9page2.component';
import { Childscn9page3Component } from './childscn9page3/childscn9page3.component';
import { Childscn9page4Component } from './childscn9page4/childscn9page4.component';

enum Page {
  Page1,
  Page2,
  Page3,
  Page4
}

@Component({
  selector: 'app-childscn9',
  templateUrl: './childscn9.component.html',
  styleUrls: ['./childscn9.component.css','../../../assets/css/f01.css']
})
export class Childscn9Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private childscn9Service: Childscn9Service,
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
      [Page.Page1, Childscn9page1Component],
      [Page.Page2, Childscn9page2Component],
      [Page.Page3, Childscn9page3Component],
      [Page.Page4, Childscn9page4Component]
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
