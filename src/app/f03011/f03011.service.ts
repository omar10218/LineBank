import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F03011Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  saveDssCallout(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }

  getDssCallout(baseUrl: string, pageIndex: number, pageSize: number): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(targetUrl);
  }

  update(baseUrl: string, data: any, oldtvNo: string, oldscklv:string, oldcalv:string): any {
    const formdata: FormData = new FormData();
    formdata.append('tvNo', data.tvNo);
    formdata.append('scklv', data.scklv);
    formdata.append('calv', data.calv);
    formdata.append('oldtvNo', oldtvNo);
    formdata.append('oldscklv', oldscklv);
    formdata.append('oldcalv', oldcalv);
    return this.saveOrEditMsgString(baseUrl, formdata);
  }
}
