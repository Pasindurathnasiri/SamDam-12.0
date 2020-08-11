import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { environment } from '../../environments/environment';
import {QSTask} from '../shared/qstask.model'
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QsService {
  headers = new HttpHeaders().set('Content-Type','application/json');
  endpoint: string = 'http://localhost:3000/api';

  noAuthHeader = { headers:new HttpHeaders({'NoAuth':'True'})};

 
  constructor(private http:HttpClient) { }

  //add QS task for site
  addTaskQS(qsTask:QSTask){
    return this.http.post(environment.URI+'/addQSTask',qsTask,this.noAuthHeader);
  }

  

}
