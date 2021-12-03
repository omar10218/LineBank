import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';


@Injectable({
  providedIn: 'root'
})
export class F01008scn4Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  postJson(baseUrl: string,  json: JSON): Observable<any> {
    return this.postJsonObject(baseUrl, json);
  }

}
