import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';


@Injectable({
  providedIn: 'root'
})
export class Childscn13Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getWebInfo( baseUrl: string, json: JSON ): Observable<any> {
    return this.postJsonObject(baseUrl, json);
  }

  public async childscn13Action(baseUrl: string, formdata: FormData): Promise<Observable<any>> {
    return await this.postFormData(baseUrl, formdata).toPromise();
  }
}
