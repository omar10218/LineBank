import { Component, OnInit } from '@angular/core';
import { dataList } from './data-list.const';

interface sysCode {
  value: string;
  viewValue: string;
}

interface sysTable {
  SPEAKING_ABBREVIATION: string;//話術簡稱
  STOP_FLAG: string;//暫停使用
  SPEAKING_CONTENT: string;//話術內容
}

@Component({
  selector: 'app-f03010',
  templateUrl: './f03010.component.html',
  styleUrls: ['./f03010.component.css', '../../assets/css/f03.css', '../../assets/css/f01.css']
})
export class F03010Component implements OnInit {

    //表單資料
    list = dataList;
    dataSource = this.list;
    AddData:any;
    EditData:any;

    SPEAKING_ABBREVIATION='';//話術簡稱
    STOP_FLAG: sysCode[] = [{ value: 'Y', viewValue: 'Y' }, { value: 'N', viewValue: 'N' }];
    STOP_FLAG_Selected='';
    SPEAKING_CONTENT='';//話術內容


  PolicyConditionValue='';
  BUS_TYPECode_Selected='';
  BusType: sysCode[] = [{ value: 'Y', viewValue: 'Y' }, { value: 'N', viewValue: 'N' }];
  constructor() { }

  ngOnInit(): void {
  }

  Add():void {
    this.AddData = { SPEAKING_ABBREVIATION:this.SPEAKING_ABBREVIATION, STOP_FLAG:this.STOP_FLAG_Selected
      ,SPEAKING_CONTENT:this.SPEAKING_CONTENT};
      this.list.push(this.AddData);
     this.reView();
  }

  Edit(value:sysTable): void {
    this.SPEAKING_ABBREVIATION=value.SPEAKING_ABBREVIATION;
    this.STOP_FLAG_Selected=value.STOP_FLAG;
    this.SPEAKING_CONTENT=value.SPEAKING_CONTENT;
    this.dataSource=this.list.filter(i=> i.SPEAKING_ABBREVIATION==value.SPEAKING_ABBREVIATION);
  }

  Save(): void {
    this.EditData={ SPEAKING_ABBREVIATION:this.SPEAKING_ABBREVIATION, STOP_FLAG:this.STOP_FLAG_Selected
      ,SPEAKING_CONTENT:this.SPEAKING_CONTENT};

      this.list[this.list.findIndex(i=>i.SPEAKING_ABBREVIATION==this.SPEAKING_ABBREVIATION)]=this.EditData;
      this.reView();
  }



  Clear():void {
    this.SPEAKING_ABBREVIATION='';
    this.STOP_FLAG_Selected='';
    this.SPEAKING_CONTENT='';
  }

  Delete(value:sysTable): void {
    this.list=this.list.filter(i=> i.SPEAKING_ABBREVIATION!=value.SPEAKING_ABBREVIATION);
    console.log(this.list)
    this.reView();
  }

  reView(): void{
    this.dataSource=this.list.filter(i=> i.SPEAKING_ABBREVIATION!="");
    console.log(this.dataSource)
    console.log(this.list)
    this.SPEAKING_ABBREVIATION='';
    this.STOP_FLAG_Selected='';
    this.SPEAKING_CONTENT='';
  }

}
