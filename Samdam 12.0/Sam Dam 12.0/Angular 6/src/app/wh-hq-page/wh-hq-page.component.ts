import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddMaterialComponent} from '../add-material/add-material.component';
import { MaterialService} from '../shared/material.service'
import { MatTableDataSource } from '@angular/material/table';
import { Material} from '../shared/material.model';

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
 
  constructor(private dialog:MatDialog,private materialService:MaterialService) {
    materialService.getAllMaterialTypes().subscribe(data=>{
     this.AllMaterialData = data;
     this.dataSourceMatTypes = new MatTableDataSource<Material>(this.AllMaterialData);
     console.log(this.AllMaterialData);
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

}
