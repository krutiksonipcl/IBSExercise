import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Department } from './shared/models/department.model';
import { Change } from './shared/models/change.model'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private myHttp:HttpClient) { }
  departmentList: Department[] = []
  departmentData: Department=new Department();

  changes: Change<Department>[] = [];
  departmentIdURL = ""; 

  departmentURL:string= 'https://localhost:7022/api/Departments'

  /**
   * 
   * @returns returns an observable that is the response of the API GET request on the departmentURL
   */
  getDepartment(): Observable<Department[]> {
    return this.myHttp.get<Department[]>(this.departmentURL);
  }


/**
 * handles the dxgrid update types, which can be 1. update 2. insert and 3. remove and passed them to the 
 * appropriate handlers using a switch case
 * @param change the entire change object including .data, .key and .type properties
 * @param clonedItem specific item to be updated in the database
 * @returns an observable 
 */
  saveChanges(change: Change<Department>, clonedItem: any) {
    console.log(change.type)
    switch (change.type) {
      case 'update':
        return this.updateDepartment(clonedItem);
      case 'insert':
        return this.updateDepartment(clonedItem);
      case 'remove':
        return this.deleteDepartment(clonedItem);
    }
  }

  updateDepartment(clonedItem: any) {
    console.log("Update" + clonedItem);
    this.departmentIdURL = clonedItem.departmentId;
    // const headers = new HttpHeaders({'Content-Type' : 'application/json' })
    return this.myHttp.put(this.departmentURL+'/'+this.departmentIdURL, clonedItem);
  }
  
  insertDepartment(clonedItem: any): Observable<Department[]> {
    console.log("Insert" + clonedItem);
    return this.myHttp.post<Department[]>(this.departmentURL, clonedItem)
  }

  deleteDepartment(clonedItem: any){
    console.log("Delete" + clonedItem);
    this.departmentIdURL = clonedItem.departmentId;
    return this.myHttp.delete(this.departmentURL+"/"+this.departmentIdURL);
  }

 

}
