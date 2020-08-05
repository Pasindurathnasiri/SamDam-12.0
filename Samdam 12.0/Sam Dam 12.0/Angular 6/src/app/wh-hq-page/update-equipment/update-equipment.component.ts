import { Component, OnInit,Inject, Optional} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MaterialService} from '../../shared/material.service';

export interface EquipmentData{
 _id:string;
 eq_id:string;
 eq_type:string;
 brand_name:string;
 price_unit:number;
 buyer:string;
 dom:string;
 amount:number;
}

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.css']
})
export class UpdateEquipmentComponent implements OnInit {
  equipmentForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private _bottomSheetRef: MatBottomSheetRef<UpdateEquipmentComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: EquipmentData,private materialService:MaterialService) { 
  this.equipmentForm = formBuilder.group({
    _id:[data._id,[Validators.required]],
    eq_id:[data.eq_id,[Validators.required]],
    eq_type:[data.eq_type,[Validators.required]],
    brand_name:[data.brand_name,[Validators.required]],
    price_unit:[data.price_unit,[Validators.required]],
    buyer:[data.buyer,[Validators.required]],
    dom:[data.dom,[Validators.required]],
    amount:[data.amount,[Validators.required]],
  })  

  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    console.log(this._bottomSheetRef);
    event.preventDefault();
  }


  ngOnInit(): void {
  }

  onCancel(){
     this._bottomSheetRef.dismiss();
  }

  onUpdate(){
    var id=this.equipmentForm.value._id;
    if(window.confirm('Are you sure you want to update Equipment Details?')){
      this.materialService.updateEquipment(id,this.equipmentForm.value).subscribe(res=>{
       this.onCancel();
      })
    }
    location.reload();
  }
}
