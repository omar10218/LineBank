import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01001scn7Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

//取Table資料
  getAML_FDS_CSS(baseUrl: string,applno: string){
    let targetUrl = `${baseUrl}?applno=${applno}`;
    return this.postHttpClient(targetUrl);
  }


}
