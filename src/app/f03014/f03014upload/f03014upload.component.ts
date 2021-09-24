import { Component, OnInit } from '@angular/core';
import { F03014Service } from '../f03014.service';


interface sysCode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-f03014upload',
  templateUrl: './f03014upload.component.html',
  styleUrls: ['./f03014upload.component.css']
})

export class F03014uploadComponent implements OnInit {
  constructor(private f03014Service: F03014Service) { }

  inputdata = []
  rspMsg: string;
  test: sysCode;
  jsonObject: any = {};
  Custlist: any = [];
  fileToUpload:File = null;
  Filename:string;
  private formData = new FormData();
  ngOnInit(): void {
  }
  openup(files: FileList) {

    this.fileToUpload = files.item(0);

    // const formData = new FormData();
    this.rspMsg = '';
    this.Filename = this.fileToUpload.name
    this.formData.append('file',this.fileToUpload,this.fileToUpload.name)

  }

  seve()
  {
    this.Filename = '';
    const url = 'f03/f03014action05'
    this.f03014Service.postExcel(url,this.formData).subscribe(data=>{
          this.rspMsg = data.rspMsg

        })

  }

}
