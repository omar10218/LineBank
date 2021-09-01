import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01002scn9Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getCoreCusInfo(formData: FormData): Observable<any>  {
    const baseUrl = 'f01/f01002scn9action';
    return this.postFormData(baseUrl, formData);
  }

  getDate(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }
}
