import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DepartmentAssignment } from './shared/models/departmentAssignment.model';
import { Change } from './shared/models/change.model';
import { Department } from './shared/models/department.model';
import { People } from './shared/models/people.model';


@Injectable({
  providedIn: 'root'
})
export class DepartmentAssignmentService {

  constructor(private myHttp:HttpClient) { }
  changes: Change<DepartmentAssignment>[] = [];
  departmentAssignmentURL: string = "https://localhost:7022/api/DepartmentAssignments";
  departmentAssignmentIdURL = "";
  //params = new HttpParams().set('ActiveOnly', true);

  departmentURL:string= 'https://localhost:7022/api/Departments'
  activePeopleUrl:string= 'https://localhost:7022/api/People/ActivePeople'

  getDepartmentAssignment(): Observable<DepartmentAssignment[]> {
    return this.myHttp.get<DepartmentAssignment[]>(this.departmentAssignmentURL);
  }

  getDepartment(): Observable<Department[]> {
    return this.myHttp.get<Department[]>(this.departmentURL);
  }

  getActivePeople() : Observable<People[]> {
    return this.myHttp.get<People[]>(this.activePeopleUrl);
    //return this.myHttp.get<People[]>(this.activePeopleUrl, { params: this.params });

  }



  insertDepartmentAssignment(clonedItem: any): Observable<DepartmentAssignment[]> {
    console.log(clonedItem);
    return this.myHttp.post<DepartmentAssignment[]>(this.departmentAssignmentURL, clonedItem);
  }

  deleteDepartmentAssignment(clonedItem: any){
    this.departmentAssignmentIdURL = clonedItem.assignmentId
    return this.myHttp.delete(this.departmentAssignmentURL + "/" + this.departmentAssignmentIdURL);
  }


}
