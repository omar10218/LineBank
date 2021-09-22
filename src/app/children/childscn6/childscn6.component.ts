import { Childscn6page1Component } from './childscn6page1/childscn6page1.component';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Childscn6Service } from './childscn6.service';
import { ChildrenService } from '../children.service';
import { DynamicDirective } from 'src/app/common-lib/directive/dynamic.directive';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn6',
  templateUrl: './childscn6.component.html',
  styleUrls: ['./childscn6.component.css','../../../assets/css/f01.css']
})
export class Childscn6Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private childscn6Service: Childscn6Service,
    private componenFactoryResolver: ComponentFactoryResolver,
    public childService: ChildrenService
  ) { }

  @ViewChild(DynamicDirective) appDynamic: DynamicDirective;
  dateCode: dateCode[] = [];
  dateValue: string;
  toggle = true;
  private applno: string;
  private search: string;
  private cuid: string;
  private routerCase: string;
  private fds: string
  ngOnInit(): void {
    const caseParams = this.childService.getData();
    this.applno = caseParams.applno;
    this.search = caseParams.search;
    this.cuid = caseParams.cuid;
    this.fds = caseParams.fds;
  }

  ngAfterViewInit() {
    const url = 'f01/childscn6';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'MASTER');
    this.childscn6Service.getDate(url, formdata).subscribe(data => {
      if ( data.rspBody.items.length > 0 ) {
        for (let i = 0; i < data.rspBody.items.length; i++) {
          this.dateCode.push({value: data.rspBody.items[i].QUERYDATE , viewValue: data.rspBody.items[i].QUERYDATE })
        }
        this.dateValue = data.rspBody.items[0].QUERYDATE
        this.childService.setData({
          applno: this.applno,
          cuid: this.cuid,
          search: this.search,
          fds: this.fds,
          queryDate: this.dateValue
        });
        this.resetPage();
        //this.router.navigate(['./'+this.routerCase+'/CHILDSCN6/CHILDSCN6PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search , queryDate: this.dateValue, routerCase: this.routerCase, fds: this.fds} });
      }
    });
  }

  changeDate() {
    this.resetPage();
    this.childService.setData({
      applno: this.applno,
      cuid: this.cuid,
      search: this.search,
      fds: this.fds,
      queryDate: this.dateValue
    });

    //this.router.navigate(['./'+this.routerCase+'/CHILDSCN6/CHILDSCN6PAGE1'], { queryParams: { applno: this.applno , cuid: this.cuid , search: this.search , queryDate: this.dateValue, routerCase: this.routerCase } });
  }

  resetPage() {
    const componentFactory = this.componenFactoryResolver.resolveComponentFactory( Childscn6page1Component);
    const viewContainerRef = this.appDynamic.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }

}
