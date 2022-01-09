import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { OptionsCode } from '../interface/base';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  RuleCode: OptionsCode[] = null;
  Condition: OptionsCode[] = null;

  constructor(
    protected httpClient: HttpClient,
    private bnIdle: BnNgIdleService,
    private router: Router,
  ) { super(httpClient); }

  private routerGoUrl(): void {
    this.bnIdle.stopTimer();
    window.localStorage.clear();
    window.sessionStorage.clear();
    let form: string = environment.from;
    if ('stg' == form || 'uat' == form || 'prod' == form) {
      this.router.navigate(['./logOut']).then(async () => {
        window.location.href = 'https://sso.lbtwsys.com:8443/cas/logout?service=' + environment.allowOrigin + '/sso';
      });
    } else {
      this.router.navigate(['./logOut']).then(() => {
        window.location.reload();
      });
    }
  }

  // 登入閒置登出
  public setBnIdle(): void {
    if (!this.bnIdle['idle$']) {
      this.bnIdle.startWatching( 60 * 30 ).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) { this.routerGoUrl(); }
      });
    } else {
      this.bnIdle.resetTimer();
    }
  }

  private async checkEmpNoPromise(empNo: string, empPwd: string, ticket: string): Promise<Observable<any>> {
    const formData = new FormData();
    formData.append("username", empNo);
    formData.append("password", empPwd);
    formData.append("ticket", ticket);
    const baseURL = 'login';
    return await this.postFormData(baseURL, formData).toPromise();
  }

  public async initData(empNo: string, empPwd: string, ticket: string): Promise<boolean> {
    let isOk: boolean = false;
    let tokenStr: string = '';
    await this.checkEmpNoPromise(empNo, empPwd, ticket).then((data: any) => {
      if (data.rspCode == '0000') { tokenStr = data.rspBody.token; }
      isOk = data.rspCode == '0000';
    });
    localStorage.setItem("token", tokenStr);
    return isOk;
  }
}
