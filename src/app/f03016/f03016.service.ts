import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class F03016Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getTableDataSetList( ): Observable<any> {
    const baseUrl ='f03/f03016'
    // let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(baseUrl);
  }
  getCustomerInfoSearch(formData: FormData): Observable<any>  {
    const baseUrl = 'f03/f03016';
    return this.postFormData(baseUrl, formData);
  }
  saveComePareDataSetList(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }
  update(baseUrl: string, data: any): any {
    const formdata: FormData = new FormData();
    formdata.append('DssJcicSet', data.DssJcicSet);
    formdata.append('BasicLimit', data.BasicLimit);
    formdata.append('IsJcic', data.IsJcic);
    return this.saveOrEditMsgString(baseUrl, formdata);
  }
}
