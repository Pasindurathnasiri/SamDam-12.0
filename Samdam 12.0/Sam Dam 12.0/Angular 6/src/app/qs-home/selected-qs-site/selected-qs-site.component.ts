import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {SiteService} from '../../shared/site.service';
import { Router,ActivatedRoute } from '@angular/router';
import {AddSiteTaskComponent} from '../add-site-task/add-site-task.component';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-selected-qs-site',
  templateUrl: './selected-qs-site.component.html',
  styleUrls: ['./selected-qs-site.component.css']
})
export class SelectedQsSiteComponent implements OnInit {
  
  AllSiteData:any =[];
  constructor(private dialog:MatDialog,private actRoute:ActivatedRoute,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef,private siteService:SiteService) { 
   var site_id = this.actRoute.snapshot.paramMap.get('id');
 
   this.siteService.getSiteDetails(site_id).subscribe(data=>{
     this.AllSiteData=data;
   })


  }

  ngOnInit(): void {
  }

  onAddTask(){
   
    this._bottomSheet.open(AddSiteTaskComponent,{panelClass:'custom-width',data:this.AllSiteData})
   
  }


}
