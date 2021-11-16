import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01002Scn1Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }

  private JCICSource = new Subject<any>();
  JCICSource$ = this.JCICSource.asObservable();
  private JCICAddSource = new Subject<any>();
  JCICAddSource$ = this.JCICAddSource.asObservable();

  setJCICSource(data): void {
    this.JCICSource.next(data);
  }

  setJCICAddSource(data): void {
    this.JCICAddSource.next(data);
  }

  dialogData: any;

  saveOrEditMsgJson(baseUrl: string, json: JSON): any {
    return this.saveOrEditMsgJson(baseUrl, json);
  }

  send(baseUrl: string, json: JSON){
    return this.postJsonObject( baseUrl, json);
  }
}
