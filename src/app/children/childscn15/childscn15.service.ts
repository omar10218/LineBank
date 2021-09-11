import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Childscn15Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  //取Table資料
  getReason(baseUrl: string, applno: string) {
    let targetUrl = `${baseUrl}?applno=${applno}`;
    return this.postHttpClient(targetUrl);
  }

  //儲存Table資料
  public async saveReason(baseUrl: string,applno: string, formdata: FormData): Promise<Observable<any>> {
    let targetUrl = `${baseUrl}?applno=${applno}`;
    return await this.postFormData(targetUrl, formdata).toPromise();
  }


}
