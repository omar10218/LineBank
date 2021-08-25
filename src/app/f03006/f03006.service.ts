import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03006Service extends BaseService {
  constructor(protected httpClient: HttpClient, private pipe: DatePipe) { super(httpClient); }
  dialogData: any;

  getEmployeeList(baseUrl: string, pageIndex: number, pageSize: number, formData: FormData): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postFormData(targetUrl, formData);
  }

  getEmployeeSysTypeCode(baseUrl: string): Observable<any> {
    let targetUrl = baseUrl;
    return this.postHttpClient(targetUrl);
  }

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
    formdata.append('leaveStartdateType', data.LEAVE_STARTDATE_TYPE);
    formdata.append('leaveEnddateType', data.LEAVE_ENDDATE_TYPE);
    formdata.append('leaveStartdate',  this.pipe.transform( new Date(data.LEAVE_STARTDATE) , 'yyyyMMdd' ) );
    formdata.append('leaveEnddate', this.pipe.transform( new Date(data.LEAVE_ENDDATE) , 'yyyyMMdd' ) );
    return this.saveOrEditMsgString(baseUrl, formdata);
  }

  saveEmployeeRole(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }
}
