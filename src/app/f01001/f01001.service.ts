import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F01001Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getCaseList(pageIndex: number, pageSize: number, empno: string, swcID: string, swcApplno: string): Observable<any> {
    const baseUrl = 'f01/f01001';
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&swcL4EmpNo=${empno}&swcID=${swcID}&swcApplno=${swcApplno}`;
    return this.postHttpClient(targetUrl);
  }
}
