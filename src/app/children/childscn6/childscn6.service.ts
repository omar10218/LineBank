import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childscn6Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getJCICSearch(json: JSON): Observable<any> {
    const baseUrl = 'f01/childscn6action';
    return this.postJsonObject(baseUrl, json);
  }

  getDate(baseUrl: string, json: JSON): Observable<any> {
    return this.postJsonObject(baseUrl, json);
  }

  getMASTERJCICSearch(json: JSON): Observable<any> {
    const baseUrl = 'f01/childscn6action1';
    return this.postJsonObject(baseUrl, json);
  }
}
