import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { CustomerInterface } from './customer';

const BASE_URL = 'http://localhost:8080';

export class Customer {
  constructor(
  	public firstName: string,
  	public surname: string,
  	public dob: string,
  	public streetAddress: string){}
}

@Injectable()
export class CustomerService implements CustomerInterface {

  	constructor(private http: HttpClient) {}

	public getCustomers() : Observable<any>{
	   	return this.http.get("http://localhost:8080/customer/get")
			.pipe(tap( data => console.log(data),
				error => this.handleError(error)));
	}

	private handleError(error: any) {
		console.log(error);
		return Observable.throw("Server error (" + error.status + "): " + error.text())
	}
}