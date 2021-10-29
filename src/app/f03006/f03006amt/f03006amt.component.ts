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
  check:boolean=false ;
	constructor(public dialogRef: MatDialogRef<F03006amtComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public f03006Service: F03006Service) {}
	submit() {}
	ngOnInit(): void {
		console.log(this.data)
		console.log(this.data.SOURCE)
    this.getCheckList()
	}
n
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
  test:any
	getCheckList() {
		this.checked = this.data.SOURCE.filter(
      data => data.MAX_APPROVE_AMT=this.test)

      // {
      //   if(data.MAX_APPROVE_AMT==! null){
      //     this.check=true
      //   }
      //   console.log(data)
      //   console.log(this.check)
      // });
      // console.log(this.checked)

	}

	//儲存角色設定
	// public async confirmAdd(): Promise<void> {

	//   const baseUrl = 'f03/f03006action9';
	//   var valArray: string[] = new Array;
	//   for (const obj of this.data.CHECKBOX) {
	//     if (obj.completed) { valArray.push(obj.value); }
	//   }
	//   console.log(this.data)
	//   console.log(this.data.SOURCE)
	//   let jsonObject: any = {};
	//   let jsonObjects: any = [];
	//   let array: [];
	//   jsonObject['empNo'] = this.data.empNo;
	//   for( let i=0; i<this.data.SOURCE.length; i++){
	//     console.log(this.data.SOURCE[i].PROD_CODE)
	//     array =this.data.SOURCE[i].PROD_CODE;
	//     jsonObject['maxApproveAmt'] =this.data.SOURCE[i].MAX_APPROVE_AMT ;
	//     jsonObjects.push(jsonObject)
	//   }
	//   console.log(array)
	//   let msgStr = '';
	//    this.f03006Service.saveEmployeeRole(baseUrl, jsonObject).subscribe(data => {
	//      console.log(data)
	//     msgStr = (data.rspCode === '0000' && data.rspMsg === '儲存成功!') ? '儲存成功！' : '儲存失敗！';
	//     const childernDialogRef = this.dialog.open(ConfirmComponent, {
	//       data: { msgStr: msgStr }
	//     });
	//     if (msgStr === '儲存成功！') { this.dialogRef.close({ event:'success' }); }
	//   });
	// }
	public async confirmAdd(): Promise<void> {
		// this.getCompareDataSet()
		let jsonObjects: any = []
		const baseUrl = 'f03/f03006action9'
		let msgStr = ''
		this.checked = this.data.CHECKBOX.filter(i => i.isChk == true)
		// 如果未選中任何項目
		if (this.checked.length == 0) {
			alert('未選中任何項目!!')
		}
		for (let obj of this.checked) {
			console.log(obj)
			let jsonObject: any = {}
			jsonObject['empNo'] = this.data.empNo
			jsonObject['prodType'] = this.data.SOURCE.PROD_CODE
			jsonObject['maxApproveAmt'] = this.data.SOURCE.MAX_APPROVE_AMT
			jsonObjects.push(jsonObject)
		}
		console.log(jsonObjects)
    this.f03006Service.saveEmployeeRole(baseUrl, jsonObjects).subscribe(data => {
			console.log(data)
			msgStr = data.rspCode === '0000' && data.rspMsg === '儲存成功!' ? '儲存成功！' : '儲存失敗！'
			const childernDialogRef = this.dialog.open(ConfirmComponent, {
				data: {msgStr: msgStr},
			})
			if (msgStr === '儲存成功！') {
				this.dialogRef.close({event: 'success'})
			}
		})

	}
}
