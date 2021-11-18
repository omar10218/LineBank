import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { OptionsCode } from '../interface/base';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';

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

  setBnIdle(): void {
    if (!this.bnIdle['idle$']) {
      this.bnIdle.startWatching( 60 * 30 ).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) { this.routerGoUrl(); }
      });
    } else {
      this.bnIdle.resetTimer();
    }
  }

  private routerGoUrl(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.bnIdle.stopTimer();
    this.router.navigate(['./logOut']);
    alert('閒置過久已登出');
  }

  private async checkEmpNoPromise(empNo: string, empPwd: string): Promise<Observable<any>> {
    const formData = new FormData();
    formData.append("username", empNo);
    formData.append("password", empPwd);
    const baseURL = 'login';
    return await this.postFormData(baseURL, formData).toPromise();
  }

  public async initData(empNo: string, empPwd: string): Promise<boolean> {
    let isOk: boolean = false;
    let tokenStr: string = '';
    await this.checkEmpNoPromise(empNo, empPwd).then((data: any) => {
      if (data.rspCode == '0000') { tokenStr = data.rspBody.token; }
      isOk = data.rspCode == '0000';
    });
    localStorage.setItem("token", tokenStr);
    return isOk;
  }

  private async getRuleCodeOption(value: string): Promise<Observable<any>> {
    let formData = new FormData();
    formData.append('value', value);
    const baseUrl = 'http://192.168.0.62:9082/RuleCode/GetRuleCode';
    return await this.formDataApiFor_NET(baseUrl, formData).toPromise();
  }

  public async getRuleCode(value: string): Promise<OptionsCode[]> {
    this.RuleCode = [];
    await this.getRuleCodeOption(value).then((data: any) => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['codeNo'];
        const desc = jsonObj['codeDesc'];
        this.RuleCode.push({ value: codeNo, viewValue: desc });
      }
    });
    return this.RuleCode;
  }

  private async getConditionOption(): Promise<Observable<any>> {
    let formData = new FormData();
    const baseUrl = 'http://192.168.0.62:9082/RuleParamCondition/GetCondition';
    return await this.formDataApiFor_NET(baseUrl, formData).toPromise();
  }

  public async getCondition(): Promise<OptionsCode[]> {
    this.Condition = [];
    await this.getConditionOption().then((data: any) => {
      for (const jsonObj of data.rspBody) {
        const codeNo = jsonObj['conditionId'];
        const desc = jsonObj['conditionName'];
        this.Condition.push({ value: codeNo, viewValue: desc });
      }
    });
    return this.Condition;
  }
}
