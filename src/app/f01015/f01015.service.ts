import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class F01015Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }
  
  getReturn(baseUrl: string, jsonObject: JSON): Observable<any> {
    let targetUrl = `${baseUrl}`;

    return this.postJsonObject(targetUrl, jsonObject);
  }
  
  getImpertmentParameter(jsonObject:JSON): Observable<any> {
    const baseUrl = 'f01/f01015';
    let targetUrl = `${baseUrl}`;
    return this.postJsonObject(targetUrl, jsonObject)
  }
}
