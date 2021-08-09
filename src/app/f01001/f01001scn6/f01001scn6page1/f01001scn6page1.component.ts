import { F01001scn6Service } from './../f01001scn6.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-f01001scn6page1',
  templateUrl: './f01001scn6page1.component.html',
  styleUrls: ['./f01001scn6page1.component.css','../../../../assets/css/f01.css']
})
export class F01001scn6page1Component implements OnInit {

  AAS003: [] = [];
  APS001: [] = [];
  ACI001: [] = [];
  BAI001: [] = [];
  BAI004: [] = [];
  BAS006: [] = [];
  BAS008: [] = [];
  JAS002: [] = [];
  KRI001: [] = [];
  STS007: [] = [];
  VAM020: [] = [];

  constructor(private route: ActivatedRoute, private f01001scn6Service: F01001scn6Service) { }
  private applno: string;
  private cuid: string;
  private queryDate: string;
  currentPage: PageEvent;
  currentSort: Sort;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.cuid = params['cuid'];
      this.queryDate = params['queryDate'];
    });

    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    formdata.append('code', 'AAS003,APS001,ACI001,BAI001,BAI004,BAS006,BAS008,KRI001,JAS002,VAM020,STS007');
    formdata.append('queryDate', this.queryDate);
    this.f01001scn6Service.getMASTERJCICSearch(formdata).subscribe(data => {
      this.AAS003 = data.rspBody[0].AAS003;
      this.APS001 = data.rspBody[0].APS001;
      this.ACI001 = data.rspBody[0].ACI001;
      this.BAI001 = data.rspBody[0].BAI001;
      this.BAI004 = data.rspBody[0].BAI004;
      this.BAS006 = data.rspBody[0].BAS006;
      this.BAS008 = data.rspBody[0].BAS008;
      this.JAS002 = data.rspBody[0].JAS002;
      this.KRI001 = data.rspBody[0].KRI001;
      this.STS007 = data.rspBody[0].STS007;
      this.VAM020 = data.rspBody[0].VAM020;
    });
  }
}
