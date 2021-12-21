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
		// this.oldSetValue = this.data.setValue;
		this.compareType = this.data.compareType
		this.setValueLow = this.data.setValueLow
		this.setValueHight = this.data.setValueHight
		this.oldSetValueLow = this.data.oldSetValueLow
		this.oldSetValueHight = this.data.oldSetValueHight

	}
		//儲存前處理千分位
		Cut(s: string)  {
			if (s != null) {
        s.toString();
				s = s.replace(/,/g, "")
			}

			return s
		}

	public async save(): Promise<void> {
		let msgStr: string = ''
		let baseUrl = 'f03/f03012action2'
		msgStr = await this.f03012Service.update(baseUrl, this.data, this.oldCompareTable, this.oldCompareColumn, this.setValueLow.toString(), this.setValueHight.toString(), this.compareType, this.oldCompareType)
		const childernDialogRef = this.dialog.open(ConfirmComponent, {
			data: { msgStr: msgStr },
		})
		if (msgStr === '儲存成功！') {
			this.dialogRef.close({ event: 'success' })
		}
		// this.getData()
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
			// window.location.reload();
	}
	isNumber(value: any) { return /^-?[\d.]+(?:e-?\d+)?$/.test(value); }

	//去除符號/中英文
	toNumber(data: string) {
		if(data != null)
		{
		  data.toString();
		  data.replace(/[^\w\s]|_/g, '')
		}
			return  data
	
		}
	// 只允許輸入數字
	numberOnly(event: { which: any; keyCode: any; }): boolean {
		console.log(event)
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode < 110 && charCode > 110) {
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

}
