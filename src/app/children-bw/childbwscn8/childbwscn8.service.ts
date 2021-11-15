import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childbwscn8Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getmaterial(json: JSON): Observable<any> {
    const baseUrl = 'f01/childbwScn8';
    return this.postJsonObject(baseUrl, json);
  }


}
