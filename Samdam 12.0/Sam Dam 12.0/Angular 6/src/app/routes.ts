import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { AccountingHomeComponent } from './accounting-home/accounting-home.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component'
import {QsHomeComponent} from './qs-home/qs-home.component';
import {HrHomeComponent} from './hr-home/hr-home.component';
import {HrHqPageComponent} from './hr-hq-page/hr-hq-page.component';
import {QrCodescanComponent} from './qr-codescan/qr-codescan.component';
import {SalaryPayComponent} from './salary-pay/salary-pay.component';
import {AdvancePayComponent} from './advance-pay/advance-pay.component';
import {AttendanceSheetComponent} from './attendance-sheet/attendance-sheet.component';
import {EmployeeMgmtComponent} from './employee-mgmt/employee-mgmt.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {UpdateEmployeeComponent} from './employee-mgmt/update-employee/update-employee.component';
import {AddAdvanceSingleComponent } from './advance-pay/add-advance-single/add-advance-single.component';
import { EbHomeComponent} from './eb-home/eb-home.component';
import { EbSheduleSiteComponent} from './eb-shedule-site/eb-shedule-site.component';
import {HrSiteHomeComponent} from './hr-site-home/hr-site-home.component';
import {HrSelectedSiteHomeComponent} from './hr-selected-site-home/hr-selected-site-home.component';
import {HrSelectedSiteAttendanceComponent} from './hr-selected-site-attendance/hr-selected-site-attendance.component'
import {HrSelectedSiteAdvanceComponent} from './hr-selected-site-advance/hr-selected-site-advance.component'
import { from } from 'rxjs';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'settings', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'home',component:HomeComponent,canActivate:[AuthGuard]
    },
    {
        path: 'Accounting-Home',component:AccountingHomeComponent,canActivate:[AuthGuard]
    },
    {
        path: 'QS-Home',component:QsHomeComponent,canActivate:[AuthGuard]
    },
    {
        path: 'HR-Home',component:HrHomeComponent,canActivate:[AuthGuard]
    },
    {
        path: 'HR-HQPage',component:HrHqPageComponent,canActivate:[AuthGuard]
    },
    {
        path: 'QR-scan',component:QrCodescanComponent,canActivate:[AuthGuard]
    },
    {
        path: 'salary-pay',component:SalaryPayComponent,canActivate:[AuthGuard]
    },
    {
        path: 'advance-pay',component:AdvancePayComponent,canActivate:[AuthGuard]
    },
    {
        path: 'attendance-sheet',component:AttendanceSheetComponent,canActivate:[AuthGuard]
    },
    {
        path: 'employee-mgmt',component:EmployeeMgmtComponent,canActivate:[AuthGuard]
    },
    {
        path: 'add-employee',component:AddEmployeeComponent,canActivate:[AuthGuard]
    },
    {
        path: 'eb-home',component:EbHomeComponent,canActivate:[AuthGuard]
    },
    {
        path: 'eb-shedule-site',component:EbSheduleSiteComponent,canActivate:[AuthGuard]
    },
    {
        path: 'HR-SiteHome',component:HrSiteHomeComponent,canActivate:[AuthGuard]
    },
    {
        path: 'update-employee/:id',component:UpdateEmployeeComponent,canActivate:[AuthGuard]
    },
    {
        path: 'selected-hr-site-employees/:id',component:HrSelectedSiteHomeComponent,canActivate:[AuthGuard]
    },
    {
        path: 'selected-hr-site-attendance/:id',component:HrSelectedSiteAttendanceComponent,canActivate:[AuthGuard]
    },
    {
        path: 'selected-hr-site-advance/:id',component:HrSelectedSiteAdvanceComponent,canActivate:[AuthGuard]
    },
    {
        path: 'update-single-advance/:id',component:AddAdvanceSingleComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];