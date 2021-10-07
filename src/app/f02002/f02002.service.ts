import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F02002Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getRescanEmpno(baseUrl: string): Observable<any> {
    return this.postHttpClient(baseUrl);
  }

  getData(baseUrl: string, json: JSON): Observable<any> {
    return this.postJsonObject(baseUrl, json);
  }
}
