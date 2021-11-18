import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F01008Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getEmpNo(jsonObject: JSON): Observable<any> {
    const baseUrl = 'f01/f01008fn2';

    return this.postJsonObject(baseUrl, jsonObject);
  }

  getLockCase(jsonObject: JSON) {
    const baseUrl = 'f01/f01008fn1';

    return this.postJsonObject(baseUrl, jsonObject);
  }

  getCaseList(jsonObject: JSON): Observable<any> {
    const baseUrl = 'f01/f01008';

    return this.postJsonObject(baseUrl, jsonObject);
  }
}
