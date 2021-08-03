import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { F03010Service } from './f03010.service';
import { F03010confirmComponent } from './f03010confirm/f03010confirm.component';
import { F03010editComponent } from './f03010edit/f03010edit.component';

interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03010',
  templateUrl: './f03010.component.html',
  styleUrls: ['./f03010.component.css', '../../assets/css/f03.css']
})
export class F03010Component implements OnInit {
  
  stopFlagCode: sysCode[] = [{ value: 'Y', viewValue: 'Y' }, { value: 'N', viewValue: 'N' }];

  setCalloutSpeakingForm: FormGroup = this.fb.group({
    speakingAbbreviation: ['', [Validators.required]],
    stopFlag: ['Y', [Validators.required]],
    speakingContent: ['', [Validators.required]]
  });
  submitted = false;

  constructor(private fb: FormBuilder, private f03010Service: F03010Service, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };

    this.currentSort = {
      active: '',
      direction: ''
    };
  }

  totalCount: any;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('sortTable', { static: true }) sortTable: MatSort;
  currentPage: PageEvent;
  currentSort: Sort;
  calloutSpeakingSource = new MatTableDataSource<any>();

  ngAfterViewInit() {
    this.getSpeaking();
    this.currentPage = {
      pageIndex: 0,
      pageSize: 10,
      length: null
    };
    this.currentSort = {
      active: '',
      direction: ''
    };
    this.paginator.page.subscribe((page: PageEvent) => {
      this.currentPage = page;
      this.getSpeaking();
    });
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  add() {
    let msg = '';
    this.submitted = true;
    if (!this.setCalloutSpeakingForm.valid) {
      msg = '資料格式有誤，請修正!';
    } else {
      const url = 'f03/f03010action1';
      const formdata: FormData = new FormData();
      formdata.append('speakingAbbreviation', this.setCalloutSpeakingForm.value.speakingAbbreviation);
      formdata.append('stopFlag', this.setCalloutSpeakingForm.value.stopFlag);
      formdata.append('speakingContent', this.setCalloutSpeakingForm.value.speakingContent);
      this.f03010Service.saveDssCallout( url, formdata).subscribe(data => {
        msg = data.rspMsg;
      });
    }
    setTimeout(() => {
      const DialogRef = this.dialog.open(F03010confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

  getSpeaking() {
    const baseUrl = "f03/f03010";
    this.f03010Service.getSpeaking(baseUrl, this.currentPage.pageIndex, this.currentPage.pageSize)
    .subscribe(data => {
      console.log(data);
      this.totalCount = data.rspBody.size;
      this.calloutSpeakingSource.data = data.rspBody.items;
    });
  }

  startEdit(speakingAbbreviation: string, speakingContent: string, stopFlag: string) {
    console.log(speakingAbbreviation,speakingContent,stopFlag)  
    const dialogRef = this.dialog.open(F03010editComponent, {
      minHeight: '100vh',
      width: '50%',  
      data: {
          speakingAbbreviation: speakingAbbreviation, 
          speakingContent : speakingContent , 
          stopFlag: stopFlag
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null && result.event == 'success') { this.refreshTable(); }
      });
  }
  
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  delete(speakingAbbreviation: string) {
    let msg = '';
    const url = 'f03/f03010action3';
    const formdata: FormData = new FormData();
    formdata.append('speakingAbbreviation', speakingAbbreviation);
    this.f03010Service.saveDssCallout( url, formdata).subscribe(data => {
      msg = data.rspMsg;
    });
    setTimeout(() => {
      const DialogRef = this.dialog.open(F03010confirmComponent, { data: { msgStr: msg } });
    }, 1500);
  }

}
