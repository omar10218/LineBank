import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Childscn26Component } from 'src/app/children/childscn26/childscn26.component';
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component';
import { F01008Service } from '../f01008.service';
import { F01008scn2Component } from '../f01008scn2/f01008scn2.component';
@Component({
  selector: 'app-f01008scn1',
  templateUrl: './f01008scn1.component.html',
  styleUrls: ['./f01008scn1.component.css', '../../../assets/css/f01.css']
})
export class F01008scn1Component implements OnInit {

  constructor(
    private f01008Service: F01008Service,
    public dialog: MatDialog,
    private router: Router) {
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
  block: boolean = false;
  private search: string;
  applno: string;
  custId: string;
  afterResult:string;
  ngOnInit(): void {

    this.search = sessionStorage.getItem('search');
    this.applno = sessionStorage.getItem('applno');
    this.custId = sessionStorage.getItem('custId');


  }

  ngAfterViewInit() {
    let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    element.click();
  }

  save(){
    if(sessionStorage.getItem('afterResult')!='' && sessionStorage.getItem('afterResult') !='null')
    {
      alert("123")
    }
    else
    {
      this.dialog.open(ConfirmComponent, {
        data: { msgStr: "請選擇徵審後處理審核結果" }
      });
      this.router.navigate(['./F01008/F01008SCN1/F01008SCN2']);
    }

  }

  getSearch(): String {
    return this.search;
  }

  reScan() {
    console.log("?????????????")
    console.log(sessionStorage.getItem('afterResult'))
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

  reSearch(result: string)//立即重查
    {
      const dialogRef = this.dialog.open(Childscn26Component, {
        panelClass: 'mat-dialog-transparent',
        minHeight: '50%',
        width: '30%',
        data: {
          value: result
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.value == 'confirm')
        {
          let jsonObject: any = {};
          let url = 'f01/f01008scn0';
          jsonObject['applno'] = this.applno;
          jsonObject['custId'] = this.custId;
          this.block = true;
          this.f01008Service.f01008scn2(jsonObject, url).subscribe(data => {
            console.log("====================");
            console.log(data);
            this.router.navigate(['./F01008']);
            this.block = false;
          })
        }
      })
    }

}
