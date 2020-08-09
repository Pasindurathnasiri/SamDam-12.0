import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import {Transaction} from '../shared/accounting.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  headers = new HttpHeaders().set('Content-Type','application/json');
  endpoint: string = 'http://localhost:3000/api';
  endpoint_allTransactions: string = 'http://localhost:3000/api/GetAllTransactions';
  noAuthHeader = { headers:new HttpHeaders({'NoAuth':'True'})};

  constructor(private http:HttpClient) { }

  //add transaction
  addTransaction(transaction:Transaction){
    return this.http.post(environment.URI+'/addTransaction',transaction,this.noAuthHeader);
  }

  //get all transactions
  getAllTransactions(){
    return this.http.get(`${this.endpoint_allTransactions}`);
  }

  //delete transactions
  DeleteTransaction(id):Observable<any>{
    var API_URL=`${this.endpoint}/delete-transaction/${id}`;
    return this.http.delete(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //update transactions
  updateTransaction(id,data):Observable<any>{
    let API_URL = `${this.endpoint}/update-transaction/${id}`;
    return this.http.put(API_URL,data,{headers:this.headers})
    .pipe(
      catchError(this.errorMgmt)
    )
  }


  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
