import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03006Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  dialogData: any;

  getGroupCode(baseUrl: string): Observable<any> {
    return this.postHttpClient(baseUrl);
  }

  // getSurrogateCode(baseUrl: string): Observable<any> {
  //   return this.postHttpClient(baseUrl);
  // }

  getEmployeeList(baseUrl: string, pageIndex: number, pageSize: number, formData: FormData): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postFormData(targetUrl, formData);
  }

  addOrEditSystemCodeSet(baseUrl: string, data: any): any {
    const formdata: FormData = new FormData();
    formdata.append('empNo', data.EMP_NO);
    formdata.append('empName', data.EMP_NAME);
    formdata.append('onJob', data.ON_JOB);
    formdata.append('email', data.EMAIL);
    formdata.append('promotionUnit', data.PROMOTION_UNIT);
    formdata.append('groupNo', data.GROUP_NO);
    return this.saveOrEditMsgString(baseUrl, formdata);
  }

  getEmployeeRole(baseUrl: string): Observable<any> {
    return this.postHttpClient(baseUrl);
  }

  saveEmployeeRole(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }
}
