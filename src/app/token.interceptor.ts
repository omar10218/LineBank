import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public baseService: BaseService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('into intercept')
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.baseService.getToken()}`,
        'Access-Control-Allow-Origin': environment.allowOrigin,
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      }
    });
    return next.handle(request);
  }
}