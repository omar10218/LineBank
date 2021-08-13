import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F04001Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  saveFlowStep(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }
  getLockApplno(baseUrl: string, pageIndex: number, pageSize: number, step: string): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&step=${step}`;
    return this.postHttpClient(targetUrl);
  }

}
