import { Component, Inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { F03008Service } from './f03008.service';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-f03008',
  templateUrl: './f03008.component.html',
  styleUrls: ['./f03008.component.css', '../../assets/css/f03.css']
})
export class F03008Component implements OnInit {
  [x: string]: any;
  dialogRef: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public f03008service: F03008Service) { }



  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;


  ngOnInit(): void {

  }

  arrayBuffer: any;
  file!: File;
  JSONObject = {
    object: {},
    string: ''
  };


  submit() {
  }



  //上傳excel 未串到後端
  onFileChange(ev:any) {
    let workBook:any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial:any, name:any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      //const dataString = JSON.stringify(jsonData);

      //NEW
      this.JSONObject.object = jsonData; //Data in JSON Format
      this.JSONObject.string = JSON.stringify(jsonData); //Data in String Format


      // const output:any = document.getElementById('output');
      // output.innerHTML = dataString.slice(0, 300).concat("...");

      //NEW
      this.setDownload(this.JSONObject.string);

      //console.log('JSON object:', this.JSONObject.object);
    }
    reader.readAsBinaryString(file);
  }

  setDownload(data:any) {
    this.willDownload = true;
    setTimeout(() => {
      const el:any = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }






}
