import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01003scn11Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getCompare(formData: FormData): Observable<any> {
    const baseUrl = 'f01/f01003scn11';
    return this.postFormData(baseUrl, formData);
  }
}
