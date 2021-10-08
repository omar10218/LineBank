import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { F03006Service } from './f03006.service';
import { F03006addComponent } from './f03006add/f03006add.component';
import { F03006editComponent } from './f03006edit/f03006edit.component';
import { F03006roleComponent } from './f03006role/f03006role.component';
import { RoleItem, OptionsCode } from '../interface/base';
import { ConfirmComponent } from '../common-lib/confirm/confirm.component';
import { NzI18nService, zh_TW } from 'ng-zorro-antd/i18n';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

//角色checkBox框架
interface checkBox {
  value: string;
  completed: boolean;
}

//Nick 組織人員維護
@Component({
  selector: 'app-f03006',
  templateUrl: './f03006.component.html',
  styleUrls: ['./f03006.component.css', '../../assets/css/f03.css']
})
export class F03006Component implements OnInit {

  constructor(
    private f03006Service: F03006Service,
    public dialog: MatDialog,
    private pipe: DatePipe,
    private nzI18nService: NzI18nService,
  ) {
    this.nzI18nService.setLocale(zh_TW)
  }

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  agent_empCode: OptionsCode[] = [];//代理人
  levelStartDateTypeCode: OptionsCode[] = [];//日期種類起
  levelEndDateTypeCode: OptionsCode[] = [];//日期種類迄
  projectCode: OptionsCode[] = [];//派件專案代碼
  roleCode: OptionsCode[] = [];//角色
  on_jobCode: OptionsCode[] = [];//是否在職
  assign_stopCode: OptionsCode[] = [];//是否停派

  empNoValue: string;//員工編號
  empNameValue: string;//員工姓名
  empIDValue: string;//員工ID
  agent_empValue: string;//代理人
  emailValue: string;//email
  on_jobValue: string = "Y"; //是否在職預設Y
  assign_stopValue: string;//是否停派
  projectValue: string;//派艦專案代碼
  levelStartDateTypeValue: string;//請假起日
  levelEndDateTypeValue: string;//請假起日類型
  levelStartDateValue: Date;//請假起日類型值
  levelStartDateString: string;//請假迄日
  levelEndDateValue: Date;//請假迄日類型
  levelEndDateString: string;//請假迄日類型值

  employeeSource = new MatTableDataSource<any>();//組織人員維護Table
  empRoleSource = new MatTableDataSource<RoleItem>();//角色Table

  ngOnInit(): void {
    this.getEmployeeList(this.pageIndex, this.pageSize);

    const baseUrl = 'f03/f03006';//代理人
    this.f03006Service.getEmployeeSysTypeCode(baseUrl)
      .subscribe(data => {
        for (const jsonObj of data.rspBody.empList) {
          const codeNo = jsonObj.empNo;
          const desc = jsonObj.empNo;
          this.agent_empCode.push({ value: codeNo, viewValue: desc })
        }

        for (const jsonObj of data.rspBody.levelTypeList) {//日期種類起訖
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.levelStartDateTypeCode.push({ value: codeNo, viewValue: desc })
          this.levelEndDateTypeCode.push({ value: codeNo, viewValue: desc })
        }
        for (const jsonObj of data.rspBody.projectList) {//派件專案代碼
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.projectCode.push({ value: codeNo, viewValue: desc })
        }

        this.assign_stopCode.push({ value: "", viewValue: "請選擇" })//是否停派//是否在職
        for (const jsonObj of data.rspBody.ynList) {
          const codeNo = jsonObj.codeNo;
          const desc = jsonObj.codeDesc;
          this.on_jobCode.push({ value: codeNo, viewValue: desc })
          this.assign_stopCode.push({ value: codeNo, viewValue: desc })
        }

        this.empRoleSource.data = data.rspBody.roleList;//角色Table
      });

  }

    //切換查詢選項
    changeSelect() {
      this.changePage();
      this.getEmployeeList(this.pageIndex, this.pageSize);
    }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.pageSize=pageSize;
    this.pageIndex=pageIndex;
    this.getEmployeeList(pageIndex, pageSize);
    //console.log(pageSize);console.log(pageIndex);
  }

  //取得表單資料
  getEmployeeList(pageIndex: number, pageSize: number) {
    let formData = new FormData();
    formData.append('empNo', this.empNoValue != null ?　this.empNoValue : '');//員工編號
    formData.append('empName', this.empNameValue != null ?　this.empNameValue : '');//員工姓名
    formData.append('empId', this.empIDValue != null ?　this.empIDValue : '');//員工ID
    formData.append('agentEmp', this.agent_empValue != null ?　this.agent_empValue : '');//代理人
    formData.append('email', this.emailValue != null ?　this.emailValue : '');//email
    formData.append('onJob', this.on_jobValue != null ?　this.on_jobValue : '');//是否在職
    formData.append('assignStop', this.assign_stopValue != null ?　this.assign_stopValue : '');//是否停派
    formData.append('assignProjectno', this.projectValue != null ?　this.projectValue : '');//派件專案代碼
    formData.append('leaveStartdateType', this.levelStartDateTypeValue != null ?　this.levelStartDateTypeValue : '');//請假起日類型
    formData.append('leaveEnddateType', this.levelEndDateTypeValue != null ?　this.levelEndDateTypeValue : '');//請假迄日類型
    if (  this.levelStartDateString != null &&  this.levelStartDateString != '' ) {//請假起日
      formData.append('leaveStartdate', this.pipe.transform( new Date(this.levelStartDateString) , 'yyyyMMdd' ) );
    }
    if (  this.levelEndDateString != null &&  this.levelEndDateString != '' ) {//請假迄日
      console.log(this.pipe.transform( new Date(this.levelEndDateString) , 'yyyyMMdd' ));
      formData.append('leaveEnddate', this.pipe.transform( new Date(this.levelEndDateString) , 'yyyyMMdd' ) );
    }
    const baseUrl = 'f03/f03006action1';
    this.f03006Service.getEmployeeList(baseUrl, pageIndex, pageSize,formData)
      .subscribe(data => {
        console.log(data);
        this.total = data.rspBody.size;
        console.log(this.total);
        if(this.total==0){
          const childernDialogRef = this.dialog.open(ConfirmComponent, {
            data: { msgStr: "查無資料!" }
          });
        }
        this.employeeSource.data = data.rspBody.items;
      });
      this.loading = false;
  }

  //清除資料
  Clear() {
    this.empNoValue= '';//員工編號
    this.empNameValue= '';//員工姓名
    this.empIDValue= '';//員工ID
    this.agent_empValue= '';//代理人
    this.emailValue= '';//email
    this.on_jobValue = "Y";//是否在職
    this.assign_stopValue= '';//是否停派
    this.projectValue= '';//派件專案代碼
    this.levelStartDateTypeValue= '';//請假起日類型
    this.levelEndDateTypeValue= '';//請假迄日類型
    this.levelStartDateValue=undefined;//請假起日
    this.levelStartDateString= '';//請假起日
    this.levelEndDateValue=undefined;//請假迄日
    this.levelEndDateString= '';//請假迄日

    this.employeeSource.data = null;
  }



  //取得下拉選單中文
  getOptionDesc(option: OptionsCode[], codeVal: string): string {
    for (const data of option) {
      if (data.value == codeVal) {
        return data.viewValue;
        break;
      }
    }
    return codeVal;
  }

  //設定角色
  chkArray: checkBox[] = null;
  setRoleNo(empNo: string, roleArray: string) {
    console.log(empNo, roleArray);
    this.chkArray = [];
    let selfRole = roleArray != null ? roleArray : '';
    for (const jsonObj of this.empRoleSource.data) {
      let isChk: boolean = false;
      const chkValue = jsonObj.roleNo;
      for (const str of selfRole.split(',')) {
        isChk = (str == chkValue);
        if (isChk) { break; }
      }
      this.chkArray.push({ value: chkValue, completed: isChk });
    }

    const dialogRef = this.dialog.open(F03006roleComponent, {
      minHeight: '70vh',
      width: '50%',
      data: { CHECKBOX: this.chkArray, SOURCE: this.empRoleSource.data, empNo: empNo }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && (result.event == 'success' || result == '1')) { this.refreshTable(); }
    });
  }

  //新增
  addNew() {
    const dialogRef = this.dialog.open(F03006addComponent, {
      minHeight: '70vh',
      width: '50%',
      data: {
        EMP_NO: '',//員工編號
        EMP_NAME: '',//員工姓名
        EMP_ID: '',//員工ID
        ON_JOB: 'Y',//是否在職
        AGENT_EMP: '',//代理人
        EMAIL: '',//email
        ASSIGN_STOP: '',//是否停派
        ASSIGN_PROJECTNO: '',//派件專案代碼
        LEAVE_STARTDATE: '',//請假起日
        LEAVE_STARTDATE_TYPE: '',//請假起日類型
        LEAVE_ENDDATE: '',//請假迄日
        LEAVE_ENDDATE_TYPE: '',//請假迄日類型
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
      if (result != null && (result.event == 'success' || result == '1')) { this.refreshTable(); }
    });
  }

  //修改
  startEdit(i: number,
    EMP_NO: string, EMP_NAME: string, EMP_ID: string, ON_JOB: string,
    AGENT_EMP: string, EMAIL: string, LEAVE_STARTDATE: string, LEAVE_ENDDATE: string,
    LEAVE_STARTDATE_TYPE: string , LEAVE_ENDDATE_TYPE:string,
    ASSIGN_STOP: string,ASSIGN_PROJECTNO: string
  ) {

    const dialogRef = this.dialog.open(F03006editComponent, {
      minHeight: '70vh',
      width: '50%',
      data: {

        EMP_NO: EMP_NO,//員工編號
        EMP_NAME: EMP_NAME,//員工姓名
        EMP_ID: EMP_ID,//員工ID
        ON_JOB: ON_JOB,//是否在職
        AGENT_EMP: AGENT_EMP,//代理人
        EMAIL: EMAIL,//email
        ASSIGN_STOP: ASSIGN_STOP,//是否停派
        ASSIGN_PROJECTNO: ASSIGN_PROJECTNO,//派件專案代碼
        LEAVE_STARTDATE: LEAVE_STARTDATE,//請假起日
        LEAVE_STARTDATE_TYPE: LEAVE_STARTDATE_TYPE,//請假起日類型
        LEAVE_ENDDATE: LEAVE_ENDDATE,//請假迄日
        LEAVE_ENDDATE_TYPE: LEAVE_ENDDATE_TYPE,//請假迄日類型
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
      if (result != null && (result.event == 'success' || result == '1')) { this.refreshTable(); }
    });
  }

  //前端顯示日日期用
  getlevelDateData(StartDate:string,StartDateType:string,EndDate:string,EndDateType:string):string {
    let data='';
    if(StartDate !=null){data=StartDate;}
    if(StartDate !=null&& StartDateType!=null){data+=this.getOptionDesc(this.levelStartDateTypeCode,StartDateType);}
    if(EndDate !=null&&StartDate!=null){data+='~';}
    if(EndDate !=null){data+=EndDate;}
    if(EndDate !=null&& EndDateType!=null){data+=this.getOptionDesc(this.levelEndDateTypeCode,EndDateType);}

    return(data);

  }

  //刷新頁面
  private refreshTable() {
    this.getEmployeeList(this.pageIndex, this.pageSize);
    // console.log(this.pageIndex)
    // console.log(this.pageSize)
  }

  changePage() {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.total = 1;
  }

}
