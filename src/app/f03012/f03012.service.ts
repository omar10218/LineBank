import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {BaseService} from '../base.service'

@Injectable({
	providedIn: 'root',
})
export class F03012Service extends BaseService {
	constructor(protected httpClient: HttpClient) {
		super(httpClient)
	}

	getComePareDataSetList(baseUrl: string, jsonObject: JSON): Observable<any> {
		return this.postJsonObject(baseUrl, jsonObject)
		// let targetUrl = `${baseUrl}?page=${pageIndex}&per_page=${pageSize}`;
		// return this.postHttpClient(targetUrl);
	}
	saveComePareDataSetList(baseUrl: string, formData: FormData): Observable<any> {
		return this.postFormData(baseUrl, formData)
	}
	getRoleFunction(baseUrl: string, roleNo: String): Observable<any> {
		let targetUrl = `${baseUrl}?roleNo=${roleNo}`
		return this.postHttpClient(targetUrl)
	}
		//儲存前處理千分位
		Cut(s: string)  {
			if (s != null) {
				s = s.replace(/,/g, "")
			}

			return s
		}
	update(baseUrl: string, data: any, oldCompareTable: string, oldCompareColumn: string, setValueLow: string, setValueHight: string, compareType: string, oldCompareType: string): any {
		const formdata: FormData = new FormData()
		// formdata.append('setValue', data.setValue);
		formdata.append('oldCompareTable', oldCompareTable)
		formdata.append('oldCompareColumn', oldCompareColumn)
		formdata.append('oldCompareType', data.oldCompareType)
		formdata.append('oldSetValueHight', data.oldSetValueHight)
		formdata.append('oldSetValueLow', data.oldSetValueLow)


		formdata.append('compareTable', data.compareTable)
		formdata.append('compareColumn', data.compareColumn)
		formdata.append('setValueLow',this.Cut( data.setValueLow))
		formdata.append('setValueHight', this.Cut(data.setValueHight))
		formdata.append('compareType', data.compareType)
		return this.saveOrEditMsgString(baseUrl, formdata)
	}

	// 送出選中的項目轉json後送到後端
	submit(baseUrl: string, json: JSON): Observable<any> {
		return this.postJsonObject(baseUrl, json)
	}
	// 選中TABLE欄位資訊
	public getColumn(jsoonObject: JSON): Observable<any> {
		let targetUrl = 'f03/f03012action6'
		return this.postJsonObject(targetUrl, jsoonObject)
	}
}
