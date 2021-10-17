import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childscn14Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getImageInfo(jsonObject: JSON): Observable<any>  {
    const baseUrl = 'f01/childscn14action';
    return this.postJsonObject(baseUrl, jsonObject);
  }
}
