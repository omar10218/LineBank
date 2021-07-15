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

  getAdrCodeList(baseUrl: string, pageIndex: number, pageSize: number, adrType: string, adType: string): Observable<any> {
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&adrType=${adrType}&adType=${adType}`;
    return this.postHttpClient(targetUrl);
  }

  addOrEditAdrCodeSet(baseUrl: string, data: any): any {
    const formdata: FormData = new FormData();
    formdata.append('reasonKind', data.reasonKind);
    formdata.append('adType', data.adType);
    formdata.append('reasonCode', data.reasonCode);
    formdata.append('reasonDesc', data.reasonDesc);
    formdata.append('reasonSort', data.reasonSort);
    formdata.append('reasonFlag', data.reasonFlag);
    return this.saveOrEditMsgString(baseUrl, formdata);
  }
}
