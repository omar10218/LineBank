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
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getInComeFunction(formdata: FormData): Observable<any> {
    const baseUrl = 'f01/f01001scn12';
    return this.postFormData(baseUrl, formdata);
  }

  public async f01001scn12Action(baseUrl: string, formdata: FormData): Promise<Observable<any>> {
    return await this.postFormData(baseUrl, formdata).toPromise();
  }

}
