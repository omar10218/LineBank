import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03005Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  dialogData: any;

  getAdrCodeList(baseUrl: string, pageIndex: number, pageSize: number, adrType: string, upReasonCode: string, level: string): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&reasonKind=${adrType}&upReasonCode=${upReasonCode}&level=${level}`;
    return this.postHttpClient(targetUrl);
  }

  addOrEditAdrCodeSet(baseUrl: string, data: any): any {
    const formdata: FormData = new FormData();
    formdata.append('reasonKind', data.reasonKind);
    formdata.append('upReasonCode', data.upReasonCode);
    formdata.append('reasonCode', data.reasonCode);
    formdata.append('reasonDesc', data.reasonDesc);
    formdata.append('reasonSort', data.reasonSort);
    formdata.append('reasonFlag', data.reasonFlag);
    formdata.append('reasonLevel', data.reasonLevel);
    return this.saveOrEditMsgString(baseUrl, formdata);
  }
}
