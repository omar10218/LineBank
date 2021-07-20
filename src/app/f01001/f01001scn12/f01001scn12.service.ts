import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../base.service';

interface sysCode {
  codE_NO: string;
  codE_DESC: string;

}

@Injectable({
  providedIn: 'root'
})
export class F01001scn12Service extends BaseService {
  Condition!: sysCode[] ;

;


  constructor(protected httpClient: HttpClient) { super(httpClient); }

  private async getRuleCodeOption(value: string): Promise<Observable<any>> {
    let formData = new FormData();
    formData.append('value', value);
    const baseUrl = 'https://localhost:44316/RuleCode/GetRuleCode';
    return await this.formDataApiFor_NET(baseUrl, formData).toPromise();
  }
Get_CODE_TYPE(value: string):Observable<any>
{

  let formData = new FormData();
  formData.append('value', value);
  const baseUrl = 'https://localhost:44316/RuleCode/GetRuleCode';

  return  this.formDataApiFor_NET(baseUrl, formData)
}

getDataSource(baseUrl:string,formdata: FormData): Observable<any>
  {
    return this.formDataApiFor_NET(baseUrl,formdata);
  }


add(baseUrl: string,formdata: FormData) {

  return this.saveOrEditMsgString(baseUrl, formdata);
}

edit(baseUrl: string,formdata: FormData) {

  return this.saveOrEditMsgString(baseUrl, formdata);
}

delete(baseUrl: string,formdata: FormData) {

  return this.saveOrEditMsgString(baseUrl, formdata);
}

}
