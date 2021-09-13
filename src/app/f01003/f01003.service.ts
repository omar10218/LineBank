import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F01003Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getCaseList(jsonObject:JSON): Observable<any> {
    const baseUrl = 'f01/f01003';
    let targetUrl = `${baseUrl}`;

    return this.postJsonObject(targetUrl, jsonObject);
  }
}
