import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';



@Injectable({
  providedIn: 'root'
})
export class F01016Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getReturn(baseUrl: string, jsonObject: JSON): Observable<any> {
    let targetUrl = `${baseUrl}`;

    return this.postJsonObject(targetUrl, jsonObject);
  }

  getImpertmentParameter(jsonObject:JSON): Observable<any> {
    const baseUrl = 'f01/f01016';
    let targetUrl = `${baseUrl}`;
    return this.postJsonObject(targetUrl, jsonObject)
  }
}
