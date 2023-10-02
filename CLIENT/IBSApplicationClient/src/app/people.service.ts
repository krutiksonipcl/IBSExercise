import { Inject, Injectable } from "@angular/core";
import { Observable, lastValueFrom, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Change } from './shared/models/change.model'

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
    peopleUrl:string= 'https://localhost:7022/api/People'
    peopleIdURL: string = "";
    
    // send all data to be displayed in the DevExpress grid
    getPeople() : Observable<People[]> {
        return this.myhttp.get<People[]>(this.peopleUrl);
    }

    // send person specific data to be displayed
    getPerson() {}

    saveChanges(change: Change<People>, clonedItem: any) {
      switch (change.type) {
        case 'update':
          return this.updatePerson(clonedItem);
        case 'insert':
          return this.insertPerson(clonedItem);
        case 'remove':
          return this.deletePerson(clonedItem);
      }
    }

    //update a specific person's data
    updatePerson(clonedItem: any) {
      this.peopleIdURL = clonedItem.peopleId;
      return this.myhttp.put(this.peopleUrl + "/" + this.peopleIdURL, clonedItem);
    }
  
    // add a new person to the table
    insertPerson(clonedItem: any): Observable<People[]> {
      return this.myhttp.post<People[]>(this.peopleUrl, clonedItem)
    }

    deletePerson(clonedItem: any) {
      this.peopleIdURL = clonedItem.peopleId;
      return this.myhttp.delete(this.peopleUrl + "/" + this.peopleIdURL, clonedItem);
    }

    // emailCheck(params: any) {
    //   // return this.myhttp.post(this.peopleUrl, params);
    // }


}