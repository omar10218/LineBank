import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childscn1Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getImfornation(baseUrl: string, json: JSON){
    return this.postJsonObject(baseUrl, json);
  }

  saveCreditmemo(baseUrl: string, json: JSON): any {
    return this.saveOrEditMsgJson(baseUrl, json);
  }

  getDate_Json(baseUrl: string,  json: JSON): Observable<any> {
    return this.postJsonObject(baseUrl, json);
  }

  getInterestBase(baseUrl: string, json: JSON): any {
    return this.saveOrEditMsgJson(baseUrl, json);
  }

  insertHistory(baseUrl: string, json: JSON){
    return this.postJsonObject(baseUrl, json);
  }
}
