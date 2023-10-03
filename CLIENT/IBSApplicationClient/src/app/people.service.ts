import { Inject, Injectable } from "@angular/core";
import { Observable, lastValueFrom, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Change } from './shared/models/change.model'

import { People } from '../app/shared/models/people.model'
import notify from "devextreme/ui/notify";
@Injectable ({
    providedIn: 'root'
})

export class PeopleService {

  //#region init

  //this is the root url in the swagger api used to make http calls for the people model
  peopleUrl:string= 'https://localhost:7022/api/People'

  constructor(private myhttp:HttpClient) {}

  //#endregion

  //#region public methods
  
  /**also   
   * ensure all public methods have a /** comment
   * @returns 
   */
  public async getPeople() : Promise<People[] | void> {
    return await lastValueFrom(this.myhttp.get<People[]>(this.peopleUrl))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  public async updatePerson(key: People, values: People): Promise<People | void> {
    return await lastValueFrom(this.myhttp.put<People>(this.peopleUrl + "/" + key.personId, values))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  public async insertPerson(person: People): Promise<People | void> {
    return await lastValueFrom(this.myhttp.post<People>(this.peopleUrl, person))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  public async deletePerson(id: string): Promise<void> {
    await lastValueFrom(this.myhttp.delete<void>(this.peopleUrl + "/" + id, {observe: "response"}))
      .catch((err: HttpErrorResponse) => this.displayError(err));
  }

  //#endregion public methods

  //#region error handler

  private displayError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 404:
        notify("Person not found", "error");
        break;
      default:
        notify("Internal server error", "error");
        break;
    }
  }

  //#endregion error handler

}