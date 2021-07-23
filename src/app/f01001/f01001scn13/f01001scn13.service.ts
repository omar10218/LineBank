import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';


@Injectable({
  providedIn: 'root'
})
export class F01001scn13Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getWebInfo(formdata: FormData): Observable<any> {
    const baseUrl = 'f01/f01001scn13';
    return this.postFormData(baseUrl, formdata);
  }

  public async f01001scn13Action(baseUrl: string, formdata: FormData): Promise<Observable<any>> {
    return await this.postFormData(baseUrl, formdata).toPromise();
  }
}
