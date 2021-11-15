import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Data } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Childbwscn3Service } from '../childbwscn3/childbwscn3.service';
import { ChildrenService } from '../../children/children.service';
import { NgxWatermarkOptions } from 'ngx-watermark';
import { DatePipe } from '@angular/common';

//Jay 複審行外資訊
@Component({
  selector: 'app-childbwscn3',
  templateUrl: './childbwscn3.component.html',
  styleUrls: ['./childbwscn3.component.css','../../../assets/css/child.css']
})
// '../../../../assets/css/child.css'
export class Childbwscn3Component implements OnInit , AfterViewInit {

  constructor(
    private childbwscn3Service: Childbwscn3Service,
    private router: Router,
    public childService: ChildrenService
  ) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.getJcicList()
    //     this.getJcicMultiple();
    //     this.setBooleanFalse();
    //     this.list = [];

    //     // when onSameUrlNavigation: 'reload'，會重新觸發 router event
    //   }
    // });
  }

  options: NgxWatermarkOptions = {
    text: '盜用必追究',
    width: 350,
    height: 300,
    fontFamily: 'Kanit',
    color: '#999',
    alpha: .7,
    degree: -45,
    fontSize: '20px',
  };

  AAS003: any[] = [];
  BAI001: any[] = [];
  JAS002: any[] = [];
  // JAS002: any[] = [];
  // BAM307: any[] = [];
  // ACI001: any[] = [];
  // BAI001: any[] = [];
  // KRI001: any[] = [];
  // BAI004: any[] = [];
  // KRI002: any[] = [];
  // BAS008: any[] = [];
  // BAS006: any[] = [];
  // STS007: any[] = [];

  list: any[] = [];

hideJCICMASTER = false;
hideJCIC = false;
hideBAM421= false;
hideBAM101= false;
hideKRM048= false;
hideKRM046= false;
hideSTM022= false;
hideSTM008= false;
hideSTM025= false;
hideVAM106= false;
hideVAM107= false;
hideVAM108= false;
hideVAM201= false;
hideBAM501= false;
hideBAM502= false;
hideBAM504= false;
hideBAM505= false;
hideBAM029= false;
hideBAM305= false;
hideBAM306= false;
hideBAM307= false;
hideBAM011= false;
hideBAM070= false;
hideBAM031= false;

  private applno: string;
  private cuid: string;

  // private queryDate: string = '2021-10-25 11:52:57.301' // 現在時間
  // private queryDate: string  // 現在時間
  listSource: any = []
	total = 1
	pageIndex = 1
	pageSize = 50
  index: any

  BAM421Source: readonly Data[] = [];
  total1 = 1;
  pageIndex1 = 1;
  pageSize1 = 50;

  BAM101Source: readonly Data[] = [];
  total2 = 1;
  pageIndex2 = 1;
  pageSize2 = 50;

  KRM048Source: readonly Data[] = [];
  total3 = 1;
  pageIndex3 = 1;
  pageSize3 = 50;

  KRM046Source: readonly Data[] = [];
  total4 = 1;
  pageIndex4 = 1;
  pageSize4 = 50;

  JAS002Source: readonly Data[] = [];
  total5 = 1;
  pageIndex5 = 1;
  pageSize5 = 50;

  STM022Source: readonly Data[] = [];
  total6 = 1;
  pageIndex6 = 1;
  pageSize6 = 50;

  STM008Source: readonly Data[] = [];
  total7 = 1;
  pageIndex7 = 1;
  pageSize7 = 50;

  STM025Source: readonly Data[] = [];
  total8 = 1;
  pageIndex8 = 1;
  pageSize8 = 50;

  VAM106Source: readonly Data[] = [];
  total9 = 1;
  pageIndex9 = 1;
  pageSize9 = 50;

  VAM107Source: readonly Data[] = [];
  total10 = 1;
  pageIndex10 = 1;
  pageSize10 = 50;

  VAM108Source: readonly Data[] = [];
  total11 = 1;
  pageIndex11 = 1;
  pageSize11 = 50;

  VAM201Source: readonly Data[] = [];
  total12 = 1;
  pageIndex12 = 1;
  pageSize12 = 50;

  BAM501Source: readonly Data[] = [];
  total13 = 1;
  pageIndex13 = 1;
  pageSize13 = 50;

  BAM502Source: readonly Data[] = [];
  total14 = 1;
  pageIndex14 = 1;
  pageSize14 = 50;

  BAM504Source: readonly Data[] = [];
  total15 = 1;
  pageIndex15 = 1;
  pageSize15 = 50;

  BAM505Source: readonly Data[] = [];
  total116 = 1;
  pageIndex16 = 1;
  pageSize16 = 50;

  BAM029Source: readonly Data[] = [];
  total17 = 1;
  pageIndex17 = 1;
  pageSize17 = 50;

  BAM305Source: readonly Data[] = [];
  total118 = 1;
  pageIndex18 = 1;
  pageSize18 = 50;

  BAM306Source: readonly Data[] = [];
  total19 = 1;
  pageIndex19 = 1;
  pageSize19 = 50;

  BAM307Source: readonly Data[] = [];
  total20 = 1;
  pageIndex20 = 1;
  pageSize20 = 50;

  BAM011Source: readonly Data[] = [];
  total21 = 1;
  pageIndex21 = 1;
  pageSize21 = 50;

  BAM070Source: readonly Data[] = [];
  total22 = 1;
  pageIndex22 = 1;
  pageSize22 = 50;

  BAM031Source: readonly Data[] = [];
  total23 = 1;
  pageIndex23 = 1;
  pageSize23 = 50;



  // DAM001Source: readonly Data[] = [];
  // total2 = 1;
  // pageIndex2 = 1;
  // pageSize2 = 50;

  // BAM061Source: readonly Data[] = [];
  // total3 = 1;
  // pageIndex3 = 1;
  // pageSize3 = 50;

  // KRM043Source: readonly Data[] = [];
  // total4 = 1;
  // pageIndex4 = 1;
  // pageSize4 = 50;

  // BAM062Source: readonly Data[] = [];
  // total5 = 1;
  // pageIndex5 = 1;
  // pageSize5 = 50;

  // VAM020Source: readonly Data[] = [];
  // total6 = 1;
  // pageIndex6 = 1;
  // pageSize6 = 50;

  // VAM201Source: readonly Data[] = [];
  // total7 = 1;
  // pageIndex7 = 1;
  // pageSize7 = 50;

  // VAM106Source: readonly Data[] = [];
  // total8 = 1;
  // pageIndex8 = 1;
  // pageSize8 = 50;

  // VAM107Source: readonly Data[] = [];
  // total9 = 1;
  // pageIndex9 = 1;
  // pageSize9 = 50;

  // VAM108Source: readonly Data[] = [];
  // total10 = 1;
  // pageIndex10 = 1;
  // pageSize10 = 50;

  // BAM029Source: readonly Data[] = [];
  // total11 = 1;
  // pageIndex11 = 1;
  // pageSize11 = 50;

  // BAM501Source: readonly Data[] = [];
  // total12 = 1;
  // pageIndex12 = 1;
  // pageSize12 = 50;

  // BAM502Source: readonly Data[] = [];
  // total13 = 1;
  // pageIndex13 = 1;
  // pageSize13 = 50;

  // BAM504Source: readonly Data[] = [];
  // total14 = 1;
  // pageIndex14 = 1;
  // pageSize14 = 50;

  // BAM505Source: readonly Data[] = [];
  // total15 = 1;
  // pageIndex15 = 1;
  // pageSize15 = 50;

  // BAM032Source: readonly Data[] = [];
  // total16 = 1;
  // pageIndex16 = 1;
  // pageSize16 = 50;

  // BAM011Source: readonly Data[] = [];
  // total17 = 1;
  // pageIndex17 = 1;
  // pageSize17 = 50;

  // BAM067Source: readonly Data[] = [];
  // total18 = 1;
  // pageIndex18 = 1;
  // pageSize18 = 50;

  // BAM070Source: readonly Data[] = [];
  // total19 = 1;
  // pageIndex19 = 1;
  // pageSize19 = 50;

  // BAM101Source: readonly Data[] = [];
  // total20 = 1;
  // pageIndex20 = 1;
  // pageSize20 = 50;

  // BAM421Source: readonly Data[] = [];
  // total21 = 1;
  // pageIndex21 = 1;
  // pageSize21 = 50;

  // BAM305Source: readonly Data[] = [];
  // total22 = 1;
  // pageIndex22 = 1;
  // pageSize22 = 50;

  // BAM306Source: readonly Data[] = [];
  // total23 = 1;
  // pageIndex23 = 1;
  // pageSize23 = 50;

  // BAM307Source: readonly Data[] = [];
  // total24 = 1;
  // pageIndex24 = 1;
  // pageSize24 = 50;

  // BAM608Source: readonly Data[] = [];
  // total25 = 1;
  // pageIndex25 = 1;
  // pageSize25 = 50;

  // KRM046Source: readonly Data[] = [];
  // total26 = 1;
  // pageIndex26 = 1;
  // pageSize26 = 50;

  // KRM048Source: readonly Data[] = [];
  // total27 = 1;
  // pageIndex27 = 1;
  // pageSize27 = 50;

  // STM022Source: readonly Data[] = [];
  // total28 = 1;
  // pageIndex28 = 1;
  // pageSize28 = 50;

  // STM008Source: readonly Data[] = [];
  // total29 = 1;
  // pageIndex29 = 1;
  // pageSize29 = 50;

  // STM025Source: readonly Data[] = [];
  // total30 = 1;
  // pageIndex30 = 1;
  // pageSize30 = 50;

  watermark: string;
  s:string;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    // this.queryDate = sessionStorage.getItem('queryDate');
    this.getJcicMultiple();
    this.setBooleanFalse();
    this.getJcicList()
  }

  ngAfterViewInit() {

  }

  // 取得聯徵彙整清單
	getJcicList() {
		let jsonObject: any = {}
		jsonObject['applno'] = this.applno
		// jsonObject['queryDate'] = this.queryDate
		this.childbwscn3Service.getMASTERJCICList(jsonObject).subscribe(data => {

			this.listSource = data.rspBody;
		})
	}

  getJcicMultiple() {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    // jsonObject['nationalId'] = this.cuid;
    jsonObject['code'] = 'AAS003,BAI001';
    // jsonObject['queryDate'] = this.queryDate;
    this.childbwscn3Service.getMASTERJCICSearch(jsonObject).subscribe(data => {
      if ( data.rspBody[0].AAS003.length == 0 ) { this.AAS003.push(''); } else { this.AAS003 = data.rspBody[0].AAS003; };
      if ( data.rspBody[0].BAI001.length == 0 ) { this.BAI001.push(''); } else { this.BAI001 = data.rspBody[0].BAI001; };
      if ( data.rspBody[0].JAS002.length == 0 ) { this.JAS002.push(''); } else { this.JAS002 = data.rspBody[0].BAI001; };
    });
  }

  getJCIC( pageIndex: number, pageSize: number, code: string ) {
    let jsonObject: any = {};
    jsonObject['applno'] = this.applno;
    // jsonObject['nationalId'] = this.cuid;
    jsonObject['code'] = code;
    // jsonObject['queryDate'] = this.queryDate;
    jsonObject['page'] = pageIndex;
    jsonObject['per_page'] = pageSize;
    this.childbwscn3Service.getJCICSearch(jsonObject).subscribe(data => {
      if ( code == 'BAM421' ) { this.total1 = data.rspBody.size; this.BAM421Source = data.rspBody.items; }
      if ( code == 'BAM101' ) { this.total1 = data.rspBody.size; this.BAM101Source = data.rspBody.items; }
      if ( code == 'KRM048' ) { this.total1 = data.rspBody.size; this.KRM048Source = data.rspBody.items; }
      if ( code == 'KRM046' ) { this.total1 = data.rspBody.size; this.KRM046Source = data.rspBody.items; }
      // if ( code == 'JAS002' ) { this.total1 = data.rspBody.size; this.JAS002Source = data.rspBody.items; }
      if ( code == 'STM022' ) { this.total1 = data.rspBody.size; this.STM022Source = data.rspBody.items; }
      if ( code == 'STM008' ) { this.total1 = data.rspBody.size; this.STM008Source = data.rspBody.items; }
      if ( code == 'STM025' ) { this.total1 = data.rspBody.size; this.STM025Source = data.rspBody.items; }
      if ( code == 'VAM106' ) { this.total1 = data.rspBody.size; this.VAM106Source = data.rspBody.items; }
      if ( code == 'VAM107' ) { this.total1 = data.rspBody.size; this.VAM107Source = data.rspBody.items; }
      if ( code == 'VAM108' ) { this.total1 = data.rspBody.size; this.VAM108Source = data.rspBody.items; }
      if ( code == 'VAM201' ) { this.total1 = data.rspBody.size; this.VAM201Source = data.rspBody.items; }
      if ( code == 'BAM501' ) { this.total1 = data.rspBody.size; this.BAM501Source = data.rspBody.items; }
      if ( code == 'BAM502' ) { this.total1 = data.rspBody.size; this.BAM502Source = data.rspBody.items; }
      if ( code == 'BAM504' ) { this.total1 = data.rspBody.size; this.BAM504Source = data.rspBody.items; }
      if ( code == 'BAM505' ) { this.total1 = data.rspBody.size; this.BAM505Source = data.rspBody.items; }
      if ( code == 'BAM029' ) { this.total1 = data.rspBody.size; this.BAM029Source = data.rspBody.items; }
      if ( code == 'BAM305' ) { this.total1 = data.rspBody.size; this.BAM305Source = data.rspBody.items; }
      if ( code == 'BAM306' ) { this.total1 = data.rspBody.size; this.BAM306Source = data.rspBody.items; }
      if ( code == 'BAM307' ) { this.total1 = data.rspBody.size; this.BAM307Source = data.rspBody.items; }
      if ( code == 'BAM011' ) { this.total1 = data.rspBody.size; this.BAM011Source = data.rspBody.items; }
      if ( code == 'BAM070' ) { this.total1 = data.rspBody.size; this.BAM070Source = data.rspBody.items; }
      if ( code == 'BAM031' ) { this.total1 = data.rspBody.size; this.BAM031Source = data.rspBody.items; }
    });
  }

  onQueryParamsChange(params: NzTableQueryParams, code: string): void {
    const { pageSize, pageIndex } = params;
    this.getJCIC(pageIndex, pageSize, code);
  }

  setBooleanTrue() {
    this.hideJCICMASTER = true;
    this.hideJCIC = true;
    // this.hideKCM012 = true;
    // this.hideDAM001 = true;
    // this.hideBAM061 = true;
    // this.hideKRM043 = true;
    // this.hideBAM062 = true;
    // this.hideVAM020 = true;
    this.hideVAM201 = true;
    this.hideVAM106 = true;
    this.hideVAM107 = true;
    this.hideVAM108 = true;
    this.hideBAM029 = true;
    this.hideBAM501 = true;
    this.hideBAM502 = true;
    this.hideBAM504 = true;
    this.hideBAM505 = true;
    // this.hideBAM032 = true;
    this.hideBAM011 = true;
    // this.hideBAM067 = true;
    this.hideBAM070 = true;
    this.hideBAM101 = true;
    this.hideBAM421 = true;
    this.hideBAM305 = true;
    this.hideBAM306 = true;
    this.hideBAM307 = true;
    // this.hideBAM608 = true;
    this.hideKRM046 = true;
    this.hideKRM048 = true;
    this.hideSTM022 = true;
    this.hideSTM008 = true;
    this.hideSTM025 = true;
    // this.hideJAS002 = true;
    this.hideBAM031 = true;
  }

  setBooleanFalse() {
    this.hideJCICMASTER = false;
    this.hideJCIC = false;
    this.hideBAM421= false;
    this.hideBAM101= false;
    this.hideKRM048= false;
    this.hideKRM046= false;
    this.hideSTM022= false;
    this.hideSTM008= false;
    this.hideSTM025= false;
    this.hideVAM106= false;
    this.hideVAM107= false;
    this.hideVAM108= false;
    this.hideVAM201= false;
    this.hideBAM501= false;
    this.hideBAM502= false;
    this.hideBAM504= false;
    this.hideBAM505= false;
    this.hideBAM029= false;
    this.hideBAM305= false;
    this.hideBAM306= false;
    this.hideBAM307= false;
    this.hideBAM011= false;
    this.hideBAM070= false;
    this.hideBAM031= false;
  }

  exist() {
    for (let index = 0; index < this.list.length; index++) {
      if (this.list[index] == "JCICMASTER") { this.hideJCICMASTER = !this.hideJCICMASTER; }
      if (this.list[index] == "JCIC") { this.hideJCIC= !this.hideJCIC }
      // if (this.list[index] == "KCM012") { this.hideKCM012 = !this.hideKCM012; }
      // if (this.list[index] == "DAM001") { this.hideDAM001 = !this.hideDAM001; }
      // if (this.list[index] == "BAM061") { this.hideBAM061 = !this.hideBAM061; }
      // if (this.list[index] == "KRM043") { this.hideKRM043 = !this.hideKRM043; }
      // if (this.list[index] == "BAM062") { this.hideBAM062 = !this.hideBAM062; }
      // if (this.list[index] == "VAM020") { this.hideVAM020 = !this.hideVAM020; }
      if (this.list[index] == "VAM201") { this.hideVAM201 = !this.hideVAM201; }
      if (this.list[index] == "VAM106") { this.hideVAM106 = !this.hideVAM106; }
      if (this.list[index] == "VAM107") { this.hideVAM107 = !this.hideVAM107; }
      if (this.list[index] == "VAM108") { this.hideVAM108 = !this.hideVAM108; }
      if (this.list[index] == "BAM029") { this.hideBAM029 = !this.hideBAM029; }
      if (this.list[index] == "BAM501") { this.hideBAM501 = !this.hideBAM501; }
      if (this.list[index] == "BAM502") { this.hideBAM502 = !this.hideBAM502; }
      if (this.list[index] == "BAM504") { this.hideBAM504 = !this.hideBAM504; }
      if (this.list[index] == "BAM505") { this.hideBAM505 = !this.hideBAM505; }
      // if (this.list[index] == "BAM032") { this.hideBAM032 = !this.hideBAM032; }
      if (this.list[index] == "BAM011") { this.hideBAM011 = !this.hideBAM011; }
      // if (this.list[index] == "BAM067") { this.hideBAM067 = !this.hideBAM067; }
      if (this.list[index] == "BAM070") { this.hideBAM070 = !this.hideBAM070; }
      if (this.list[index] == "BAM101") { this.hideBAM101 = !this.hideBAM101; }
      if (this.list[index] == "BAM421") { this.hideBAM421 = !this.hideBAM421; }
      if (this.list[index] == "BAM305") { this.hideBAM305 = !this.hideBAM305; }
      if (this.list[index] == "BAM306") { this.hideBAM306 = !this.hideBAM306; }
      if (this.list[index] == "BAM307") { this.hideBAM307 = !this.hideBAM307; }
      // if (this.list[index] == "BAM608") { this.hideBAM608 = !this.hideBAM608; }
      if (this.list[index] == "KRM046") { this.hideKRM046 = !this.hideKRM046; }
      if (this.list[index] == "KRM048") { this.hideKRM048 = !this.hideKRM048; }
      if (this.list[index] == "STM022") { this.hideSTM022 = !this.hideSTM022; }
      if (this.list[index] == "STM008") { this.hideSTM008 = !this.hideSTM008; }
      if (this.list[index] == "STM025") { this.hideSTM025 = !this.hideSTM025; }
      // if (this.list[index] == "JAS002") { this.hideJAS002 = !this.hideJAS002; }
      if (this.list[index] == "BAM031") { this.hideBAM031 = !this.hideBAM031; }

    }
  }

  show(who: string) {
    if (this.list.indexOf(who) !== -1) {
      const index: number = this.list.indexOf(who);
      this.list.splice(index, 1);
    } else {
      this.list.push(who);
    }
    if (this.list.length == 0) {
      this.setBooleanFalse();
    } else if (this.list.length == 24) {
      this.setBooleanFalse();
      this.list = [];
    } else {
      this.setBooleanTrue();
      this.exist();
      // if ( who == "KRI002") { this.hideKRI002 = !this.hideKRI002; this.getKRI002(); }
      // if ( who == "BAM011") { this.hideBAM011 = !this.hideBAM011; this.getBAM011(); }
    }
  }

  all() {
    this.setBooleanFalse();
    this.list = [];
  }
}
