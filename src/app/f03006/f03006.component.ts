import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F03006Service } from './f03006.service';
import { F03006addComponent } from './f03006add/f03006add.component';
import { F03006editComponent } from './f03006edit/f03006edit.component';
import { F03006roleComponent } from './f03006role/f03006role.component';
import { F03006confirmComponent } from './f03006confirm/f03006confirm.component';

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
  styleUrls: ['./f03006.component.css', '../../assets/css/f03.css']
})
export class F03006Component implements OnInit, AfterViewInit {

  agent_empCode: sysCode[] = [];//代理人
  levelStartDateTypeCode: sysCode[] = [];//日期種類起
  levelEndDateTypeCode: sysCode[] = [];//日期種類迄
  //levelTypeCode: sysCode[] = [];//日期種類
  projectCode: sysCode[] = [];//派件專案代碼
  roleCode: sysCode[] = [];//角色
  on_jobCode: sysCode[] = [];//是否在職
  assign_stopCode: sysCode[] = [];//是否停派

  empNoValue: string;
  empNameValue: string;
  empIDValue: string;
  agent_empValue: string;
  emailValue: string;
  on_jobValue: string = "Y";
  assign_stopValue: string;
  projectValue: string;
  levelStartDateTypeValue: string;
  levelEndDateTypeValue: string;
  levelStartDateValue: Date;
  levelStartDateString: string;
  levelEndDateValue: Date;
  levelEndDateString: string;

  constructor(private f03006Service: F03006Service, public dialog: MatDialog, private pipe: DatePipe) { }
  ngOnInit(): void {

    const baseUrl = 'f03/f03006';
    this.f03006Service.getEmployeeSysTypeCode(baseUrl)
      .subscribe(data => {
        for (const jsonObj of data.rspBody.empList) {
          const codeNo = jsonObj['empNo'];
          const desc = jsonObj['empNo'];
          this.agent_empCode.push({ value: codeNo, viewValue: desc })
        }

        for (const jsonObj of data.rspBody.levelTypeList) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.levelStartDateTypeCode.push({ value: codeNo, viewValue: desc })
          this.levelEndDateTypeCode.push({ value: codeNo, viewValue: desc })
        }


        for (const jsonObj of data.rspBody.projectList) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.projectCode.push({ value: codeNo, viewValue: desc })
        }


        for (const jsonObj of data.rspBody.roleList) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeDesc'];
          this.roleCode.push({ value: codeNo, viewValue: desc })
        }

        this.assign_stopCode.push({ value: "", viewValue: "請選擇" })
        for (const jsonObj of data.rspBody.ynList) {
          const codeNo = jsonObj['codeNo'];
          const desc = jsonObj['codeNo'];
          this.on_jobCode.push({ value: codeNo, viewValue: desc })
          this.assign_stopCode.push({ value: codeNo, viewValue: desc })
        }

        this.empRoleSource.data = data.rspBody.roleList;
        console.log("我是data_______________");
        console.log(data);
        console.log(this.projectCode);
        console.log("我是data_______________");

      });

  }


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
    formData.append('empName', this.empNameValue != null ?　this.empNameValue : '');
    formData.append('empId', this.empIDValue != null ?　this.empIDValue : '');
    formData.append('agentEmp', this.agent_empValue != null ?　this.agent_empValue : '');
    formData.append('email', this.emailValue != null ?　this.emailValue : '');
    formData.append('onJob', this.on_jobValue != null ?　this.on_jobValue : '');
    formData.append('assignStop', this.assign_stopValue != null ?　this.assign_stopValue : '');
    formData.append('assignProjectno', this.projectValue != null ?　this.projectValue : '');
    formData.append('leaveStartdateType', this.levelStartDateTypeValue != null ?　this.levelStartDateTypeValue : '');
    formData.append('leaveEnddateType', this.levelEndDateTypeValue != null ?　this.levelEndDateTypeValue : '');
    if (  this.levelStartDateString != null &&  this.levelStartDateString != '' ) {
      formData.append('leaveStartdate', this.pipe.transform( new Date(this.levelStartDateString) , 'yyyyMMdd' ) );
    }
    if (  this.levelEndDateString != null &&  this.levelEndDateString != '' ) {
      formData.append('leaveEnddate', this.pipe.transform( new Date(this.levelEndDateString) , 'yyyyMMdd' ) );
    }
    // formData.append('leaveStartdate',  != null ? this.levelStartDateString : '');
    // formData.append('leaveEnddate', this.levelEndDateString != null ?this.levelEndDateString : '');
    const baseUrl = 'f03/f03006action1';
    this.f03006Service.getEmployeeList(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize,formData)
      .subscribe(data => {
        console.log(data);
        this.totalCount = data.rspBody.size;
        console.log(this.totalCount);
        if(this.totalCount==0){
          const childernDialogRef = this.dialog.open(F03006confirmComponent, {
            data: { msgStr: "查無資料!" }
          });
        }
        this.employeeSource.data = data.rspBody.items;
      });
  }

  Clear() {
    this.empNoValue= '';
    this.empNameValue= '';
    this.empIDValue= '';
    this.agent_empValue= '';
    this.emailValue= '';
    this.on_jobValue = "Y";
    this.assign_stopValue= '';
    this.projectValue= '';
    this.levelStartDateTypeValue= '';
    this.levelEndDateTypeValue= '';
    this.levelStartDateValue=undefined;
    this.levelStartDateString= '';
    this.levelEndDateValue=undefined;
    this.levelEndDateString= '';

  }

  getDateString(date: Date) :string{
    const d = date.getUTCDate();
    const day = (d < 10) ? '0' + d : d;
    const m = date.getUTCMonth() + 1;
    const month = (m < 10) ? '0' + m : m;
    const year = date.getUTCFullYear();
    const loctime = `${year}-${month}-${day}`;
    return( `${year}${month}${day}`);
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
    console.log(empNo, roleArray);
    this.chkArray = [];
    let selfRole = roleArray != null ? roleArray : '';
    for (const jsonObj of this.empRoleSource.data) {
      let isChk: boolean = false;
      const chkValue = jsonObj['roleNo'];
      for (const str of selfRole.split(',')) {
        isChk = (str == chkValue);
        if (isChk) { break; }
      }
      this.chkArray.push({ value: chkValue, completed: isChk });
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
        EMP_NAME: '',
        EMP_ID: '',
        ON_JOB: 'Y',
        AGENT_EMP: '',
        EMAIL: '',
        ASSIGN_STOP: '',
        ASSIGN_PROJECTNO: '',
        LEAVE_STARTDATE: '',
        LEAVE_STARTDATE_TYPE: '',
        LEAVE_ENDDATE: '',
        LEAVE_ENDDATE_TYPE: '',
        agent_empCode: this.agent_empCode,//代理人
        levelStartDateTypeCode: this.levelStartDateTypeCode,//日期種類起
        levelEndDateTypeCode: this.levelEndDateTypeCode,//日期種類迄
        projectCode: this.projectCode,//派件專案代碼
        roleCode: this.roleCode,//角色
        on_jobCode: this.on_jobCode,//是否在職
        assign_stopCode: this.assign_stopCode//是否停派
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  startEdit(i: number,
    EMP_NO: string, EMP_NAME: string, EMP_ID: string, ON_JOB: string,
    AGENT_EMP: string, EMAIL: string, LEAVE_STARTDATE: string, LEAVE_ENDDATE: string,
    LEAVE_STARTDATE_TYPE: string , LEAVE_ENDDATE_TYPE:string,
    ASSIGN_STOP: string,ASSIGN_PROJECTNO: string
  ) {

    const dialogRef = this.dialog.open(F03006editComponent, {
      data: {

        EMP_NO: EMP_NO,
        EMP_NAME: EMP_NAME,
        EMP_ID: EMP_ID,
        ON_JOB: ON_JOB,
        AGENT_EMP: AGENT_EMP,
        EMAIL: EMAIL,
        ASSIGN_STOP: ASSIGN_STOP,
        ASSIGN_PROJECTNO: ASSIGN_PROJECTNO,
        LEAVE_STARTDATE: LEAVE_STARTDATE,
        LEAVE_STARTDATE_TYPE: LEAVE_STARTDATE_TYPE,
        LEAVE_ENDDATE: LEAVE_ENDDATE,
        LEAVE_ENDDATE_TYPE: LEAVE_ENDDATE_TYPE,
        agent_empCode: this.agent_empCode,//代理人
        levelStartDateTypeCode: this.levelStartDateTypeCode,//日期種類起
        levelEndDateTypeCode: this.levelEndDateTypeCode,//日期種類迄
        projectCode: this.projectCode,//派件專案代碼
        roleCode: this.roleCode,//角色
        on_jobCode: this.on_jobCode,//是否在職
        assign_stopCode: this.assign_stopCode//是否停派
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result.event == 'success') { this.refreshTable(); }
    });
  }

  getlevelDateData(StartDate:string,StartDateType:string,EndDate:string,EndDateType:string):string {
    let data='';
    if(StartDate !=null){data=StartDate;}
    if(StartDate !=null&& StartDateType!=null){data+=this.getOptionDesc(this.levelStartDateTypeCode,StartDateType);}
    if(EndDate !=null&&StartDate!=null){data+='~';}
    if(EndDate !=null){data+=EndDate;}
    if(EndDate !=null&& EndDateType!=null){data+=this.getOptionDesc(this.levelEndDateTypeCode,EndDateType);}

    return(data);

  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
