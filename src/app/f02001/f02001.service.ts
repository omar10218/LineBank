import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F02001Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  dialogData: any;
  getCaseList2(baseUrl: string, pageIndex: number, pageSize: number, formData: FormData): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postFormData(targetUrl, formData);
  }
}
