import { Injectable } from '@angular/core';
import { Vehicle} from '../shared/vehicle.model';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  endpoint: string = 'http://localhost:3000/api';
  endpoint_getAllVehicle: string= 'http://localhost:3000/api/GetAllVehicles';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http:HttpClient) { }

  //Add Vehicle
  AddVehicle(vehicle:Vehicle){
    return this.http.post(environment.URI+'/addVehicle',vehicle,this.noAuthHeader);
  }

  //getAll vehicles
  GetAllVehicles(){
    return this.http.get(`${this.endpoint_getAllVehicle}`);
  }
}

