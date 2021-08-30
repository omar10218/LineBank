import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03008Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  dialogData: any;

  getAbnormalList(baseUrl: string, abnormalNid: string, pageIndex: number, pageSize: number): Observable<any> {
    let targetUrl = `${baseUrl}?abnormalNid=${abnormalNid}&page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(targetUrl);
  }

  addOrEditAdrCodeSet(baseUrl: string, empNo: string, formData: FormData): any {
    baseUrl = `${baseUrl}?empNo=${empNo}`;
    return this.saveOrEditMsgString(baseUrl, formData);
  }

  delete(baseUrl: string, abnormalNid: string): Observable<any> {
    baseUrl = `${baseUrl}?abnormalNid=${abnormalNid}`;
    return this.postHttpClient(baseUrl);
  }



}

