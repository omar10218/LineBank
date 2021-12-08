import {Component, OnInit} from '@angular/core'
import {FormGroup, FormBuilder} from '@angular/forms'
import {OptionsCode} from 'src/app/interface/base'
import {Childbwscn2Service} from '../childbwscn2.service'
import {MatTableDataSource} from '@angular/material/table'
import {NzGridModule} from 'ng-zorro-antd/grid'

@Component({
	selector: 'app-childscn10page3',
	templateUrl: './childbwscn2page2.component.html',
	styleUrls: ['./childbwscn2page2.component.css', '../../../../assets/css/child.css'],
})
export class childbwscn2page2Component implements OnInit {
	constructor(private fb: FormBuilder, private Childbwscn2Service: Childbwscn2Service,) {}
	BW_DSS4_RISKDSUB_LIST =[] //風險模型變數設定

	dateCode: OptionsCode[] = []
	dateValue: string

	private applno: string


	ngOnInit(): void {
		this.applno = sessionStorage.getItem('applno')

		this.getDSS3()

	}


	getDSS3() {
		this.applno = sessionStorage.getItem('applno')
		const url = 'f01/childBwScn2action2'
		let jsonObject: any = {}
		jsonObject['applno'] = this.applno
		this.Childbwscn2Service.getDate_Json(url, jsonObject).subscribe(data => {
			//系統決策
			this.BW_DSS4_RISKDSUB_LIST = data.rspBody.bwDss4Riskdsub //風險模型變數設定
		})
	}


	// changeDate() {
	//   this.getDSS3(this.dateValue);
	// }
}
