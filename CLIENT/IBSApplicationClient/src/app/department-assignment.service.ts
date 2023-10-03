import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { DepartmentAssignment } from './shared/models/departmentAssignment.model';
import { Department } from './shared/models/department.model';
import { People } from './shared/models/people.model';
import notify from "devextreme/ui/notify";


@Injectable({
  providedIn: 'root'
})
export class DepartmentAssignmentService {

  constructor(private myHttp:HttpClient) { }
  params = new HttpParams().set('ActiveOnly', true);
  departmentURL:string= 'https://localhost:7022/api/Departments'
  peopleUrl:string= 'https://localhost:7022/api/People'
  departmentAssignmentURL: string = "https://localhost:7022/api/DepartmentAssignments";



  public async getDepartmentAssignment(): Promise<DepartmentAssignment[] | void> {
    return await lastValueFrom(this.myHttp.get<DepartmentAssignment[]>(this.departmentAssignmentURL))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  public async getDepartment(): Promise<Department[] | void> {
    return await lastValueFrom(this.myHttp.get<Department[]>(this.departmentURL))
    .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  public async getActivePeople() : Promise<People[] | void> {
    //return this.myHttp.get<People[]>(this.activePeopleUrl);
    return await lastValueFrom(this.myHttp.get<People[]>(this.peopleUrl, { params: this.params }))
    .catch((err: HttpErrorResponse) => this.displayError(err));

  }



  public async insertDepartmentAssignment(departmentassignment: DepartmentAssignment): Promise<DepartmentAssignment | void> {
    return await lastValueFrom(this.myHttp.post<DepartmentAssignment>(this.departmentAssignmentURL, departmentassignment))
    .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  public async deleteDepartmentAssignment(id : string){
    await lastValueFrom(this.myHttp.delete<void>(this.departmentAssignmentURL + "/" + id, {observe: "response"}))
    .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  private displayError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 404:
        notify("Not found", "error");
        break;
      default:
        notify("Internal server error", "error");
        break;
    }
  }
}
