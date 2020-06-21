import { Component, OnInit,ViewChild, NgZone } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { Salarypay } from '../shared/salarypay.model';
import { SalarypayService } from '../shared/salarypay.service';
import { matDialogAnimations, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddAdvanceSingleComponent } from '../advance-pay/add-advance-single/add-advance-single.component';
import { ConfirmAdvanceSingleComponent } from '../advance-pay/confirm-advance-single/confirm-advance-single.component'
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-advance-pay',
  templateUrl: './advance-pay.component.html',
  styleUrls: ['./advance-pay.component.css']
})
export class AdvancePayComponent implements OnInit {
  AllAdvanceData: any =[];
  dataSource: MatTableDataSource<Salarypay>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string;  
 
  displayedColumns: string[] = ['emp_id','name','designation','site','month','action_req','advance_req','advance_paid'];
 
  constructor(private advanceApi: SalarypayService,private dialog:MatDialog,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef) {
    this.advanceApi.GetAllSalary().subscribe(data =>{
      this.AllAdvanceData =data;    
      this.dataSource = new MatTableDataSource<Salarypay>(this.AllAdvanceData);
      console.log(data);
      
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
      
    })
  }

  openBottomSheet(index:number,e): void {
    this._bottomSheet.open(AddAdvanceSingleComponent,{data:e.attendance[0]});
        
  }

  onSearchClear(){
    this.searchKey ='';
    this.applyFilter();
  }

  applyFilter(){
    return this.dataSource.filter= this.searchKey.trim().toLowerCase();
  }

  payAdvance(index:number,e): void{
    this._bottomSheet.open(ConfirmAdvanceSingleComponent,{data:e})
  }

  ngOnInit(){
   this.dataSource = new MatTableDataSource<Salarypay>();
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;

  }

  
}
