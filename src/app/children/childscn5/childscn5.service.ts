import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childscn5Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getCustomerInfoSearch(formData: FormData): Observable<any>  {
    const baseUrl = 'f01/childscn5';
    return this.postFormData(baseUrl, formData);
  }

  update(baseUrl: string, data: any): any {
    const formdata: FormData = new FormData();
    return this.saveOrEditMsgString(baseUrl, formdata);
  }

}
