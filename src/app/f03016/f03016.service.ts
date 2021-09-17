import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class F03016Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getImpertmentParameter(baseUrl: string, pageIndex: number, pageSize: number): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(targetUrl);
  }

  update(baseUrl: string, jsonObject: any): any {

    jsonObject['DssJcicSet'] = jsonObject.DssJcicSet;
    jsonObject['BasicLimit'] = jsonObject.BasicLimit;
    jsonObject['IsJcic'] = jsonObject.IsJcic;
    jsonObject['TransEmpNo'] = jsonObject.TransEmpNo;

    return this.saveOrEditMsgString(baseUrl, jsonObject);

  }
}

