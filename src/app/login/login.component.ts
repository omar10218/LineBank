import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { BnNgIdleService } from 'bn-ng-idle';
import Crypto from "crypto-js";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  no = '';
  pwd = '';
  public key: string;
  public iv: string;
  private bnIdle: BnNgIdleService = null;
  constructor(private router: Router, private loginService: LoginService) { }

  async onClickMe(): Promise<void>  {
    this.bnIdle = new BnNgIdleService();

    //密碼加密
    this.key = Crypto.enc.Utf8.parse('o08YQii9QF5MuzYj');//密钥
    let res = Crypto.DES.encrypt(JSON.stringify(this.pwd), this.key, {
      mode: Crypto.mode.ECB,
      padding: Crypto.pad.Pkcs7
    }).ciphertext.toString();
    console.log(res);

    if (await this.loginService.initData(this.no,res)) {
      localStorage.setItem("empNo", this.no);
      this.router.navigate(['./home'], { queryParams: { empNo: this.no } });
      this.bnIdle.startWatching(60*30).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) { this.routerGoUrl(); }
      });
      sessionStorage.setItem('BusType', JSON.stringify(await this.loginService.getRuleCode('BUS_TYPE')));
      sessionStorage.setItem('ParmType', JSON.stringify(await this.loginService.getRuleCode('PARM_TYPE')));
      sessionStorage.setItem('ParmDim', JSON.stringify(await this.loginService.getRuleCode('PARM_DIM')));
      sessionStorage.setItem('ParmClass', JSON.stringify(await this.loginService.getRuleCode('PARM_CLASS')));
      sessionStorage.setItem('Condition', JSON.stringify(await this.loginService.getCondition()));
      //sessionStorage.setItem('RuleStep', JSON.stringify(await this.loginService.getRuleStep()));
      //sessionStorage.setItem('PolicyId', JSON.stringify(await this.loginService.getPolicyId()));
    } else {
      alert('帳號有誤!');
    }
  }

  private routerGoUrl(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.bnIdle.stopTimer();
    this.router.navigate(['./logOut']);
    alert('閒置過久已登出');

  }
}
