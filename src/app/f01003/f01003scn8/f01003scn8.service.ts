import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01003scn8Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  saveDssCallout(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }

  getCALLOUT(baseUrl: string, pageIndex: number, pageSize: number,applno: string){
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}&applno=${applno}`;
    return this.postHttpClient(targetUrl);
  }


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

  AddCALLOUT(baseUrl: string, data: any): Promise<Observable<any>> {
    const formdata: FormData = new FormData();
    formdata.append('applno', data.applno)
    formdata.append('conTel', data.con_TEL);
    formdata.append('phone', data.phone);
    formdata.append('conTarget', data.con_TARGET);
    formdata.append('custType', data.cust_TYPE);
    formdata.append('conMemo', data.con_MEMO);
    formdata.append('note', data.note);

    return this.postFormData(baseUrl,formdata).toPromise();
  }

  DeleteCALLOUT(baseUrl: string, ID: string): Observable<any> {
    baseUrl = `${baseUrl}?rowID=${ID}`;
    return this.postHttpClient(baseUrl);
  }


}
