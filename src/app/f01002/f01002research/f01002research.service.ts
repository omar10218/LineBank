import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01002ReSrearchService extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
 
  reSearch(url: string, jsonObject:JSON){
    return this.postJsonObject(url, jsonObject);
  }
}
