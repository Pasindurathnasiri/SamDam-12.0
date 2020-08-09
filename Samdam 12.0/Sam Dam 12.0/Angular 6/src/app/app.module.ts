// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AccountingHomeComponent } from './accounting-home/accounting-home.component';
import { QsHomeComponent } from './qs-home/qs-home.component';
import { HrHomeComponent } from './hr-home/hr-home.component';
import { HrHqPageComponent } from './hr-hq-page/hr-hq-page.component';
import { QrCodescanComponent } from './qr-codescan/qr-codescan.component';
import { SalaryPayComponent } from './salary-pay/salary-pay.component';
import { AdvancePayComponent } from './advance-pay/advance-pay.component';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';
import { EmployeeMgmtComponent } from './employee-mgmt/employee-mgmt.component';
import { SalaryTableComponent } from './salary-table/salary-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select'; 
import {MatInputModule} from '@angular/material/input';
import { AdvanceTableComponent } from './advance-table/advance-table.component';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import  {MatCurrencyFormatModule} from 'mat-currency-format';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';




//Samdam 09
import {EmployeeService} from './shared/employee.service'
import { MatNativeDateModule } from '@angular/material/core';
import { EventEmitterService } from '../app/event-emitter.service';
import { UpdateEmployeeComponent } from './employee-mgmt/update-employee/update-employee.component';
import { AddAdvanceSingleComponent } from './advance-pay/add-advance-single/add-advance-single.component';
import { EbHomeComponent } from './eb-home/eb-home.component';
import { EbSheduleSiteComponent } from './eb-shedule-site/eb-shedule-site.component';
import { ConfirmAdvanceSingleComponent } from './advance-pay/confirm-advance-single/confirm-advance-single.component';
import { HrSiteHomeComponent } from './hr-site-home/hr-site-home.component';
import { HrSelectedSiteHomeComponent } from './hr-selected-site-home/hr-selected-site-home.component';
import { HrSelectedSiteAttendanceComponent } from './hr-selected-site-attendance/hr-selected-site-attendance.component';
import { HrSelectedSiteAdvanceComponent } from './hr-selected-site-advance/hr-selected-site-advance.component';
import { TransferEmployeeComponent } from './employee-mgmt/transfer-employee/transfer-employee.component';
import { ViewPaysheetComponent } from './view-paysheet/view-paysheet.component';
import { AttendanceCardComponent } from './attendance-card/attendance-card.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { WhHomeComponent } from './wh-home/wh-home.component';
import { WhHqPageComponent } from './wh-hq-page/wh-hq-page.component';
import { WhSitePageComponent } from './wh-site-page/wh-site-page.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddMaterialComponent } from './add-material/add-material.component';
import { UpdateMaterialTypeComponent } from './wh-hq-page/update-material-type/update-material-type.component';
import {DialogBoxComponent} from './dialog-box/dialog-box.component';
import { MatInfoDateDialogComponent } from './wh-hq-page/mat-info-date-dialog/mat-info-date-dialog.component';
import { TransferMaterialComponent } from './wh-hq-page/transfer-material/transfer-material.component';
import { AddEqHqComponent } from './wh-hq-page/add-eq-hq/add-eq-hq.component';
import { UpdateEquipmentComponent } from './wh-hq-page/update-equipment/update-equipment.component';
import { TransferEquipmentComponent } from './wh-hq-page/transfer-equipment/transfer-equipment.component';
import { AddVehicleComponent } from './wh-hq-page/add-vehicle/add-vehicle.component';
import { UpdateVehicleComponent } from './wh-hq-page/update-vehicle/update-vehicle.component';
import { TranferVehicleComponent } from './wh-hq-page/tranfer-vehicle/tranfer-vehicle.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    MainNavComponent,
    AccountingHomeComponent,
    QsHomeComponent,
    HrHomeComponent,
    HrHqPageComponent,
    QrCodescanComponent,
    SalaryPayComponent,
    AdvancePayComponent,
    AttendanceSheetComponent,
    EmployeeMgmtComponent,
    SalaryTableComponent,
    AdvanceTableComponent,
    AttendanceTableComponent,
    EmployeeTableComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    AddAdvanceSingleComponent,
    EbHomeComponent,
    EbSheduleSiteComponent,
    ConfirmAdvanceSingleComponent,
    HrSiteHomeComponent,
    HrSelectedSiteHomeComponent,
    HrSelectedSiteAttendanceComponent,
    HrSelectedSiteAdvanceComponent,
    TransferEmployeeComponent,
    ViewPaysheetComponent,
    AttendanceCardComponent,
    WhHomeComponent,
    WhHqPageComponent,
    WhSitePageComponent,
    AddMaterialComponent,
    UpdateMaterialTypeComponent,
    DialogBoxComponent,
    MatInfoDateDialogComponent,
    TransferMaterialComponent,
    AddEqHqComponent,
    UpdateEquipmentComponent,
    TransferEquipmentComponent,
    AddVehicleComponent,
    UpdateVehicleComponent,
    TranferVehicleComponent
    
    
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatTabsModule,
    MatStepperModule,
    MatBottomSheetModule,
    MatDividerModule,
    MatExpansionModule,
    MatCurrencyFormatModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
   

    
    
  ],
  exports: [
    MatDialogModule,
    MatBottomSheetModule
  ],
  entryComponents:[AddEmployeeComponent,DialogBoxComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  { provide: MatBottomSheetRef, useValue: {} },
  { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },AuthGuard,UserService,EmployeeService,MatDatepickerModule,EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
