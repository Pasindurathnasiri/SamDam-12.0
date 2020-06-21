import { AfterViewInit, Component, OnInit, ViewChild,Input,NgZone } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Attendance } from '../shared/attendance.model';
import {AttendanceService} from '../shared/attendance.service';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { AttendanceCardComponent } from '../attendance-card/attendance-card.component'
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { from } from 'rxjs';
import { stringify } from 'querystring';


@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.css']
})
export class AttendanceSheetComponent implements OnInit {
  attendanceForm :FormGroup; 
  AllAttendanceData: any = [];
  dataSource: MatTableDataSource<Attendance>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Attendance>(true, []);
  searchKey: string; 
  
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
 displayedColumns: string [] = ['emp_id', 'name','site','month','days','action_days','ots','action_ots'];

 constructor(private attendanceApi:AttendanceService,private router: Router,private ngZone: NgZone,private formBuilder: FormBuilder,private dialog:MatDialog,private actRoute:ActivatedRoute,private _bottomSheet:MatBottomSheet,private _bottomSheetRef:MatBottomSheetRef){
  this.attendanceApi.GetAllAttendance().subscribe(data =>{
    this.AllAttendanceData =data;    
    
    this.dataSource = new MatTableDataSource<Attendance>(this.AllAttendanceData);
   //this is the array we want to filter
    console.log(this.dataSource.filteredData[0].site[0])
    
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
       
  })

}

 

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Attendance>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.updateAttendanceForm();
  
  }

//Update Attendance Form
   updateAttendanceForm(){
     this.attendanceForm = this.formBuilder.group({
       emp_id:[''],
       name_in:[''],
       site:[''],
       month:[''],
       days:[''],
       ots:['']
     })
   }



  //Increase Attendance
  incAttendance(index : number,e){
   e.attendance[0].days = e.attendance[0].days+1;
   console.log(e.attendance[0]);
   const data = this.dataSource.data;
   this.attendanceApi.IncreaseAttendance(e.attendance[0]._id,e.attendance[0]).subscribe()
  }


  //Decrease Attendance
  decAttendance(index : number,e){
    if(window.confirm('Are you sure,Do you want to decrease a day from this Employee?')){
    e.attendance[0].days = e.attendance[0].days-1;
    console.log(e.attendance[0]);
    const data = this.dataSource.data;
    this.attendanceApi.IncreaseAttendance(e.attendance[0]._id,e.attendance[0]).subscribe()
    }
  }

  //Increase OT
  incOT(index : number,e){
    e.attendance[0].ots = e.attendance[0].ots+1; 
    console.log(e.attendance[0]);
    const data = this.dataSource.data;
   this.attendanceApi.IncreaseAttendance(e.attendance[0]._id,e.attendance[0]).subscribe()
  }

  //Decrease OT
  decOT(index : number,e){
     e.attendance[0].ots = e.attendance[0].ots-1;
     console.log(e.attendance[0]);
     const data = this.dataSource.data;
     this.attendanceApi.IncreaseAttendance(e.attendance[0]._id,e.attendance[0]).subscribe()
  }
  onSearchClear(){
    this.searchKey ='';
    this.applyFilter();
  }

  openCalander(index:number,e):void{
   // console.log(e)
    this._bottomSheet.open(AttendanceCardComponent,{data:e});
    
    
  }

  applyFilter(){
    return this.dataSource.filter= this.searchKey.trim().toLowerCase();
  }
}
