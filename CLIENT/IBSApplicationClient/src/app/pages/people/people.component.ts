import { Component, ViewChild } from '@angular/core';
import { PeopleService } from 'src/app/people.service';
import { People } from 'src/app/shared/models/people.model';
import { DxDataGridComponent } from "devextreme-angular";
import {catchError, map} from 'rxjs/operators'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Component({
  templateUrl: 'people.component.html',
})

export class PeopleComponent {
  constructor(private PeopleService:PeopleService, private myhttp:HttpClient) {
    // this.asyncValidation = this.asyncValidation.bind(this);
  }

  peopleUrl:string= 'https://localhost:7022/api/People'
  people: People[] = [];

  ngOnInit(): void {
    this.getPeople();
  }

  @ViewChild(DxDataGridComponent) peopleGrid!: DxDataGridComponent;


  getPeople(): void {
    this.PeopleService.getPeople()
    .subscribe(people => {
      this.people = people;
      console.log(this.people)}
      );
  }

  // asyncValidation(params: any): Observable<any> {
  //   delete params.data['__KEY__'];
  //   console.log(params.data);
    
  //   return this.myhttp.post(this.peopleUrl, params.data)
  //     .pipe(
  //       map((res: any) => {
  //         if (res.isValid) {
  //           return res;
  //         } else {
  //           throw new Error(res.message);
  //         }
  //       }),
  //       catchError(error => {
  //         console.error("Server side validation error", error);
  //         throw new Error("Cannot contact validation server");
  //       })
  //     );
  // }


  onPeopleSaving(event: any) {
    console.log(event.changes[0])
    event.cancel = true;

    var clonedItem = event.changes[0].key;
    const changes = event.changes[0].data;

    if (event.changes[0].type == "insert") {
      
      delete event.changes[0].data['__KEY__'];
      this.PeopleService.insertPerson(changes).subscribe(people =>{
        this.people = people;
        console.log(people);
        this.peopleGrid.instance.refresh();}
      );
    }
    else{
      for (let key in changes){ clonedItem[key] = changes[key];};

      this.PeopleService.saveChanges(event.changes[0], clonedItem)
      .subscribe();
    }
  }
}
