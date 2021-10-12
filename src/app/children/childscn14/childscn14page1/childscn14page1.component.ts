import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Childscn14Service } from '../childscn14.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChildrenService } from '../../children.service';

@Component({
  selector: 'app-childscn14page1',
  templateUrl: './childscn14page1.component.html',
  styleUrls: ['./childscn14page1.component.css', '../../../../assets/css/child.css']
})
export class Childscn14page1Component implements OnInit {

  constructor(
    private sanitizer:DomSanitizer ,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private childscn14Service: Childscn14Service,
    public childService: ChildrenService
  ) { }

  imageForm: FormGroup = this.fb.group({
    APPLNO: ['', []]
  });
  src:SafeResourceUrl;
  dateValue: string;

  private applno: string;
  private cuid: string;


  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('cuid');
    var origin = window.location.origin;
    var host = origin.substring(0, origin.lastIndexOf(":"));
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(host + ":8080/LineBankViewone/pages/ImagePage2.jsp?applno=" + this.applno);

    const url = 'f01/childscn14';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    this.imageForm.patchValue({ APPLNO: this.applno })
  }





}
