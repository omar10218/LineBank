import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { map } from 'rxjs/operators';
import { Employee } from '../interface/base';

@Injectable({
  providedIn: 'root'
})
export class F03006Service extends BaseService {
  constructor(protected httpClient: HttpClient, private pipe: DatePipe) { super(httpClient); }
  dialogData: any;

  //取得Table
  getEmployeeList(baseUrl: string, pageIndex: number, pageSize: number, formData: FormData): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postFormData(targetUrl, formData);
  }

  //取得初始下拉選單及角色資訊
  getEmployeeSysTypeCode(baseUrl: string): Observable<Employee> {
    let targetUrl = baseUrl;
    return this.postHttpClient(targetUrl).pipe(map(res => res));
  }

  //新增修改
  addorEditSystemCodeSet(baseUrl: string, data: any): any {
    const formdata: FormData = new FormData();
    formdata.append('empNo', data.EMP_NO);
    formdata.append('empName', data.EMP_NAME);
    formdata.append('empId', data.EMP_ID);
    formdata.append('onJob', data.ON_JOB);
    formdata.append('agentEmp', data.AGENT_EMP);
    formdata.append('email', data.EMAIL);
    formdata.append('assignStop', data.ASSIGN_STOP);
    formdata.append('assignProjectno', data.ASSIGN_PROJECTNO)
    if ( data.LEAVE_STARTDATE != null ) {
      formdata.append('leaveStartdateType', data.LEAVE_STARTDATE_TYPE);
      formdata.append('leaveStartdate',  this.pipe.transform( new Date(data.LEAVE_STARTDATE) , 'yyyyMMdd' ) );
    }
    if ( data.LEAVE_ENDDATE != null ) {
      formdata.append('leaveEnddateType', data.LEAVE_ENDDATE_TYPE);
      formdata.append('leaveEnddate', this.pipe.transform( new Date(data.LEAVE_ENDDATE) , 'yyyyMMdd' ) );
    }
    return this.saveOrEditMsgString(baseUrl, formdata);
  }

  //角色設定
  saveEmployeeRole(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }
}
