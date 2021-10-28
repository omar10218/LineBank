import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { DynamicDirective } from 'src/app/common-lib/directive/dynamic.directive';
import { OptionsCode } from 'src/app/interface/base';
import { Childscn10Service } from './childscn10.service';
import { Childscn10page1Component } from './childscn10page1/childscn10page1.component';
import { Childscn10page2Component } from './childscn10page2/childscn10page2.component';
import { Childscn10page3Component } from './childscn10page3/childscn10page3.component';
import { Childscn10page4Component } from './childscn10page4/childscn10page4.component';

enum Page {
  Page1,
  Page2,
  Page3,
  Page4
}

@Component({
  selector: 'app-childscn10',
  templateUrl: './childscn10.component.html',
  styleUrls: ['./childscn10.component.css', '../../../assets/css/child.css']
})
export class Childscn10Component implements OnInit {

  constructor(
    private childscn10Service: Childscn10Service,
    private componenFactoryResolver: ComponentFactoryResolver
  ) { }

  @ViewChild(DynamicDirective) appDynamic: DynamicDirective;
  dateCode: OptionsCode[] = [];
  dateValue: string;

  private applno: string;
  private cuid: string;
  private routerCase: string;
  private level: string;
  component = new Map<Page, any>(
    [
      [Page.Page1, Childscn10page1Component],
      [Page.Page2, Childscn10page2Component],
      [Page.Page3, Childscn10page3Component],
      [Page.Page4, Childscn10page4Component]
    ]
  );
  nowPage = Page.Page1;
  readonly Page = Page;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    this.level = sessionStorage.getItem('level');
    const url = 'f01/childscn10';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    //this.router.navigate(['./'+this.routerCase+'/CHILDSCN10/CHILDSCN10PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search, routerCase: this.routerCase, fds: this.fds } });
  }

  //判斷等級是否顯示 授信 高階主管才可顯示 風險模型資訊
  getLevel() {
    let YN = "N";
    //測試用 都通過
    YN = "Y"
    //正式用
    // if(this.level=="1"||this.level=="2"){YN="Y"}
    return YN;
  }

  ngAfterViewInit() {
    this.changePage(this.nowPage);
  }

  changePage(page: Page): void {
    this.nowPage = page;
    const componentFactory = this.componenFactoryResolver.resolveComponentFactory(this.component.get(this.nowPage));
    const viewContainerRef = this.appDynamic.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
