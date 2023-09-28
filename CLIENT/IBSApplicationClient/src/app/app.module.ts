import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { DepartmentComponent } from './pages/department/department.component';
import { departmentAssignmentComponent } from './pages/departmentAssignment/departmentAssignment.component';
import { PeopleComponent } from './pages/people/people.component';
import { ReportingComponent } from './pages/reporting/reporting.component';
@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    PeopleComponent,
    departmentAssignmentComponent,
    ReportingComponent
  ],
  imports: [
  
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    DxDataGridModule,
    BrowserModule,
    
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService
  ],
  exports: [
    ReportingComponent,
    DepartmentComponent,
    PeopleComponent,
    departmentAssignmentComponent
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
