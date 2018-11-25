import { Observable, of } from 'rxjs'

export interface CustomerInterface {

	getCustomers() : Observable<any>;

}
