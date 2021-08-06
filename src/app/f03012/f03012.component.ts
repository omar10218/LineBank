import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MappingCode } from '../mappingcode.model';
import { F03012Service } from './f03012.service';
import { F03012confirmComponent } from './f03012confirm/f03012confirm.component';
import { F03012editComponent } from './f03012edit/f03012edit.component';

interface sysCode {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-f03012',
  templateUrl: './f03012.component.html',
  styleUrls: ['./f03012.component.css']
})

export class F03012Component implements OnInit {
  selectedValue1: string;
  selectedValue2: string;
  setValue: string;
  compareTableCode: sysCode[] = [];
  compareColumnCode: sysCode[] = [];
  currentPage: PageEvent;
  currentSort: Sort;
  submitted = false;
  compareTableSetForm: FormGroup = this.fb.group({
    compareTable: ['', [Validators.required]],
    compareColumn: ['', [Validators.required]],
    setValue: ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder, private f03012Service: F03012Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.f03012Service.getSysTypeCode('COMPARE_TABLE', 'f03/f03012')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.compareTableCode.push({ value: codeNo, viewValue: desc })
        }
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
  compareColnumOption: MappingCode[];
  getComePareDataSetList() {
    const baseUrl = 'f03/f03012scn1';
    this.f03012Service.getComePareDataSetList(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize).subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.compareDataSetSource.data = data.rspBody.items;
    });
  }
  changeSelect() {
    this.compareColumnCode = [];
    console.log(this.selectedValue1)
    this.f03012Service.getSysTypeCode(this.selectedValue1, 'f03/f03012')
      .subscribe(data => {
        for (const jsonObj of data.rspBody) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.compareColumnCode.push({ value: codeNo, viewValue: desc })
        }
      });
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  delete(compareTable: string, compareColumn: string, setValue: string) {
    let msg = '';
    const url = 'f03/f03012action3';
    const formdata: FormData = new FormData();
    formdata.append('compareTable', compareTable);
    formdata.append('compareColumn', compareColumn);
    formdata.append('setValue', setValue);
    this.f03012Service.saveComePareDataSetList(url, formdata).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(F03012confirmComponent, { data: { msgStr: msg } });
      window.location.reload();
    }, 1500);
  }
  add() {
    let msg = '';
    this.submitted = true;
    if (!this.compareTableSetForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const url = 'f03/f03012action1';
      const formdata: FormData = new FormData();
      formdata.append('compareTable', this.compareTableSetForm.value.compareTable);
      formdata.append('compareColumn', this.compareTableSetForm.value.compareColumn);
      formdata.append('setValue', this.compareTableSetForm.value.setValue);
      this.f03012Service.saveComePareDataSetList(url, formdata).subscribe(data => {
        msg = data.rspMsg;
      });
    }
    setTimeout(() => {
      const DialogRef = this.dialog.open(F03012confirmComponent, { data: { msgStr: msg } });
      window.location.reload();
    }, 1500);
  }

  edit(compareTable: string, compareColumn: string, setValue: string) {
    const dialogRef = this.dialog.open(F03012editComponent, {
      minHeight: '100vh',
      width: '50%',
      data: {
        compareTable: compareTable,
        compareColumn: compareColumn,
        setValue: setValue
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

  getOptionCompareColnum(codeVal: string): string {
    for (const data of this.compareColnumOption) {
      if (data.codeNo == codeVal) {
        return data.codeDesc;
        break;
      }
    }
    return codeVal;
  }
}







