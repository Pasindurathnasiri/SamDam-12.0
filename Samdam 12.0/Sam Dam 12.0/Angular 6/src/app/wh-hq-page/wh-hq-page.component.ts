import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddMaterialComponent} from '../add-material/add-material.component';
import { MaterialService} from '../shared/material.service';
import { MatTableDataSource } from '@angular/material/table';
import { Material} from '../shared/material.model';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {UpdateMaterialTypeComponent} from '../wh-hq-page/update-material-type/update-material-type.component'
import {DialogBoxComponent} from '../dialog-box/dialog-box.component'
@Component({
  selector: 'app-wh-hq-page',
  templateUrl: './wh-hq-page.component.html',
  styleUrls: ['./wh-hq-page.component.css']
})
export class WhHqPageComponent implements OnInit {
  AllMaterialData: any =[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSourceMatTypes: MatTableDataSource<Material>;

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
    }
    
     setTimeout(() => {
       this.dataSourceMatTypes.paginator = this.paginator;
     }, 0);
    })

    
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

deleteMaterialType(index:number,e){
   if(window.confirm('Are you Sure Do you want to remove this Material type?')){
     const data = this.dataSourceMatTypes.data;
     data.splice((this.paginator.pageIndex* this.paginator.pageSize)+index,1)
     this.dataSourceMatTypes.data=data;
     this.materialService.DeleteMaterial(e.mat_id).subscribe();
   }
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
