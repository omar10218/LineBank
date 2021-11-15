import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childscn22Service extends BaseService {

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  doDss1Search(jsonObject: any): any {
    const baseUrl = 'f01/childscn22';
    let targetUrl = `${baseUrl}`;
    return this.saveOrEditMsgString(targetUrl, jsonObject);
  }
}
