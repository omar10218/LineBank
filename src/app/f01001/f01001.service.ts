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

  getEmpNo(jsonObject:JSON): Observable<any> {
    const baseUrl = 'f01/f01002fn1';

    return this.postJsonObject(baseUrl, jsonObject);
  }
  getLockCase(swcApplno: string){
    const baseUrl = 'f01/f01001fn1';
    let targetUrl = `${baseUrl}?swcApplno=${swcApplno}`;
    return this.postHttpClient(targetUrl);
  }

  saveCaseMemo(jsonObject:JSON){
    const baseUrl = 'f01/f01001fn3';
    return this.postJsonObject(baseUrl, jsonObject);
  }
}
