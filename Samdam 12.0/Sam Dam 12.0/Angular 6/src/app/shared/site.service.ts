import { Injectable } from '@angular/core';
import {Site} from './site.model'
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  endpoint: string = 'http://localhost:3000/api/GetAllSites';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

//Add Site Details
  postSite(site: Site){
    console.log(site);
    return this.http.post(environment.URI+'/addSite',site,this.noAuthHeader)
  }

//Get all site Details
GetAllSites(){
  return this.http.get(`${this.endpoint}`);
}
}
