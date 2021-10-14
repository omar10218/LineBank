import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F01001Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getCaseList(jsonObject:JSON): Observable<any> {
    const baseUrl = 'f01/f01001';
    let targetUrl = `${baseUrl}`;
    return this.postJsonObject(targetUrl, jsonObject);
  }

  
  getLockCase(jsonObject: JSON){
    const baseUrl = 'f01/f01001fn1';
    return this.postJsonObject(baseUrl, jsonObject);
  }

  getEmpNo(jsonObject:JSON): Observable<any> {
    const baseUrl = 'f01/f01001fn2';
    return this.postJsonObject(baseUrl, jsonObject);
  }

  saveCaseMemo(jsonObject:JSON){
    const baseUrl = 'f01/f01001fn3';
    return this.postJsonObject(baseUrl, jsonObject);
  }
}
