import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F01007Service  extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getCaseList(jsonObject: JSON): Observable<any> {
    const baseUrl = 'f01/f01007';

    return this.postJsonObject(baseUrl, jsonObject);
  }
  getEmpNo(jsonObject: JSON): Observable<any> {
    const baseUrl = 'f01/f01007fn2';

    return this.postJsonObject(baseUrl, jsonObject);
  }
  getLockCase(jsonObject: JSON) {
    const baseUrl = 'f01/f01007fn1';

    return this.postJsonObject(baseUrl, jsonObject);
  }

  saveCaseMemo(jsonObject: JSON) {
    const baseUrl = 'f01/f01007fn3';
    return this.postJsonObject(baseUrl, jsonObject);
  }


}
