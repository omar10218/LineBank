import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class Childscn8Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }


   //取徵信照會Table/新增/編輯/刪除
   postJsonObject_CALLOUT(baseUrl: string, json: JSON){
    return this.postJsonObject(baseUrl, json);
  }


  //編輯
  public async EditCALLOUT(baseUrl: string, data: any): Promise<Observable<any>> {
    const formdata: FormData = new FormData();
    baseUrl = `${baseUrl}?rowID=${data.ID}`;
    formdata.append('conTel', data.con_TEL);
    formdata.append('phone', data.phone);
    formdata.append('conTarget', data.con_TARGET);
    formdata.append('custType', data.cust_TYPE);
    formdata.append('conMemo', data.con_MEMO);
    formdata.append('note', data.note);

    return await this.postFormData(baseUrl, formdata).toPromise();
  }

  // //新增
  // AddCALLOUT(baseUrl: string, data: any): Promise<Observable<any>> {
  //   const formdata: FormData = new FormData();
  //   formdata.append('applno', data.applno)
  //   formdata.append('conTel', data.con_TEL);
  //   formdata.append('phone', data.phone);
  //   formdata.append('conTarget', data.con_TARGET);
  //   formdata.append('custType', data.cust_TYPE);
  //   formdata.append('conMemo', data.con_MEMO);
  //   formdata.append('note', data.note);

  //   return this.postFormData(baseUrl,formdata).toPromise();
  // }

  //刪除
  DeleteCALLOUT(baseUrl: string, ID: string): Observable<any> {
    baseUrl = `${baseUrl}?rowID=${ID}`;
    return this.postHttpClient(baseUrl);
  }


}
