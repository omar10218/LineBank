import { Childscn6page1Component } from './childscn6page1/childscn6page1.component';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Childscn6Service } from './childscn6.service';
import { DynamicDirective } from 'src/app/common-lib/directive/dynamic.directive';
import { NgxWatermarkOptions } from 'ngx-watermark';
import { DatePipe } from '@angular/common';
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
    private pipe: DatePipe
  ) { }

  @ViewChild(DynamicDirective) appDynamic: DynamicDirective;
  dateCode: dateCode[] = [];
  dateValue: string;
  toggle = true;
  private applno: string;
  private cuid: string;
  today: string;

  options: NgxWatermarkOptions = {
    text: '',
    width: 350,
    height: 300,
    fontFamily: 'Kanit',
    color: '#999',
    alpha: .7,
    degree: -45,
    fontSize: '20px',
  };

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    const baseUrl = 'f01/childscn6action2';
    let jsonObject: any = {};
    this.childscn6Service.getDate(baseUrl, jsonObject).subscribe(data => {
      this.today = this.pipe.transform(new Date(), 'yyyyMMdd');
      //this.watermark = data.rspBody[0].empNo + data.rspBody[0].empName + this.today;

      this.options.text =  data.rspBody[0].empNo + data.rspBody[0].empName + this.today;
      data.rspBody[0].empNo + data.rspBody[0].empName + this.today
      +data.rspBody[0].empNo + data.rspBody[0].empName + this.today+data.rspBody[0].empNo + data.rspBody[0].empName + this.today;
    });
  }

  ngAfterViewInit() {
    this.resetPage();
    // const url = 'f01/childscn6';
    // let jsonObject: any = {};
    // jsonObject['applno'] = this.applno;
    // jsonObject['cuid'] = this.cuid;
    // jsonObject['code'] = 'MASTER';
    // this.childscn6Service.getDate(url, jsonObject).subscribe(data => {
    //   if (data.rspBody.items.length > 0) {
    //     for (let i = 0; i < data.rspBody.items.length; i++) {
    //       this.dateCode.push({ value: data.rspBody.items[i].QUERYDATE, viewValue: data.rspBody.items[i].QUERYDATE })
    //     }
    //     this.dateValue = data.rspBody.items[0].QUERYDATE
    //     sessionStorage.setItem('queryDate', this.dateValue);
    //     this.resetPage();
    //     //this.router.navigate(['./'+this.routerCase+'/CHILDSCN6/CHILDSCN6PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search , queryDate: this.dateValue, routerCase: this.routerCase, fds: this.fds} });
    //   }
    // });
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
