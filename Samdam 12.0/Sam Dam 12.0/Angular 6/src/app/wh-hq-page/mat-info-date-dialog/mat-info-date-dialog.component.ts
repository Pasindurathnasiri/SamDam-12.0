import { Component, OnInit,Inject, Optional } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MaterialService} from '../../shared/material.service'


export interface MaterialData{
  _id:string;
  ABC: number;
  HBlock_4: number;
  HBlock_6: number;
  T_10: number;
  T_16: number;
  T_32: number;
  binding: number;
  cement: number;
  Date: Date;
  metal_1: number;
  metal_1h: number;
  metal_3q: number;
  sand: number;
}

 

@Component({
  selector: 'app-mat-info-date-dialog',
  templateUrl: './mat-info-date-dialog.component.html',
  styleUrls: ['./mat-info-date-dialog.component.css']
})
export class MatInfoDateDialogComponent implements OnInit {
  AllMaterialData: any =[];
  materialForm : FormGroup;
  public materials: any[]=[{material:''}];

  constructor(private formBuilder: FormBuilder,private _bottomSheetRef: MatBottomSheetRef<MatInfoDateDialogComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: MaterialData,private materialService:MaterialService) {
    console.log(data);
    this.materialForm = formBuilder.group({
      _id:[data._id,[Validators.required]],
      ABC:[data.ABC,[Validators.required]],
      HBlock_4: [data.HBlock_4,[Validators.required]],
      HBlock_6: [data.HBlock_6,[Validators.required]],
      T_10: [data.T_10,[Validators.required]],
      T_16: [data.T_16,[Validators.required]],
      T_32: [data.T_32,[Validators.required]],
      binding: [data.binding,[Validators.required]],
      cement: [data.cement,[Validators.required]],
      dor: [data.Date,[Validators.required]],
      metal_1: [data.metal_1,[Validators.required]],
      metal_1h: [data.metal_1h,[Validators.required]],
      metal_3q: [data.metal_3q,[Validators.required]],
      sand: [data.sand,[Validators.required]],

    });

      //Gettng Material types

    materialService.getAllMaterialTypes().subscribe(datamat=>{
      this.AllMaterialData=datamat;
      console.log(this.AllMaterialData);

      for(var i=0;i<this.AllMaterialData.length;i++){
        
        this.materials[i]=this.AllMaterialData[i].mat_name;  
      }
    })

  

   
   }
   
   
   openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    console.log(this._bottomSheetRef);
    event.preventDefault();
  }

  updateAdvanceForm(){
    this.materialForm = this.formBuilder.group({
      ABC:[''],
      HBlock_4: [''],
      HBlock_6: [''],
      T_10: [''],
      T_16: [''],
      T_32: [''],
      binding: [''],
      cement: [''],
      dor: [''],
      metal_1: [''],
      metal_1h: [''],
      metal_3q: [''],
      sand: [''],
    })
  }

  onCancel(){
    this._bottomSheetRef.dismiss();
  }

  onDelete(){
    //console.log("delete");
    if(window.confirm("Are you sure do you want to delete this record?")){

      this.materialService.DeleteRecord(this.materialForm.value._id).subscribe();
      this._bottomSheetRef.dismiss();
      location.reload();
    }

   
  }

  onUpdateRecord(){
    //console.log("Update");
    console.log(this.materialForm.value)
    var id = this.materialForm.value._id;
    if(window.confirm('Are you Sure you want to update this Record.?')){
      this.materialService.updateMaterialRecord(id,this.materialForm.value).subscribe(res=>{
        this.onCancel();
      })
     // location.reload();
    }
  }

  ngOnInit(): void {
  }

}
