import { Childscn6page1Component } from './childscn6page1/childscn6page1.component';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Childscn6Service } from './childscn6.service';
import { DynamicDirective } from 'src/app/common-lib/directive/dynamic.directive';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn6',
  templateUrl: './childscn6.component.html',
  styleUrls: ['./childscn6.component.css', '../../../assets/css/f01.css']
})
export class Childscn6Component implements OnInit {

  constructor(
    private childscn6Service: Childscn6Service,
    private componenFactoryResolver: ComponentFactoryResolver,
  ) { }

  @ViewChild(DynamicDirective) appDynamic: DynamicDirective;
  dateCode: dateCode[] = [];
  dateValue: string;
  toggle = true;
  private applno: string;
  private cuid: string;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.applno = sessionStorage.getItem('applno');
  }

  ngAfterViewInit() {
    const url = 'f01/childscn6';
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    jsonObject['cuid'] = this.cuid;
    jsonObject['code'] = 'MASTER';
    this.childscn6Service.getDate(url, jsonObject).subscribe(data => {
      if (data.rspBody.items.length > 0) {
        for (let i = 0; i < data.rspBody.items.length; i++) {
          this.dateCode.push({ value: data.rspBody.items[i].QUERYDATE, viewValue: data.rspBody.items[i].QUERYDATE })
        }
        this.dateValue = data.rspBody.items[0].QUERYDATE
        sessionStorage.setItem('queryDate', this.dateValue);
        this.resetPage();
        //this.router.navigate(['./'+this.routerCase+'/CHILDSCN6/CHILDSCN6PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search , queryDate: this.dateValue, routerCase: this.routerCase, fds: this.fds} });
      }
    });
  }

  changeDate() {
    this.resetPage();
    sessionStorage.setItem('queryDate', this.dateValue);
    //this.router.navigate(['./'+this.routerCase+'/CHILDSCN6/CHILDSCN6PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search , queryDate: this.dateValue, routerCase: this.routerCase } });
  }

  resetPage() {
    const componentFactory = this.componenFactoryResolver.resolveComponentFactory(Childscn6page1Component);
    const viewContainerRef = this.appDynamic.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }

}
