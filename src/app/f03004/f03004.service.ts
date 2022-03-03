import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03004Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  dialogData: any;

  getMappingCodeList(baseUrl: string, json: JSON): Observable<any> {
    return this.postJsonObject(baseUrl, json);
  }

  addOrEditSystemCodeSet(baseUrl: string, data: any): any {
    let jsonObeject: any = {};
    jsonObeject['codeType'] = data.codeType;
    jsonObeject['codeNo'] = data.codeNo;
    jsonObeject['codeDesc'] = data.codeDesc;
    jsonObeject['codeSort'] = data.codeSort;

    let tagStr: string = data.codeTag;
    let codeTag: string = tagStr.replace('://','你').replace(/\./g,'我').replace(/\//g,'他').replace(':','它').replace('?','問').replace(/=/g,'等');

    jsonObeject['codeTag'] = codeTag;
    jsonObeject['codeFlag'] = data.codeFlag;
    return this.saveOrEditMsgJson(baseUrl, jsonObeject);
  }

}
