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
  updateDepartmentId = ""; 

  departmentURL:string= 'https://localhost:7022/api/Departments'

  /**
   * 
   * @returns returns an observable that is the response of the API GET request on the departmentURL
   */
  getDepartment(): Observable<Department[]> {
    return this.myHttp.get<Department[]>(this.departmentURL);
  }
  /**
   * Handles the promise sent by the onSaving method in the datagrid
   * @param change The updated row object from Department DataGrid
   */

  

  updateDepartment(change: Change<Department>) {
    console.log(change);
    this.updateDepartmentId = change.key.departmentId;
    // const headers = new HttpHeaders({'Content-Type' : 'application/json' })
    return this.myHttp.put(this.departmentURL+'/'+this.updateDepartmentId, change.key)

  }

}
