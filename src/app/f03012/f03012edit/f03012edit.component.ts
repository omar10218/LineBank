import {Component, Inject, OnInit} from '@angular/core'
import {Validators} from '@angular/forms'
import {FormControl} from '@angular/forms'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {ConfirmComponent} from 'src/app/common-lib/confirm/confirm.component'
import {OptionsCode} from 'src/app/interface/base'
import {F03012Service} from '../f03012.service'

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
		{option: '1', opDesc: '絕對值'},
		{option: '2', opDesc: '相對值'},
	]

	constructor(public dialogRef: MatDialogRef<F03012editComponent>, private f03012Service: F03012Service, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {}

	formControl = new FormControl('', [
		Validators.required,
		// Validators.email,
	])

	getErrorMessage() {
		return this.formControl.hasError('required') ? 'Required field' : ''
	}

	ngOnInit(): void {}
	getData() {
		console.log(this.data)
		// console.log(this.data.setValue)
		this.f03012Service.getSysTypeCode('COMPARE_TABLE').subscribe(data => {
			for (const jsonObj of data.rspBody.mappingList) {
				const codeNo = jsonObj.codeNo
				const desc = jsonObj.codeDesc
				this.compareTableCode.push({value: codeNo, viewValue: desc})
			}
		})
		this.f03012Service.getSysTypeCode(this.data.compareTable).subscribe(data => {
			for (const jsonObj of data.rspBody.mappingList) {
				const codeNo = jsonObj.codeNo
				const desc = jsonObj.codeDesc
				this.compareColumnCode.push({value: codeNo, viewValue: desc})
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
	public async save(): Promise<void> {
		let msgStr: string = ''
		let baseUrl = 'f03/f03012action2'
		msgStr = await this.f03012Service.update(baseUrl, this.data, this.oldCompareTable, this.oldCompareColumn, this.setValueLow, this.setValueHight, this.compareType, this.oldCompareType)
		console.log(this.data)
		console.log(this.compareType)
		console.log(this.setValueHight)
		const childernDialogRef = this.dialog.open(ConfirmComponent, {
			data: {msgStr: msgStr},
		})
		if (msgStr === '儲存成功！') {
			this.dialogRef.close({event: 'success'})
		}
    this.getData()
	}

	changeSelect() {
		// this.data.compareColumn = '';
		this.f03012Service.getSysTypeCode(this.data.compareTable).subscribe(data => {
			for (const jsonObj of data.rspBody.mappingList) {
				const codeNo = jsonObj.codeNo
				const desc = jsonObj.codeDesc
				this.compareColumnCode.push({value: codeNo, viewValue: desc})
			}
		})
	}

	onNoClick(): void {
		this.dialogRef.close()
	}
}
