import { Component, Inject, OnInit } from '@angular/core'
import { Validators } from '@angular/forms'
import { FormControl } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ConfirmComponent } from 'src/app/common-lib/confirm/confirm.component'
import { OptionsCode } from 'src/app/interface/base'
import { F03012Service } from '../f03012.service'

// 絕對值相對值的對應中文
interface option {
	option: string
	opDesc: string
}

@Component({
	selector: 'app-f03012edit',
	templateUrl: './f03012edit.component.html',
	styleUrls: ['./f03012edit.component.css', '../../../assets/css/f03.css'],
})
export class F03012editComponent implements OnInit {
	selectedValue1: string
	selectedValue2: string
	setValue: string
	selectedColumn: OptionsCode[] = []
	myDiv: boolean //最高門檻是否啟動判斷
	compareTableCode: OptionsCode[] = []
	compareColumnCode: OptionsCode[] = []
	pageSize = 10
	pageIndex = 1
	compareColumn: string
	oldCompareTable: string
	oldCompareColumn: string
	oldSetValueLow: string
	oldSetValueHight: string
	oldCompareType: string
	compareType: string
	setValueLow: string
	setValueHight: string
	low: string;
	hingt: string;
	options: option[] = [
		{ option: '1', opDesc: '絕對值' },
		{ option: '2', opDesc: '相對值' },
	]

	constructor(
		public dialogRef: MatDialogRef<F03012editComponent>,
		private f03012Service: F03012Service,
		public dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	formControl = new FormControl('', [
		Validators.required,
		// Validators.email,
	])

	getErrorMessage() {
		return this.formControl.hasError('required') ? 'Required field' : ''
	}

	ngOnInit(): void {
	
		this.getData()
		this.test123(this.oldCompareType)
		if (this.oldCompareType == "2") {
			this.low = this.toCurrency(this.data.setValueLow + '')
		} else {

			this.low = this.toCurrency(this.data.setValueLow + '')
			this.hingt = this.toCurrency(this.data.setValueHight + '')
		}

	}
	getData() {
		// console.log(this.data.setValue)
		this.f03012Service.getSysTypeCode('COMPARE_TABLE').subscribe(data => {
			for (const jsonObj of data.rspBody.mappingList) {
				const codeNo = jsonObj.codeNo
				const desc = jsonObj.codeDesc
				this.compareTableCode.push({ value: codeNo, viewValue: desc })
			}
		})
		// this.f03012Service.getSysTypeCode(this.data.compareTable).subscribe(data => {
		// 	for (const jsonObj of data.rspBody.mappingList) {
		// 		const codeNo = jsonObj.codeNo
		// 		const desc = jsonObj.codeDesc
		//     console.log(jsonObj.codeDesc)
		//     console.log(jsonObj.codeNo)
		// 		this.compareColumnCode.push({value: codeNo, viewValue: desc})
		//     console.log(this.compareColumnCode)
		// 	}
		// })


		let jsonObj: any = {};
		jsonObj['compareTable'] = this.data.compareTable;
		this.f03012Service.getColumn(jsonObj).subscribe(data => {
			for (const jsonObj of data.rspBody.mappingList) {
				const codeNo = jsonObj.codeNo
				const desc = jsonObj.codeDesc
				this.compareColumnCode.push({ value: codeNo, viewValue: desc })
			}
		})

		this.oldCompareTable = this.data.compareTable
		this.compareColumn = this.data.compareColumn
		this.oldCompareColumn = this.data.oldCompareColumn
		this.oldCompareType = this.data.compareType
		console.log(this.oldCompareType)
		if (this.oldCompareType == "2") {
			this.setValueLow = this.data.setValueLow
		} else if (this.oldCompareType == "1") {
			this.setValueLow = this.data.setValueLow
			this.setValueHight = this.data.setValueHight
		}
		this.oldSetValueLow = this.data.oldSetValueLow
		console.log(this.oldSetValueLow)
		this.oldSetValueHight = this.data.oldSetValueHight
		console.log(this.oldSetValueHight)
	}
	//儲存前處理千分位
	Cut(s: string) {
		if (s != null) {
			s.toString();
			s = s.replace(/,/g, "")
		}

		return s
	}

	public async save(): Promise<void> {
		let msgStr: string = ''
		let baseUrl = 'f03/f03012action2'
	
		if (this.compareType === '2' ) {
			if (Number(this.low) >= 1) {
				alert("不可以大於1");
				return;
			}

			if (!(this.low.includes('.'))) {
				alert("請填小數點");
				return;
			}
			msgStr = await this.f03012Service.update(baseUrl, this.data, this.oldCompareTable, this.oldCompareColumn, this.oldSetValueLow, this.oldSetValueHight, this.low, this.hingt, this.compareType, this.oldCompareType)
			const childernDialogRef = this.dialog.open(ConfirmComponent, {
				data: { msgStr: msgStr },
			})
			if (msgStr === '儲存成功！') {
				this.dialogRef.close({ event: 'success' })
			}
			this.f03012Service.resetfn();
			
		} else if (this.compareType == '1') {
			if ((this.low.includes('.'))) {
				alert("請填整數");
				return;
			}else if(this.hingt<this.low){
				alert('設定最高門檻需大於設定最低門檻!!')
				return
			}else{
				msgStr = await this.f03012Service.update(baseUrl, this.data, this.oldCompareTable, this.oldCompareColumn, this.oldSetValueLow, this.oldSetValueHight, this.low, this.hingt, this.compareType, this.oldCompareType)
				const childernDialogRef = this.dialog.open(ConfirmComponent, {
					data: { msgStr: msgStr },
				})
				if (msgStr === '儲存成功！') {
					this.dialogRef.close({ event: 'success' })
				}
				this.f03012Service.resetfn();
			}
		
		}

	}

	changeSelect() {
		// jsonObject['compareTable']=this.selectedValue1;
		// this.f03012Service.getColumn(jsonObject)
		// .subscribe(data => {
		//   console.log(data)
		//   for (const jsonObj of data.rspBody.mappingList){
		//     const codeNo=jsonObj.codeNo;
		//     const desc = jsonObj.codeDesc;
		//     this.selectedColumn.push({ value:codeNo, viewValue:desc})
		//   }
		// })

		this.f03012Service.getSysTypeCode(this.data.compareTable).subscribe(data => {
			for (const jsonObj of data.rspBody.mappingList) {
				const codeNo = jsonObj.codeNo
				const desc = jsonObj.codeDesc
				this.compareColumnCode.push({ value: codeNo, viewValue: desc })
			}
		})
	}

	// 取消
	onNoClick(): void {
		this.dialogRef.close()
		window.location.reload();
	}
	isNumber(value: any) { return /^-?[\d.]+(?:e-?\d+)?$/.test(value); }

	//去除符號/中英文
	toNumber(data: string) {
		return data != null ? data.replace(/[^\w\s]|_/g, '.') : data;

	}
	// 只允許輸入小數點
	numberOnly(event: { which: any; keyCode: any; }): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;

		if (charCode == 46) {
			return true;
		}
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			const childernDialogRef = this.dialog.open(ConfirmComponent, {
				data: { msgStr: '請輸入數字!' }
			});
			return false;
		}
		return true;
	}

	//+逗號
	toCurrency(amount: string) {
		return amount != null ? amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : amount;
	}
	// 判斷比對方式來去鎖住最高門檻
	test123(a) {
		this.compareType = a
		console.log(this.compareType)
		if (a == 2) {
			return this.myDiv = true
		}
		else {
			return this.myDiv = false
		}
	}
}
