import { Component, ViewChild } from '@angular/core';
import { PeopleService } from 'src/app/people.service';
import { People } from 'src/app/shared/models/people.model';
import { DxDataGridComponent } from "devextreme-angular";
import { HttpClient } from "@angular/common/http";



@Component({
  templateUrl: 'people.component.html',
})

export class PeopleComponent {
  constructor(private PeopleService:PeopleService, private myhttp:HttpClient) {
    this.asyncValidation = this.asyncValidation.bind(this);
  }

  peopleUrl:string= 'https://localhost:7022/api/People'
  people: People[] = [];
  isValid: boolean = false;

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

  /**
   * Async data validation before the user is able to insert a row, to make sure that the email of the new user is unique
   * Had trouble moving the bulk of this to the service but I imagine there is some sort of promise chaining required
   * @param params all the rows that are of the new row
   * @returns a promise
   */
  asyncValidation(params: any) {
    delete params.data['__KEY__'];
    console.log(params.data);
    
    return new Promise<void>((resolve, reject) => {
      this.myhttp.get(this.peopleUrl)
          .toPromise()
          .then((res: any) => {
              // res.message contains validation error message
              this.isValid = true; 
              for (let person of res){
                if (params.data.email == person.email){ 
                  this.isValid = false 
                };
              }
              console.log(this.isValid);
              this.isValid ? resolve() : reject(res.message);
              this.isValid = true; 

              // ===== or if "res" is { isValid: Boolean, message: String } =====
              resolve(res);
          })
          .catch(error => {
              console.error("Server-side validation error", error);

              reject("Cannot contact validation server");
          });
        })
  }

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
