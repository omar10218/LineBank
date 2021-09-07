import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F03010Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  //新增/刪除
  saveDssCallout(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }

  //取話術Table
  getSpeaking(baseUrl: string, pageIndex: number, pageSize: number){
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(targetUrl);
  }

  //編輯
  saveSpeaking(baseUrl: string, data: any): any {
    const formdata: FormData = new FormData();
    formdata.append('speakingAbbreviation', data.speakingAbbreviation);
    formdata.append('speakingContent', data.speakingContent);
    formdata.append('stopFlag', data.stopFlag);
    return this.saveOrEditMsgString(baseUrl, formdata);
  }
}
