import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { F01001scn12Service } from './f01001scn12.service';
import { MatTableDataSource } from '@angular/material/table';

interface sysCode {
  value: string;
  viewValue: string;
}

interface sysTable {
  POST_FLAG: string;//客戶類別
    CU_ID: string;//身份證字號
    CU_CNAME: string;//姓名
    INCOME_TYPE:string;//收入項目
    NUM:string;//金額
    MINCOME_EXP:string;//月收入例外
    YINCOME:string;//年所得
    MINCOME:string;//月平均收入
}

@Component({
  selector: 'app-f01001scn12',
  templateUrl: './f01001scn12.component.html',
  styleUrls: ['./f01001scn12.component.css']
})
export class F01001scn12Component implements OnInit {



  constructor(private route: ActivatedRoute, private router: Router,private f01001scn12Service: F01001scn12Service) { }
  private applno: string;
  private search: string;

  dataList:any;
  sys_YINCOME:string='';
  sys_MINCOME:string='';

  ruleParamCondition = new MatTableDataSource<any>();

  //客戶類別
  POST_FLAG: sysCode[] =[];
  POST_FLAG_Selected:string="";
  //身分證字號
  CU_ID:string="";
  //姓名
  CU_CNAME:string="";
  //收入項目
  INCOME_TYPE: sysCode[] =[];
  INCOME_TYPE_Selected	:string="";
  //金額
  NUM	:string="";
  //月收入例外
  MINCOME_EXP: sysCode[] =[];
  MINCOME_EXP_Selected	:string="";



//取表單
  GetTable() {
    let url = 'https://localhost:44316/RuleParamCondition/Search';
    let formData = new FormData();
    //formData.append('CU_ID',this.CU_ID != null ? this.CU_ID : '');
   this.f01001scn12Service.getDataSource(url,formData).subscribe(data=>{
     this.ruleParamCondition.data = data.rspBody
     console.log(data.rspBody)
   });
  this.reView();
 }

//取年收入/月平均收入
 GetGet_YINCOME_MINCOMETable() {
  let url = 'https://localhost:44316/RuleParamCondition/Search';
  let formData = new FormData();
  formData.append('CU_ID',this.CU_ID != null ? this.CU_ID : '');
 this.f01001scn12Service.getDataSource(url,formData).subscribe(data=>{
   this.sys_MINCOME = data.rspBody.MINCOME
   this.sys_YINCOME = data.rspBody.YINCOME
   console.log(data.rspBody)
 });
this.reView();
}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.applno = params['applno'];
      this.search = params['search'];
    });

     /////////////////////呼叫下拉選單值
  //客戶類別
  this.f01001scn12Service.Get_CODE_TYPE('POST_FLAG').subscribe(data=>{
    for(const jsonObj of data.rspBody)
    {
      const codeNo = jsonObj['codE_NO'];
      const desc = jsonObj['codE_DESC'];
      this.POST_FLAG.push({value: codeNo, viewValue: desc})
    }
  })
    //收入項目
    this.f01001scn12Service.Get_CODE_TYPE('INCOME_TYPE').subscribe(data=>{
      for(const jsonObj of data.rspBody)
      {
        const codeNo = jsonObj['codE_NO'];
        const desc = jsonObj['codE_DESC'];
        this.INCOME_TYPE.push({value: codeNo, viewValue: desc})
      }
    })
      //月收入例外
      this.MINCOME_EXP.push({value: "N", viewValue: "N"})
  this.f01001scn12Service.Get_CODE_TYPE('MINCOME_EXP').subscribe(data=>{
    for(const jsonObj of data.rspBody)
    {
      const codeNo = jsonObj['codE_NO'];
      const desc = jsonObj['codE_DESC'];
      this.MINCOME_EXP.push({value: codeNo, viewValue: desc})
    }
  })
  //月收入例外預設N
  this.MINCOME_EXP_Selected="N";

    this.GetTable();
  }

  getApplno(): String {
    return this.applno;
  }

  getSearch() :string {
    return this.search;
  }

  //---------------------------------財務年收入試算-------------------------------

  //新增
  public async Add(): Promise<void> {
    this.GetGet_YINCOME_MINCOMETable()
      let formData = new FormData();
      formData.append('POST_FLAG',this.POST_FLAG_Selected);
      formData.append('CU_ID',this.CU_ID);
      formData.append('CU_CNAME',this.CU_CNAME);
      formData.append('INCOME_TYPE',this.INCOME_TYPE_Selected);
      formData.append('NUM',this.NUM);
      formData.append('MINCOME_EXP',this.MINCOME_EXP_Selected);
      formData.append('YINCOME',this.sys_YINCOME);//正式需打api取資料
      formData.append('MINCOME',this.sys_MINCOME);//正式需打api取資料
      let msgStr: string = "";
      let baseUrl = 'https://localhost:44316/RuleParamCondition/Add';
      msgStr = await this.f01001scn12Service.add(baseUrl, formData);
      if (msgStr === '儲存成功！') { alert("儲存成功") }
      this.GetTable();
  }

  //修改-修改資料傳至上方下拉選單
  Edit(value:sysTable): void {
    this.POST_FLAG_Selected=value.POST_FLAG;
    this.CU_ID=value.CU_ID;
    this.CU_CNAME=value.CU_CNAME;
    this.INCOME_TYPE_Selected=value.INCOME_TYPE;
    this.NUM=value.NUM;
    this.MINCOME_EXP_Selected=value.MINCOME_EXP;

    this.dataList=this.ruleParamCondition
    this.ruleParamCondition=this.dataList.filter(i=>i.CU_ID==value.CU_ID);

  }
  //修改-儲存
  public async Save(): Promise<void> {

    let formData = new FormData();
    formData.append('POST_FLAG',this.POST_FLAG_Selected);
    formData.append('CU_ID',this.CU_ID);
    formData.append('CU_CNAME',this.CU_CNAME);
    formData.append('INCOME_TYPE',this.INCOME_TYPE_Selected);
    formData.append('NUM',this.NUM);
    formData.append('MINCOME_EXP',this.MINCOME_EXP_Selected);
    let msgStr: string = "";
    let baseUrl = 'https://localhost:44316/RuleParamCondition/Add';
    msgStr = await this.f01001scn12Service.edit(baseUrl, formData);
    if (msgStr === '儲存成功！') { alert("儲存成功") }
    this.GetTable();
}
//刪除
  public async Delete(): Promise<void> {

    let formData = new FormData();
    formData.append('CU_ID',this.CU_ID);
    let msgStr: string = "";
    let baseUrl = 'https://localhost:44316/RuleParamCondition/Add';
    msgStr = await this.f01001scn12Service.delete(baseUrl, formData);
    if (msgStr === '刪除成功！') { alert("刪除成功") }
    this.GetTable();
}

//下拉選單更新
  reView(): void{

    this.POST_FLAG_Selected="";
    this.CU_ID="";
    this.CU_CNAME="";
    this.INCOME_TYPE_Selected="";
    this.NUM="";
    this.MINCOME_EXP_Selected="";
  }

}
