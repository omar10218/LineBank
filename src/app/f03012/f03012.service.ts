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
  getRoleFunction(baseUrl: string, roleNo: String): Observable<any> {
    let targetUrl = `${baseUrl}?roleNo=${roleNo}`;
    return this.postHttpClient(targetUrl);
  }
  update(baseUrl: string, data: any, oldCompareTable: string, oldCompareColumn:string, setValueLow:string,setValueHight:string,compareType:string,): any {
    const formdata: FormData = new FormData();
    formdata.append('compareTable', data.compareTable);
    formdata.append('compareColumn', data.compareColumn);
    formdata.append('setValue', data.setValue);
    formdata.append('oldCompareTable', oldCompareTable);
    formdata.append('oldCompareColumn', oldCompareColumn);
    formdata.append('setValueLow', setValueLow);
    formdata.append('setValueHight', setValueHight);
    formdata.append('compareType', compareType);
    return this.saveOrEditMsgString(baseUrl, formdata);
  }

}
