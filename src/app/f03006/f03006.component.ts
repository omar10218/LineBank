import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F03006Service } from './f03006.service';
import { F03006addComponent } from './f03006add/f03006add.component';
import { F03006editComponent } from './f03006edit/f03006edit.component';
import { F03006roleComponent } from './f03006role/f03006role.component';

interface sysCode {
  value: string;
  viewValue: string;
}

interface checkBox {
  value: string;
  completed: boolean;
}

@Component({
  selector: 'app-f03006',
  templateUrl: './f03006.component.html',
  styleUrls: ['./f03006.component.css','../../assets/css/f03.css']
})
export class F03006Component implements OnInit, AfterViewInit {

  ynValue: string;
  unitValue: string;
  empNoValue: string;
  groupValue: string;
  //surrogateValue: string;
  sysCode: sysCode[] = [];
  unitCode: sysCode[] = [];
  groupCode: sysCode[] = [];
  //surrogateCode: sysCode[] = [];
  ynCode: sysCode[] = [{value: 'Y', viewValue: '是'}, {value: 'N', viewValue: '否'}];
  constructor(private f03006Service: F03006Service, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.f03006Service.getSysTypeCode('GEN_UNIT','f03/f03006').subscribe(data => {
      for (const jsonObj of data) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.unitCode.push({value: codeNo, viewValue: desc})
      }
    });
    const baseUrl = 'f03/f03006action1';
    this.f03006Service.getGroupCode(baseUrl).subscribe(data => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['groupNo'];
        const desc = jsonObj['groupName'];
        this.groupCode.push({value: codeNo, viewValue: desc})
      }
    });
    // const surrogateUrl = 'EmployeeSet/gmOption';
    // this.f03006Service.getSurrogateCode(surrogateUrl).subscribe(data => {
    //   for (const jsonObj of data.rspBody) {
    //     const codeNo = jsonObj['SURROGATE_NO'];
    //     const desc = jsonObj['SURROGATE_NAME'];
    //     this.surrogateCode.push({value: codeNo, viewValue: desc})
    //   }
    // });
    const roleUrl = 'f03/f03006action2';
    this.f03006Service.getEmployeeRole(roleUrl).subscribe(data => {
      this.empRoleSource.data = data.rspBody;
    });
  }

//============================================================
  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  employeeSource = new MatTableDataSource<any>();
  empRoleSource = new MatTableDataSource<any>();
  ngAfterViewInit() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getEmployeeList();
    });
  }

  getEmployeeList() {
    let formData = new FormData();
    formData.append('empNo', this.empNoValue != null ?　this.empNoValue : '');
    formData.append('onJob', this.ynValue != null ?　this.ynValue : '');
    formData.append('unit', this.unitValue != null ?　this.unitValue : '');
    formData.append('group', this.groupValue != null ?　this.groupValue : '');
    //formData.append('surrogate', this.surrogateValue != null ?　this.surrogateValue : '');
    const baseUrl = 'f03/f03006action3';
    this.f03006Service.getEmployeeList(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize, formData)
    .subscribe(data => {
      this.totalCount = data.rspBody.size;
      this.employeeSource.data = data.rspBody.items;
    });
  }

  changeSort(sortInfo: Sort) {
    this.currentSort = sortInfo;
    this.getEmployeeList();
  }

  changeSelect() {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.paginator.firstPage();
    this.getEmployeeList();
  }

  getOptionDesc(option: sysCode[], codeVal: string): string {
    for (const data of option) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }

  chkArray: checkBox[] = null;
  setRoleNo(empNo: string, roleArray: string) {
    this.chkArray = [];
    let selfRole = roleArray != null ? roleArray : '';
    for (const jsonObj of this.empRoleSource.data) {
      let isChk: boolean = false;
      const chkValue = jsonObj['roleNo'];
      for (const str of selfRole.split(',')) {
        isChk = (str == chkValue);
        if (isChk) { break; }
      }
      this.chkArray.push({value: chkValue, completed: isChk});
    }

    const dialogRef = this.dialog.open(F03006roleComponent, {
      data: { CHECKBOX: this.chkArray, SOURCE: this.empRoleSource.data, empNo: empNo }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  addNew() {
      const dialogRef = this.dialog.open(F03006addComponent, {
        data: {
          EMP_NO: '',
          EMP_NAME : '' ,
          ON_JOB: 'Y',
          EMAIL: '',
          PROMOTION_UNIT: '',
          GROUP_NO: '',
          //SURROGATE_NO: ''
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
      });
  }

  startEdit(i: number,
    EMP_NO: string, EMP_NAME: string, ON_JOB: string,
    EMAIL: string, PROMOTION_UNIT: string, GROUP_NO: string
    //, SURROGATE_NO: string
    ) {
      const dialogRef = this.dialog.open(F03006editComponent, {
        data: {
          EMP_NO: EMP_NO, EMP_NAME : EMP_NAME , ON_JOB: ON_JOB, EMAIL: EMAIL,
          PROMOTION_UNIT: PROMOTION_UNIT != null ? PROMOTION_UNIT : '',
          GROUP_NO: GROUP_NO != null ? GROUP_NO : '',
          //SURROGATE_NO: SURROGATE_NO != null ? SURROGATE_NO : '',
          UNIT: this.unitCode,
          GROUP: this.groupCode,
          //SURROGATE: this.surrogateCode
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
      });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
