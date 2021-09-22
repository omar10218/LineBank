import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03007Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getRoleOption(baseUrl: string): Observable<any> {
    return this.postHttpClient(baseUrl);
  }

  roleFunction(baseUrl: string, json: JSON): Observable<any> {
    return this.postJsonObject(baseUrl, json);
  }
}
