import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03015Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  selectCustomer(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }

  getReturn(baseUrl: string, jsonObject: JSON): Observable<any> {
    let targetUrl = `${baseUrl}`;

    return this.postJsonObject(targetUrl, jsonObject);
  }

  downloadExcel(baseUrl: string, jsonObject: JSON): Observable<any> {
    let targetUrl = `${baseUrl}`;

    return this.postGetFile(targetUrl, jsonObject);
  }

  uploadExcel(baseUrl: string, formdata: any) {

  }
  insert(baseUrl: string, jsonObject: JSON): Observable<any> {
    let targetUrl = `${baseUrl}`;

    return this.postJsonObject(targetUrl, jsonObject);
  }

  postFile(fileToUpload: File): void {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    // return this.httpClient
    //   .post(endpoint, formData, { headers: '' })
    //   .map(() => { return true; })
    //   .catch((e) => this.handleError(e));
  }

}
