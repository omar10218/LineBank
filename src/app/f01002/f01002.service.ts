import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F01002Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  // pageIndex: number, pageSize: number, empno: string, swcID: string, swcApplno: string
  getCaseList(jsonObject:JSON): Observable<any> {
    const baseUrl = 'f01/f01002';
    let targetUrl = `${baseUrl}`;

    return this.postJsonObject(targetUrl, jsonObject);
  }
  getEmpNo(empno: string): Observable<any> {
    const baseUrl = 'f01/f01002fn2';
    let targetUrl = `${baseUrl}?empNo=${empno}`;
    return this.postHttpClient(targetUrl);
  }
  getLockCase(swcApplno: string){
    const baseUrl = 'f01/f01002fn1';
    let targetUrl = `${baseUrl}?swcApplno=${swcApplno}`;
    return this.postHttpClient(targetUrl);
  }

  saveCaseMemo(swcApplno: string, swcCaseMemo: string){
    const baseUrl = 'f01/f01002fn3';
    let targetUrl = `${baseUrl}?swcApplno=${swcApplno}&swcCaseMemo=${swcCaseMemo}`;
    return this.postHttpClient(targetUrl);
  }
}
