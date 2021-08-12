import { Component, OnInit } from '@angular/core';
import { F01001scn14Service } from './../f01001scn14.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-f01001scn14page1',
  templateUrl: './f01001scn14page1.component.html',
  styleUrls: ['./f01001scn14page1.component.css', '../../../../assets/css/f01.css']
})
export class F01001scn14page1Component implements OnInit {
  imageForm: FormGroup = this.fb.group({
    APPLNO: ['', []]
  });

  dateValue: string;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private f01001scn14Service: F01001scn14Service) { }
  private applno: string;
  private cuid: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.cuid = params['cuid'];
      
    });

    const url = 'f01/f01001scn14';
    const formdata: FormData = new FormData();
    formdata.append('applno', this.applno);
    formdata.append('cuid', this.cuid);
    this.imageForm.patchValue({ APPLNO: this.applno })
  }
  getHost(): String {
    var origin = window.location.origin;
    var host = origin.substring(0, origin.lastIndexOf(":"));
    console.log(host)
    return host;
  }

}
