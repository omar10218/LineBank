import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class F01004scn14Service extends BaseService {
  constructor(protected httpClient: HttpClient) { super(httpClient); }
}
