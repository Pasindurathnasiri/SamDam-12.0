import { Component, OnInit } from '@angular/core';
import { SiteService} from '../shared/site.service';
import { EmployeeService } from '../shared/employee.service';
import { VehicleService } from '../shared/vehicle.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {UpdateSiteDetailsComponent} from './update-site-details/update-site-details.component'

@Component({
  selector: 'app-ongoing-sites',
  templateUrl: './ongoing-sites.component.html',
  styleUrls: ['./ongoing-sites.component.css']
})
export class OngoingSitesComponent implements OnInit {

  allSiteData: any = [];
  allEmoployeeData: any = [];
  allVehicleData: any = [];
  constructor(private siteService:SiteService,private _bottomSheet:MatBottomSheet,private empService:EmployeeService,private VHService:VehicleService) {
    this.siteService.GetAllSites().subscribe(data=>{
      this.allSiteData=data;
      console.log(this.allSiteData);
      setTimeout(()=>{

      },0)
      
    })

    //employee data get
    this.empService.GetAllEmployees().subscribe(data=>{
      this.allEmoployeeData=data;
     
    })

    //vehicle data get
    this.VHService.GetAllVehicles().subscribe(data=>{
       this.allVehicleData = data;
      
    })

   }

  ngOnInit(): void {
  }

  //get no of employees
  getNoofEmployees(site){
   return site.no_of_sk+site.no_of_usk;
  }

  getAllocatedEmp(site){
    var count=0;
    for(var i=0;i<this.allEmoployeeData.length;i++){
      if(this.allEmoployeeData[i].site[0]._id == site._id){
        count = count+1;
      }
      
    }
   return count;
  }

  getAllocatedVH(site){
    var vhcount=0;
    for(var i=0;i<this.allVehicleData.length;i++){
      if(this.allVehicleData[i].site_id== site._id){
        vhcount = vhcount+1;
      }
    }
    return vhcount;
  }

  getDate(date){
    var dot = new Date(date);
  return dot.toLocaleDateString();
  }

  getType(site){
    return site.type_of_site[0].name;
  }

  openUpdate(site){
    this._bottomSheet.open(UpdateSiteDetailsComponent,{panelClass:'custom-width',data:site})

  }

  deleteSite(site){
    var id = site._id;
    if(window.confirm('Are you sure you want to Delete this Site Details ?')){
      this.siteService.deleteSite(id).subscribe()
    }
    window.alert("Transaction Record Deleted Succeccfully");
    location.reload();
  }

}
