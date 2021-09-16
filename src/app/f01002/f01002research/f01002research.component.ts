import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChildrenService } from 'src/app/children/children.service';
import { F01002ReSrearchService } from './f01002research.service';

@Component({
  selector: 'app-f01002research',
  templateUrl: './f01002research.component.html',
  styleUrls: ['./f01002research.component.css', '../../../assets/css/f01.css']
})
export class F01002researchComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<F01002researchComponent>,
    public childService: ChildrenService,
    public f01002ReSearchService: F01002ReSrearchService
  ) { }

  empNo: string;  //上傳員編
  applno: string;  //案件編號
  swcID: string;  //身分證字號
  custID: string;  //客戶編號
  searchArray: string[] = [];  //查詢項目

  ngOnInit(): void {
    const caseParams = this.childService.getData();
    this.applno = caseParams.applno;
    this.swcID = caseParams.cuid;
    this.custID = "123456";  //待確認
    this.empNo = localStorage.getItem("empNo");
  }

  close() {
    this.dialogRef.close();
  }

  checkboxSelect(check: boolean, item: string) {
    if ( check ) {
      this.searchArray.push( item );
    } else {
      const index: number = this.searchArray.indexOf( item );
      this.searchArray.splice(index, 1);
    }
    console.log(this.searchArray);
  }

  reSearch() {
    const url = "f01/f01002research";  //API
    let jsonObject: any = {};
    jsonObject['empNo'] = this.empNo;
    jsonObject['applno'] = this.applno;
    jsonObject['swcID'] = this.swcID;
    jsonObject['custID'] = this.custID;
    jsonObject['searchArray'] = this.searchArray.toString();
    this.f01002ReSearchService.reSearch(url, jsonObject).subscribe(data => {
      console.log(data.rspBody);
    });

  }
}
