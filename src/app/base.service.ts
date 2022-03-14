import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { CommonRes, Mapping, history } from './interface/base';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(protected httpClient: HttpClient) { }

  private async cleanSession(empNo: string, ticket: string): Promise<Observable<any>> {
    const formData = new FormData();
    formData.append("username", empNo);
    formData.append("ticket", ticket != null ? ticket : "");
    const baseURL = 'logOut';
    return await this.postFormData(baseURL, formData).toPromise();
  }

  public async logOutAction(): Promise<boolean> {
    let empNo: string = this.getEmpNO();
    let ticket: string = this.getToken();
    let isOk: boolean = false;
    await this.cleanSession(empNo, ticket).then((data: any) => {
      isOk = (data.rspCode == '0000');
    });
    return isOk;
  }

  //================上方是登出的function========================================

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getEmpNO(): string {
    return localStorage.getItem('empNo');
  }

  protected postHttpClient(baseUrl: string) {
    return this.httpClient.post<any>(environment.allowOrigin + '/' + baseUrl, null);
  }

  protected getHttpClient(baseUrl: string) {
    return this.httpClient.get<any>(environment.allowOrigin + '/' + baseUrl);
  }

  protected postFormData(baseUrl: string, formdata: FormData) {
    let newFormData : FormData = new FormData();
    formdata.forEach((value, key) => {
      newFormData.append(key, value);
      if (typeof formdata.get(key) != 'object') {
        let data = formdata.get(key);
        if (data != null && String(data).indexOf('#') != -1) {
          let content = String(data).replace(/#/g, '');
          console.log(key + ' -> 有風險故replace: ' + content);
          newFormData.delete(key);
          newFormData.append(key, content);
        }
      }
    });
    return this.httpClient.post<any>(environment.allowOrigin + '/' + baseUrl, newFormData);
  }

  public getSysTypeCode(codeType: string): Observable<Mapping> {
    let targetUrl = `sys/getMappingCode?codeType=${codeType}`;
    return this.postHttpClient(targetUrl);
  }

  protected postJsonObject(baseUrl: string, json: JSON) {
    json['userId'] = this.getEmpNO();
    return this.httpClient.post<any>(environment.allowOrigin + '/' + baseUrl, json);
  }

  //for file download
  protected postGetFile(baseUrl: string, json: JSON) {
    json['userId'] = this.getEmpNO();
    return this.httpClient.post<any>(environment.allowOrigin + '/' + baseUrl, json, { responseType: 'blob' as 'json' });
  }

  private test(json: JSON) {
    Object.entries(json).forEach(([key, value]) => {
      if (value != null && value != '') {
        if (typeof value == 'object') {
          console.log('=================================object start ====================================');
          console.log('開始滾回圈:' + key);
          let content = json[key];
          for (key in content) {
            console.log('=================================content start ====================================');
            let obj = content[key];
            console.log('content: ' + key + ' - ' + obj);
            if (typeof obj == 'object') {
              for (key in obj) {
                if (obj[key] != null && obj[key] != '') {
                  console.log('obj: ' + key + ' - ' + obj[key]);
                  if (String(obj[key]).indexOf('#') != -1) {
                    obj[key] = String(obj[key]).replace(/#/g, '');
                    console.log(key + ' -> 有風險故replace: ' + obj[key]);
                  }
                }
              }
            } else {
              if (String(obj).indexOf('#') != -1) {
                content[key] = obj.replace(/#/g, '');
                console.log(key + ' -> 有風險故replace: ' + content[key]);
              }
            }
            console.log('=================================content end ====================================');
          }
          console.log('=================================object end ====================================');
        } else {
          console.log(key + ' - ' + value);
          if (String(json[key]).indexOf('#') != -1) {
            json[key] = String(json[key]).replace(/#/g, '');
            console.log(key + ' -> 有風險故replace: ' + json[key]);
          }

        }
      }
    });
  }


  //================下方是提供新增或編輯用的function========================================

  private async saveOrEditWithFormData(baseUrl: string, formdata: FormData) {
    return await this.postFormData(baseUrl, formdata).toPromise();
  }

  //Json使用
  private async saveOrEditWithJson(baseUrl: string, json: JSON) {
    json['userId'] = this.getEmpNO();
    return await this.postJsonObject(baseUrl, json).toPromise();
  }

  public async delWithJson(baseUrl: string, json: JSON) {
    json['userId'] = this.getEmpNO();
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

  //true為驗證成功 false為失敗 身分證驗證
  public checkIdNumberIsValid(id: string): boolean {
    const regex: RegExp = /^[A-Z][1,2]\d{8}$/
    if (!regex.test(id)) {
      return false;
    } else {
      const idArray: string[] = id.split('')
      const intRadix = 10
      const TAIWAN_ID_LOCALE_CODE_LIST = [
        1, 10, 19, 28, 37, 46, 55, 64, 39, 73,
        82, 2, 11, 20, 48, 29, 38, 47, 56, 65,
        74, 83, 21, 3, 12, 30
      ]

      const RESIDENT_CERTIFICATE_NUMBER_LIST = [
        '0', '1', '2', '3', '4', '5', '6', '7', '4', '8',
        '9', '0', '1', '2', '5', '3', '4', '5', '6', '7',
        '8', '9', '2', '0', '1', '3'
      ]

      // if is not a number (居留證編號)
      if (isNaN(parseInt(idArray[1], intRadix))) {
        idArray[1] =
          RESIDENT_CERTIFICATE_NUMBER_LIST[id.charCodeAt(1) - 'A'.charCodeAt(0)]
      }

      const result = idArray.reduce(
        (sum: number, n: string, index: number): number => {
          if (index === 0) {
            return (
              sum +
              TAIWAN_ID_LOCALE_CODE_LIST[
              idArray[0].charCodeAt(0) - 'A'.charCodeAt(0)
              ]
            )
          } else if (index === 9) {
            return sum + parseInt(idArray[9], intRadix)
          }
          return sum + parseInt(idArray[index], intRadix) * (9 - index)
        },
        0
      )

      if (result % 10 === 0) {
        return true
      }
      return false
    }
  }

  //案件完成用歷史資料20211230
  public async setHistory(value: history[], transAPname: string, applno: string): Promise<string> {
    const baseUrl = 'f01/childscn2action2';
    const content = []
    let msg = '';
    let jsonObject: any = {};
    for (let index = 0; index < value.length; index++) {
      if ( !(value[index].value == null || value[index].value == '' || value[index].value == 'null' )) {
        content.push(
          {
            applno: applno,
            tableName: value[index].tableName,
            columnName: value[index].valueInfo,
            originalValue: value[index].originalValue,
            currentValue: value[index].value,
            transAPname: transAPname,
          }
        )
      }
    }
    jsonObject['content'] = content;
    return await this.postJsonObject(baseUrl, jsonObject).toPromise();
  }
}
