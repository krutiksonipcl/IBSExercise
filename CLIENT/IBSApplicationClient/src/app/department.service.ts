import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Department } from './shared/models/department.model';
import { Change } from './shared/models/change.model'
import notify from "devextreme/ui/notify";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {


  departmentURL:string= 'https://localhost:7022/api/Departments'
  constructor(private myHttp:HttpClient) { }

/**
   * 
   * @returns returns an observable that is the response of the API GET request on the departmentURL
   */
  public async getDepartment() : Promise<Department[] | void> {
    return await lastValueFrom(this.myHttp.get<Department[]>(this.departmentURL))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  public async updateDepartment(key: Department, values: Department): Promise<Department | void> {
    return await lastValueFrom(this.myHttp.put<Department>(this.departmentURL + "/" + key.departmentId, values))
      .catch((err: HttpErrorResponse) => this.displayError(err))
  }
  
  public async insertDepartment(department: Department) : Promise<Department | void> {
    return await lastValueFrom(this.myHttp.post<Department>(this.departmentURL, department))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  public async deleteDepartment(id: string) : Promise<void> {
    await lastValueFrom(this.myHttp.delete<void>(this.departmentURL + "/" + id, {observe: "response"}))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }

 
  private displayError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 404:
        notify("Department not found", "error");
        break;
      default:
        notify("Internal server error", "error");
        break;
    }
  }
}
