import { Injectable } from '@angular/core';
import {Site} from './site.model'
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SiteService {
  endpoint: string = 'http://localhost:3000/api/GetAllSites';
  endpoint_2: string = 'http://localhost:3000/api';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

//Add Site Details
  postSite(site: Site){
    console.log(site.no_of_sk);
    return this.http.post(environment.URI+'/addSite',site,this.noAuthHeader)
  }

//Get all site Details
GetAllSites(){
  return this.http.get(`${this.endpoint}`);
}

//get site details
getSiteDetails(id):Observable<any>{
  let API_URL = `${this.endpoint_2}/read-site-details/${id}`;
  return this.http.get(API_URL,{headers:this.headers})
  .pipe(
    map((res:Response)=>{
      return res || {}
    }),
    catchError(this.errorMgmt)
  )

}

//Error Handling
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

