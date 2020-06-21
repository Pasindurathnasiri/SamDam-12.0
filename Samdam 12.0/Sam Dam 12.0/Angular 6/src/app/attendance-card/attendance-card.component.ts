import {Component, ViewEncapsulation,OnInit,Inject,Optional,ViewChild} from '@angular/core';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Attendance } from '../shared/attendance.model';
import {AttendanceService} from '../shared/attendance.service';
import {DateM} from '../shared/date.model';
import {FormControl, FormBuilder, FormGroup ,Validators, NgForm} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

import { from } from 'rxjs';
import { Site } from '../shared/site.model';

export interface AttendanceData{
  // _id:string;
  // name_in:string;
  // attendance:Array<Date>
  // date: Date;
  // site_name : string;
  // state : string;
  // ot_on_day:number;
  // reason:string; //in case of emergency
  _id:string;
  emp_id: string;
  name_in : string;
  month : string;
  site_name: string;
  days:number;
  advance_req:number;
  advance_paid:number;
  ots:number;
  day_pay:number;
  ot_pay:number; 
  site:Array<Site> 
  attendance:Array<Attendance>
  date:Array<DateM>
}

@Component({
  selector: 'app-attendance-card',
  templateUrl: './attendance-card.component.html',
  styleUrls: ['./attendance-card.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AttendanceCardComponent implements OnInit {

  public readonly dateForm :FormGroup; 
  attendanceForm :FormGroup;
  AllAttendanceData: any = [];
  dataSource: MatTableDataSource<Attendance>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Attendance>(true, []);
  searchKey: string; 

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string [] = ['date','site','state','controls','ot_on_day'];
 

  constructor(private attendanceApi:AttendanceService,private router: Router,private formBuilder: FormBuilder,private actRoute:ActivatedRoute,private dialog:MatDialog,private _bottomSheetRef: MatBottomSheetRef<AttendanceCardComponent>,@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: AttendanceData) {
  //date data from relevant employee
 
  //data ekata attendance eka assign wela thynne
  console.log(data);
  this.dateForm = this.formBuilder.group({
      date:[],
      name_in:[data.name_in],
      site_name:[data.site[0].site_name],
      month:[data.attendance[0].month],
      state:[],
      reason:[],
      ot_on_day:[]
      
  })
 
 
 //  var day_length = [data.attendance[0].date[0].length]
  this.attendanceForm = this.formBuilder.group({
    _id:[this.data._id],
    emp_id:[this.data.emp_id],
    name_in:[this.data.name_in],
    site:[this.data.site],
    month:[this.data.attendance[0].month],
    days:[this.data.attendance[0].days],
    ots:[this.data.attendance[0].ots],
    date:[this.dateForm]


  })
  
  //attendance data for calender table
    this.attendanceApi.GetAllAttendance().subscribe(data =>{
      this.AllAttendanceData =data;    
      
      this.dataSource = new MatTableDataSource<Attendance>(this.AllAttendanceData);
     //this is the array we want to filter
      console.log(this.dataSource.filteredData)
      
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
         
    })
   }

 

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Attendance>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

  updateAttendanceForm(){
   
  }
  
   //filter date
   formatDate(e){
    var convertDate = new Date(e.target).toISOString().substring(0,10);
    this.dateForm.get('date').setValue(convertDate, {
      onlyself:true
    })
    console.log(convertDate);
    }
   

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    console.log(this._bottomSheetRef);
    event.preventDefault();
  }

  
  onPresent(){
    
    //this have to add to attendance.date array
    //Here add dates to attendance.date array
    console.log("present")
    this.dateForm.value.state = "Present";
    
    console.log(this.dateForm.value);
    //now updating the attendance
    const new_data = this.dateForm.value;
    
    
    //console.log(new_data);
   // this.attendanceApi.IncreaseAttendance(new_data._id,new_data).subscribe()
  }

  onAbsent(){
    console.log("absent")
  }
  // onAddDate(){
  //   const adddialogConfig =new MatDialogConfig();
  // adddialogConfig.disableClose=false;
  // adddialogConfig.autoFocus=true;
  // adddialogConfig.width="50%";
  // adddialogConfig.height="50%";
  // //this.dialog.open(AddAttendanceDateComponent,adddialogConfig)
  // }

  //Increase Attendance
  // incAttendance(index : number,e){
  //   e.attendance[0].days = e.attendance[0].days+1;
  //   console.log(e.attendance[0]);
  //   const data = this.dataSource.data;
  //   this.attendanceApi.IncreaseAttendance(e.attendance[0]._id,e.attendance[0]).subscribe()
  //  }

  //   //Decrease Attendance
  // decAttendance(index : number,e){
  //   if(window.confirm('Are you sure,Do you want to decrease a day from this Employee?')){
  //   e.attendance[0].days = e.attendance[0].days-1;
  //   console.log(e.attendance[0]);
  //   const data = this.dataSource.data;
  //   this.attendanceApi.IncreaseAttendance(e.attendance[0]._id,e.attendance[0]).subscribe()
  //   }
  // }

  //  //Increase OT
  //  incOT(index : number,e){
  //   e.attendance[0].ots = e.attendance[0].ots+1; 
  //   console.log(e.attendance[0]);
  //   const data = this.dataSource.data;
  //  this.attendanceApi.IncreaseAttendance(e.attendance[0]._id,e.attendance[0]).subscribe()
  // }

  //   //Decrease OT
  //   decOT(index : number,e){
  //     e.attendance[0].ots = e.attendance[0].ots-1;
  //     console.log(e.attendance[0]);
  //     const data = this.dataSource.data;
  //     this.attendanceApi.IncreaseAttendance(e.attendance[0]._id,e.attendance[0]).subscribe()
  //  }


   //on preset employee
}
