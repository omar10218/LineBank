import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class F03013Service extends BaseService{

  constructor(protected httpClient: HttpClient) { super(httpClient); }

  createCalendar(year: number){
    const baseUrl = 'f03/f03013action1';
    let targetUrl = `${baseUrl}?year=${year}`;
    return this.postHttpClient(targetUrl);
  }
  queryIsWorkDay(year: number, month: number){
    const baseUrl = 'f03/f03013action2';
    let targetUrl = `${baseUrl}?year=${year}&month=${month}`;
    return this.postHttpClient(targetUrl);
  }
  updateWorkingDate(wDate: string, isWork: string){
    const baseUrl = 'f03/f03013action3';
    let targetUrl = `${baseUrl}?wDate=${wDate}&isWork=${isWork}`;
    return this.postHttpClient(targetUrl);
  }
}
