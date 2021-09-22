import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { CommonRes, Mapping } from './interface/base';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected httpClient: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  protected postHttpClient(baseUrl: string) {
    return this.httpClient.post<any>(environment.allowOrigin + '/' + baseUrl, null);
  }

  protected getHttpClient(baseUrl: string) {
    return this.httpClient.get<any>(environment.allowOrigin + '/' + baseUrl);
  }

  protected postFormData(baseUrl: string, formdata: FormData) {
    return this.httpClient.post<any>(environment.allowOrigin + '/' + baseUrl, formdata);
  }

  public getSysTypeCode(codeType: string): Observable<Mapping> {
    let targetUrl = `sys/getMappingCode?codeType=${codeType}`;
    return this.postHttpClient(targetUrl);
  }

  public getLine(url: string){
    return this.postHttpClient(url);
  }

  protected formDataApiFor_NET(baseUrl: string, formdata: FormData) {
    return this.httpClient.post<any>(baseUrl, formdata);
  }

  protected postJsonObject(baseUrl: string, json: JSON) {
    return this.httpClient.post<any>(environment.allowOrigin + '/' + baseUrl, json);
  }

  //================下方是提供新增或編輯用的function========================================

  private async saveOrEditWithFormData(baseUrl: string, formdata: FormData) {
    return await this.postFormData(baseUrl, formdata).toPromise();
  }

  //Json使用
  private async saveOrEditWithJson(baseUrl: string, json: JSON) {
    return await this.postJsonObject(baseUrl, json).toPromise();
  }

  private async getMsgStr(rspCode: string, rspMsg: string): Promise<string> {
    let msgStr: string = "";

    // if (rspCode === '0000' && rspMsg === '成功') { msgStr = '儲存成功！'; }
    // if (rspCode === '9999' && rspMsg === '失敗') { msgStr = '儲存失敗！'; }
    // if (rspCode === '0001' && rspMsg === '資料重複無法新增') { msgStr = '資料重複無法新增'; }
    return rspMsg;
  }

  public async saveOrEditMsgString(baseUrl: string, formdata: FormData): Promise<string> {
    let rspCode: any;
    let rspMsg: any;
    await this.saveOrEditWithFormData(baseUrl, formdata).then((data: CommonRes) => {
      rspCode = data.rspCode;
      rspMsg = data.rspMsg;
    })
    .catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    return await this.getMsgStr(rspCode, rspMsg);
  }

  //Json使用
  public async saveOrEditMsgJson(baseUrl: string, json: JSON): Promise<string> {
    let rspCode: any;
    let rspMsg: any;
    await this.saveOrEditWithJson(baseUrl, json).then((data: CommonRes) => {
      rspCode = data.rspCode;
      rspMsg = data.rspMsg;
    })
    .catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    return await this.getMsgStr(rspCode, rspMsg);
  }
}
