import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { departmentAssignmentComponent } from './pages/departmentAssignment/departmentAssignment.component';
import { PeopleComponent } from './pages/people/people.component';
import { DepartmentComponent } from './pages/department/department.component';
import { ReportingComponent } from './pages/reporting/reporting.component';

const routes: Routes = [
  {
    path: 'department',
    component: DepartmentComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reporting',
    component: ReportingComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'departmentAssignment',
    component: departmentAssignmentComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'departmentAssignment'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class AppModule { }
