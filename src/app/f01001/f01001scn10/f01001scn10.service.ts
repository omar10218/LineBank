import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01001scn10Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getDSSSearch(formData: FormData): Observable<any>  {
    const baseUrl = 'f01/f01001scn10action';
    return this.postFormData(baseUrl, formData);
  }

  getDate(baseUrl: string, formData: FormData): Observable<any> {
    return this.postFormData(baseUrl, formData);
  }
}
