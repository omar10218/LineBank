import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03012Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getComePareDataSetList(baseUrl: string, pageIndex: number, pageSize: number): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(targetUrl);
  }
  saveComePareDataSetList(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }

  update(baseUrl: string, data: any): any {
    const formdata: FormData = new FormData();
    formdata.append('compareTable', data.compareTable);
    formdata.append('compareColumn', data.compareColumn);
    formdata.append('setValue', data.setValue);
    return this.saveOrEditMsgString(baseUrl, formdata);
  }

}
