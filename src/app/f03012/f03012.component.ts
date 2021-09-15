import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MappingCode } from '../mappingcode.model';
import { F03012Service } from './f03012.service';
import { F03012addComponent } from './f03012add/f03012add.component';
import { F03012confirmComponent } from './f03012confirm/f03012confirm.component';
import { F03012editComponent } from './f03012edit/f03012edit.component';
import {ThemePalette} from '@angular/material/core';

interface sysCode {
  value: string;
  viewValue: string;
}
interface checkBox {
  value: string;
  completed: boolean;
}

@Component({
  selector: 'app-f03012',
  templateUrl: './f03012.component.html',
  styleUrls: ['./f03012.component.css','../../assets/css/f03.css']
})

export class F03012Component implements OnInit {

  isAllCheck: boolean = false;
  chkArray: checkBox[] = [];
  selectedValue: string = 'default';
  selectedValue1:string;
  sysCode: sysCode[] = [];
  selectedColumn: sysCode[] = [];
  compareTableCode: sysCode[] = [];
  compareColumnCode: sysCode[] = [];
  compareType: sysCode[] = [];
  currentPage: PageEvent;
  currentSort: Sort;
  allComplete: boolean = false;



  constructor(private f03012Service: F03012Service, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.f03012Service.getSysTypeCode('COMPARE_TABLE', 'f03/f03012')
    .subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.compareTableCode.push({ value: codeNo, viewValue: desc })
      }
      for (const jsonObj of data.rspBody) {
        this.chkArray.push({ value: jsonObj['codeNo'], completed: false })
      }
      // this.mappingCodeSource.data = data.rspBody.functionList;
      // for (let i = 0; i < this.compareTableCode.length; i++) {
      //   this.f03012Service.getSysTypeCode(this.compareTableCode[i].value, 'f03/f03012')
      //     .subscribe(data => {
      //       for (const jsonObj of data.rspBody) {
      //         const codeNo = jsonObj['codeNo'];
      //         const desc = jsonObj['codeDesc'];
      //         this.compareColumnCode.push({ value: codeNo, viewValue: desc })
      //       }
      //     });
      // }
    });

    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };

    this.currentSort = {
      active: '',
      direction: ''
    };
  }
  mappingCodeSource = new MatTableDataSource<any>();
  ngAfterViewInit(): void {
    this.getComePareDataSetList();
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getComePareDataSetList();
    });
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  compareDataSetSource = new MatTableDataSource<any>();
  compareTableOption: MappingCode[];
  compareColumnOption: MappingCode[];

  getComePareDataSetList() {
    const baseUrl = 'f03/f03012scn1';
    this.f03012Service.getComePareDataSetList(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize)
    .subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.compareDataSetSource.data = data.rspBody.items;
      this.compareTableOption = data.rspBody.compareTable;
      this.compareColumnOption = data.rspBody.comparColumn;
    });
  }

  delete(compareTable: string, compareColumn: string, compareType: string,setValueHight: string, setValueLow: string) {
    let msg = '';
    const url = 'f03/f03012action3';
    const formdata: FormData = new FormData();
    formdata.append('compareTable', compareTable);
    formdata.append('compareColumn', compareColumn);
    formdata.append('compareType', compareType);
    // formdata.append('setValue', setValue);
    formdata.append('setValueHight', setValueHight);
    formdata.append('setValueLow', setValueLow);
    this.f03012Service.saveComePareDataSetList(url, formdata).subscribe(data => {
      msg = data.rspMsg;
    });
    // var valArray: string[] = new Array;
    // for (const obj of this.chkArray) {
    //   if (obj.completed) { valArray.push(obj.value); }
    // };

    setTimeout(() => {
      const DialogRef = this.dialog.open(F03012confirmComponent, { data: { msgStr: msg } });
      window.location.reload();
    }, 1500);
  }
  add() {
    const dialogRef = this.dialog.open(F03012addComponent, {
      minHeight: '70vh',
      width: '50%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
        window.location.reload();
      });
  }


  edit(compareTable: string, compareColumn: string, compareType:string, setValueHight:string, setValueLow:string) {
    const dialogRef = this.dialog.open(F03012editComponent, {
      minHeight: '70vh',
      width: '50%',
      data: {
        compareTable: compareTable,
        compareColumn: compareColumn,
        compareType:compareType,
        setValueHight:setValueHight,
        setValueLow:setValueLow,
        // setValue: setValue
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
      window.location.reload();
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  getOptionCompareTable(codeVal: string): string {
    for (const data of this.compareTableOption) {
      if (data.codeNo == codeVal) {
        return data.codeDesc;
        break;
      }
    }
    return codeVal;
  }

  getOptionCompareColumn(codeVal: string): string {
    for (const data of this.compareColumnCode) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.mappingCodeSource.filter = filterValue.trim().toLowerCase();
  }
  changeSelect(){
    this.selectedColumn=[];
    this.f03012Service.getSysTypeCode(this.selectedValue1,'f03/f03012')
    .subscribe(data => {
      for(const jsonObj of data.rpsBody){
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.selectedColumn.push({value:codeNo, viewValue:desc})
      }
    })

  }
  queryByCompareTable(compareTable:string){
    let msg= '';
    const url = 'f03/f03012action4'
    const formdata:FormData =new FormData();
    console.log(compareTable)
    formdata.append('compareTable',compareTable);

    this.f03012Service.saveComePareDataSetList(url, formdata).subscribe(data => {
      // msg = data.rspMsg;
      this.totalCount = data.rspBody.size;
      this.compareDataSetSource.data = data.rspBody.items;
      console.log(data)
    });
    // setTimeout(() => {
    //   const DialogRef = this.dialog.open(F03012confirmComponent, { data: { msgStr: msg } });
    //   window.location.reload();
    // }, 1500);

  }
  setAll(completed: boolean) {

    for (const obj of this.chkArray) {
      obj.completed = completed;
    }

  }
  async allCheck() {
    this.isAllCheck = false;
    await this.getRoleFunction();
  }

  private async getRoleFunction() {
    const baseUrl = 'f03/f03012';
    this.f03012Service.getRoleFunction(baseUrl, this.selectedValue).subscribe(data => {
      console.log(data);
      if (this.chkArray.length > 0) {
        let i: number = 0;
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray[i] = { value:codeNo, completed: isChk == 'Y' };
          i++;
        }

      } else {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const isChk = jsonObj['IS_CHK'];
          this.chkArray.push({ value:codeNo, completed: isChk == 'Y' });
        }
      }
      this.mappingCodeSource.data = data.rspBody;
    });
  }



}







