import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childbwscn4Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getCoreCusInfo(jsonObject: JSON): Observable<any>  {
    const baseUrl = '/f01/childBwScn4action';
    return this.postJsonObject(baseUrl, jsonObject);
  }

  getDate(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }
}
