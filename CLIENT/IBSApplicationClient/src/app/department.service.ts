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

  //# region properties
  departmentURL:string= 'https://localhost:7022/api/Departments'
  //#endregion

  //# region init
  constructor(private myHttp:HttpClient) { }
  //#endregion

  //# region public methods
  /**
   * makes an http get call to the department api
   * @returns a list of promise of Department objects
   */
  public async getDepartment() : Promise<Department[] | void> {
    return await lastValueFrom(this.myHttp.get<Department[]>(this.departmentURL))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  /**
   * makes an http put call to the department api
   * @param key contains departmentId
   * @param values updated version of department 
   * @returns a promise of Department
   */
  public async updateDepartment(key: Department, values: Department): Promise<Department | void> {
    return await lastValueFrom(this.myHttp.put<Department>(this.departmentURL + "/" + key.departmentId, values))
      .catch((err: HttpErrorResponse) => this.displayError(err))
  }
  
  /**
   * makes http post call to api to insert new department into the back end
   * @param department new department object to be inserted
   * @returns 
   */
  public async insertDepartment(department: Department) : Promise<Department | void> {
    return await lastValueFrom(this.myHttp.post<Department>(this.departmentURL, department))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  /**
   * makes http delete call to api to delete the specified department from the back end
   * @param id id of the department object to be removed from the table
   */
  public async deleteDepartment(id: string) : Promise<void> {
    await lastValueFrom(this.myHttp.delete<void>(this.departmentURL + "/" + id, {observe: "response"}))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }
  //# endregion

  //# region error handler
  /**
   * Handles error display. 
   * 404 : no departments found, 
   * 409 : the department wanting to be deleted has people assigned to it
   * @param error error recieved from the api
   */
  private displayError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 404:
        notify("Department not found", "error");
        break;
      case 409:
        notify("Cannot delete Department with People assigned to it", "error");
        break;
      default:
        notify("Internal server error", "error");
        break;
    }
  }
  //# endregion
}
