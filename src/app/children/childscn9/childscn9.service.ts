import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childscn9Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getData(baseUrl: string, jsonObject: JSON): Observable<any>  {
    return this.postJsonObject(baseUrl, jsonObject);
  }
  getBlockingCode(jsonObject: JSON): Observable<any>  {
    const baseUrl = 'f01/childscn9action3';
    return this.postJsonObject(baseUrl, jsonObject);
  }

  getDate(baseUrl: string, jsonObject: JSON): Observable<any> {
    return this.postJsonObject(baseUrl, jsonObject);
  }
  getReturn(baseUrl: string, jsonObject: JSON): Observable<any> {
    let targetUrl = `${baseUrl}`;

    return this.postJsonObject(targetUrl, jsonObject);
  }
}
