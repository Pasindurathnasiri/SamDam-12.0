import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup ,Validators, NgForm } from '@angular/forms';
import { MaterialService } from '../shared/material.service';
import { MatTableDataSource } from '@angular/material/table';
import { SiteService } from '../shared/site.service';
import { Eqipment } from '../shared/equipment.model';

interface Site{
  _id:string;
  site_id:string;
  name: string;
  site: Array<Site>;
}

 
@Component({
  selector: 'app-eb-monthly-reports',
  templateUrl: './eb-monthly-reports.component.html',
  styleUrls: ['./eb-monthly-reports.component.css']
})
export class EbMonthlyReportsComponent implements OnInit {
  siteControl = new FormControl('',Validators.required);
  siteFormControl = new FormControl('', Validators.required);
  sites: Site [] = [];
  AllSiteDate:any=[];
  AllEquipmentData: any =[];
  chartdata: any=[];
  public dataSourceEQ: MatTableDataSource<Eqipment>;
 
  title = 'Available Stocks in Warehouse,2020';
  title2='';
  type = 'BarChart';
  type2='BarChart';
  columnNames2 = ['Equipment', 'Amount'];
 
 columnNames = ['Equipment', 'Amount'];
 options2 = {
  colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true
};
 options = {
  colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true
};
   width2 = 850;
   width = 850;
   height = 700;
   height2 = 700;
  constructor(private materialService:MaterialService,private siteService:SiteService) {
    this.materialService.getAllEquipment().subscribe(dataEQ=>{
     this.AllEquipmentData=dataEQ;
     console.log(this.AllEquipmentData);
     
    })

    //get sites
    this.siteService.GetAllSites().subscribe(data =>{
      this.AllSiteDate = data;
      //in here pass sites to mat-select
       setTimeout(()=>{
  
       },0)
       this.sites = this.AllSiteDate;
    })
    
    
   }

  ngOnInit(): void {
    
  }

  getData(){
    var f_index;
    var s_index;
    for(var i=0;i<this.AllEquipmentData.length;i++){
      f_index=this.AllEquipmentData[i].eq_type[0].eq_type;
      s_index=this.AllEquipmentData[i].amount;
      
      this.chartdata[i] =[`${f_index}`,s_index];
    }
    return this.chartdata;
  }

  getData2(){
    var f_index;
    var s_index;
    for(var i=0;i<this.AllEquipmentData.length;i++){
      f_index=this.AllEquipmentData[i].eq_type[0].eq_type;
      s_index=this.AllEquipmentData[i].amount;
      
      this.chartdata[i] =[`${f_index}`,s_index];
    }
    //return this.chartdata;
  }

}
