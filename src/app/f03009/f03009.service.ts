import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03009Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getTvFunction(baseUrl: string, tvNo: String): Observable<any> {
    let targetUrl = `${baseUrl}?tvNo=${tvNo}`;
    return this.postHttpClient(targetUrl);
  }

  saveTvFunction(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }
}
