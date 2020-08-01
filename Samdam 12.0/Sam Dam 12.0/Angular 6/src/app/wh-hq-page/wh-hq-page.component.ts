import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddMaterialComponent} from '../add-material/add-material.component';
import { MaterialService} from '../shared/material.service';
import { MatTableDataSource } from '@angular/material/table';
import { Material} from '../shared/material.model';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {UpdateMaterialTypeComponent} from '../wh-hq-page/update-material-type/update-material-type.component'
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import { MatInfoDateDialogComponent } from '../wh-hq-page/mat-info-date-dialog/mat-info-date-dialog.component';

@Component({
  selector: 'app-wh-hq-page',
  templateUrl: './wh-hq-page.component.html',
  styleUrls: ['./wh-hq-page.component.css']
})
export class WhHqPageComponent implements OnInit {
  AllMaterialData: any =[];
  AllMaterialDatesData: any =[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSourceMatTypes: MatTableDataSource<Material>;
  public dataSourceMatDates: MatTableDataSource<Material>;

  displayedColumns: string [] = ['mat_id', 'name','unit','price','action'];
  displayedColumnsMat: string[]=[];
  
 
  constructor(private dialog:MatDialog,private materialService:MaterialService,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef) {
    materialService.getAllMaterialTypes().subscribe(data=>{
     this.AllMaterialData = data;
     this.dataSourceMatTypes = new MatTableDataSource<Material>(this.AllMaterialData);
     console.log(this.AllMaterialData);

     for(var i=1;i<this.AllMaterialData.length+1;i++){
      this.displayedColumnsMat[0]="Date";
      this.displayedColumnsMat[i]=this.AllMaterialData[i-1].mat_name;  
     // this.displayedColumnsMat[this.AllMaterialData.length+1]="action";
    }
    
     setTimeout(() => {
       this.dataSourceMatTypes.paginator = this.paginator;
     }, 0);
    })

    //Get all Material Dates
    materialService.getAllMaterialDates().subscribe(data=>{
      this.AllMaterialDatesData=data;
      console.log(this.AllMaterialDatesData);
      this.dataSourceMatDates = new MatTableDataSource<Material>(this.AllMaterialDatesData);
      setTimeout(() => {
        this.dataSourceMatDates.paginator = this.paginator;
      }, 0);
    })

    // var bal =this.AllMaterialDatesData.map(t=>(t.HBlock_4).reduce((acc,value)=>acc+value,0);
    // console.log(bal)
    
   }

  ngOnInit(): void {

  }

  
onAdd(){
  const adddialogConfig =new MatDialogConfig();
  adddialogConfig.disableClose=false;
  adddialogConfig.autoFocus=true;
  adddialogConfig.width="75%";
  adddialogConfig.height="100%";
  this.dialog.open(AddMaterialComponent,adddialogConfig)
}

getMaterialBalance(column){

switch(column){
  case 'Date' :return 'Current Balance' ; break;
  case 'HBlock_4':return  (this.AllMaterialDatesData.map(t=>t.HBlock_4_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.HBlock_4).reduce((acc,value)=>acc+value,0)); break;
  case 'T_10':return (this.AllMaterialDatesData.map(t=>t.T_10_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.T_10).reduce((acc,value)=>acc+value,0));break;
  case 'sand':return (this.AllMaterialDatesData.map(t=>t.sand_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.sand).reduce((acc,value)=>acc+value,0));break;
  case 'metal_1':return (this.AllMaterialDatesData.map(t=>t.metal_1_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.metal_1).reduce((acc,value)=>acc+value,0));break;
  case 'T_32':return (this.AllMaterialDatesData.map(t=>t.T_32_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.T_32).reduce((acc,value)=>acc+value,0));break;
  case 'ABC':return (this.AllMaterialDatesData.map(t=>t.ABC_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.ABC).reduce((acc,value)=>acc+value,0));break;
  case 'binding':return (this.AllMaterialDatesData.map(t=>t.binding_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.binding).reduce((acc,value)=>acc+value,0));break;
  case 'metal_1h':return (this.AllMaterialDatesData.map(t=>t.metal_1h_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.metal_1h).reduce((acc,value)=>acc+value,0));break;  case 'cement':return (this.AllMaterialDatesData.map(t=>t.cement_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.cement).reduce((acc,value)=>acc+value,0));break;
  case 'cement':return (this.AllMaterialDatesData.map(t=>t.cement_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.cement).reduce((acc,value)=>acc+value,0));break;
  case 'metal_3q':return (this.AllMaterialDatesData.map(t=>t.metal_3q_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.metal_3q).reduce((acc,value)=>acc+value,0));break;
  case 'T_16':return (this.AllMaterialDatesData.map(t=>t.T_16_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.T_16).reduce((acc,value)=>acc+value,0));break;
  case 'HBlock_6':return (this.AllMaterialDatesData.map(t=>t.HBlock_6_R).reduce((acc,value)=>acc+value,0))-(this.AllMaterialDatesData.map(t=>t.HBlock_6).reduce((acc,value)=>acc+value,0));break;
 
  default : return 0;

}
/**

 
  
   */
//  this.AllMaterialDatesData.map(t=>t.(column)).reduce((acc,value)=>acc+value,0);
//return bal;
// console.log(bal);
}

deleteMaterialType(index:number,e){
   if(window.confirm('Are you Sure Do you want to remove this Material type?')){
     const data = this.dataSourceMatTypes.data;
     data.splice((this.paginator.pageIndex* this.paginator.pageSize)+index,1)
     this.dataSourceMatTypes.data=data;
     this.materialService.DeleteMaterial(e.mat_id).subscribe();
   }
}

infoDateDialog(e){
  //console.log(e.Date)
  
 this._bottomSheet.open(MatInfoDateDialogComponent,{panelClass:'custom-width',data:e})
}
updateMaterialType(index:number,e){
this._bottomSheet.open(UpdateMaterialTypeComponent,{panelClass:'custom-width',data:e})
}

openDialog(action,obj) {
  obj.action = action;
  console.log(action)
  const dialogRef = this.dialog.open(DialogBoxComponent, {
    width: '600px',
    data:obj
  });

  dialogRef.afterClosed().subscribe(result => {
    // if(result.event == 'Add'){
    //   this.addRowData(result.data);
    // }else if(result.event == 'Update'){
    //   this.updateRowData(result.data);
    // }else if(result.event == 'Delete'){
    //   this.deleteRowData(result.data);
    // }
  });
}


}
