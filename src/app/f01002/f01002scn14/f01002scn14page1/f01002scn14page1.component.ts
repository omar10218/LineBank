import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { F01002scn14Service } from '../f01002scn14.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-f01002scn14page1',
  templateUrl: './f01002scn14page1.component.html',
  styleUrls: ['./f01002scn14page1.component.css', '../../../../assets/css/f01.css']
})
export class F01002scn14page1Component implements OnInit {

  imageForm: FormGroup = this.fb.group({
    APPLNO: ['', []]
  });
  src:SafeResourceUrl;
  dateValue: string;
  constructor(private sanitizer:DomSanitizer , private fb: FormBuilder, private route: ActivatedRoute, private f01002scn14Service: F01002scn14Service) { }
  private applno: string;
  private cuid: string;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.cuid = params['cuid'];
      var origin = window.location.origin;
      var host = origin.substring(0, origin.lastIndexOf(":"));
      console.log(host)
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(host + ":8080/LineBankViewone/pages/ImagePage1.jsp?applno=" + this.applno);
    });

    const url = 'f01/f01002scn14';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    this.imageForm.patchValue({ APPLNO: this.applno })
  }





}
