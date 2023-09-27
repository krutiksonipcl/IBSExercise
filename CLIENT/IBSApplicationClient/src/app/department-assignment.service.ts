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
  departmentAssignmentIdURL = "";

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


  saveChanges(change: Change<DepartmentAssignment>, clonedItem: any) {
    console.log(change.type)
    switch (change.type) {
      case 'update':
        return this.updateDepartmentAssignment(clonedItem);
      case 'insert':
        return this.insertDepartmentAssignment(clonedItem);
      case 'remove':
        return this.deleteDepartmentAssignment(clonedItem);
    }
  }
  // unused
  updateDepartmentAssignment(clonedItem: any){
    console.log("Update" + clonedItem);
    this.departmentAssignmentIdURL = clonedItem.assignmentId;
    return this.myHttp.put(this.departmentAssignmentURL + "/" + this.departmentAssignmentIdURL, clonedItem);
  }

  insertDepartmentAssignment(clonedItem: any): Observable<DepartmentAssignment[]> {
    console.log("Insert" + clonedItem);
    return this.myHttp.post<DepartmentAssignment[]>(this.departmentAssignmentURL, clonedItem);
  }

  deleteDepartmentAssignment(clonedItem: any){
    console.log("Delete" + clonedItem);
    this.departmentAssignmentIdURL = clonedItem.assignmentId
    console.log(this.departmentAssignmentURL + "/" + this.departmentAssignmentIdURL);
    return this.myHttp.delete(this.departmentAssignmentURL + "/" + this.departmentAssignmentIdURL);
  }


}
