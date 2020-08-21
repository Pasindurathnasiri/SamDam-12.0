import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../shared/material.service';
import { MatTableDataSource } from '@angular/material/table';
import { Eqipment } from '../shared/equipment.model';


 
@Component({
  selector: 'app-eb-monthly-reports',
  templateUrl: './eb-monthly-reports.component.html',
  styleUrls: ['./eb-monthly-reports.component.css']
})
export class EbMonthlyReportsComponent implements OnInit {
  AllEquipmentData: any =[];
  public dataSourceEQ: MatTableDataSource<Eqipment>;
 
  title = 'Working Progress of Construction Sites,2020';
   type = 'BarChart';
  data = [
    ['Firefox', 45.0],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 0.7] 
 ];
 columnNames = ['Site', 'Progress'];
 options = {
  colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true
};
   width = 850;
   height = 700;
  constructor(private materialService:MaterialService) {
    this.materialService.getAllEquipment().subscribe(dataEQ=>{
     this.AllEquipmentData=dataEQ;
     
     this.dataSourceEQ=new MatTableDataSource<Eqipment>(this.AllEquipmentData);
     console.log(this.AllEquipmentData.length)
    })
    console.log(this.data);
   
    
   }

  ngOnInit(): void {
    
  }

}
