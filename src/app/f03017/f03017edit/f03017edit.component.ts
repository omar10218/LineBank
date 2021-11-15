import { templateJitUrl } from '@angular/compiler'
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {PageEvent} from '@angular/material/paginator'
import {Sort} from '@angular/material/sort'
import {MatTableDataSource} from '@angular/material/table'
import {ActivatedRoute, Data, Router} from '@angular/router'
import {NzTableQueryParams} from 'ng-zorro-antd/table'
import {ChildrenService} from 'src/app/children/children.service'
import {ConfirmComponent} from 'src/app/common-lib/confirm/confirm.component'
import {F03015Service} from 'src/app/f03015/f03015.service'
import {F03017Service} from '../f03017.service'
//勾選框
interface checkBox {
	value: string
	completed: boolean
}
//下拉選單框架
interface sysCode {
	value: string
	viewValue: string
}
// 維護黑名單
@Component({
	selector: 'app-f03017edit',
	templateUrl: './f03017edit.component.html',
	styleUrls: ['./f03017edit.component.css' , '../../../assets/css/f03.css'],
})
export class F03017editComponent implements OnInit {
	reportReason1: sysCode[] = [] //通報原因1下拉
	reportReason2: sysCode[] = [] //通報原因2下拉
	reportReason3: sysCode[] = [] //通報原因3下拉
	useFlag: sysCode[] = [
		{value: 'Y', viewValue: '是'},
		{value: 'N', viewValue: '否'},
	] //使用中下拉
	reportReason1Value: string //通報原因1選擇
	reportReason2Value: string //通報原因2選擇
	reportReason3Value: string //通報原因3選擇
	useFlagValue: string //使用中選擇
	currentPage: PageEvent
	currentSort: Sort
  checked:boolean;
  // get Element by ID抓取checkboxID值
  @ViewChild('CU_CNAME') CU_CNAME: ElementRef;
  @ViewChild('NATIONAL_ID') NATIONAL_ID: ElementRef;
  @ViewChild('CU_H_TEL') CU_H_TEL: ElementRef;
  @ViewChild('CU_CP_TEL') CU_CP_TEL: ElementRef;
  @ViewChild('CU_M_TEL') CU_M_TEL: ElementRef;

	constructor(public f03017Service: F03017Service,public dialogRef: MatDialogRef<F03017editComponent>, private route: ActivatedRoute, public dialog: MatDialog, public childService: ChildrenService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {}

	blockListForm: FormGroup = this.fb.group({
		ROWID: [],
		REPORT_UNIT: [this.data.no, []],
		REPORT_REASON1: [this.data.reportReason1Value, []],
		REPORT_REASON2: [this.data.reportReason2Value, []],
		REPORT_REASON3: [this.data.reportReason3Value, []],
		REPORT_CONTENT: [this.data.REPORT_CONTENT, []],
		USE_FLAG: [this.data.USE_FLAG, []],
		BK_COLUMN: [this.data.BK_COLUMN, []],
		BK_CONTENT: [this.data.BK_CONTENT, []],
		CU_CNAME: [this.data.CU_CNAME, []],
		NATIONAL_ID: [this.data.NATIONAL_ID, []],
		CU_H_TEL: [this.data.CU_H_TEL, []],
		CU_CP_TEL: [this.data.CU_CP_TEL, []],
		CU_M_TEL: [this.data.CU_M_TEL, []],
		pageIndex: ['', [Validators.maxLength(3)]],
		pageSize: ['', [Validators.maxLength(3)]],
	})

	formControl = new FormControl('', [Validators.required])

	blockListDataSource: readonly Data[] = []
	chkArray: checkBox[] = []
	contentArray: checkBox[] = []
	jsonObject: any = {}
	no: string //會員帳號
	total = 1
	loading = true
	pageSize = 5
	pageIndex = 1

	ngOnInit(): void {

		console.log(this.blockListForm)
		console.log(this.data.BK_CONTENT)
		console.log(this.data.BK_COLUMN)
		this.selectCustInfo()
		this.route.queryParams.subscribe(params => {
			this.no = localStorage.getItem('empNo')
			// this.selectBlockList(this.pageIndex, this.pageSize)//一進去畫面就抓取資料表
		})


		//抓取資料表
		this.blockListForm.patchValue({'REPORT_UNIT': this.no})
		// this.selectBlockList(this.pageIndex, this.pageSize);

		//取Customer_info資料
		// this.selectCustInfo();

		//取下拉選單資料
		this.f03017Service
			.getSysTypeCode('BK_REASON') //通報原因下拉選單
			.subscribe(data => {
				for (const jsonObj of data.rspBody.mappingList) {
					const codeNo = jsonObj.codeNo
					const desc = jsonObj.codeDesc
					this.reportReason1.push({value: codeNo, viewValue: desc})
					this.reportReason2.push({value: codeNo, viewValue: desc})
					this.reportReason3.push({value: codeNo, viewValue: desc})
				}
			})
	}
  ngAfterViewInit(): void {

// 判斷該checkbox有無資料而打勾
    var checked:boolean=true;
    if(this.data.BK_COLUMN==="CU_CNAME"){
      this.CU_CNAME.nativeElement.checked=checked
      console.log( this.CU_CNAME.nativeElement.checked)
    }
    else if(this.data.BK_COLUMN==="NATIONAL_ID"){
      this.NATIONAL_ID.nativeElement.checked=checked
      console.log( this.NATIONAL_ID.nativeElement.checked)
    }
    else if(this.data.BK_COLUMN==="CU_H_TEL"){
      this.CU_H_TEL.nativeElement.checked=checked
    }
    else if(this.data.BK_COLUMN==="CU_CP_TEL"){
      this.CU_CP_TEL.nativeElement.checked=checked
    }
    else if(this.data.BK_COLUMN==="CU_M_TEL"){
      this.CU_M_TEL.nativeElement.checked=checked
    }
  }

// 輸入值去抓取checkbox資料
  test(id: string, value): void {
    var checked: boolean;
    if (id=="CU_CNAME"){
      checked = this.CU_CNAME.nativeElement.checked
    } else if (id=="NATIONAL_ID"){
      checked = this.NATIONAL_ID.nativeElement.checked
    }else if(id=="CU_H_TEL"){
      checked = this.CU_H_TEL.nativeElement.checked
    }else if(id=="CU_CP_TEL"){
      checked = this.CU_CP_TEL.nativeElement.checked
    }else if(id="CU_M_TEL"){
      checked = this.CU_M_TEL.nativeElement.checked
    }
    console.log(this.CU_CNAME.nativeElement.checked)
    var data = id;
    console.log(checked,data,value)
    this.checkboxSelect(checked,data, value);

  }

  testArray=[];
  check:boolean;
	checkboxSelect(check: boolean, data: any, value: any) {

    // 取最後的輸入值
    this.testArray[data]=value;
    console.log(this.testArray);
    console.log(this.testArray[data]);

		console.log(check)
		console.log(data)
		console.log(value)
		if (check && value != null) {
			this.chkArray.push(data)
			this.contentArray.push(value)
		} else {
			this.chkArray.forEach((element, index) => {
				if (element == data) {
					this.chkArray.splice(index, 1)
					this.contentArray.splice(index, 1)
				}
			})
		}
	}

	 // 離開該彈窗
   onNoClick(): void {
    this.dialogRef.close();
  }

	//新增
	public async insertData(): Promise<void> {
		if (this.blockListForm.value.REPORT_REASON1 == '' || this.blockListForm.value.REPORT_REASON1 == null) {
			this.dialog.open(ConfirmComponent, {data: {msgStr: '請選擇通報原因1'}})
		}
    else {
			this.chkArray.forEach(element => {
        console.log(element)
				if (element.value === 'CU_CNAME') {
					this.contentArray.push(this.blockListForm.value.CU_CNAME)
				}
				if (element.value === 'NATIONAL_ID') {
					this.contentArray.push(this.blockListForm.value.NATIONAL_ID)
				}
				if (element.value === 'CU_H_TEL') {
					this.contentArray.push(this.blockListForm.value.CU_H_TEL)
				}
				if (element.value === 'CU_CP_TEL') {
					this.contentArray.push(this.blockListForm.value.CU_CP_TEL)
				}
				if (element.value === 'CU_M_TEL') {
					this.contentArray.push(this.blockListForm.value.CU_M_TEL)
				}
			})
			this.jsonObject['reportUnit'] = this.blockListForm.value.REPORT_UNIT
			this.jsonObject['reportReason1'] = this.blockListForm.value.REPORT_REASON1
			this.jsonObject['reportReason2'] = this.blockListForm.value.REPORT_REASON2
			this.jsonObject['reportReason3'] = this.blockListForm.value.REPORT_REASON3
			this.jsonObject['reportContent'] = this.blockListForm.value.REPORT_CONTENT
			this.jsonObject['useFlag'] = this.blockListForm.value.USE_FLAG
      const content = [];
      // for(var i=0;i<this.chkArray.length;i++) {
      //   content.push({bkColumn: this.chkArray[i], bkContent: this.contentArray[i]});
      // }

      Object.keys(this.testArray).forEach(key => {
        console.log(key)
        content.push({bkColumn: key, bkContent: this.testArray[key]});
      });

			// this.jsonObject['bkColumn'] = this.chkArray
			// this.jsonObject['bkContent'] = this.contentArray
      this.jsonObject['content'] = content;
			console.log(this.chkArray)
			console.log(this.contentArray)
			alert('儲存成功')
			const url = 'f03/f03017action'
			await this.f03017Service.oneseve(url, this.jsonObject).subscribe(data => {
				console.log(data)
				if (data.rspMsg == '儲存成功') {
					this.dialog.open(ConfirmComponent, {data: {msgStr: '儲存成功'}})
					// this.dialogRef.close({ event: 'success' });
				}
			})
		}
	}
	//編輯
	public async updateData(): Promise<void> {
		if (this.blockListForm.value.REPORT_REASON1 == '' || this.blockListForm.value.REPORT_REASON1 == null) {
			this.dialog.open(ConfirmComponent, {data: {msgStr: '請選擇通報原因1'}})
		} else {
      this.chkArray.forEach(element=>{
        if(element.value==='CU_NAME'){
          this.CU_CNAME.nativeElement.checked = true
        }
      })
			// this.chkArray.forEach(element => {
			// 	if (element.value === 'CU_CNAME') {
			// 		this.contentArray.push(this.blockListForm.value.CU_CNAME)
			// 	}
			// 	if (element.value === 'NATIONAL_ID') {
			// 		this.contentArray.push(this.blockListForm.value.NATIONAL_ID)
			// 	}
			// 	if (element.value === 'CU_H_TEL') {
			// 		this.contentArray.push(this.blockListForm.value.CU_H_TEL)
			// 	}
			// 	if (element.value === 'CU_CP_TEL') {
			// 		this.contentArray.push(this.blockListForm.value.CU_CP_TEL)
			// 	}
			// 	if (element.value === 'CU_M_TEL') {
			// 		this.contentArray.push(this.blockListForm.value.CU_M_TEL)
			// 	}
			// })

			this.jsonObject['reportUnit'] = this.blockListForm.value.REPORT_UNIT
			this.jsonObject['reportReason1'] = this.blockListForm.value.REPORT_REASON1
			this.jsonObject['reportReason2'] = this.blockListForm.value.REPORT_REASON2
			this.jsonObject['reportReason3'] = this.blockListForm.value.REPORT_REASON3
			this.jsonObject['reportContent'] = this.blockListForm.value.REPORT_CONTENT
			this.jsonObject['useFlag'] = this.blockListForm.value.USE_FLAG
      this.jsonObject['rowID'] = this.blockListForm.value.ROWID;
			// this.jsonObject['bkColumn'] = this.chkArray
			// this.jsonObject['bkContent'] = this.contentArray
      const content = [];
      Object.keys(this.testArray).forEach(key => {
        content.push({bkColumn: key, bkContent: this.testArray[key],check:this.chkArray});
      });
			console.log(this.chkArray)
			console.log(this.contentArray)
      this.jsonObject['content'] = content;
			alert('儲存成功')
			const url = 'f03/f03017action2'
			await this.f03017Service.oneseve(url, this.jsonObject).subscribe(data => {
				console.log(data)
				if (data.rspMsg == '儲存成功') {
					this.dialog.open(ConfirmComponent, {data: {msgStr: '儲存成功'}})
					// this.dialogRef.close({ event: 'success' });
				}
			})
		}
	}

	// 查詢客戶資料
	selectCustInfo() {
		if (this.blockListForm.value.BK_COLUMN === 'CU_CNAME') {
			this.blockListForm.patchValue({'CU_CNAME': this.data.BK_CONTENT})
		}
		if (this.blockListForm.value.BK_COLUMN === 'NATIONAL_ID') {
			this.blockListForm.patchValue({'NATIONAL_ID': this.data.BK_CONTENT})
		}
		if (this.blockListForm.value.BK_COLUMN === 'CU_H_TEL') {
			this.blockListForm.patchValue({'CU_H_TEL': this.data.BK_CONTENT})
		}
		if (this.blockListForm.value.BK_COLUMN === 'CU_CP_TEL') {
			this.blockListForm.patchValue({'CU_CP_TEL': this.data.BK_CONTENT})
		}
		if (this.blockListForm.value.BK_COLUMN === 'CU_M_TEL') {
			this.blockListForm.patchValue({'CU_M_TEL': this.data.BK_CONTENT})
		}
	}

	//查詢資料表
	// selectBlockList(pageIndex: number, pageSize: number) {
	//   const url = 'f01/blockListSelect';
	//   const applno = this.applno;

	//   let jsonObject: any = {};
	//   jsonObject['page'] = pageIndex;
	//   jsonObject['per_page'] = pageSize;

	//   this.f03017Service.gettable(url, applno, jsonObject).subscribe(data => {
	//     this.blockListDataSource = data.rspBody.list;
	//     this.total = data.rspBody.size;
	//     this.loading = false;
	//   })
	// }

	onQueryParamsChange(params: NzTableQueryParams): void {
		const {pageSize, pageIndex} = params
		this.pageSize = pageSize
		this.pageIndex = pageIndex
		// this.selectBlockList(this.pageIndex, this.pageSize);
	}
}

