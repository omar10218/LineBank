import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01002scn2Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  getTransLog(baseUrl: string, pageIndex: number, pageSize: number){
    let targetUrl = `${baseUrl}?page=${pageIndex + 1}&per_page=${pageSize}`;
    return this.postHttpClient(targetUrl);
  }
}
