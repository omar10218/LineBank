import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childscn19Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getCustomerInfoSearch(formData: FormData): Observable<any> {
    const baseUrl = 'f01/childscn5';
    return this.postFormData(baseUrl, formData);
  }

  getRescanSearch(): Observable<any> {
    const baseUrl = 'f01/childscn19action1';
    return this.postHttpClient(baseUrl);
  }

  addRescan(jsonObject: any): any {
    const baseUrl = 'f01/childscn19action2';
    let targetUrl = `${baseUrl}`;
    return this.saveOrEditMsgString(targetUrl, jsonObject);
  }

  deleteRescanByRowid(ID: string): any {
    const baseUrl = 'f01/childscn19action3';
    let targetUrl = `${baseUrl}?rowID=${ID}`;
    return this.postHttpClient(targetUrl);
  }

  getSmsSearch(applno: string): Observable<any> {
    const baseUrl = 'f01/childscn19action4';
    let targetUrl = `${baseUrl}?applno=${applno}`;
    return this.postHttpClient(targetUrl);
  }

  getSmsContent(codeNo: string): Observable<any> {
    const baseUrl = 'f01/childscn19action5';
    let targetUrl = `${baseUrl}?codeNo=${codeNo}`;
    return this.postHttpClient(targetUrl);
  }

  addSms(jsonObject: any): any {
    const baseUrl = 'f01/childscn19action6';
    let targetUrl = `${baseUrl}`;
    return this.saveOrEditMsgString(targetUrl, jsonObject);
  }
  setrepair(baseUrl: string, json: JSON): Observable<any> {
    return this.postJsonObject(baseUrl, json);
  }

}
