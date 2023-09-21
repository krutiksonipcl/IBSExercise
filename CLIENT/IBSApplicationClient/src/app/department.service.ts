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
  isLoading = false;

  departmentURL:string= 'https://localhost:7022/api/Departments'

  getDepartment(): Observable<Department[]> {
    return this.myHttp.get<Department[]>(this.departmentURL);
  }
  processSaving(change: Change<Department>) {}
}
