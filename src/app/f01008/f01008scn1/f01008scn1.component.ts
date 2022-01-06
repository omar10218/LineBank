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
    this.JCICSource$ = this.f01008Service.JCICItemsSource$.subscribe((data) => {
      this.f01008Service = data.show;
      this.isShowdel = data.show;
    });
  }
  JCICSource$: Subscription;
  JCICAddSource$: Subscription;
  isShowAdd: boolean;
  isShowEdit: boolean;
  isShowdel: boolean;
  addData: any;
  editData: any;
  deltData:any;

  private search: string;

  ngOnInit(): void {
    this.search = sessionStorage.getItem('search');
  }

  ngAfterViewInit() {
    let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    element.click();
  }

  save(){

  }

  getSearch(): String {
    return this.search;
  }

  reScan() {
    // const dialogRef = this.dialog.open(Childscn19Component, {
    //   panelClass: 'mat-dialog-transparent',
    //   height: '100%',
    //   width: '70%',
    //   data: {
    //     applno: this.applno,
    //     cuid: this.cuid
    //   }
    // });
  }

  reSearch() {
    // const dialogRef = this.dialog.open(Childscn18Component, {
    //   panelClass: 'mat-dialog-transparent',
    //   data: {
    //     applno: this.applno,
    //     cuid: this.cuid
    //   }
    // });
  }

}
