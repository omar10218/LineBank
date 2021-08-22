import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01001scn4Service extends BaseService{

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getCaseStep(formdata: FormData): Observable<any> {
    const baseUrl = 'f01/f01001scn4';
    return this.postFormData(baseUrl, formdata);
  }
}
