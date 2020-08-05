import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import {MaterialService} from '../../shared/material.service';


interface EQType{
  eq_type: string;
}

@Component({
  selector: 'app-add-eq-hq',
  templateUrl: './add-eq-hq.component.html',
  styleUrls: ['./add-eq-hq.component.css']
})
export class AddEqHqComponent implements OnInit {
  public addEQGroup:FormGroup;
  showSucessMessage: boolean;
  serverErrorMessages: string;
eq_typeControl = new FormControl('',Validators.required);
selectFormControl = new FormControl('',Validators.required);
eq_types: EQType[]=[
  {eq_type:'Hoe'},
  {eq_type:'Mason Handtool'},
  {eq_type:'Pan'},
  {eq_type:'Hammer'},
  {eq_type:'Ball Hammer'},
  {eq_type:'Shovel'},
  {eq_type:'Handsaw'},
  {eq_type:'Hacksaw Metal'},
  {eq_type:'Wrench'},
  {eq_type:'Axe'}, 
  {eq_type:'Safty Gloves'},
  {eq_type:'Safty Helmet'},
  {eq_type:'Safty Glass'},
  {eq_type:'Drill'},
  {eq_type:'Grinders'},
  {eq_type:'Plier'},
  {eq_type:'Screwdrivers'},
  {eq_type:'Tape Measures'},
  {eq_type:'Spirit Level'},
  {eq_type:'Chisel'},

  
]

  constructor(private formBuilder:FormBuilder,private materialService:MaterialService) {
    this.addEQGroup = this.formBuilder.group({
      eq_id:[],
      eq_type:[],
      brand_name:[],
      buyer:[],
      dom:[Date],
      price_unit:[],
      amount:[]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.materialService.postEquipment(this.addEQGroup.value).subscribe(
      res=>{
        setTimeout(()=> this.showSucessMessage=false ,4000);
      },
      err=>{
        if(err){
          console.log("Equipment Adding Failed"+err);
        }else{
          this.serverErrorMessages = 'Something Went Wrong';
        }
      }
    );
    window.confirm("New Equipment Added Successfully");
    location.reload();
  }
}
