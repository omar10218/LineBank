import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Childscn14Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  // getImageInfo(jsonObject: JSON): Observable<any>  {
  //   const baseUrl = 'f01/childscn14action';
  //   return this.postJsonObject(baseUrl, jsonObject);
  // }

  //取Table資料
  getImageInfo(baseUrl: string, jsonObject: JSON) {
    // let jsonObject: any = {};
    // jsonObject['applno'] = applno;
    return this.postJsonObject(baseUrl, jsonObject);
  }

  //上傳圖檔
  // uploadFile(baseUrl: string, fileToUpload: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
  //   formData.append('', )
  //   return this.httpClient.post<any>(environment.allowOrigin + '/' + baseUrl, formData);
  // }

  public async childscn14Action(baseUrl: string, formData: FormData): Promise<Observable<any>> {
    return await this.postFormData(baseUrl, formData).toPromise();
  }

}
