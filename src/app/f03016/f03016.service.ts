import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class F03016Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getImpertmentParameter(baseUrl: string, json: JSON): Observable<any> {
    // let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    // return this.postHttpClient(targetUrl);
    return this.postJsonObject(baseUrl, json);
  }

  update(baseUrl: string, jsonObject: any): any {

    jsonObject['DssJcicSet'] = jsonObject.DssJcicSet;
    jsonObject['DssMailDay'] = jsonObject.DssMailDay;
    jsonObject['BasicLimit'] = jsonObject.BasicLimit;
    jsonObject['CssPassStart'] = jsonObject.CssPassStart;
    jsonObject['CssPassEnd'] = jsonObject.CssPassEnd;
    jsonObject['IsJcic'] = jsonObject.IsJcic;
    jsonObject['TransEmpNo'] = jsonObject.TransEmpNo;

    return this.saveOrEditMsgString(baseUrl, jsonObject);

  }
}

