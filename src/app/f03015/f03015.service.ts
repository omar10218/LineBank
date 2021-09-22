import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03015Service extends BaseService{

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  // getProxtIncome(baseUrl: string, pageIndex: number, pageSize: number, indcuCode: string, inducLevel1: string, inducLevel2: string): Observable<any> {
  //   let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&reasonKind=${indcuCode}&upReasonCode=${inducLevel1}&level=${inducLevel2}`;
  //   console.log(targetUrl)
  //   return this.postHttpClient(targetUrl);
  // }

  selectCustomer(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }

  getReturn(baseUrl: string, jsonObject:JSON): Observable<any> {
    // const baseUrl = 'f03/f03015';
    let targetUrl = `${baseUrl}`;

    return this.postJsonObject(targetUrl, jsonObject);
  }

  downloadExcel(baseUrl: string, jsonObject:JSON): Observable<any> {
    // const baseUrl = 'f03/f03015';
    let targetUrl = `${baseUrl}`;

    return this.postGetFile(targetUrl, jsonObject);
  }


  insert(baseUrl: string, jsonObject:JSON): Observable<any> {
    // const baseUrl = 'f03/f03015';
    let targetUrl = `${baseUrl}`;

    return this.postJsonObject(targetUrl, jsonObject);
  }

  download(baseUrl: string, file: string | undefined): Observable<Blob> {
    // return this.http.get(`${environment.baseUrl}/files/${file}`, {
    return this.httpClient.get(baseUrl, {
      responseType: 'blob'
    });
  }
}
