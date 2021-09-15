import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F04001Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  saveFlowStep(baseUrl: string, step: string, formData: string[]): Observable<any> {
    let jsonObject: any = {};

    jsonObject['step'] = step;
    jsonObject['applno'] = formData;

    return this.postJsonObject(baseUrl, jsonObject);
  }
  getLockApplno(baseUrl: string, pageIndex: number, pageSize: number, step: string): Observable<any> {
    let jsonObject: any = {};

    jsonObject['page'] = pageIndex+1;
    jsonObject['per_page'] = pageSize;
    jsonObject['step'] = step;

    return this.postJsonObject(baseUrl, jsonObject);
  }

}
