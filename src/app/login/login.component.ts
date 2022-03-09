import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { JSEncrypt } from 'jsencrypt/lib';
import { sha256 } from 'js-sha256';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Childscn6Service } from '../children/childscn6/childscn6.service';



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

  no: string = '';
  pwd: string = '';
  private from: string = environment.from;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService,
    private bnIdle: BnNgIdleService,
    private route: ActivatedRoute,
    private childscn6Service: Childscn6Service,
  ) { }

  private ticket: string;
  ngOnInit() {
    this.no = this.route.snapshot.queryParamMap.get('name');
    this.ticket = this.route.snapshot.queryParamMap.get('ticket');
  }

  ngAfterViewInit() {
    if (this.no != null && this.no.length > 0 && this.ticket != null && this.ticket.length > 0) {
      let element: HTMLElement = document.getElementById('loginBtn') as HTMLElement;
      element.click();
    }
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

    let chkTicket: string = (this.ticket != null && this.ticket.length > 0) ? this.ticket : '';
    if ('local' == this.from || 'rstn' == this.from || 'dev' == this.from) { chkTicket = ''; }
    if (await this.loginService.initData(this.no, this.pwd, chkTicket)) {
      this.router.navigate(['./home'], { queryParams: { empNo: this.no } });
      this.loginService.setBnIdle();
    } else {
      alert('帳號或密碼有誤!');
      if ('uat' == this.from || 'prod' == this.from) {
        window.location.href = environment.allowOrigin + '/sso';
      } else {
        window.location.reload();
      }
    }
  }

  changeImage() {
    this.hide = !this.hide;
    this.imgSrc = this.hide ? this.SrcEyeOff : this.SrcEye;
  }
}
