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

  //# region init
  constructor(private myHttp:HttpClient) { }
  //#endregion

  //# region properties

  params = new HttpParams().set('ActiveOnly', true);
  departmentURL:string= 'https://localhost:7022/api/Departments'
  peopleUrl:string= 'https://localhost:7022/api/People'
  departmentAssignmentURL: string = "https://localhost:7022/api/DepartmentAssignments";

  //# endregion

  //# region public methods
  /**
   * makes http get call to the api to get the DepartmentAssignment
   * @returns a promise of list of DepartmentAssignment 
   */
  public async getDepartmentAssignment(): Promise<DepartmentAssignment[] | void> {
    return await lastValueFrom(this.myHttp.get<DepartmentAssignment[]>(this.departmentAssignmentURL))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  /**
   * makes an http post call to the api to insert a new DepartmentAssignment
   * @param departmentassignment departmentAssignment object new row to be inserted
   * @returns a promise of DepartmentAssignment
   */
  public async insertDepartmentAssignment(departmentassignment: DepartmentAssignment): Promise<DepartmentAssignment | void> {
    return await lastValueFrom(this.myHttp.post<DepartmentAssignment>(this.departmentAssignmentURL, departmentassignment))
    .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  /**
   * makes an http delete call to teh api to delete a DepartmentAssignment
   * @param id id of the DepartmentAssignment to be deleted from the database
   */
  public async deleteDepartmentAssignment(id : string){
    await lastValueFrom(this.myHttp.delete<void>(this.departmentAssignmentURL + "/" + id, {observe: "response"}))
    .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  /**
   * makes an http get call to the api to get the Departments
   * @returns an observable of a list of Department objects
   */
  getDepartment(): Observable<Department[]> {
    return this.myHttp.get<Department[]>(this.departmentURL);
  }

  /**
   * makes an http get call to the api to get the active People
   * @returns an observable of a list of People objects
   */
  getPeople(): Observable<People[]> {
    return this.myHttp.get<People[]>(this.peopleUrl, {params:this.params});
  }

  //# endregion

  //# region errorhandler
  /**
   * Handles displaying errors
   * @param error recieved from the api
   */
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
  //# endregion
}
