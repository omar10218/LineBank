import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childscn11Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getCompare(json: JSON): Observable<any> {
    const baseUrl = 'f01/childscn11action1';
    return this.postJsonObject(baseUrl, json);
  }
}
