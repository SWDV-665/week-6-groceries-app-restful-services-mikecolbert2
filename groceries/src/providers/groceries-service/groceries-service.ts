import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';



/*  
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangedSubject: Subject<boolean>;

  baseURL = "http://localhost:8080"

  constructor(public http: HttpClient) {
    console.log('Hello GroceriesServiceProvider Provider');

    this.dataChangedSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangedSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

private extractData(res: Response){
  let body = res;
  return body || {};
}

private handleError(error: Response | any){
  let errMsg: string;
  if (error instanceof Response) {
    const err = error || '';
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}


  removeItem(index){
    // remove an item from a javascript array
    this.items.splice(index, 1);
  }

  addItem(item){
    //push this item from the login into our items array
    this.items.push(item);
  }

  editItem(item, index){
    this.items[index] = item; 
  }

}
