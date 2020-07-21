import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

import { Material} from '../shared/material.model';
import {MaterialDates} from '../shared/material-dates.model'

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  headers = new HttpHeaders().set('Content-Type','application/json');
  endpoint: string = 'http://localhost:3000/api/GetAllMaterialTypes';
  endpoint_1: string= 'http://localhost:3000/api/GetAllMaterialDates';
  endpoint_2: string = 'http://localhost:3000/api';
 
  noAuthHeader = { headers:new HttpHeaders({'NoAuth':'True'})};

  constructor(private http:HttpClient) { }

  //Add Material
  postMaterial(material:Material){
    //console.log(material);
   return this.http.post(environment.URI+'/addMaterial',material,this.noAuthHeader);
  }

  //add material dates
  postMaterialDates(mat_date:MaterialDates){
   // console.log(mat_date);
   return this.http.post(environment.URI+'/addMaterialDates',mat_date,this.noAuthHeader);
  }
  
// get all mat dates
   getAllMaterialDates(){
     return this.http.get(`${this.endpoint_1}`);
   }

  //GetAll Material types
  getAllMaterialTypes(){
    return this.http.get(`${this.endpoint}`);
  }

  //Delete Material Type
  DeleteMaterial(mat_id):Observable<any>{
    var API_URL = `${this.endpoint_2}/delete-material-type/${mat_id}`;
    return this.http.delete(API_URL)
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