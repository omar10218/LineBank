import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChildrenService } from '../../children.service';
import { Childscn14Service } from '../childscn14.service';
interface dateCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-childscn14page2',
  templateUrl: './childscn14page2.component.html',
  styleUrls: ['./childscn14page2.component.css', '../../../../assets/css/child.css']
})
export class Childscn14page2Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private childscn14Service: Childscn14Service,
    public childService: ChildrenService
  ) { }

  imageForm: FormGroup = this.fb.group({
    APPLNO: ['', []]
  });
  dateCode: dateCode[] = [];
  dateValue: string;


  private applno: string;
  private cuid: string;

  ngOnInit(): void {
    this.applno = sessionStorage.getItem('applno');
    this.cuid = sessionStorage.getItem('nationalId');

    const url = 'f01/childscn14';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    this.imageForm.patchValue({ APPLNO: this.applno })
  }

  getApplno(): String {
    return this.applno;
  }

  getHost(): String {
    var origin = window.location.origin;
    var host = origin.substring(0, origin.lastIndexOf(":"));
    return host;
  }
}
