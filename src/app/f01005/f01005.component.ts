import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { DynamicDirective } from '../common-lib/directive/dynamic.directive';
import { F01005page1Component } from './f01005page1/f01005page1.component';
import { F01005page2Component } from './f01005page2/f01005page2.component';

enum Page {
  Page1,
  Page2
}

@Component({
  selector: 'app-f01005',
  templateUrl: './f01005.component.html',
  styleUrls: ['./f01005.component.css', '../../assets/css/f01.css']
})
export class F01005Component implements OnInit {

  constructor(
    private componenFactoryResolver: ComponentFactoryResolver,
  ) { }

  @ViewChild(DynamicDirective) appDynamic: DynamicDirective;
  component = new Map<Page, any>(
    [
      [Page.Page1, F01005page1Component],
      [Page.Page2, F01005page2Component]
    ]
  );
  nowPage = Page.Page1;
  readonly Page = Page;

  ngOnInit(): void {
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
