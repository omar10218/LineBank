import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { F03009confirmComponent } from './f03009confirm/f03009confirm.component';

interface sysCode {
  value: string;
  viewValue: string;
}

interface productImfor {
  name: string;
  code: string;
  check: boolean;

}

//測試用
interface datainterface {
  Success: string;
  value: string;
}

@Component({
  selector: 'app-f03009',
  templateUrl: './f03009.component.html',
  styleUrls: ['./f03009.component.css','../../assets/css/f03.css']
})
export class F03009Component implements OnInit {

//測試用
data: datainterface[] = [{ value: 'TV_ALL', Success: 'TV_ALL' }];

  selectedValue: string;
  sysCode: sysCode[] = [{ value: 'TV_ALL', viewValue: 'TV_ALL' }, { value: 'TV_01', viewValue: 'TV_01' }];
  backgroundSearch: productImfor[] = [
    { name: "確認JCIC", code: "1", check: false },
    { name: "確認手機", code: "2", check: false },
    { name: "確認客戶行職業別", code: "3", check: false },
    { name: "確認年收入", code: "4", check: false },
    { name: "確認附件", code: "5", check: false },
    { name: "確認網站查詢", code: "6", check: false },
    { name: "確認偽冒項目", code: "7", check: false },
    { name: "確認AML", code: "8", check: false },
    { name: "確認EDD", code: "9", check: false }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  // async changeSelect() {
  //   // const baseUrl = 'productSetting?name=' + this.selectedValue;
  //   // this.f03003Service.getLine(baseUrl).subscribe(data => {
  //   //   console.log(data.items[0]);
  //   //   for (let i = 0; i < this.backgroundSearch.length; i++) { this.backgroundSearch[i].check = false; }
  //   //   if (data.items[0].BLACKSEARCH == "Y") { this.backgroundSearch[0].check = true };
  //   //   if (data.items[0].HISTORY == "Y") { this.backgroundSearch[1].check = true };
  //   //   if (data.items[0].STAKEHOLDER == "Y") { this.backgroundSearch[2].check = true };
  //   //   if (data.items[0].AML == "Y") { this.backgroundSearch[3].check = true };
  //   //   if (data.items[0].JCIC == "Y") { this.backgroundSearch[4].check = true };
  //   // });

  //   // const baseUrl = 'f03/f03003?name=' + this.selectedValue;
  //   // this.f03003Service.getLine(baseUrl).subscribe(data => {
  //   //   console.log(data.rspBody[0]);
  //   //   for (let i = 0; i < this.backgroundSearch.length; i++) { this.backgroundSearch[i].check = false; }
  //   //   if (data.rspBody[0].blacksearch == "Y") { this.backgroundSearch[0].check = true };
  //   //   if (data.rspBody[0].history == "Y") { this.backgroundSearch[1].check = true };
  //   //   if (data.rspBody[0].stakeholder == "Y") { this.backgroundSearch[2].check = true };
  //   //   if (data.rspBody[0].aml == "Y") { this.backgroundSearch[3].check = true };
  //   //   if (data.rspBody[0].jcic == "Y") { this.backgroundSearch[4].check = true };
  //   // });
  // }

  // save() {
  //   var valArrayY: string[] = new Array;
  //   var valArrayN: string[] = new Array;
  // //   for (const obj of this.backgroundSearch) {
  // //     if (obj.check) { valArrayY.push(obj.code); } else { valArrayN.push(obj.code);}
  // //   }
  // //   const formData: FormData = new FormData();
  // //   formData.append("name", this.selectedValue);
  // //   formData.append("setY", valArrayY.toString());
  // //   formData.append("setN", valArrayN.toString());
  // //   const baseUrl = 'f03/f03003action1';
  // //   this.f03003Service.setProduct(baseUrl, formData).subscribe(data => {
  // //     const childernDialogRef = this.dialog.open(F03003confirmComponent, {
  // //       data: { msgStr: data.rspMsg }
  // //     });
  // //   });
  //  }

  //測試用
  list: productImfor[] = [
    { name: "確認JCIC", code: "1", check: false },
    { name: "確認手機", code: "2", check: false },
    { name: "確認客戶行職業別", code: "3", check: false },
    { name: "確認年收入", code: "4", check: false },
    { name: "確認附件", code: "5", check: false },
    { name: "確認網站查詢", code: "6", check: false },
    { name: "確認偽冒項目", code: "7", check: false },
    { name: "確認AML", code: "8", check: false },
    { name: "確認EDD", code: "9", check: false }
  ];

  async changeSelect() {
    this.backgroundSearch = this.list;
    var SessionList: string[] = new Array;
    var SessionString!: string;
    if (sessionStorage.getItem('valArrayY') != "" && sessionStorage.getItem('valArrayY') != null) {
     //alert("不是空的" + sessionStorage.getItem('valArrayY'));
      console.log(sessionStorage.getItem('valArrayY'));
      SessionString = sessionStorage.getItem('valArrayY')!;
      SessionList = SessionString.split('_');
      console.log(SessionList);

      this.backgroundSearch.forEach(element => {

      });
      for (let j = 1; j < SessionList.length; j++) {
        //背景查詢
        for (let i = 0; i < this.backgroundSearch.length; i++) {
          if (this.backgroundSearch[i].name == SessionList[j]) { this.backgroundSearch[i].check = true }
        }


      }

    }
  }

  save() {
    var valArrayY: string[] = new Array;
    var valArrayN: string[] = new Array;
    var y: string = "";
    var n: string = "";
    for (const obj of this.backgroundSearch) {
      if (obj.check) { valArrayY.push(obj.name); y += '_' + obj.name } else { valArrayN.push(obj.name); n += '_' + obj.name }
    }
    sessionStorage.setItem('valArrayY', y);
    sessionStorage.setItem('valArrayN', n);

      this.data[0].Success = '儲存成功';
      const childernDialogRef = this.dialog.open(F03009confirmComponent, {
        data: { msgStr: this.data[0].Success }
      });
  }

}
