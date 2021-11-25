import {Component, Inject, OnInit} from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {ConfirmComponent} from 'src/app/common-lib/confirm/confirm.component'
import {F03006Service} from '../f03006.service'

//角色checkBox框架
interface checkBox {
	value: string
	completed: boolean
}
//Nick 組織人員維護-儲存角色設定
@Component({
	selector: 'app-f03006role',
	templateUrl: './f03006amt.component.html',
	styleUrls: ['./f03006amt.component.css', '../../../assets/css/f03.css'],
})
export class F03006amtComponent {
	checked = [] //存取被選到的物件
	check: boolean = false
  one: any[] = [] //裝一開始的資料表
	constructor(public dialogRef: MatDialogRef<F03006amtComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f03006Service: F03006Service) {}
	submit() {}
	ngOnInit(): void {
		console.log(this.data)
		console.log(this.data.SOURCE)
		this.getCheckList()
	}


  limit(x: string, name: string) {
		x = x.replace(/\D/g, '')
		if (x.length > 0) {
			x = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		}
    console.log(x)
    console.log(name)

				switch (name) {
					case 'MAX_APPROVE_AMT':
						this.data.MAX_APPROVE_AMT = x
						break

				}


	}


	//載入選項
	setAll(completed: boolean) {
		for (const obj of this.data.CHECKBOX) {
			obj.completed = completed
			console.log(this.data)
		}
	}

	//取消
	onNoClick(): void {
		this.dialogRef.close()
	}
	// 如果該row的isChk屬性為true就存入陣列
	test: any
	getCheckList() {
		this.checked = this.data.SOURCE.filter(data => data.MAX_APPROVE_AMTt <= this.test)


	}

	//儲存角色設定
	public async confirmAdd(): Promise<void> {
		const baseUrl = 'f03/f03006action9'
		var valArray: string[] = []

		console.log(this.data)
		console.log(this.data.SOURCE)
		let jsonObject: any = {}
		// let jsonObjects: any = [];
		// let array: [];
		jsonObject['empNo'] = this.data.empNo
		const array = this.data.SOURCE.filter(item => item.MAX_APPROVE_AMT >= 0).map(item => ({
			empNo: this.data.empNo,
			prodType: item.PROD_CODE,
			maxApproveAmt: item.MAX_APPROVE_AMT,
		}))


		console.log(array)
		let msgStr = ''
		this.f03006Service.saveEmployeeRole(baseUrl, array).subscribe(data => {
			console.log(data)
			msgStr = data.rspCode === '0000' && data.rspMsg === '成功' ? '儲存成功！' : '儲存失敗！'
			const childernDialogRef = this.dialog.open(ConfirmComponent, {
				data: {msgStr: msgStr},
			})
			if (msgStr === '儲存成功！') {
				this.dialogRef.close({event: 'success'})
			}
		})
	}

}
