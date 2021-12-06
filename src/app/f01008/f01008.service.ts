import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F01008Service extends BaseService {

  constructor(protected httpClient: HttpClient,) { super(httpClient); }

  private JCICSource = new Subject<any>();
  JCICSource$ = this.JCICSource.asObservable();
  private JCICAddSource = new Subject<any>();
  JCICAddSource$ = this.JCICAddSource.asObservable();

  setJCICSource(data): void {
    this.JCICSource.next(data);
  }

  setJCICAddSource(data): void {
    console.log('我進來了2');
    console.log(data)
    this.JCICAddSource.next(data);
  }

  getEmpNo(jsonObject: JSON): Observable<any> {
    const baseUrl = 'f01/f01008fn2';

    return this.postJsonObject(baseUrl, jsonObject);
  }

  getLockCase(jsonObject: JSON) {
    const baseUrl = 'f01/f01008fn1';

    return this.postJsonObject(baseUrl, jsonObject);
  }

  getCaseList(jsonObject: JSON): Observable<any> {
    const baseUrl = 'f01/f01008';

    return this.postJsonObject(baseUrl, jsonObject);
  }

  f01008scn2(jsonObject: JSON,url:string): Observable<any> {

    return  this.postJsonObject(url, jsonObject);
  }

}
