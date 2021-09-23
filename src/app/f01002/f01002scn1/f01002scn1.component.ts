import { F01002blocklistComponent } from './../f01002blocklist/f01002blocklist.component';
import { F01002researchComponent } from './../f01002research/f01002research.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChildrenService } from 'src/app/children/children.service';
import { F01002rescanComponent } from '../f01002rescan/f01002rescan.component';

@Component({
  selector: 'app-f01002scn1',
  templateUrl: './f01002scn1.component.html',
  styleUrls: ['./f01002scn1.component.css', '../../../assets/css/f01.css']
})
export class F01002scn1Component implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public childService: ChildrenService,
    public dialog: MatDialog
  ) { }

  private creditLevel: string = 'APPLCreditL3';
  private applno: string;
  private search: string;
  private cuid: string;
  private routerCase: string;
  fds: string
  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.applno = params['applno'];
    //   this.search = params['search'];
    //   this.cuid = params['cuid'];
    //   this.routerCase = params['routerCase'];
    //   this.fds = params['fds'];
    // });
    const caseParams = this.childService.getData();
    this.applno = caseParams.applno;
    this.search = caseParams.search;
    this.cuid = caseParams.cuid;
    this.fds = caseParams.fds;
  }

  ngAfterViewInit() {
    let element: HTMLElement = document.getElementById('firstBtn') as HTMLElement;
    element.click();
  }

  reScan() {
    const dialogRef = this.dialog.open(F01002rescanComponent,{
      data:{
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }
  
  reSearch() {
    const dialogRef = this.dialog.open(F01002researchComponent,{
      data:{
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }

  blockList() {
    const dialogRef = this.dialog.open(F01002blocklistComponent,{
      data:{
        applno: this.applno,
        cuid: this.cuid
      }
    });
  }
}
