import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';


@Injectable({
  providedIn: 'root'
})
export class F01001scn13Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
  getWebInfo(): Observable<any> {
    const baseUrl = 'f01/f01001scn13';
    return this.postHttpClient(baseUrl);
  }

  uploadFile(baseUrl: string, formdata: FormData): Observable<any> {
    return this.postFormData(baseUrl, formdata);
  }
}
