import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childbwscn3Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getJCICSearch(json: JSON): Observable<any> {
    const baseUrl = 'f01/childbwscn3';
    return this.postJsonObject(baseUrl, json);
  }

  getDate(baseUrl: string, json: JSON): Observable<any> {
    return this.postJsonObject(baseUrl, json);
  }

  getMASTERJCICSearch(json: JSON): Observable<any> {
    const baseUrl = 'f01/childbwscn3';
    return this.postJsonObject(baseUrl, json);
  }
  getMASTERJCICList(json: JSON): Observable<any> {
    const baseUrl = 'f01/childbwscn3';
    return this.postJsonObject(baseUrl, json);
  }
}
