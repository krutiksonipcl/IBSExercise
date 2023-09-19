import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';

import { People } from '../app/shared/models/people.model'
@Injectable ({
    providedIn: 'root'
})

export class PeopleService {

    constructor(private myhttp:HttpClient) {}
    // an empty list of people objects
    peopleList: People [] = [];

    peopleData: People=new People();
    //this is the root url in the swagger api used to make http calls for the people model
    PeopleUrl:string= 'https://localhost:7022/api/People'
    
    // send all data to be displayed in the DevExpress grid
    getPeople() : Observable<People[]> {
        return this.myhttp.get<People[]>(this.PeopleUrl);
    }

    // send person specific data to be displayed
    getPerson() {}

    // add a new person to the table
    addPerson() {}

    //update a specific person's data
    updatePerson() {}

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

}