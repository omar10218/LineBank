import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { JSEncrypt } from 'jsencrypt/lib';
import { sha256 } from 'js-sha256';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jsEncrypt: JSEncrypt = new JSEncrypt({});
  hash: string;
  hide = true;
  SrcEyeOff = "outline_visibility_off_black_48dp";
  SrcEye = "outline_remove_red_eye_black_48dp";
  imgSrc = this.SrcEyeOff;

  no = '';
  pwd = '';
  public key: string;
  public iv: string;
  // private bnIdle: BnNgIdleService = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService,
    private bnIdle: BnNgIdleService
  ) { }

  ngOnInit() {
    //Nick 設定同時只能登入一個帳號
    window.addEventListener("storage", (e) => { //監聽帳號
      // alert('請勿重複登入帳號');
      this.router.navigate(['./']);
    });
  }


  async onClickMe(): Promise<void> {
    // this.bnIdle = new BnNgIdleService();

    //------------------------------------------------------------------
    // let publicKey = this.jsEncrypt.getKey().getPublicBaseKeyB64();
    // let privateKey = this.jsEncrypt.getKey().getPrivateBaseKeyB64();
    // console.log("pub=====>"+publicKey);
    // console.log("pri=====>"+privateKey);
    // this.jsEncrypt.setPublicKey(publicKey);
    // this.hash = sha256('19830330');
    // const enc = this.jsEncrypt.encrypt("19830330");
    // console.log("enc=====>"+enc);
    // this.jsEncrypt.setPrivateKey(privateKey);
    // const dec = this.jsEncrypt.decrypt(enc.toString());
    // console.log("dec=====>"+dec);
    //------------------------------------------------------------------

    if (await this.loginService.initData(this.no, this.pwd)) {
      localStorage.setItem("empNo", this.no);
      this.authService.login();//登入紀錄
      this.router.navigate(['./home'], { queryParams: { empNo: this.no } });
      this.loginService.setBnIdle();//登入閒置登出


      // if (!this.bnIdle['idle$']) {
      //   this.bnIdle.startWatching( 60 * 10 ).subscribe((isTimedOut: boolean) => {
      //     if (isTimedOut) { this.routerGoUrl(); }
      //   });
      // } else {
      //   this.bnIdle.resetTimer();
      // }
      sessionStorage.setItem('BusType', JSON.stringify(await this.loginService.getRuleCode('BUS_TYPE')));
      sessionStorage.setItem('ParmType', JSON.stringify(await this.loginService.getRuleCode('PARM_TYPE')));
      sessionStorage.setItem('ParmDim', JSON.stringify(await this.loginService.getRuleCode('PARM_DIM')));
      sessionStorage.setItem('ParmClass', JSON.stringify(await this.loginService.getRuleCode('PARM_CLASS')));
      sessionStorage.setItem('Condition', JSON.stringify(await this.loginService.getCondition()));

       // 登入時設定值 提供監聽
       window.localStorage.setItem("empNo", this.no);

      //sessionStorage.setItem('RuleStep', JSON.stringify(await this.loginService.getRuleStep()));
      //sessionStorage.setItem('PolicyId', JSON.stringify(await this.loginService.getPolicyId()));
    } else {
      alert('帳號有誤!');
    }
  }

  // private routerGoUrl(): void {
  //   localStorage.clear();
  //   sessionStorage.clear();
  //   this.bnIdle.stopTimer();
  //   this.router.navigate(['./logOut']);
  //   alert('閒置過久已登出');

  // }
  changeImage() {
    this.hide = !this.hide;
    this.imgSrc = this.hide ? this.SrcEyeOff : this.SrcEye;
  }

}
