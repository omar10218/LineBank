import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { F01008Service } from '../f01008.service';
@Component({
  selector: 'app-f01008scn1',
  templateUrl: './f01008scn1.component.html',
  styleUrls: ['./f01008scn1.component.css', '../../../assets/css/f01.css']
})
export class F01008scn1Component implements OnInit {

  constructor(private f01008Service: F01008Service) {
    this.JCICAddSource$ = this.f01008Service.JCICAddSource$.subscribe((data) => {
      this.addData = data;
      this.isShowAdd = data.show;
    });
    this.JCICSource$ = this.f01008Service.JCICSource$.subscribe((data) => {
      this.editData = data;
      this.isShowEdit = data.show;
    });
  }
  JCICSource$: Subscription;
  JCICAddSource$: Subscription;
  isShowAdd: boolean;
  isShowEdit: boolean;
  addData: any;
  editData: any;
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    element.click();
  }

}
