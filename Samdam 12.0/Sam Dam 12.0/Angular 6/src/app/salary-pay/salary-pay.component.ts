import { Component, OnInit,ViewChild } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { Attendance } from '../shared/attendance.model';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import { Salarypay } from '../shared/salarypay.model';
import { SalarypayService } from '../shared/salarypay.service';
import { from } from 'rxjs';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { ViewPaysheetComponent} from '../view-paysheet/view-paysheet.component'


@Component({
  selector: 'app-salary-pay',
  templateUrl: './salary-pay.component.html',
  styleUrls: ['./salary-pay.component.css']
})
export class SalaryPayComponent implements OnInit {
  AllSalaryData: any = [];
  forSelectMonth:FormGroup;
  dataSource: MatTableDataSource<Salarypay>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchKey: string; 
 
  displayedColumns:string[] = ['emp_id','name_in','designation','site','dayrate','otrate','days','ots','daypayments','otpayments','fullpayments','action'];


  constructor(private salaryapi: SalarypayService,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef) {
    this.salaryapi.GetAllSalary().subscribe(data =>{
      this.AllSalaryData =data;    
      this.dataSource = new MatTableDataSource<Salarypay>(this.AllSalaryData);
      console.log(this.AllSalaryData.dates);
      
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
      
    })
  }

     /** Gets the total Days. */
     getTotalDaysRow() {
      return this.AllSalaryData.map(t => t.attendance[0].days).reduce((acc, value) => acc + value, 0);
    }
  
   
     /** Gets the total Days. */
     getTotalDays() {
      return this.AllSalaryData.map(t => t.attendance[0].days).reduce((acc, value) => acc + value, 0);
    }
  
        /** Gets the total OTs */
     getTotalOTs() {
      return this.AllSalaryData.map(t => t.attendance[0].ots).reduce((acc, value) => acc + value, 0);
    } 

    //Calculate Day payment
    getDaypayments(index:number, e){
      // return this.AllSalaryData.map(e.attendance[0].days*e.day_pay).reduce((acc,value)=> acc+value,0);
      const data = this.dataSource.data;
      
      return e.day_pay*e.attendance[0].days;
    }

    //Calculate Total payment
    getTotalDayPayments(){
       return this.AllSalaryData.map(t=>t.attendance[0].days*t.day_pay).reduce((acc,value)=> acc+value,0);
      
    }

    //calculate total ots payment
    getOTPayments(index:number,e){
      const data = this.dataSource.data;
      return e.ot_pay*e.attendance[0].ots;
    }

    //calculate Total OTS payments
    getTotalOTPayments(){
      return this.AllSalaryData.map(t=>t.attendance[0].ots*t.ot_pay).reduce((acc,value)=> acc+value,0);

    }

    //Calculate Full Payments
    getFullPayment(index:number,e){
      const data = this.dataSource.data;
      return (e.ot_pay*e.attendance[0].ots)+(e.day_pay*e.attendance[0].days);
    }

    //get total full payments
    getTotalFullPayments(){
      return this.AllSalaryData.map(t=>(t.ot_pay*t.attendance[0].ots)+(t.day_pay*t.attendance[0].days)).reduce((acc,value)=> acc+value,0)
    }

    onSearchClear(){
      this.searchKey ='';
      this.applyFilter();
    }

    applyFilter(){
      return this.dataSource.filter= this.searchKey.trim().toLowerCase();
    }

    viewPaySheet(index:number,e) : void{
    console.log(e)
    this._bottomSheet.open(ViewPaysheetComponent,{data:e})
    }

  ngOnInit() {
    
   this.dataSource = new MatTableDataSource<Salarypay>();
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;

  }

}
