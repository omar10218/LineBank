import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01002rescanService extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getCustomerInfoSearch(formData: FormData): Observable<any> {
    const baseUrl = 'f01/childscn5';
    return this.postFormData(baseUrl, formData);
  }
  getRescanSearch(): Observable<any> {
    const baseUrl = 'f01/f01002rescan';
    return this.postHttpClient(baseUrl);
  }
  deleteRescanByRowid(ID: string): any {
    const baseUrl = 'f01/f01002rescanAction1';
    let targetUrl = `${baseUrl}?rowID=${ID}`;
    return this.postHttpClient(targetUrl);
  }
  addRescan(jsonObject: any): any {
    const baseUrl = 'f01/f01002rescanAction2';
    let targetUrl = `${baseUrl}`;
    return this.saveOrEditMsgString(targetUrl, jsonObject);
  }
  addSms(jsonObject: any): any {
    const baseUrl = 'f01/f01002rescanAction3';
    let targetUrl = `${baseUrl}`;
    return this.saveOrEditMsgString(targetUrl, jsonObject);
  }
}
