import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  departmentURL:string= 'https://localhost:7022/api/Departments'
  peopleUrl:string= 'https://localhost:7022/api/People'

  getDepartmentAssignment(): Observable<DepartmentAssignment[]> {
    return this.myHttp.get<DepartmentAssignment[]>(this.departmentAssignmentURL);
  }

  getDepartment(): Observable<Department[]> {
    return this.myHttp.get<Department[]>(this.departmentURL);
  }

  getPeople() : Observable<People[]> {
    return this.myHttp.get<People[]>(this.peopleUrl);
  }

  insertDepartmentAssignment(clonedItem: any): Observable<DepartmentAssignment[]> {
    console.log("Insert" + clonedItem);
    return this.myHttp.post<DepartmentAssignment[]>(this.departmentAssignmentURL, clonedItem);
  }
}
