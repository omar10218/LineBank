import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F01006Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getCaseList(jsonObject:JSON): Observable<any> {
    const baseUrl = 'f01/f01006';
    let targetUrl = `${baseUrl}`;
    return this.postJsonObject(targetUrl, jsonObject);
  }

  addRestart(jsonObject: any): any {
    const baseUrl = 'f01/f01006action1';
    let targetUrl = `${baseUrl}`;
    return this.saveOrEditMsgString(targetUrl, jsonObject);
  }

  getInterestData(jsonObject: any): any {
    const baseUrl = 'f01/f01006action2';
    let targetUrl = `${baseUrl}`;
    return this.postJsonObject(targetUrl, jsonObject);

  }



}
