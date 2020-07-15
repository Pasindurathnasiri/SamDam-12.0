import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

import { Material} from '../shared/material.model'

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  headers = new HttpHeaders().set('Content-Type','application/json');
  endpoint: string = 'http://localhost:3000/api/GetAllMaterialTypes';
  endpoint_2: string = 'http://localhost:3000/api';
 
  noAuthHeader = { headers:new HttpHeaders({'NoAuth':'True'})};

  constructor(private http:HttpClient) { }

  //Add Material
  postMaterial(material:Material){
    //console.log(material);
   return this.http.post(environment.URI+'/addMaterial',material,this.noAuthHeader);
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
