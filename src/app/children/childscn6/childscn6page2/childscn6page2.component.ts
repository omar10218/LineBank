import {DatePipe} from '@angular/common'
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core'
import {PageEvent, MatPaginator} from '@angular/material/paginator'
import {Sort, MatSort} from '@angular/material/sort'
import {MatTableDataSource} from '@angular/material/table'
import {ActivatedRoute, Router, NavigationEnd, Data} from '@angular/router'
import {NzTableQueryParams} from 'ng-zorro-antd/table'
import {NgxWatermarkOptions} from 'ngx-watermark'
import {ChildrenService} from '../../children.service'
import {Childscn6Service} from '../childscn6.service'
import {NzTableModule} from 'ng-zorro-antd/table'
@Component({
	selector: 'app-childscn6page2',
	templateUrl: './childscn6page2.component.html',
	styleUrls: ['./childscn6page2.component.css', '../../../../assets/css/child.css'],
})
export class Childscn6page2Component implements OnInit, AfterViewInit {
	constructor(private childscn6Service: Childscn6Service, private router: Router, public childService: ChildrenService, private pipe: DatePipe, private NzTableModule: NzTableModule) {
		// this.router.events.subscribe((event) => {
		//   if (event instanceof NavigationEnd) {
		//     this.getJcicList();
		// when onSameUrlNavigation: 'reload'，會重新觸發 router event
		// }
		// });
	}

	private applno: string // 會員編號
	private cuid: string
	private queryDate: string = '2021-10-25 11:52:57.301' // 現在時間
	// JcicMasterDataSource:readonly Data[] = [];

	listSource: any = []
	total = 1
	pageIndex = 1
	pageSize = 50
index: any
	watermark: string

	ngOnInit(): void {
		this.applno = sessionStorage.getItem('applno')
		this.cuid = sessionStorage.getItem('cuid')
		// this.queryDate = sessionStorage.getItem('queryDate');

		this.getJcicList()
		console.log(this.queryDate)
		console.log(this.applno)
	}

	// 取得聯徵彙整清單
	getJcicList() {
		let jsonObject: any = {}
		jsonObject['applno'] = this.applno
		jsonObject['queryDate'] = this.queryDate
		this.childscn6Service.getMASTERJCICList(jsonObject).subscribe(data => {
			console.log(data)
			this.listSource = data.rspBody
			console.log(this.listSource)
		})
	}

	ngAfterViewInit() {

	}


}
