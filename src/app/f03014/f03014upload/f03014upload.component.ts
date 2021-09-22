import { Component, OnInit } from '@angular/core';
import { F03014Service } from '../f03014.service';
import * as XLSX from 'xlsx';
import { FileInput } from 'ngx-material-file-input';

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
  ngOnInit(): void {
  }
  openup(evt: any) {


    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.inputdata = (XLSX.utils.sheet_to_json(ws, { header: 0 }));

      evt.target.value = "" // 清空
      this.tidy();
    };
    reader.readAsBinaryString(target.files[0]);

  }
  tidy() //需要修改
  {
    const url = 'f03/f03014action02';

    if (this.inputdata.length > 1) {

      // let formData = new FormData();
      for (var i = 0; i < this.inputdata.length; i++) {
        this.jsonObject ={};
        this.jsonObject['custNid'] = this.inputdata[i]['客戶身分證字號'];
        this.jsonObject['custName'] = this.inputdata[i]['客戶姓名'];
        this.jsonObject['content1'] = this.inputdata[i]['簡述1'];
        this.jsonObject['content2'] = this.inputdata[i]['簡述2'];
        this.jsonObject['remark'] = this.inputdata[i]['備註資訊'];
        this.jsonObject['effectiveDate'] = this.inputdata[i]['生效日'];
        this.jsonObject['expirationDate'] = this.inputdata[i]['失效日'];
        this.jsonObject['useFlag'] = this.inputdata[i]['使用中'];
        this.jsonObject['changeDate'] = this.inputdata[i]['更新日期時間'];


        // formData.append('custNid', this.inputdata[i]['客戶身分證字號']);
        // formData.append('custName', this.inputdata[i]['客戶姓名']);
        // formData.append('content1', this.inputdata[i]['簡述1']);
        // formData.append('content2', this.inputdata[i]['簡述2']);
        // formData.append('remark', this.inputdata[i]['備註資訊']);
        // formData.append('effectiveDate', this.inputdata[i]['生效日']);
        // formData.append('expirationDate', this.inputdata[i]['失效日']);
        // formData.append('useFlag', this.inputdata[i]['使用中']);
        // formData.append('changeDate', this.inputdata[i]['更新日期時間']);
         this.Custlist.push(this.jsonObject)
      }
      // this.f03014Service.Add(url, formData).subscribe(data => {
      //   let k = i
      //   this.rspMsg = '第' + k + '筆' + data.rspMsg;
      //   console.log(this.Custlist);
      // }
      // )
    }
    else {
      this.jsonObject['custNid'] = this.inputdata[0]['客戶身分證字號'];
      this.jsonObject['custName'] = this.inputdata[0]['客戶姓名'];
      this.jsonObject['content1'] = this.inputdata[0]['簡述1'];
      this.jsonObject['content2'] = this.inputdata[0]['簡述2'];
      this.jsonObject['remark'] = this.inputdata[0]['備註資訊'];
      this.jsonObject['effectiveDate'] = this.inputdata[0]['生效日'];
      this.jsonObject['expirationDate'] = this.inputdata[0]['失效日'];
      this.jsonObject['useFlag'] = this.inputdata[0]['使用中'];
      this.jsonObject['changeDate'] = this.inputdata[0]['更新日期時間'];
      this.Custlist.push(this.jsonObject)

      // let formData = new FormData();
      // formData.append('custNid', this.inputdata[0]['客戶身分證字號']);
      // formData.append('custName', this.inputdata[0]['客戶姓名']);
      // formData.append('content1', this.inputdata[0]['簡述1']);
      // formData.append('content2', this.inputdata[0]['簡述2']);
      // formData.append('remark', this.inputdata[0]['備註資訊']);
      // formData.append('effectiveDate', this.inputdata[0]['生效日']);
      // formData.append('expirationDate', this.inputdata[0]['失效日']);
      // formData.append('useFlag', this.inputdata[0]['使用中']);
      // formData.append('changeDate', this.inputdata[0]['更新日期時間']);
      // this.f03014Service.Add(url, formData).subscribe(data => {
      //   this.rspMsg = data.rspMsg;

      // })

    }
  }
  seve()
  {
    const url = 'f03/f03014action02';
    console.log(this.Custlist)
    this.f03014Service.Add(url, this.Custlist).subscribe(data => {
     console.log(data);
    }
    )
  }

}
