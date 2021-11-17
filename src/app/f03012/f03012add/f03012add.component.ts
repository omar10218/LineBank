import {Component, OnInit} from '@angular/core'
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms'
import {MatDialog} from '@angular/material/dialog'
import {OptionsCode} from 'src/app/interface/base'
import {F03012Service} from '../f03012.service'
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FADE_CLASS_NAME_MAP } from 'ng-zorro-antd/modal'
@Component({
	selector: 'app-f03012add',
	templateUrl: './f03012add.component.html',
	styleUrls: ['./f03012add.component.css', '../../../assets/css/f03.css'],
})
export class F03012addComponent implements OnInit {
	selectedValue1: string
	selectedValue2: string
  error:string

	//下拉
	selectedColumn: OptionsCode[] = []
	setValueHight: string
	compareType: string
	setValueLow: string
	compareTableCode: OptionsCode[] = []
	compareColumnCode: OptionsCode[] = []

	submitted = false
	// compareTableSetForm: FormGroup = this.fb.group({
	// 	compareTable: ['', [Validators.required]],
	// 	compareColumn: ['', [Validators.required]],
	// 	compareType: ['', [Validators.required]],
	// 	setValueHight: ['', [Validators.required]],
	// 	setValueLow: ['', [Validators.required]],
	// })

	constructor(private fb: FormBuilder, private f03012Service: F03012Service, public dialog: MatDialog,private alert: NzAlertModule) {}

	ngOnInit(): void {
    this.getData()
		// this.f03012Service.getSysTypeCode('COMPARE_TABLE').subscribe(data => {
		// 	for (const jsonObj of data.rspBody.mappingList) {
		// 		const codeNo = jsonObj.codeNo
		// 		const desc = jsonObj.codeDesc
		// 		this.compareTableCode.push({value: codeNo, viewValue: desc})
		// 	}
		// 	for (let i = 0; i < this.compareTableCode.length; i++) {
		// 		this.f03012Service.getSysTypeCode(this.compareTableCode[i].value).subscribe(data => {
		// 			for (const jsonObj of data.rspBody.mappingList) {
		// 				const codeNo = jsonObj.codeNo
		// 				const desc = jsonObj.codeDesc
		// 				this.compareColumnCode.push({value: codeNo, viewValue: desc})
		// 			}
		// 		})
		// 	}
		// })
	}

  getData(){
    this.f03012Service.getSysTypeCode('COMPARE_TABLE').subscribe(data => {
			for (const jsonObj of data.rspBody.mappingList) {
				const codeNo = jsonObj.codeNo
				const desc = jsonObj.codeDesc
				this.compareTableCode.push({value: codeNo, viewValue: desc})
			}
			for (let i = 0; i < this.compareTableCode.length; i++) {
				this.f03012Service.getSysTypeCode(this.compareTableCode[i].value).subscribe(data => {
					for (const jsonObj of data.rspBody.mappingList) {
						const codeNo = jsonObj.codeNo
						const desc = jsonObj.codeDesc
						this.compareColumnCode.push({value: codeNo, viewValue: desc})
					}
				})
			}
		})
  }

	changeSelect() {
    let jsonObject:any={};
    jsonObject['compareTable']=this.selectedValue1;
    this.f03012Service.getColumn(jsonObject)
    .subscribe(data => {
      console.log(data)
      for (const jsonObj of data.rspBody.mappingList){
        const codeNo=jsonObj.codeNo;
        const desc = jsonObj.codeDesc;
        this.selectedColumn.push({ value:codeNo, viewValue:desc})
      }
    })
    // 		this.selectedColumn = []
		// this.f03012Service.getSysTypeCode(this.selectedValue1).subscribe(data => {
		// 	console.log(data)
		// 	for (const jsonObj of data.rspBody.mappingList) {
		// 		const codeNo = jsonObj.codeNo
		// 		const desc = jsonObj.codeDesc
		// 		this.selectedColumn.push({value: codeNo, viewValue: desc})
		// 	}
		// })
	}

	formControl = new FormControl('', [
		Validators.required,
		// Validators.email,
	])

	add() {
		let msg = ''
		this.submitted = true
    console.log(this.alert)
		// if (!this.compareTableSetForm.valid) {
		//   msg = '資料格式有誤，請修正!';
		// } else {
		const url = 'f03/f03012action5'

		let jsonObject: any = {}
		jsonObject['compareTable'] = this.selectedValue1
		jsonObject['compareColumn'] = this.selectedValue2
		jsonObject['compareType'] = this.compareType
		jsonObject['setValueLow'] = this.setValueLow
		jsonObject['setValueHight'] = this.setValueHight
		console.log(this.compareType)
    this.error = 'test'
		this.f03012Service.submit(url, jsonObject).subscribe(data => {
			alert((msg = data.rspMsg))
      this.getData()
      this.error = data.rspMsg

		})
		// const formdata: FormData = new FormData();
		// formdata.append('elCompareDataSet[0].compareTable', this.compareTableSetForm.value.compareTable);
		// formdata.append('elCompareDataSet[0].compareColumn', this.compareTableSetForm.value.compareColumn);
		// formdata.append('elCompareDataSet[0].compareType', this.compareTableSetForm.value.compareType);
		// formdata.append('elCompareDataSet[0].setValueHight', this.compareTableSetForm.value.setValueHight);
		// formdata.append('elCompareDataSet[0].setValueLow', this.compareTableSetForm.value.setValueLow);
		// formdata.append('setValue', this.compareTableSetForm.value.setValue);
		// console.log(formdata);
		// console.log(url);
		// this.f03012Service.saveComePareDataSetList(url, formdata).subscribe(data => {
		//  alert(msg = data.rspMsg)
		//  window.location.reload();
		//   console.log(formdata);
		// console.log(url);
		//   console.log(data);
		// });
		// }
		// setTimeout(() => {
		//   const DialogRef = this.dialog.open(F03012confirmComponent, { data: { msgStr: msg } });
		//   window.location.reload();
		// }, 1500);
	}

	clear() {
		this.selectedValue1 = null
		this.selectedValue2 = null
		this.compareType = null
		this.setValueHight = ''
		this.setValueLow = ''

	}
	ngAfterViewInit(): void {}
}
