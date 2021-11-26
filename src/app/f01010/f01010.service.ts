import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F01010Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getCaseList(jsonObject: JSON): Observable<any> {
    const baseUrl = 'f01/f01010';

    return this.postJsonObject(baseUrl, jsonObject);
  }
  getLockCase(jsonObject: JSON) {
    const baseUrl = 'f01/f01010fn1';
    return this.postJsonObject(baseUrl, jsonObject);
  }
}