import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childscn5Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getCustomerInfoSearch(jsonObject: JSON): Observable<any>  {

    const baseUrl = 'f01/childscn5';

    return this.postJsonObject(baseUrl, jsonObject);
  }

  update(jsonObject: JSON): any {

    const baseUrl = 'f01/childscn5action1';

    return this.postJsonObject(baseUrl, jsonObject);
  }
  insertHistory(jsonObject: JSON): any {

    const baseUrl = 'f01/childscn2';

    return this.postJsonObject(baseUrl, jsonObject);
  }

}
