import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F04001Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }
  
  getSysTypeCode(baseUrl: string): Observable<any> {
    return this.postHttpClient(baseUrl);
  }
  saveFlowStep(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }
}
