import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01002BlockListService extends BaseService{

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  gettable(baseUrl: string, applno: string, json:JSON) {
    let targetUrl = `${baseUrl}?applno=${applno}`;
    return this.postJsonObject(targetUrl, json);
  }
  oneseve(baseUrl: string,json:JSON) {
  let targetUrl = baseUrl;
  return this.postJsonObject(targetUrl,json);
  }
  
}
